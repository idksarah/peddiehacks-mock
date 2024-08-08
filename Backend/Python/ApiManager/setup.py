import subprocess
import sys

def check():
    try:
        import fastapi
    
    except ModuleNotFoundError:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "fastapi"])
        except subprocess.CalledProcessError as e:
            print(f"An error occurred while trying to install fastapi: {e}")
            
    
    try:
        import pydantic
    
    except ModuleNotFoundError:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "pydantic"])
        except subprocess.CalledProcessError as e:
            print(f"An error occurred while trying to install pydantic: {e}")