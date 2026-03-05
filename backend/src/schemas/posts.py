from pydantic import BaseModel
from datetime import datetime
from enum import Enum


class PostType(str, Enum):
    article = "article"
    blog = "blog"


# Request model for creating a new post
class PostCreate(BaseModel):
    title: str
    content: dict
    post_type: PostType


# Response model for a single post
class PostResponse(BaseModel):
    title: str
    content: dict
    post_type: PostType
    created_at: datetime

    class Config:
        from_attributes = True
