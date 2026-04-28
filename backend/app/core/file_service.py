import datetime
import os
from zoneinfo import ZoneInfo

from app.core.const import (
    MAX_FILE_SIZE,
    VALID_CONTENT_TYPE,
    VALID_EXTENSION,
)
from fastapi import HTTPException, UploadFile
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


def check_file_size(file: UploadFile):
    """Проверка файла на размер"""

    # Перемещаем указатель в конец файла
    file.file.seek(0, os.SEEK_END)
    # Получаем текущую позицию указателя в байgiтах - это размер файла
    file_size = file.file.tell()
    # Возвращаем указатель в начало файла
    file.file.seek(0, os.SEEK_SET)

    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeded",
        )


def generate_filename(username: str, file_extension: str):
    time_now = datetime.now(ZoneInfo("Europe/Moscow"))
    return f"{username}-{file_extension}-{time_now.strftime('%Y.%m.%d-%H:%M:%S')}"  # noqa: E501
