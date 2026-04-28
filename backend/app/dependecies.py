from typing import Annotated

import jwt
from app.config import get_settings
from app.core.base_schema import TokenPayload, User
from app.core.redis import redis_client
from app.core.security import validate_access_token
from app.database import async_session
from app.modules.auth.repository import AuthRepository
from app.modules.auth.service import AuthService
from app.modules.chats.repository import ChatRepository
from app.modules.chats.service import ChatService
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")
settings = get_settings()


async def get_postgres_async() -> AsyncSession:
    async with async_session() as session:
        yield session


async def get_redis() -> Redis:
    yield redis_client


async def get_auth_repository(
    postgres: AsyncSession = Depends(get_postgres_async),
) -> AuthRepository:
    return AuthRepository(postgres=postgres)


async def get_auth_service(
    repo: AuthRepository = Depends(get_auth_repository),
    redis: Redis = Depends(get_redis),
) -> AuthService:
    return AuthService(repo=repo, redis=redis)


async def get_chat_repository(
    postgres: AsyncSession = Depends(get_postgres_async),
) -> ChatRepository:
    return ChatRepository(postgres=postgres)


async def get_chat_service(
    repo: ChatRepository = Depends(get_chat_repository),
) -> ChatService:
    return ChatService(repo=repo)


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    auth_repo: AuthRepository = Depends(get_auth_repository),
) -> User:
    print("token", token)
    try:
        token_data = validate_access_token(token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        ) from None
    except (jwt.InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authentication": "Bearer"},
        ) from None

    user = await auth_repo.get_user_by_id(user_id=token_data.id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
            headers={"WWW-Authentication": "Bearer"},
        ) from None

    return user
