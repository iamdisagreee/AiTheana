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
