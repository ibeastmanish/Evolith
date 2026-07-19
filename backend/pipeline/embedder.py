"""
Anti Gravity — Embedder

Generates vector embeddings using OpenAI.
"""

from openai import AsyncOpenAI
from typing import List
from config import settings

class Embedder:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.EMBEDDING_MODEL

    async def embed_texts(self, texts: List[str]) -> List[List[float]]:
        """Generates embeddings for a list of texts."""
        if not texts:
            return []
            
        response = await self.client.embeddings.create(
            input=texts,
            model=self.model
        )
        return [data.embedding for data in response.data]

    async def embed_query(self, query: str) -> List[float]:
        """Generates embedding for a single query."""
        response = await self.client.embeddings.create(
            input=query,
            model=self.model
        )
        return response.data[0].embedding
