from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter
from slowapi.util import get_remote_address
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, Base
from app.api import auth, assessment, results, programmes


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="StudentPath API",
    description="Personalised career-to-programme guidance engine",
    version="1.0.0",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(assessment.router, prefix="/api/v1/assessment", tags=["Assessment"])
app.include_router(results.router, prefix="/api/v1/results", tags=["Results"])
app.include_router(programmes.router, prefix="/api/v1/programmes", tags=["Programmes"])


@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
