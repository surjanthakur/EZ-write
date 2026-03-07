from uuid import UUID
from ..db.models import Post
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select


# get posts by search query
async def get_posts_by_query(db: AsyncSession, query: str):
    result = await db.exec(
        select(Post).where(Post.post_type == query).order_by(Post.created_at.desc())
    )
    return result.all()


# get posts by post id
async def post_by_id(post_id: UUID, db: AsyncSession):
    query = await db.exec(select(Post).where(Post.post_id == post_id))
    return query.first()
