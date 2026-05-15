from sqlalchemy import delete, insert, literal, select, union_all, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from .models import Analys, Chat, Message
from .schemas import ChatStatus, EventTimelineType, MessageType


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

    async def get_chat_by_id(self, chat_id: int):
        msgs_query = select(
            Message.id.label("event_id"),
            Message.chat_id,
            Message.created_at,
            literal(EventTimelineType.MESSAGE).label("event_type"),
            Message.type.label("message_type"),
            Message.content,
        )

        analyses_query = select(
            Analys.id.label("event_id"),
            Analys.chat_id,
            Analys.created_at,
            literal(EventTimelineType.ANALYS).label("event_type"),
            literal(None).label("message_type"),
            Analys.content,
        )

        timeline_query = union_all(msgs_query, analyses_query).subquery()

        return await self.postgres.execute(
            select(timeline_query)
            .where(timeline_query.c.chat_id == chat_id)
            .order_by(timeline_query.c.created_at)
        )
