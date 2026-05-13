from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    alias_generators,
)


class CamelCaseModel(BaseModel):
    model_config = ConfigDict(
        validate_by_name=True,
        alias_generator=alias_generators.to_camel,
        from_attributes=True,
    )


class TokenPayload(CamelCaseModel):
    id: int = Field(alias="sub")


class User(CamelCaseModel):
    id: int
    email: str
    username: str
    created_at: datetime


class DetailResponse(CamelCaseModel):
    detail: str


# class UserMessage(CamelCaseModel):
#     id: int
#     type: str
#     date: str
#     from_: str = Field(alias="from")
#     text: str

#     model_config = {"populate_by_name": True}


class UserMessage(CamelCaseModel):
    date: datetime
    from_: str = Field(alias="from")
    text: str


class UserChatPreprocessing(CamelCaseModel):
    name: str
    id: int
    messages: list


class UserChatPreprocessed(CamelCaseModel):
    title: str
    interlocutor_id: int
    original_period_start: datetime
    original_period_end: datetime
    messages: list[UserMessage]
