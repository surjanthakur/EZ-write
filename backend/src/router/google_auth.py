from fastapi import APIRouter, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm

from authlib.integrations.base_client import OAuthError
from authlib.oauth2.rfc6749 import OAuth2Token
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
import os

load_dotenv()

oauth = OAuth()

oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    client_kwargs={"scope": "openid email profile"},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    redirect_url="http://localhost:8000/api/auth/google/callback",
)


oauth_router = APIRouter(tags=["oauth authentications"], prefix="/auth")


@oauth_router.get("/google/login")
async def login_google(req: Request):
    redirect_url = req.url_for("auth")
    return await oauth.google.authorize_redirect(req, redirect_url)
