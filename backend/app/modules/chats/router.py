from typing import Annotated

from app.core.base_schema import User
from app.dependecies import get_chat_service, get_current_user
from fastapi import APIRouter, Depends, File, Form, Path, Query, UploadFile

from .schemas import AddChatResponse, ChatQueryParams
from .service import ChatService

router = APIRouter(prefix="/chats", tags=["chats"])


@router.post("/", status_code=202, response_model=AddChatResponse)
async def add_chat(
    file: Annotated[UploadFile, File()],
    ai_text: Annotated[str, Form()],
    current_user: User = Depends(get_current_user),
    chat_service: ChatService = Depends(get_chat_service),
):
    return await chat_service.add_chat(
        file=file, ai_text=ai_text, user=current_user
    )


@router.get("/{chat_id}/stream")
async def stream_status(
    chat_id: Annotated[int, Path()],
    current_user: User = Depends(get_current_user),
    chat_service: ChatService = Depends(get_chat_service),
):
    return await chat_service.stream_status(chat_id=chat_id)


@router.get("/{chat_id}")
async def get_chat_by_id(chat_id: Annotated[int, Path(gt=0)]):
    pass


@router.get("/")
async def get_all_chats(query_params: Annotated[ChatQueryParams, Query()]):
    pass


# @router.delete("/{chat_id}")
# async def delete_chat(chat_id: Annotated[int, Path(gt=0)]):
#     pass
