import os

# set your credentials in your machine's environment variables
CLIENT_ID = ""
CLIENT_SECRET = ""
REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect/"
try:
    CLIENT_ID = os.environ['SPOTIFY_LEARNING_CLIENT_ID']
    CLIENT_SECRET = os.environ['SPOTIFY_LEARNING_CLIENT_SECRET']
except KeyError as e:
    print("You are missing one of the variables!", e)
