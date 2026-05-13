import redis
import redis.asyncio as aioredis

from ..config import get_settings

settings = get_settings()
redis_client = aioredis.from_url(
    settings.redis_connect_email, decode_responses=True
)

redis_client_celery = redis.Redis.from_url(
    settings.redis_connect_celery, decode_responses=True
)
