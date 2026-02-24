from sqlmodel import SQLModel, Relationship
import uuid
from uuid import UUID
from datetime import datetime
from pydantic import Field, field_validator
from .post_table import Post
from typing import List, Optional


class User(SQLModel, table=True):
    """
    User model representing a user in the system.
    """

    user_id: UUID = Field(default_factory=lambda: uuid.uuid4(), primary_key=True)
    username: str = Field(unique=True, index=True, min_length=3, max_length=50)
    email: str = Field(unique=True, index=True, min_length=5, max_length=255)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    posts: Optional[List["Post"]] = Relationship(back_populates="owner")

    @field_validator("email")
    @classmethod
    def validate_email(cls, value):
        if "@" not in value:
            raise ValueError("Invalid email address")
        return value
