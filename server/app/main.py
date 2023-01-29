from fastapi import FastAPI
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import *

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
    # motioncue detection model here (https://www.youtube.com/shorts/obx4XRKQm9o)
    # extractImages(link.url, TEMP_PATH="../temp/")
    df = frame_to_landmark(TEMP_PATH="../temp/")
    model = DanceScribeModel()
    pred = model.predict(df, TEMP_PATH="../temp/")

    print(pred)
    return {
        "urlset": {link.url},
        "pred": str(pred)
    }
