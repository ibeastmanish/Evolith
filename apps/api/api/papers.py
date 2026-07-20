"""
Anti Gravity — Papers API

Endpoints for importing and managing papers.
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
import uuid
from models import Paper
# In a real app we'd map Pydantic <-> SQLAlchemy models. 
# For MVP, we'll store simple records in a SQLite table or just return mocks if the DB isn't fully scaffolded.
# Let's assume a simplified mock flow for the frontend to work immediately.

router = APIRouter()

# --- Mocks for MVP ---
MOCK_PAPERS = [
    {
        "id": "p-1",
        "title": "Quantum Gravity and Holography",
        "authors": ["Maldacena, J."],
        "abstract": "We explore the connection between quantum gravity in anti-de Sitter space and conformal field theories.",
        "status": "indexed",
        "source": "arxiv",
        "imported_at": "2026-07-19T10:00:00Z"
    }
]

class ImportRequest(BaseModel):
    source: str
    url: Optional[str] = None
    doi: Optional[str] = None
    arxiv_id: Optional[str] = None

@router.get("/papers", response_model=List[Paper])
def list_papers(skip: int = 0, limit: int = 50):
    """List all imported papers."""
    return MOCK_PAPERS[skip : skip + limit]

@router.get("/papers/{paper_id}", response_model=Paper)
def get_paper(paper_id: str):
    """Get a specific paper."""
    paper = next((p for p in MOCK_PAPERS if p["id"] == paper_id), None)
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return paper

async def process_paper_background(paper_id: str, req: ImportRequest):
    """Background task to extract metadata, chunk, embed, and index."""
    # MVP: This is where we would call ExtractionAgent, SemanticChunker, and Retriever
    pass

@router.post("/papers/import", response_model=Paper)
def import_paper(req: ImportRequest, background_tasks: BackgroundTasks):
    """Starts the import pipeline for a paper."""
    new_paper = {
        "id": f"p-{uuid.uuid4().hex[:6]}",
        "title": f"Imported from {req.source}",
        "authors": ["Unknown"],
        "abstract": "Processing...",
        "source": req.source,
        "status": "importing",
        "imported_at": "2026-07-19T10:00:00Z"
    }
    MOCK_PAPERS.append(new_paper)
    
    background_tasks.add_task(process_paper_background, new_paper["id"], req)
    
    return new_paper
