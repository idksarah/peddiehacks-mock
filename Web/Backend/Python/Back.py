#Warning Takes ages to load
#Text to speach
from TTS.utils.manage import ModelManager
from TTS.utils.synthesizer import Synthesizer

#command line
import subprocess

#api
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel



######Text to speach######

class TTS():
    #Private method to find the TTS path.
    #Param: None
    #Return:Path to package
    def _get_TTS_path(self):
        try:
            result = subprocess.run(
                ["pip", "show", "TTS"],
                capture_output=True,
                text=True,
                check=True 
            )
        except subprocess.CalledProcessError as e:
            raise SystemError(e.stderr)
        except FileNotFoundError:
            #todo: add implementaion for python -m
            raise EnvironmentError("Error: 'pip' command not found. Ensure pip is installed and available in PATH.")
        except Exception as e:
            raise FileNotFoundError(e)
        
        #obtain file path
        output_lines = result.stdout.splitlines()
        output_dict = {}
        for line in output_lines:
            # Split line into key-value pair
            if ':' in line:
                key, value = line.split(':', 1)
                output_dict[key.strip()] = value.strip()
        
        try:
            return output_dict["Location"]+"/TTS"
        except:
            raise ValueError("Parsing no worky")
    
    def __init__(self):
        #Get path and use manager
        path = self._get_TTS_path()+"/.models.json"
        model_manager = ModelManager(path)
        
        #Setup Synthesizer and if its not downloaded then download
        model_path, config_path, model_item = model_manager.download_model("tts_models/en/ljspeech/tacotron2-DDC")
        voc_path, voc_config_path, _ = model_manager.download_model(model_item["default_vocoder"])
        self.syn = Synthesizer(
        tts_checkpoint=model_path,
        tts_config_path=config_path,
        vocoder_checkpoint=voc_path,
        vocoder_config=voc_config_path
        )
        
    #Converts text to a audio file
    #Inputs: text(string)
    #Output: relative path to audio file(string)
    def convert_to_speech(self,text):
        outputs = self.syn.tts(text)
        self.syn.save_wav(outputs, "audio/audio.wav")
        return "audio/audio.wav"
        

    
    
    
######Api Manager######

#Text to speach Json class
class receive_voice_request(BaseModel):
    username:str
    password:str
    textToConvert:str

#init api
app = FastAPI()

#init Text to speach
Text_to_Speach = TTS() 

#todo: implement json parser
@app.get("/receive-voice")
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
