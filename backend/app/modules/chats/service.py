import asyncio
import json

import redis.asyncio as aioredis
from app.config import get_settings
from app.core.base_schema import User
from app.core.file_service import (
    check_file_content_type,
    check_file_extension,
    check_file_sctructure,
    check_file_size,
)
from app.tasks.tasks import processing_chat_task
from fastapi import HTTPException, UploadFile
from fastapi.responses import StreamingResponse

from .repository import ChatRepository
from .schemas import (
    AddChatResponse,
    AnalysData,
    AnalysEvent,
    ChatStatus,
    EventTimelineResponse,
    EventTimelineType,
    MessageData,
    MessageEvent,
    MessageType,
)

settings = get_settings()


class ChatService:
    def __init__(self, repo: ChatRepository):
        self.repo = repo

    async def add_chat(self, file: UploadFile, ai_text: str, user: User):
        chat = await self.repo.add_chat(
            user_id=user.id, status=ChatStatus.EMPTY
        )
        await self.repo.add_message(
            chat_id=chat.id, type=MessageType.AI_TEXT, content=ai_text
        )

        raw_bytes = await file.read()
        try:
            check_file_extension(filename=file.filename)
            check_file_content_type(content_type=file.content_type)
            check_file_size(file_size=file.size)
            check_file_sctructure(raw_bytes=raw_bytes)
        except HTTPException as e:
            await self.repo.add_message(
                chat_id=chat.id,
                type=MessageType.AI_ERROR,
                content=e.detail,
            )
            raise

        # print(file, file.filename, file.content_type)
        # print(raw_bytes)

        processing_chat_task.delay(
            chat_id=chat.id, raw_bytes=raw_bytes, username=user.username
        )

        return AddChatResponse(chat_id=chat.id)

    @staticmethod
    async def event_generator(chat_id: int):
        redis = aioredis.from_url(
            settings.redis_connect_celery, decode_responses=True
        )
        pubsub = redis.pubsub()
        await pubsub.subscribe(f"chat:{chat_id}")
        try:
            async for message in pubsub.listen():
                # await asyncio.sleep(1)
                if message["type"] == "message":
                    data = message["data"].decode()
                    yield data
                    status = json.loads(data).get("status")
                    if status in (
                        "COMPLETED",
                        "CANCELLED",
                        "VALIDATION_ERROR",
                    ):
                        break
        finally:
            await pubsub.unsubscribe(f"chat:{chat_id}")
            await pubsub.close()
            await redis.close()

    async def stream_status(self, chat_id: int):
        return StreamingResponse(
            self.event_generator(chat_id=chat_id),
            media_type="text/event-stream",
        )

    async def get_chat_by_id(self, chat_id: int):
        raw_chat = await self.repo.get_chat_by_id(chat_id=chat_id)
        timeline = []
        for msg in raw_chat.mappings():
            match msg.event_type:
                case EventTimelineType.MESSAGE:
                    timeline.append(
                        MessageEvent(
                            event_id=msg["event_id"],
                            created_at=msg["created_at"],
                            event_type=msg["event_type"],
                            data=MessageData(
                                type=msg["message_type"],
                                content=msg["content"],
                            ),
                        )
                    )
                case EventTimelineType.ANALYS:
                    timeline.append(
                        AnalysEvent(
                            event_id=msg["event_id"],
                            created_at=msg["created_at"],
                            event_type=msg["event_type"],
                            data=AnalysData(
                                content=msg["content"],
                            ),
                        )
                    )

        return EventTimelineResponse(id=chat_id, timeline=timeline)
