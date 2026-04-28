from datetime import datetime, timedelta, timezone

import jwt
from app.config import get_settings
from app.core.base_schema import TokenPayload
from argon2 import PasswordHasher

settings = get_settings()
password_hash = PasswordHasher()


def hash_password(password: str):
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return password_hash.verify(hashed_password, plain_password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        settings.jwt_access_secret,
        settings.jwt_algorithm,
    )


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        days=settings.refresh_token_expire_days
    )
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        settings.jwt_refresh_secret,
        settings.jwt_algorithm,
    )


def create_tokens(access_data, refresh_data):
    return [
        create_access_token(data=access_data),
        create_refresh_token(data=refresh_data),
    ]


def validate_access_token(token: str):
    payload = jwt.decode(
        token,
        settings.jwt_access_secret,
        algorithms=[settings.jwt_algorithm],
    )
    return TokenPayload(**payload)


def validate_refresh_token(token: str):
    payload = jwt.decode(
        token,
        settings.jwt_refresh_secret,
        algorithms=[settings.jwt_algorithm],
    )
    return TokenPayload(**payload)
