from sqlalchemy import delete, select, update
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from .models import RefreshToken, User


class AuthRepository:
    def __init__(self, postgres: AsyncSession):
        self.postgres = postgres

    async def get_user_by_email(self, email: str):
        return await self.postgres.scalar(
            select(User).where(User.email == email)
        )

    async def get_user_by_id(self, user_id: int):
        return await self.postgres.scalar(
            select(User).where(User.id == user_id)
        )

    async def add_user(
        self,
        username: str,
        email: str,
        hashed_password: str,
    ):
        result = await self.postgres.execute(
            insert(User)
            .values(
                username=username,
                email=email,
                hashed_password=hashed_password,
            )
            .on_conflict_do_update(
                index_elements=[User.email],
                set_={
                    "username": username,
                    "hashed_password": hashed_password,
                },
            )
            .returning(User)
        )
        await self.postgres.commit()
        return result.scalar()
        # new_user = User(
        #     username=username,
        #     email=email,
        #     hashed_password=hashed_password,
        # )
        # self.postgres.merge(new_user)
        # await self.postgres.commit()
        # await self.postgres.refresh(new_user)
        # return new_user

    async def update_user_activated(self, email: str):
        await self.postgres.execute(
            update(User)
            .where(User.email == email)
            .values(is_activated=True)
        )

    async def add_refresh_token(
        self,
        user_id: int,
        refresh_token: str,
    ):
        self.postgres.add(
            RefreshToken(user_id=user_id, refresh_token=refresh_token)
        )
        await self.postgres.commit()

    async def update_refresh_token(self, user_id: int, refresh_token: str):
        tokenData = await self.postgres.scalar(
            select(RefreshToken).where(RefreshToken.user_id == user_id)
        )
        print(tokenData)
        if tokenData is not None:
            tokenData.refresh_token = refresh_token
        else:
            self.postgres.add(
                RefreshToken(user_id=user_id, refresh_token=refresh_token)
            )
        await self.postgres.commit()

    async def delete_refresh_token(self, user_id: int):
        await self.postgres.execute(
            delete(RefreshToken).where(RefreshToken.user_id == user_id)
        )
        await self.postgres.commit()

    async def get_refresh_token(self, refresh_token: str):
        return await self.postgres.scalar(
            select(RefreshToken).where(
                RefreshToken.refresh_token == refresh_token
            )
        )
