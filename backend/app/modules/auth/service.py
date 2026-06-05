import secrets
import smtplib

import jwt
from app.core.base_schema import DetailResponse, User
from app.core.const import COOKIE_REFRESH_TOKEN_KEY
from app.core.email_service import send_email
from app.core.security import (
    create_tokens,
    hash_password,
    validate_refresh_token,
    verify_password,
)
from argon2.exceptions import InvalidHashError, VerifyMismatchError
from fastapi import HTTPException, Response
from pydantic import ValidationError
from redis.asyncio import Redis
from starlette import status

from .repository import AuthRepository
from .schemas import TokenResponse


class AuthService:
    def __init__(self, repo: AuthRepository, redis: Redis):
        self.repo = repo
        self.redis = redis

    async def registration_request(self, email: str, password: str):
        user = await self.repo.get_user_by_email(email)
        if user and user.is_activated:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email уже зарегестрирован",
            )

        header = "Код подтверждения"
        auth_code = secrets.SystemRandom().randrange(100000, 999999)
        body = f"Ваш код: {auth_code}"
        try:
            send_email(
                to_email=email,
                header=header,
                body=body,
            )
        except smtplib.SMTPAuthenticationError as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Ошибка при отправке письма",
            ) from None
        except smtplib.SMTPRecipientsRefused as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Ошибка при отправке письма",
            ) from None

        username = self.create_username(email=email)
        user = await self.repo.add_user(
            username=username,
            email=email,
            hashed_password=hash_password(password=password),
        )

        # Добавляем в redis-хранилище email:auth_code
        await self.redis.set(email, auth_code)

        return DetailResponse(detail=f"Confirmation code sent to {email}")

    async def registration_confirm(
        self,
        email: str,
        entered_code: int,
        response: Response,
    ):
        user = await self.repo.get_user_by_email(email)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Email не доступен для активации",
            )

        if user.is_activated:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email уже зарегестрирован",
            )

        correct_code = await self.redis.get(email)

        if not correct_code:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Нет кода для email {email}",
            )

        if int(correct_code) != entered_code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Введен некорректный код",
            )

        await self.repo.update_user_activated(email=email)

        access_token, refresh_token = create_tokens(
            access_data={"sub": str(user.id)},
            refresh_data={"sub": str(user.id)},
        )
        await self.repo.add_refresh_token(
            user_id=user.id, refresh_token=refresh_token
        )
        response.set_cookie(
            key=COOKIE_REFRESH_TOKEN_KEY,
            value=refresh_token,
            httponly=True,
            secure=False,  # https
        )

        await self.redis.delete(email)

        return TokenResponse(access_token=access_token, user=user)

    @staticmethod
    def create_username(email: str):
        return email.split("@")[0][:5]

    async def login(self, response: Response, email: str, password: str):
        user = await self.repo.get_user_by_email(email)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Неправильная почта",
                headers={"WWW-Authentication": "Bearer"},
            )

        if not user.is_activated:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь не активирован",
            )

        try:
            verify_password(password, user.hashed_password)
        except VerifyMismatchError:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Неправильный пароль",
                headers={"WWW-Authentication": "Bearer"},
            ) from None
        except InvalidHashError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка с хешированным паролем",
                headers={"WWW-Authentication": "Bearer"},
            ) from None

        access_token, refresh_token = create_tokens(
            access_data={"sub": str(user.id)},
            refresh_data={"sub": str(user.id)},
        )
        await self.repo.update_refresh_token(
            user_id=user.id, refresh_token=refresh_token
        )
        response.set_cookie(
            key=COOKIE_REFRESH_TOKEN_KEY,
            value=refresh_token,
            httponly=True,
            secure=False,  # https
        )

        return TokenResponse(access_token=access_token, user=user)

    async def logout(self, response: Response, user: User):
        if not user.is_activated:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь не активирован",
            )

        await self.repo.delete_refresh_token(user_id=user.id)
        response.delete_cookie(COOKIE_REFRESH_TOKEN_KEY)

        return DetailResponse(detail="User has successfully logged out")

    async def refresh(
        self,
        response: Response,
        refresh_token: str | None,
    ):
        if not refresh_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Рефреш-токен не найден в куках",
                headers={"WWW-Authentication": "Bearer"},
            )
        try:
            token_data = validate_refresh_token(token=refresh_token)
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Закончился рефреш-токен",
                headers={"WWW-Authenticate": "Bearer"},
            ) from None
        except (jwt.InvalidTokenError, ValidationError):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Не получается распарсить данные из токена",
                headers={"WWW-Authentication": "Bearer"},
            ) from None

        token_from_db = await self.repo.get_refresh_token(
            refresh_token=refresh_token
        )
        # print(token_from_db)
        if not token_from_db:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Рефреш-токен не найден в бд",
                headers={"WWW-Authentication": "Bearer"},
            )

        user = await self.repo.get_user_by_id(user_id=token_data.id)

        if not user.is_activated:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь не активирован",
            )

        access_token, refresh_token = create_tokens(
            access_data={"sub": str(user.id)},
            refresh_data={"sub": str(user.id)},
        )
        await self.repo.update_refresh_token(
            user_id=user.id, refresh_token=refresh_token
        )
        response.set_cookie(
            key=COOKIE_REFRESH_TOKEN_KEY,
            value=refresh_token,
            httponly=True,
            secure=False,  # https
        )

        return TokenResponse(access_token=access_token, user=user)
