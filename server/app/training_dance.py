# # Training Pipeline for Dance Video
# 
# Complete training pipeline for dance video. (to be converted to .py file later)
# 
# **Workflow:**
# 1. Run video_into_frame script to extract all the frames (optional)
# 2. Frames to landmarks csv using mediapipe written by Harris
# 3. Run K-NN algorithm to cluster the image landmarks and visualize in 2D (dimension reduction)
#    1. Clean the additional data
# 4. LABEL moves using K-NN output as reference
# 5. Run lazyprediction to select the best model (optional)
# 6. Fit a random forest model to classify labels
# 7. Evalute & save

# ## Extract Frames From Video
# 
# Run this only once to get necessary data.

import cv2
import pafy
import os
import shutil
from dotenv import load_dotenv

import numpy as np
import pandas as pd
import itertools
import mediapipe as mp
import pickle
import re


def extractImages(pathIn, TEMP_DIR="temp/"):
    load_dotenv()  # take environment variables from .env.
    pafy.set_api_key(os.getenv("GOOGLE_API"))

    # Make sure unique youtube ID link is correct and stored inside a query parameter
    path_split = pathIn.rsplit("/", 1)

    if re.match("[a-zA-Z0-9]{11}", path_split[1]):
        if "?v=" not in path_split[1]:
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

        try:
            cv2.imwrite(TEMP_DIR + "/frame%d.jpg" % count, image)     # save frame as JPEG file
        except Exception as e:
            break
        count = count + 1


# ## Frames to Landmark


class Functions():

  def __init__(self):
    self.image_dataset = []
    self.mp_pose = mp.solutions.pose
    self.mp_drawing = mp.solutions.drawing_utils 
    self.mp_drawing_styles = mp.solutions.drawing_styles

  def get_final_dataset(self):
    '''
      Write this out to csv
    '''
    return self.image_dataset
    
  def add_images_to_final_dataset(self, path : str, label : str):
    '''
      Name: add_images_to_final_dataset
      Description: Derive landmark information from images in one directory and add their information
      to the final dataset
      Input: 
        path -> full path to image folder
        label -> label/category of images under the image folder
    '''
    
    for image_name in os.listdir(path):
      image_attr = []

      image_path = os.path.join(path, image_name)
      image = cv2.imread(image_path)
      landmark_poses = self.get_landmarks(image)
      image_attr.append(image_name)

      if landmark_poses is not None:
        landmark_array = landmark_poses.landmark
        for landmark_data in landmark_array:
          image_attr.append(landmark_data.x)
          image_attr.append(landmark_data.y)
      else:
        image_attr.extend([None, None])

      image_attr.append(label)
      self.image_dataset.append(image_attr)


  def get_landmarks(self, image) -> list:
    '''
      Name: get_landmarks
      Input: image (returned from cv2.imread)
      Returns: list of landmarks (33 features)
    '''
    with self.mp_pose.Pose(
        static_image_mode=True, min_detection_confidence=0.5, model_complexity=2) as pose:
        results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        # mp_drawing.draw_landmarks(
        #     image,
        #     results.pose_landmarks,
        #     mp_pose.POSE_CONNECTIONS,
        #     landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
        return results.pose_landmarks
        # Print nose landmark.
        # image_hight, image_width, _ = image.shape
        # if results.pose_landmarks:
        #   print(
        #     f'Nose coordinates: ('
        #     f'{results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].x * image_width}, '
        #     f'{results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].y * image_hight})'
        #   )

        # Draw pose landmarks.
        # print(f'Pose landmarks for {image}:')
        # annotated_image = image.copy()

        # mp_drawing.draw_landmarks(
        #     image,
        #     results.pose_landmarks,
        #     mp_pose.POSE_CONNECTIONS,
        #     landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())

        # resize_and_show(annotated_image)

  def get_final_dataset_columns(self, pose_enums_array:list):
      products_join = [pose_enums_array, ["X", "Y"]]
      landmark_columns = ["{}_{}".format(column_name_tuple[0], column_name_tuple[1])
      for column_name_tuple in list(itertools.product(*products_join))]
      final_columns = ["IMAGE"] + landmark_columns + ["LABEL"] 
      return final_columns

def frame_to_landmark(DATA_PATH="./temp/"):
  """
  Take in the temporary image folder path as input and
  return the processed DataFrame (IMAGE_NAME, ... FEATURES..., LABEL)
  """
  Processor = Functions()
  mp_pose = mp.solutions.pose
  mp_drawing = mp.solutions.drawing_utils 
  mp_drawing_styles = mp.solutions.drawing_styles

  # Landmark enums (check data)
  pose_enums_dict = {pose_enum.name: pose_enum.value for pose_enum in mp_pose.PoseLandmark}
  pose_enums_array = list(pose_enums_dict.keys())

  Processor.add_images_to_final_dataset(DATA_PATH, label=np.nan)

  # Putting together final pandas DataFrame
  df = pd.DataFrame(Processor.image_dataset, columns=Processor.get_final_dataset_columns(pose_enums_array))
  print(df.shape)
  return df

# Class for holding the model
class DanceScribeModel(object):
    model = None # where we will keep the model when it's loaded

    @classmethod
    def load_model(self):
        with open('/home/yixin0829/code/dance-scription/server/models/classifier.pkl', 'rb') as fid:
            self.model = pickle.load(fid)

    @classmethod
    def predict(self, df: pd.DataFrame):
        """Take a string text as input and call fake news dector model. Return 0 or 1 based on whether it's fake news (1) or not (0)"""
        self.load_model()

        X = df.iloc[:, 1: -1].to_numpy()
        pred = self.model.predict(X)
        return pred

# For debugging
# df = frame_to_landmark(DATA_PATH="/home/yixin0829/code/dance-scription/server/app/temp")
# model = DanceScribeModel()
# pred = model.predict(df)
# print(pred)


  
