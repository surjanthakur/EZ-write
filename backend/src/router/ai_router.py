from fastapi import APIRouter, status, Depends, HTTPException
import logging

from ..service.users_service import current_user
from ..db.models import User
from ..service.ai_service import ai_response
from ..schemas.chatbot import ChatRequest

aiRouter = APIRouter(tags=["Chatbot"], prefix="/chatbot")


# api to generate ai response for req
@aiRouter.post("/messages", status_code=status.HTTP_200_OK)
async def ai_chatbot(
    user_data: ChatRequest,
    curr_user: User = Depends(current_user),
):
    try:
        response = await ai_response(
            title=user_data.title,
            content=user_data.context,
            user_input=user_data.user_query,
            post_type=user_data.post_type,
            username=curr_user.username,
        )

        return {"role": "ai", "content": response}
    except Exception as err:
        logging.error(msg=f"Chatbot error: {err}")
        raise HTTPException(status_code=500, detail="AI response error")
