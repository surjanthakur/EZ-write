import logging
import time

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request

from .db.db_connection import create_db_tables
from .router import users_router, posts_router, ai_router


# function connect to db before starting app
async def lifespan(app: FastAPI):
    try:
        # creating db tables
        await create_db_tables()
        logging.info(msg="db connection successfully 👍🏻🎊")
        yield

    # handle all Exception errors
    except Exception as err:
        logging.error(msg=f"Error creating database tables: {err}")
        raise RuntimeError(f"Error creating database tables: {err}")


# creating app
app = FastAPI(lifespan=lifespan, title="Inkforge.ai", version="1.0")

origins = ["http://localhost:5173"]


# cors middleware ------------>
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# logging middleware ------------->
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    logging.info(msg=f"{request.method} {request.url} took {duration:.2f}seconds.🌏")
    return response


# all services routers ---------->
app.include_router(router=users_router.user_router, prefix="/api/v1.0")
app.include_router(router=posts_router.post_router, prefix="/api/v1.0")
app.include_router(router=ai_router.aiRouter, prefix="/api/v1.0")
