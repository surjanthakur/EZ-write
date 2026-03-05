from pydantic import BaseModel
from datetime import datetime


# Request model for creating a new post
class PostCreate(BaseModel):
    title: str
    content: dict
    post_type: str


# Response model for a single post
class PostResponse(BaseModel):
    title: str
    content: dict
    post_type: str
    created_at: datetime

    class Config:
        from_attributes = True
