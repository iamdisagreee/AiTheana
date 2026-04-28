from datetime import datetime

from app.database import BaseSchema
from sqlalchemy import (
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .schemas import ChatStatus, FileType, MessageType


class Chat(BaseSchema):
    __tablename__ = "chats"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="cascade"), nullable=False
    )
    interlocutor_id: Mapped[int] = mapped_column(Integer, nullable=True)
    title: Mapped[str] = mapped_column(String, nullable=True)
    status: Mapped[ChatStatus] = mapped_column(
        Enum(ChatStatus), nullable=False
    )
    original_period_start: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    original_period_end: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    user = relationship("User", back_populates="chats")
    files = relationship("File", back_populates="chat")
    messages = relationship("Message", back_populates="chat")
    analyses = relationship("Analys", back_populates="chat")


class File(BaseSchema):
    __tablename__ = "files"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    chat_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("chats.id", ondelete="cascade"), nullable=False
    )
    type: Mapped[FileType] = mapped_column(Enum(FileType), nullable=False)
    filename: Mapped[str] = mapped_column(String, nullable=False)
    storage_path: Mapped[str] = mapped_column(String, nullable=False)
    size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    chat = relationship("Chat", back_populates="files")


class Message(BaseSchema):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    chat_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("chats.id", ondelete="cascade"), nullable=False
    )
    type: Mapped[MessageType] = mapped_column(
        Enum(MessageType), nullable=False
    )
    content: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    chat = relationship("Chat", back_populates="messages")


class Analys(BaseSchema):
    __tablename__ = "analyses"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    chat_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("chats.id", ondelete="cascade"), nullable=False
    )
    content: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    chat = relationship("Chat", back_populates="analyses")
