"""
Anti Gravity — Backend Configuration

Central configuration management using pydantic-settings.
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application
    APP_NAME: str = "Anti Gravity"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    
    # Neo4j (Canonical Knowledge Graph)
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "evolith_secret"
    
    # AI / LLM
    OPENROUTER_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    DEFAULT_MODEL: str = "x-ai/grok-4.5"
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    
    # ChromaDB (Vector Store)
    CHROMA_PERSIST_DIR: str = "/tmp/chroma" if __import__("os").environ.get("VERCEL") else "./data/chroma"
    
    # SQLite (Sessions, Projects)
    SQLITE_URL: str = "sqlite:////tmp/antigravity.db" if __import__("os").environ.get("VERCEL") else "sqlite:///./data/antigravity.db"
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]
    
    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
