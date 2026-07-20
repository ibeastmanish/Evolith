"""
Anti Gravity — Verification Agent

Cross-checks facts against the Knowledge Graph and RAG pipeline.
"""

from pydantic import BaseModel, Field
from typing import List
from agents.base import BaseAgent
from config import settings

class VerificationResult(BaseModel):
    is_verified: bool
    confidence: float
    evidence: List[str]
    contradictions: List[str]
    reasoning: str

VERIFICATION_PROMPT = """
You are the Anti Gravity Verification Agent.
Your job is to take a claim and verify it against provided evidence.
You must return a structured verification result.
"""

class VerificationAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Verification",
            system_prompt=VERIFICATION_PROMPT,
            model=settings.DEFAULT_MODEL,
            temperature=0.0,
        )

    async def verify_claim(self, claim: str, evidence_context: str) -> VerificationResult:
        """Verifies a claim against evidence context."""
        prompt = f"Claim: {claim}\n\nEvidence Context:\n{evidence_context}"
        return await self.execute(
            prompt=prompt,
            response_format=VerificationResult
        )
