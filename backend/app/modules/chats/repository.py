from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Chat, Message
from .schemas import ChatStatus, MessageType


class ChatRepository:
    def __init__(self, postgres: AsyncSession):
        self.postgres = postgres

    async def add_chat(self, user_id: int, status: ChatStatus):
        chat = Chat(user_id=user_id, status=status)
        self.postgres.add(chat)
        await self.postgres.commit()
        return chat

    async def add_message(
        self, chat_id: int, type: MessageType, content: str
    ):
        message = Message(chat_id=chat_id, type=type, content=content)
        self.postgres.add(message)
        await self.postgres.commit()
        return message

    async def add_all(self, *args: list[Message]):
        await self.postgres.add_all(args)
        await self.postgres.commit()
