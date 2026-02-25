from fastapi import APIRouter, Depends, status, HTTPException
from db.db_connection import get_session
from sqlmodel.ext.asyncio.session import AsyncSession

post_router = APIRouter(prefix="/posts", tags=["posts"])


# TODO: Implement the logic to fetch all posts from the database
@post_router.get("/all", status_code=status.HTTP_200_OK)
async def get_all_posts(session_db: AsyncSession = Depends(get_session)):
    pass
