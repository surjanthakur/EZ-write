from ..db.models import User
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select


# get user by email
async def get_user_by_username(username, db: AsyncSession):
    query = await db.exec(select(User).where(User.username == username))
    return query.first()
