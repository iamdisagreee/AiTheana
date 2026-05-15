import json

from app.config import get_settings
from app.core.base_schema import UserChatPreprocessing
from app.core.file_service import (
    generate_filename,
    get_file_size,
    preprocessing_raw_json,
)
from app.core.redis import redis_client_celery
from app.core.s3.s3_sync import S3SyncClient
from app.database import sync_engine
from app.modules.auth.models import User
from app.modules.chats.models import Analys, Chat, File
from app.modules.chats.schemas import ChatStatus, FileType
from celery import shared_task
from sqlalchemy.orm import Session


def publish_status(chat_id: int, status: str, extra: dict | None = None):
    data = {"status": status}
    if extra:
        data.update(extra)

    redis_client_celery.publish(f"chat:{chat_id}", json.dumps(data))


def update_chat_status(session, chat, new_status: ChatStatus):
    chat.status = new_status
    session.commit()


@shared_task(bind=True, max_retries=3)
def processing_chat_task(
    self,
    chat_id: int,
    raw_bytes: bytes,
    username: str,
):
    settings = get_settings()
    session = Session(bind=sync_engine)

    chat = session.get(Chat, chat_id)

    update_chat_status(
        session=session, chat=chat, new_status=ChatStatus.UPLOADING_RAW
    )
    publish_status(
        chat_id=chat_id,
        status=ChatStatus.UPLOADING_RAW,
        extra={"content": "The chat has started uploading to s3"},
    )

    # Загрузка сырого файла
    raw_filename = generate_filename(username=username)
    raw_storage_path = f"{FileType.RAW.lower()}/{raw_filename}"
    raw_file_size = get_file_size(raw_bytes)

    s3_sync_client = S3SyncClient(
        access_key=settings.s3_access_key,
        secret_key=settings.s3_secret_key,
        endpoint_url=settings.s3_endpoint_url,
        bucket_name=settings.s3_bucket_name,
    )
    s3_sync_client.upload_bytes(
        data=raw_bytes, object_name=raw_storage_path
    )

    file = File(
        chat_id=chat_id,
        type=FileType.RAW,
        filename=raw_filename,
        storage_path=raw_storage_path,
        size_bytes=raw_file_size,
    )
    session.add(file)
    session.commit()

    # Предобработка
    update_chat_status(
        session=session, chat=chat, new_status=ChatStatus.PREPROCESSING
    )
    publish_status(
        chat_id=chat_id,
        status=ChatStatus.PREPROCESSING,
        extra={"content": "The chat has started preprocessing"},
    )
    # print(raw_bytes)
    raw_json = UserChatPreprocessing.model_validate_json(raw_bytes)
    preprocessed_file = preprocessing_raw_json(user_chat=raw_json)
    preprocessed_json = preprocessed_file.model_dump_json()
    chat.title = preprocessed_file.title
    chat.interlocutor_id = preprocessed_file.interlocutor_id
    chat.original_period_start = preprocessed_file.original_period_start
    chat.original_period_end = preprocessed_file.original_period_end

    # Загрузка предобработанного файла
    update_chat_status(
        session=session,
        chat=chat,
        new_status=ChatStatus.UPLOADING_PREPROCESSED,
    )
    publish_status(
        chat_id=chat_id,
        status=ChatStatus.UPLOADING_PREPROCESSED,
        extra={
            "content": "The preprocessed chat has started uploading to s3"
        },
    )
    preprocessed_filename = generate_filename(username=username)
    preprocessed_storage_path = f"{FileType.PREPROCESSED.lower()}/{chat_id}/{preprocessed_filename}"  # noqa
    preprocessed_file_size = get_file_size(raw_bytes)

    s3_sync_client.upload_bytes(
        data=preprocessed_json, object_name=preprocessed_storage_path
    )
    file = File(
        chat_id=chat_id,
        type=FileType.PREPROCESSED,
        filename=preprocessed_filename,
        storage_path=preprocessed_storage_path,
        size_bytes=preprocessed_file_size,
    )
    session.add(file)
    session.commit()

    # Анализирование (API)
    update_chat_status(
        session=session,
        chat=chat,
        new_status=ChatStatus.ANALYZING,
    )
    publish_status(
        chat_id=chat_id,
        status=ChatStatus.ANALYZING,
        extra={"content": "Start analyzing chat"},
    )
    answer = "Дорогие друзья, новая модель организационной деятельности требует определения и уточнения форм воздействия? Равным образом повышение уровня гражданского сознания создаёт предпосылки качественно новых шагов для направлений прогрессивного развития. Практический опыт показывает, что консультация с профессионалами из IT способствует повышению актуальности позиций, занимаемых участниками в отношении поставленных задач. Равным образом постоянное информационно-техническое обеспечение нашей деятельности создаёт предпосылки качественно новых шагов для всесторонне сбалансированных нововведений! Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу специалистов участие в формировании направлений прогрессивного развития! С другой стороны консультация с профессионалами из IT способствует подготовке и реализации позиций, занимаемых участниками в отношении поставленных задач. Практический опыт показывает, что повышение уровня гражданского сознания позволяет выполнить важнейшие задания по разработке дальнейших направлений развития проекта! Задача организации, в особенности же курс на социально-ориентированный национальный проект способствует подготовке и реализации соответствующих условий активизации. Повседневная практика показывает, что рамки и место обучения кадров напрямую зависит от соответствующих условий активизации. Дорогие друзья, постоянный количественный рост и сфера нашей активности требует от нас системного анализа направлений прогрессивного развития. С другой стороны консультация с профессионалами из IT играет важную роль в формировании ключевых компонентов планируемого обновления? Повседневная практика показывает, что новая модель организационной деятельности требует от нас системного анализа всесторонне..."
    analys = Analys(
        chat_id=chat_id,
        content=answer,
    )
    session.add(analys)
    session.commit()

    # Все успешно
    update_chat_status(
        session=session,
        chat=chat,
        new_status=ChatStatus.COMPLETED,
    )
    publish_status(
        chat_id=chat_id,
        status=ChatStatus.COMPLETED,
        extra={"content": "The chat was successfully analyzed"},
    )
