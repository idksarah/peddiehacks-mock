from fastapi import APIRouter
from .TTS import router as tts_router

router = APIRouter()

router.include_router(tts_router)