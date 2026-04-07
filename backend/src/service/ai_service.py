from google import genai
from google.genai import types

from fastapi import status, HTTPException
from dotenv import load_dotenv
import os
import logging

from ..utils.prompts import chatbot_prompt

load_dotenv()

google_client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY"),
    vertexai=False,
)


async def ai_stream_response(
    user_input: str, username: str, content: str, title: str, post_type: str
):
    try:

        prompt = chatbot_prompt(
            curr_user=username,
            input_query=user_input,
            title=title,
            content=content,
            post_type=post_type,
        )

        response = await google_client.aio.models.generate_content(
            model="gemini-2.5-flash",
            contents=types.Content(
                role="user", parts=types.Part.from_text(text=user_input)
            ),
            config=types.GenerateContentConfig(
                thinking_config=types.ThinkingConfig(thinking_budget=1024),
                system_instruction=prompt,
                temperature=0.1,
            ),
        )
        return response.text
    except Exception as err:
        logging.error(msg=f"error while generating response: {err}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="something went wrong !",
        )
