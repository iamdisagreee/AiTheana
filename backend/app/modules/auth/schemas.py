from app.core.base_schema import CamelCaseModel, User
from pydantic import BaseModel, EmailStr, Field


class RegistrationRequest(CamelCaseModel):
    email: EmailStr


class RegistrationConfirm(CamelCaseModel):
    email: EmailStr
    password: str
    enteredCode: int


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = Field(default="Bearer")
    user: User
