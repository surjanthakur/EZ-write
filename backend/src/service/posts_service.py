import os
import logging
import tempfile
from uuid import UUID
from typing import List

from fastapi import status, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlmodel.ext.asyncio.session import AsyncSession
from playwright.async_api import async_playwright


from ..db.models import Post
from ..db.models import Post
from ..schemas.posts import PostCreate
from ..repository.posts_repo import post_by_id, get_users_posts
from ..utils.pdf_template import pdf_template_structure

logger = logging.getLogger(__name__)


#  Search posts by query
async def search_posts(user_id: UUID, db: AsyncSession) -> List[Post]:
    try:
        posts = await get_users_posts(db=db, user_id=user_id)

        if not posts:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="posts not found"
            )
        return posts

    except SQLAlchemyError as err:
        await db.rollback()
        logger.error(msg=f"db error while searching posts query: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="something went wrong please try again later.",
        )


#  Create a new post
async def create_post(post_data: PostCreate, user_id: UUID, db: AsyncSession) -> dict:
    try:
        new_post = Post(user_id=user_id, **post_data.model_dump())
        db.add(new_post)
        await db.commit()
        await db.refresh(new_post)
        return {"detail": "Post created successfully", "success": True}

    except IntegrityError as err:
        await db.rollback()
        error_msg = str(err.orig)
        if "unique" in error_msg.lower():
            raise HTTPException(status_code=409, detail="Post already exists.")
        elif "foreign key" in error_msg.lower():
            raise HTTPException(
                status_code=400, detail="Referenced resource not found."
            )
        elif "not null" in error_msg.lower():
            raise HTTPException(status_code=400, detail="Missing required field.")
        else:
            logger.exception(f"Unhandled integrity error: {err}")
        raise HTTPException(status_code=400, detail="Data conflict.")

    except SQLAlchemyError as err:
        await db.rollback()
        logger.exception(f"DB error creating post: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong, please try again later.",
        )


# Delete a post by its ID and user ID
async def delete_post_by_id(post_id: UUID, user_id: UUID, db: AsyncSession) -> dict:
    try:
        post = await post_by_id(post_id=post_id, db=db)
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="posts not found"
            )

        if post.user_id != user_id:
            raise PermissionError("Not authorized.")

        await db.delete(post)
        await db.commit()

    except SQLAlchemyError as error:
        await db.rollback()
        logger.error(f"DB error deleting post {post_id}: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong, please try again later.",
        )


# generate pdf for posts
async def generate_pdf(
    post_id: UUID,
    curr_username: str,
    background_tasks: BackgroundTasks,
    db: AsyncSession,
):
    post = await post_by_id(post_id=post_id, db=db)

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found."
        )

    try:
        html_template = pdf_template_structure(
            post_user=curr_username,
            post_content=post.content,
            post_title=post.title,
            post_created_fmt=post.created_at.strftime("%-d-%b-%Y"),
        )

        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
        pdf_path = temp_file.name
        temp_file.close()

        try:
            async with async_playwright() as playwright:
                browser = await playwright.chromium.launch()
                page = await browser.new_page()
                await page.set_content(
                    html=html_template, wait_until="domcontentloaded"
                )
                await page.pdf(path=pdf_path, format="A4", print_background=True)
                await browser.close()
        except Exception:
            os.remove(pdf_path)
            raise

        background_tasks.add_task(os.remove, pdf_path)

        return FileResponse(
            path=pdf_path,
            status_code=200,
            media_type="application/pdf",
            filename=f"{post_id}.pdf",
        )

    except HTTPException:
        raise
    except SQLAlchemyError as err:
        await db.rollback()
        logger.error(f"Database error while generating PDF for post {post_id}: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="A database error occurred. Please try again later.",
        )
    except Exception as err:
        logger.error(f"Unexpected error while generating PDF for post {post_id}: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later.",
        )
