from datetime import datetime
from enum import StrEnum
from typing import Literal

from app.core.base_schema import CamelCaseModel
from pydantic import Field


class ChatStatus(StrEnum):
    EMPTY = "EMPTY"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    UPLOADING_RAW = "UPLOADING_RAW"
    PREPROCESSING = "PREPROCESSING"
    UPLOADING_PREPROCESSED = "UPLOADING_PREPROCESSED"
    ANALYZING = "ANALYZING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"


class Chat(CamelCaseModel):
    id: int
    interlocutor_id: int | None
    title: str | None
    status: ChatStatus
    original_period_start: datetime | None
    original_period_end: datetime | None
    created_at: datetime
    updated_at: datetime | None


class EventTimelineType(StrEnum):
    MESSAGE = "MESSAGE"
    ANALYS = "ANALYS"


class FileType(StrEnum):
    RAW = "RAW"
    PREPROCESSED = "PREPROCESSED"


class MessageType(StrEnum):
    USER_TEXT = "USER_TEXT"
    AI_TEXT = "AI_TEXT"
    AI_ERROR = "AI_ERROR"


class AddChatResponse(CamelCaseModel):
    chat_id: int


class MessageData(CamelCaseModel):
    type: MessageType
    content: str


class AnalysData(CamelCaseModel):
    content: str


class MessageEvent(CamelCaseModel):
    created_at: datetime
    event_type: Literal[EventTimelineType.MESSAGE]
    data: MessageData


class AnalysEvent(CamelCaseModel):
    created_at: datetime
    event_type: Literal[EventTimelineType.ANALYS]
    data: AnalysData


class EventTimelineResponse(CamelCaseModel):
    chat: Chat
    timeline: list[AnalysEvent | MessageEvent]


class SortBy(StrEnum):
    ID = "id"
    TITLE = "title"
    CREATED_AT = "created_at"


class SortOrder(StrEnum):
    ASC = "asc"
    DESC = "desc"


class ChatQueryParams(CamelCaseModel):
    page: int = Field(default=1, gt=0)
    limit: int = Field(default=10, gt=0)
    sort_by: SortBy = Field(default=SortBy.ID)
    sort_order: SortOrder = Field(default=SortOrder.ASC)
    interlocutor_id: int | None = Field(default=None)


class GetChatsResponse(CamelCaseModel):
    chats: list[Chat]
