"""
Anti Gravity — Orchestrator Agent

Routes user requests to the appropriate specialized agent pipeline.
"""

from pydantic import BaseModel
from typing import Literal
from agents.base import BaseAgent
from config import settings

class RouteResponse(BaseModel):
    intent: Literal["research", "discovery", "import", "graph_query", "unknown"]
    entities: list[str]
    confidence: float

ORCHESTRATOR_PROMPT = """
You are the Anti Gravity Orchestrator. 
Your job is to route the user's request to the correct subsystem.

Options:
- research: The user wants to know about established physics facts (requires RAG retrieval).
- discovery: The user wants to explore speculative connections or generate hypotheses.
- import: The user wants to import a paper or dataset.
- graph_query: The user wants to know about the state of the knowledge graph itself (e.g. "What theories do we have?").
- unknown: Cannot determine intent.

Extract any key entities (e.g., "String Theory", "Hawking radiation").
"""

class OrchestratorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Orchestrator",
            system_prompt=ORCHESTRATOR_PROMPT,
            model=settings.DEFAULT_MODEL,
            temperature=0.0, # Highly deterministic
        )

    async def route_request(self, user_input: str) -> RouteResponse:
        """Determines the intent of the user's request."""
        return await self.execute(
            prompt=user_input,
            response_format=RouteResponse
        )
