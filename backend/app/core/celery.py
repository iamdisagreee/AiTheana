from app.config import get_settings
from celery import Celery

settings = get_settings()

celery_app = Celery(
    "app",
    broker=settings.redis_connect_celery,
    backend=settings.redis_connect_celery,
)

celery_app.autodiscover_tasks(["app.tasks"])
