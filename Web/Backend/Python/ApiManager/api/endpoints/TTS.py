from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from Core.TTS_wrapper import TTS
from Core.config import receive_voice_request

router = APIRouter()

Text_to_Speach = TTS()

@router.get("/receive-voice")
async def receive_voice(request: receive_voice_request):
    # Extract text from request
    text_to_convert = request.textToConvert

    # Convert text to speech and save the audio file
    path_to_audio = Text_to_Speach.convert_to_speech(text_to_convert)

    # Define an asynchronous generator to stream the file
    async def iter_file():
        with open(path_to_audio, mode="rb") as file_like:
            while chunk := file_like.read(1024):  # Read the file in chunks
                yield chunk

    # Return a StreamingResponse with the audio file
    return StreamingResponse(iter_file(), media_type="audio/wav")