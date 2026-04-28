from app.core.base_schema import DetailResponse, User
from app.dependecies import get_auth_service, get_current_user
from app.modules.auth.service import AuthService
from fastapi import APIRouter, Cookie, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm

from .schemas import (
    RegistrationConfirm,
    RegistrationRequest,
    TokenResponse,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/registration/request", response_model=DetailResponse)
async def registration_request(
    body: RegistrationRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.registration_request(email=body.email)


@router.post("/registration/confirm", response_model=TokenResponse)
async def registration_confirm(
    response: Response,
    body: RegistrationConfirm,
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.registration_confirm(
        email=body.email,
        password=body.password,
        entered_code=body.enteredCode,
        response=response,
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.login(
        response=response,
        email=form_data.username,
        password=form_data.password,
    )


@router.post("/logout", response_model=DetailResponse)
async def logout(
    response: Response,
    current_user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.logout(response=response, user=current_user)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    response: Response,
    refresh_token: str | None = Cookie(None),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.refresh(
        response=response, refresh_token=refresh_token
    )
