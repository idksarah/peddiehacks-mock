import os
from pydantic import BaseModel

#For receive-voice api
class receive_voice_request(BaseModel):
    username: str
    password: str
    textToConvert: str

