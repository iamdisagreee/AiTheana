from contextlib import asynccontextmanager

from app.modules.auth import router as auth
from app.modules.chats import router as chats
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        # consumer_task = asyncio.create_task(run_consumer())
        yield
        # consumer_task.cancel()
    except Exception:
        pass
    finally:
        pass


app = FastAPI(title="AiTheana", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(auth.router)
v1_router.include_router(chats.router)

app.include_router(v1_router)

app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
