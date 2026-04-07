from pydantic import BaseModel


class ChatRequest(BaseModel):
    title: str
    post_type: str
    context: str
    user_query: str
