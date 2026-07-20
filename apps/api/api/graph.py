"""
Anti Gravity — Knowledge Graph API

Endpoints for querying the canonical physics knowledge graph.
"""

from fastapi import APIRouter, HTTPException
from knowledge_engine.neo4j_client import Neo4jClient

router = APIRouter(prefix="/graph", tags=["graph"])

@router.get("/timeline")
def get_timeline(year: int):
    """Get the state of the graph at a specific year using the Knowledge Engine temporal queries."""
    client = Neo4jClient()
    try:
        universe = client.get_universe_at_year(year)
        
        # Map the Neo4j node structure to the frontend format
        nodes = []
        for n in universe["nodes"]:
            nodes.append({
                "id": n.get("id"),
                "label": n.get("label", n.get("id")),
                "group": n.get("type", "unknown")
            })
            
        return {
            "year": year,
            "nodes": nodes,
            "edges": universe["edges"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        client.close()
