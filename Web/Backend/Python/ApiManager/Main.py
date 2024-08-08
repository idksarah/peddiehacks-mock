from fastapi import FastAPI
from api.endpoints.TTS import router as api_endpoints

app = FastAPI()

app.include_router(api_endpoints, prefix="/api")