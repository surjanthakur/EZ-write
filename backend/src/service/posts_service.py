from ..schemas.posts import PostCreate, PostResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi import status, HTTPException


async def create_post(post_data: PostCreate, db: AsyncSession):
    pass
