import sys
import cv2
import pafy
import os
import shutil
import re

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.
pafy.set_api_key(os.getenv("GOOGLE_API"))

print(cv2.__version__)

def extractImages(pathIn):
    # Config temporary directory path for storing video frames
    TEMP_DIR = "temp/"

    # Replace youtu.be with youtube.com
    pathIn = pathIn.replace("youtu.be", "youtube.com")
    if "?v=" in pathIn:
        # Remove query parameters not related to ?v=
        pathIn = pathIn.rsplit("&", 1)[0]
    else:
        # Remove existing query parameters
        pathIn = pathIn.split("?", 1)[0]
        path_split = pathIn.rsplit("/", 1)


        # Make sure unique youtube ID link is stored inside a query parameter
        if re.match("[a-zA-Z0-9_-]{11}", path_split[1]):
            # if "?v=" not in path_split[1]:
            pathIn = path_split[0] + "/?v=" + path_split[1]
        else:
            print("Youtube Link Incorrect")
            return
    
    count = 1
    video = pafy.new(pathIn)

    # Log metadata from video (pafy object)
    print(f"Video title: {video.title}")
    print(f"Video length in seconds: {video.length}")
    print(f"Video category: {video.category}")
    print(f"Video keywords: {video.keywords}")

    best = video.getbest(preftype="mp4")
    vidcap = cv2.VideoCapture(best.url)
    success, image = vidcap.read()
    print(f"Successfully read video metadata from the link. Start capturing frames.")

    # Create temp/ directory for storage
    try:
        os.mkdir(TEMP_DIR)
    except FileExistsError:
        print(f"FileExistsError: Temporary directory already exists. Removing the directory beofre creating a new one.")
        shutil.rmtree(TEMP_DIR)	
        os.mkdir(TEMP_DIR)

    success = True
    while success:
        vidcap.set(cv2.CAP_PROP_POS_MSEC,(count*1000)) 
        success,image = vidcap.read()
        print (f'Read a new frame {count}: ', success)
        if not success:
            break
        cv2.imwrite(TEMP_DIR + "/frame%d.jpg" % count, image)     # save frame as JPEG file
        count = count + 1

if __name__ == "__main__":
    extractImages("https://www.youtube.com/watch?v=Xf7Iw-iL53g")
