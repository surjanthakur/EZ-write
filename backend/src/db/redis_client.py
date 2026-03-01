import redis.asyncio
from dotenv import load_dotenv
import os

load_dotenv()

rds_password = os.getenv("REDIS_PASSWORD")
rds_url = os.getenv("REDIS_URL")
rds_port = os.getenv("REDIS_PORT")

redis_client = redis.asyncio.Redis(
    host=rds_url,
    port=int(rds_port),
    decode_responses=True,
    username="default",
    password=rds_password,
)
