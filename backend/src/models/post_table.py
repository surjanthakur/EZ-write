from sqlmodel import SQLModel, Relationship
from uuid import UUID
import uuid
from datetime import datetime
from pydantic import Field, field_validator
from .user_table import User
from typing import Optional


class Post(SQLModel, table=True):
    post_id: UUID = Field(default_factory=lambda: uuid.uuid4(), primary_key=True)
    user_id: UUID = Field(
        foreign_key="user.user_id",
        nullable=False,
        unique=True,
        ondelete="CASCADE",
    )
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=10, max_length=5000)
    content: str = Field(..., min_length=10)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    post_type: str
    owner: Optional["User"] = Relationship(
        back_populates="posts",
    )
