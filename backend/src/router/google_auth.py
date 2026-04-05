from fastapi import APIRouter, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm

from authlib.integrations.base_client import OAuthError
from authlib.oauth2.rfc6749 import OAuth2Token
from authlib.integrations.starlette_client import OAuth

from typing import Annotated
from dotenv import load_dotenv
import os

load_dotenv()

oauth = OAuth()

oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    access_token_url="https://oauth2.googleapis.com/token",
    client_kwargs={"scope": "openid email profile"},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
)


google_client_id = os.getenv("GOOGLE_CLIENT_ID")
google_client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
google_redirect_url = os.getenv("GOOGLE_REDIRECT_URL")
frontend_redirect_url = ""


oauth_router = APIRouter(tags=["oauth authentications"], prefix="/auth")


@oauth_router.get("/google/login")
async def login_google(req: Request):
    redirect_url = "https://accounts.google.com/o/oauth2/v2/auth"
    return await oauth.google.authorize_redirect()


@oauth_router.get("/google/callback")
async def google_callback(req: Request):
    pass
