"""
Anti Gravity — Knowledge Graph Agent

Retrieves subgraphs and answers queries by directly interfacing with Neo4j.
"""

from agents.base import BaseAgent
from config import settings
from database import Neo4jConnection

KG_PROMPT = """
You are the Anti Gravity Knowledge Graph Agent.
Your job is to translate user natural language queries into Cypher queries,
execute them, and summarize the results.
The ontology contains:
Nodes: Theory, Law, Principle, Equation, Particle, Field, Experiment, Researcher
Edges: DERIVES_FROM, PREDICTS, CONTRADICTS, SUPPORTS, OBSERVES, MEASURES
"""

class KnowledgeGraphAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="KnowledgeGraph",
            system_prompt=KG_PROMPT,
            model=settings.DEFAULT_MODEL,
            temperature=0.1,
        )
        self.conn = Neo4jConnection()

    async def execute_query(self, cypher: str):
        """Execute a Cypher query and return raw results."""
        try:
            with self.conn.get_session() as session:
                result = session.run(cypher)
                return [record.data() for record in result]
        except Exception as e:
            return {"error": str(e)}
            
    async def answer_graph_query(self, user_query: str) -> str:
        """
        End-to-end: NL -> Cypher -> Neo4j -> NL Summary
        For MVP, we just demonstrate the LLM capability to parse the question.
        """
        # In a real implementation, we would use function calling here to let the LLM
        # execute `execute_query` multiple times if needed. 
        # For now, we mock the retrieval.
        return await self.execute(
            prompt=f"User asked: {user_query}\n\nDraft a mock response explaining how you would query the graph for this."
        )

    def close(self):
        self.conn.close()
