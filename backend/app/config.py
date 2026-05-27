from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    s3_access_key: str | None = None
    s3_secret_key: str | None = None
    s3_endpoint_url: str | None = None
    s3_bucket_name: str | None = None
    postgres_connect_async: str | None = None
    postgres_connect_sync: str | None = None
    redis_connect_email: str | None = None
    redis_connect_celery: str | None = None
    gigachat_client_id: str | None = None
    gigachat_client_secret: str | None = None
    mail_user: str | None = None
    mail_password: str | None = None
    smtp_server: str | None = None
    smtp_port: str | None = None
    jwt_access_secret: str | None = None
    jwt_refresh_secret: str | None = None
    jwt_algorithm: str | None = None
    access_token_expire_minutes: int | None = None
    refresh_token_expire_days: int | None = None
    deepseek_key: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


@lru_cache
def get_settings():
    return Settings()


# print(get_settings())
