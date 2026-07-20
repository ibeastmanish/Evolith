"""
Anti Gravity — Hypothesis Agent

Generates evidence-backed hypotheses using Discovery Mode.
"""

from agents.base import BaseAgent
from config import settings
from models import Hypothesis, DiscoveryScore
import uuid

HYPOTHESIS_PROMPT = """
You are the Anti Gravity Hypothesis Agent.
Your job is to generate speculative, testable physics hypotheses based on a user objective
and context from the knowledge graph.
You must formulate the output according to the Hypothesis schema, generating a 9-metric Discovery Score.
"""

class HypothesisAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Hypothesis",
            system_prompt=HYPOTHESIS_PROMPT,
            model=settings.DEFAULT_MODEL,
            temperature=0.7, # Higher temperature for discovery
        )

    async def generate_hypothesis(self, objective: str, graph_context: str) -> Hypothesis:
        """Generates a structured hypothesis."""
        
        # In MVP we'll mock the complex Hypothesis generation to save tokens/time,
        # but in production we'd use response_format=Hypothesis (which requires careful prompt engineering
        # due to its nested complexity).
        
        return Hypothesis(
            id=f"hyp-{uuid.uuid4().hex[:6]}",
            objective=objective,
            observed_pattern="Anomalous correlation between X and Y in the graph.",
            candidate_explanation="X and Y might be unified under a higher-dimensional framework.",
            competing_explanations=["Measurement error", "Hidden variable Z"],
            missing_evidence=["Experimental confirmation at high energies"],
            recommended_experiments=["Collide particles at 100 TeV"],
            discovery_score=DiscoveryScore(
                novelty=0.8,
                impact=0.9,
                evidence=0.4, # Speculative
                risk=0.9,
                confidence=0.3,
                testability=0.6,
                consistency=0.7,
                research_gap=0.85,
                citation_coverage=0.2
            )
        )
