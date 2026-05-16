from sqlalchemy import (
    and_,
    delete,
    insert,
    literal,
    select,
    union_all,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from .models import Analys, Chat, Message
from .schemas import (
    ChatQueryParams,
    ChatStatus,
    EventTimelineType,
    MessageType,
    SortOrder,
)


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

    async def get_timeline_by_chat_id(self, chat_id: int, user_id: int):
        msgs_query = (
            select(
                Message.chat_id,
                Message.created_at,
                literal(EventTimelineType.MESSAGE).label("event_type"),
                Message.type.label("message_type"),
                Message.content,
            )
            .join(Chat, Chat.id == Message.chat_id)
            .where(Chat.user_id == user_id)
        )

        analyses_query = (
            select(
                Analys.chat_id,
                Analys.created_at,
                literal(EventTimelineType.ANALYS).label("event_type"),
                literal(None).label("message_type"),
                Analys.content,
            )
            .join(Chat, Chat.id == Analys.chat_id)
            .where(Chat.user_id == user_id)
        )

        timeline_query = union_all(msgs_query, analyses_query).subquery()

        return await self.postgres.execute(
            select(timeline_query)
            .where(timeline_query.columns.chat_id == chat_id)
            .order_by(timeline_query.columns.created_at)
        )

    async def get_chat_by_id(self, chat_id: int, user_id: int):
        return await self.postgres.scalar(
            select(Chat).where(
                and_(Chat.id == chat_id, Chat.user_id == user_id)
            )
        )

    async def get_all_chats(self, params: ChatQueryParams, user_id: int):
        offset = (params.page - 1) * (params.limit)

        sort_column = getattr(Chat, params.sort_by)

        if params.sort_order == SortOrder.ASC:
            sort_order = sort_column.asc()
        else:
            sort_order = sort_column.desc()

        stmt = select(Chat).where(
            Chat.user_id == user_id,
        )

        if params.interlocutor_id:
            stmt = stmt.where(
                Chat.interlocutor_id == params.interlocutor_id
            )

        return await self.postgres.scalars(
            stmt.offset(offset).limit(params.limit).order_by(sort_order)
        )
