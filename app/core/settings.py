from pydantic import BaseSettings, HttpUrl


class Settings(BaseSettings):
    ALLOWED_HOSTS: list[str]
    CORS_ORIGIN_WHITELIST: list[str]
    DEBUG: bool = False
    SECRET_KEY: str
    # DIR
    BOLETINES_DIR: str
    DOWNLOADS_DIR: str
    # URL
    DIGEPI_URL: HttpUrl

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
