from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from uuid import UUID


class PostType(str, Enum):
    article = "article"
    blog = "blog"


# Request model for creating a new post
class PostCreate(BaseModel):
    title: str
    content: str
    post_type: PostType


# Response model for a single post
class PostResponse(BaseModel):
    post_id: UUID
    title: str
    content: str
    post_type: PostType
    created_at: datetime

    class Config:
        from_attributes = True
