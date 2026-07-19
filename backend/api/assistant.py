"""
Anti Gravity — Assistant API

Endpoints for the AI Assistant (Chat).
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from models import AIResponse, Explainability
from agents.orchestrator import OrchestratorAgent

router = APIRouter()
orchestrator = OrchestratorAgent()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    mode: str = "research" # "research" or "discovery"

@router.post("/assistant/chat", response_model=AIResponse)
async def chat(req: ChatRequest):
    """
    Main entry point for the AI assistant.
    Uses the Orchestrator to determine intent, then delegates.
    """
    user_msg = req.messages[-1].content
    
    # 1. Orchestrate
    route = await orchestrator.route_request(user_msg)
    
    # 2. RAG / Retrieval (Mocked for MVP)
    # If route.intent == "research", we'd call Retriever
    # If route.intent == "discovery", we'd call Graph
    
    # 3. Generate response (Mocked for MVP)
    return AIResponse(
        answer=f"Based on your query regarding {', '.join(route.entities) if route.entities else 'this topic'}, the orchestrator identified your intent as '{route.intent}'. In a full implementation, the Research/Discovery agents would return a synthesized response here with provenance.",
        mode=route.intent if route.intent in ["research", "discovery"] else req.mode,
        explainability=Explainability(
            reasoning_summary=f"Orchestrator routed request as '{route.intent}' based on entities: {route.entities}",
            confidence=route.confidence,
            verification_status="unverified"
        )
    )
