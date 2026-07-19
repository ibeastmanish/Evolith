"""
Anti Gravity — Text Chunker

Chunks raw text into semantic blocks while preserving mathematical context.
"""

from typing import List

class SemanticChunker:
    def __init__(self, chunk_size: int = 1000, overlap: int = 200):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text(self, text: str) -> List[str]:
        """
        Splits text into chunks.
        For MVP, this is a simple naive chunker.
        In production, this should respect LaTeX blocks (\begin{equation}...)
        and paragraph boundaries.
        """
        # MVP: Simple sliding window chunking by characters
        # We will improve this later to use tiktoken or spacy
        chunks = []
        if not text:
            return chunks
            
        start = 0
        text_len = len(text)
        
        while start < text_len:
            end = start + self.chunk_size
            chunks.append(text[start:end])
            if end >= text_len:
                break
            start += (self.chunk_size - self.overlap)
            
        return chunks
