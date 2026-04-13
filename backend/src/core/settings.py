from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


ENV_FILE_PATH = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    DB_URL: str
    DB_SSL: bool = True
    CORS_ORIGIN_URL: str
    GOOGLE_API_KEY: str

    REDIS_HOST: str
    REDIS_PORT: int = 6379
    REDIS_USERNAME: str = "default"
    REDIS_PASSWORD: str

    HOST: str = "0.0.0.0"
    PORT: int = 8000
    RELOAD: bool = False
    LOG_LEVEL: str = "info"

    model_config = SettingsConfigDict(
        env_file=ENV_FILE_PATH,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origin_urls(self) -> list[str]:
        # Support one/many origins and normalize trailing slash to prevent exact-match CORS failures.
        raw_origins = [origin.strip() for origin in self.CORS_ORIGIN_URL.split(",")]
        origins: list[str] = []
        for origin in raw_origins:
            if not origin:
                continue
            normalized_origin = origin.rstrip("/")
            if normalized_origin:
                origins.append(normalized_origin)
        return origins


settings = Settings()
