import sys
import cv2
import pafy
import os
import shutil

print(cv2.__version__)

def extractImages(pathIn):
    # Config temporary directory path for storing video frames
    TEMP_DIR = "server/temp/"

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
        cv2.imwrite(TEMP_DIR + "/frame%d.jpg" % count, image)     # save frame as JPEG file
        count = count + 1

if __name__ == "__main__":
    extractImages("https://www.youtube.com/watch?v=n99xj9pd35g")
