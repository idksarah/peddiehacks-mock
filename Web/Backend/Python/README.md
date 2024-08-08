# Python Backend

### Python commands to get required modules

* pip install TTS
* pip install "fastapi[standard]"
* pip install pydantic
* pip install 'uvicorn[standard]'


### Command to execute
* python -m uvicon Base:app --reload

### Current api endpoints:

/api/receive-voice
_Converts a string of text to a audio file speacking the text_

Params:  
Example  
```json
{
    "username":"str",
    "password": "str",
    "textToConvert": "str"
}
```
>Note: Username and password fields are required but currntly are not implemented

Returns:  
Stream of a mp4