from app.config import get_settings
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

settings = get_settings()


class BaseSchema(DeclarativeBase):
    pass


sync_engine = create_engine(url=settings.postgres_connect_sync, echo=False)
async_engine = create_async_engine(
    url=settings.postgres_connect_async, echo=False
)

async_session = async_sessionmaker(
    bind=async_engine, expire_on_commit=False
)
