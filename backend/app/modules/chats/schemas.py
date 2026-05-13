from enum import StrEnum

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


class FileType(StrEnum):
    RAW = "RAW"
    PREPROCESSED = "PREPROCESSED"


class MessageType(StrEnum):
    USER_TEXT = "USER_TEXT"
    AI_TEXT = "AI_TEXT"
    AI_ERROR = "AI_ERROR"


class AddChatResponse(CamelCaseModel):
    chat_id: int


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
    interlocutorId: int | None = Field(default=None)
    groupByinterlocutorId: bool = Field(default=False)
