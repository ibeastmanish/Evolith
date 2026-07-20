"""
Anti Gravity — Hypothesis API

Endpoints for generating and listing hypotheses.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from models import Hypothesis
from agents.hypothesis import HypothesisAgent

router = APIRouter(prefix="/hypothesis", tags=["hypothesis"])
hypothesis_agent = HypothesisAgent()

# Mock storage
MOCK_HYPOTHESES: List[Hypothesis] = []

class GenerateRequest(BaseModel):
    objective: str

@router.post("/generate", response_model=Hypothesis)
async def generate(req: GenerateRequest):
    """Generates a new hypothesis."""
    # MVP: Mock context
    graph_context = "Node A connected to Node B."
    
    hypothesis = await hypothesis_agent.generate_hypothesis(req.objective, graph_context)
    MOCK_HYPOTHESES.append(hypothesis)
    return hypothesis

@router.get("/", response_model=List[Hypothesis])
def list_hypotheses():
    """List all generated hypotheses."""
    return MOCK_HYPOTHESES
