import json

import boto3
import openai
import redis
from celery import shared_task
from models import (
    Analysis,
    Chat,
    ChatStatus,
    File,
    FileType,
    Message,
    MessageType,
)
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from config import DATABASE_URL, OPENAI_API_KEY, S3_BUCKET

engine = create_engine(DATABASE_URL)
redis_client = redis.Redis.from_url("redis://localhost:6379")

def publish_status(chat_id: str, status: str, extra: dict = None):
    data = {"status": status}
    if extra:
        data.update(extra)
    redis_client.publish(f"chat:{chat_id}", json.dumps(data))

@shared_task(bind=True, max_retries=3)
def process_chat_task(self, chat_id: str, ai_text: str, raw_file_content: bytes):
    session = Session(bind=engine)
    try:
        chat = session.get(Chat, chat_id)
        if not chat:
            return
        # Проверка отмены перед началом
        if chat.is_cancelled:
            cancel_chat(session, chat)
            return

        # 1. Загрузка сырого файла в S3
        update_chat_status(session, chat, ChatStatus.UPLOADING_RAW)
        publish_status(chat_id, "UPLOADING_RAW")
        # Загрузка в S3 (boto3)
        s3 = boto3.client("s3")
        raw_key = f"raw/{chat_id}/input.json"
        s3.put_object(Bucket=S3_BUCKET, Key=raw_key, Body=raw_file_content)
        # Запись File
        file = File(
            chat_id=chat.id,
            filename="input.json",
            storage_path=raw_key,
            size_bytes=len(raw_file_content),
            type=FileType.RAW,
        )
        session.add(file)
        session.commit()
        if chat.is_cancelled:
            cancel_chat(session, chat)
            return

        # 2. Предобработка
        update_chat_status(session, chat, ChatStatus.PREPROCESSING)
        publish_status(chat_id, "PREPROCESSING")
        # Вырезаем лишнее (ваша логика)
        data = json.loads(raw_file_content)
        # ... ваша предобработка, возвращает подготовленный dict
        preprocessed_data = preprocess_json(data)
        # Обновляем поля чата
        chat.title = preprocessed_data.get("title", "Untitled")
        chat.original_period_start = preprocessed_data.get("period_start")
        chat.original_period_end = preprocessed_data.get("period_end")
        session.commit()

        if chat.is_cancelled:
            cancel_chat(session, chat)
            return

        # Сохраняем предобработанный JSON
        update_chat_status(session, chat, ChatStatus.UPLOADING_PREPROCESSED)
        publish_status(chat_id, "UPLOADING_PREPROCESSED")
        preprocessed_json = json.dumps(preprocessed_data, ensure_ascii=False).encode("utf-8")
        preprocessed_key = f"preprocessed/{chat_id}/input.json"
        s3.put_object(Bucket=S3_BUCKET, Key=preprocessed_key, Body=preprocessed_json)
        preprocessed_file = File(
            chat_id=chat.id,
            filename="preprocessed_input.json",
            storage_path=preprocessed_key,
            size_bytes=len(preprocessed_json),
            type=FileType.PREPROCESSED,
        )
        session.add(preprocessed_file)
        session.commit()
        chat.preprocessed_json_id = preprocessed_file.id
        session.commit()

        if chat.is_cancelled:
            cancel_chat(session, chat)
            return

        # 3. Вызов DeepSeek API
        update_chat_status(session, chat, ChatStatus.ANALYZING)
        publish_status(chat_id, "ANALYZING")
        try:
            openai.api_key = OPENAI_API_KEY
            response = openai.ChatCompletion.create(
                model="deepseek-chat",  # или другая модель
                messages=[
                    {"role": "system", "content": ai_text},
                    {"role": "user", "content": json.dumps(preprocessed_data)}
                ],
                timeout=120
            )
            answer = response.choices[0].message["content"]
            # Успех
            analysis = Analysis(chat_id=chat.id, content=answer)
            session.add(analysis)
            update_chat_status(session, chat, ChatStatus.COMPLETED)
            publish_status(chat_id, "COMPLETED", {"result": answer})
        except Exception as e:
            # Ошибка API
            analysis = Analysis(chat_id=chat.id, content="Произошла ошибка, создайте новый чат")
            session.add(analysis)
            update_chat_status(session, chat, ChatStatus.COMPLETED)
            publish_status(chat_id, "COMPLETED", {"error": str(e)})
        session.commit()
    except Exception as exc:
        session.rollback()
        # Логируем ошибку, при необходимости повторяем
        raise self.retry(exc=exc, countdown=60)
    finally:
        session.close()

def update_chat_status(session, chat, new_status: ChatStatus):
    chat.status = new_status
    session.commit()

def cancel_chat(session, chat):
    """Обрабатывает отмену"""
    analysis = Analysis(chat_id=chat.id, content="Вы отменили анализ, создайте новый чат")
    session.add(analysis)
    chat.status = ChatStatus.CANCELLED
    session.commit()
    publish_status(str(chat.id), "CANCELLED")
    # Можно также добавить сообщение в messages