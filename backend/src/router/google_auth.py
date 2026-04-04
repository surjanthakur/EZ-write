from fastapi import APIRouter, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
import os

load_dotenv()

google_client_id = os.getenv("GOOGLE_CLIENT_ID")
google_client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
google_redirect_url = os.getenv("GOOGLE_REDIRECT_URL")
frontend_redirect_url = ""


oauth_router = APIRouter(tags=["oauth authentications"], prefix="/auth")
