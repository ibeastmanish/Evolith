"""
Anti Gravity — Vector Retriever

Interfaces with ChromaDB to store and retrieve chunks.
"""

from typing import List, Dict, Any
from database import chroma_client
from pipeline.embedder import Embedder

class Retriever:
    def __init__(self, collection_name: str = "physics_papers"):
        self.collection = chroma_client.get_or_create_collection(name=collection_name)
        self.embedder = Embedder()

    async def index_chunks(self, paper_id: str, chunks: List[str], metadata: Dict[str, Any]):
        """Embeds and indexes chunks into ChromaDB."""
        if not chunks:
            return

        embeddings = await self.embedder.embed_texts(chunks)
        
        ids = [f"{paper_id}_chunk_{i}" for i in range(len(chunks))]
        metadatas = [
            {
                "paper_id": paper_id,
                "chunk_index": i,
                **metadata
            }
            for i in range(len(chunks))
        ]

        # ChromaDB requires synchronous calls for its current async client state in MVP
        self.collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=chunks,
            metadatas=metadatas
        )

    async def search(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        """Searches ChromaDB for relevant chunks."""
        query_embedding = await self.embedder.embed_query(query)
        
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        
        formatted_results = []
        if results and results["documents"]:
            for i in range(len(results["documents"][0])):
                formatted_results.append({
                    "id": results["ids"][0][i],
                    "text": results["documents"][0][i],
                    "metadata": results["metadatas"][0][i] if results["metadatas"] else {},
                    "distance": results["distances"][0][i] if results["distances"] else 0.0
                })
                
        return formatted_results
