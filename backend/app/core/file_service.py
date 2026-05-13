import os
from datetime import datetime
from zoneinfo import ZoneInfo

from app.core.base_schema import (
    UserChatPreprocessed,
    UserChatPreprocessing,
    UserMessage,
)
from app.core.const import (
    MAX_FILE_SIZE,
    VALID_CONTENT_TYPE,
    VALID_EXTENSION,
)
from fastapi import HTTPException, UploadFile
from pydantic import ValidationError
from starlette import status


def check_file_extension(filename: str):
    """Проверка файла на расширение"""
    if filename.split(".")[-1] != VALID_EXTENSION:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect file extension",
        )


def check_file_content_type(content_type: str):
    """Проверка файла на заголовок Content-Type"""
    if content_type != VALID_CONTENT_TYPE:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Invalid MIME-type of a file",
        )


def get_file_size(file: bytes | UploadFile) -> int:
    """Размер файла в байтах"""
    if isinstance(file, bytes):
        return len(file)


def check_file_size(file_size: int):
    """Проверка файла на размер"""
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeded",
        )


def check_file_sctructure(raw_bytes: bytes):
    """Проверка файла на правильную структуру"""
    try:
        UserChatPreprocessing.model_validate_json(raw_bytes)
    except ValidationError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid json structure",
        ) from None


def generate_filename(username: str) -> str:
    time_now = datetime.now(ZoneInfo("Europe/Moscow"))
    return f"{username}-{time_now.strftime('%Y.%m.%d-%H:%M:%S')}"  # noqa: E501


def is_valid_message(msg: dict) -> bool:
    return all(
        [
            msg["type"] == "message",
            msg["date"],
            msg["from"],
            msg["text"],
            isinstance(msg["text"], str),
        ]
    )


def map_message(msg: dict) -> UserMessage:
    print(UserMessage(
        date=msg["date"], from_=msg["from"], text=msg["text"]
    ))
    return UserMessage(
        date=msg["date"], from_=msg["from"], text=msg["text"]
    )


def preprocessing_raw_json(
    user_chat: UserChatPreprocessing,
) -> UserChatPreprocessed:
    processed_messages = [
        map_message(msg)
        for msg in user_chat.messages
        if is_valid_message(msg=msg)
    ]

    return UserChatPreprocessed(
        title=user_chat.name,
        interlocutor_id=user_chat.id,
        messages=processed_messages,
        original_period_start=processed_messages[0].date,
        original_period_end=processed_messages[-1].date,
    )
