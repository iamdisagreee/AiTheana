from app.core.base_schema import CamelCaseModel, User
from pydantic import BaseModel, EmailStr, Field


class RegistrationRequest(CamelCaseModel):
    email: EmailStr
    password: str


class RegistrationConfirm(CamelCaseModel):
    email: EmailStr
    enteredCode: int


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = Field(default="Bearer")
    user: User
