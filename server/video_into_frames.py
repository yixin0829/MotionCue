import sys
import cv2
import pafy

print(cv2.__version__)

def extractImages(pathIn):
    count = 1
    video = pafy.new(pathIn)
    best = video.getbest(preftype="mp4")
    vidcap = cv2.VideoCapture(best.url)
    success,image = vidcap.read()
    success = True
    while success:
        vidcap.set(cv2.CAP_PROP_POS_MSEC,(count*1000)) 
        success,image = vidcap.read()
        print ('Read a new frame: ', success)
        cv2.imwrite("./temp/frame%d.jpg" % count, image)     # save frame as JPEG file
        count = count + 1

if __name__ == "__main__":
    extractImages("https://www.youtube.com/?v=eXYYTMxB5RA")
