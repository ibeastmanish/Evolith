"""
Anti Gravity — Extraction Agent

Parses raw paper text into structured data and ontology nodes.
"""

from pydantic import BaseModel, Field
from typing import Optional
from agents.base import BaseAgent
from config import settings
from models import Paper

class ExtractedMetadata(BaseModel):
    title: str
    authors: list[str]
    abstract: str
    equations: list[str] = Field(description="List of LaTeX equations found in the text")
    key_concepts: list[str] = Field(description="Key physics concepts discussed")
    references: list[str] = Field(description="Key references mentioned")

EXTRACTION_PROMPT = """
You are the Anti Gravity Extraction Agent.
Your job is to parse academic physics papers into structured metadata.
Extract the title, authors, abstract, all notable mathematical equations (in LaTeX format), key concepts, and key references.
Be precise and thorough.
"""

class ExtractionAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Extraction",
            system_prompt=EXTRACTION_PROMPT,
            model=settings.DEFAULT_MODEL,
            temperature=0.1,
        )

    async def extract_metadata(self, text: str) -> ExtractedMetadata:
        """Extracts structured metadata from raw paper text."""
        # Note: In production, text might be too long. Needs chunking or long-context model.
        # We assume text here is an abstract or a truncated body for the MVP.
        return await self.execute(
            prompt=f"Extract metadata from the following paper text:\n\n{text}",
            response_format=ExtractedMetadata
        )
