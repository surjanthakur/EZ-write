from fastapi import APIRouter, Depends, status, HTTPException
from db.db_connection import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from ..schemas.posts import PostCreate, PostResponse
from ..service.posts_service import create_post

post_router = APIRouter(prefix="/posts", tags=["posts"])


@post_router.get("/all", status_code=status.HTTP_200_OK)
async def get_all_posts(session_db: AsyncSession = Depends(get_session)):
    pass


# create post
@post_router.post("/newStory", status_code=status.HTTP_201_CREATED)
async def create_new_post(
    req_form: PostCreate, session_db: AsyncSession = Depends(get_session)
):
    return await create_post(post_data=req_form, db=session_db)
