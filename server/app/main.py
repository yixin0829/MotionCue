from fastapi import FastAPI
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import *
from dotenv import load_dotenv
import os
import openai

video_dict = {"https://www.youtube.com/shorts/jqU8_8v1ot4": ['Ready', 'Left Kick', 'Cover Face', 'Ready', 
    'Chicken Arms', 'Ready', 'Chicken Arms', 'Ready', 
    'Ready', 'Ready', 'Ready', 'Ready', 'Ready', 'Left Kick'],
    "https://www.youtube.com/watch?v=lxgS5TTMMBk":
    ['Chicken Arms', 'Strong Pose', 'Strong Pose', 'Chicken Arms', 'Chicken Arms', 'Ready']
    }
    
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]


class Link(BaseModel):
    url: str
    class Config:
        schema_extra = {
            "example": {
                "url": "https://www.youtube.com/shorts/obx4XRKQm9o"
            }
        }


class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Uvicorn running on http://127.0.0.1:8000


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
async def read_item(item_id: str, q: Union[str, None] = None):

    return {"item_id": {item_id}}


@app.post("/youtube_url/")
async def add_url(link: Link):

    if not os.path.exists("../temp"):
        os.makedirs("../temp/")

    # # motioncue detection model here (https://www.youtube.com/shorts/obx4XRKQm9o)
    # extractImages(link.url, TEMP_PATH="../temp/")

    # df = frame_to_landmark(TEMP_PATH="../temp/")
    # model = DanceScribeModel()
    # pred = model.predict(df, TEMP_PATH="../temp/")
    # print(pred)
    # return {"urlset": {link.url}, "pred": pred}

    return {
        "urlset": "fawefawefwef",
        "pred": video_dict["https://www.youtube.com/watch?v=lxgS5TTMMBk"]
    }


@app.get("/generate")
async def generate(prompt: str):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="The given array below contains information of motions made by a human doing a tik tok dance. Each element in the array represents the state of the human each second in terms of a motion. Provide a concise set of steps to describe the tik tok dance through a progression of motions.\nArray:\n" + prompt,
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    return {
        "message": response["choices"][0]["text"]
    }
