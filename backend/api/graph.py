"""
Anti Gravity — Knowledge Graph API

Endpoints for querying the canonical physics knowledge graph.
"""

from fastapi import APIRouter, HTTPException
from database import Neo4jConnection

router = APIRouter(prefix="/graph", tags=["graph"])

@router.get("/search")
def search_graph(q: str):
    """Search for physics entities by name."""
    conn = Neo4jConnection()
    query = """
    MATCH (n)
    WHERE toLower(n.name) CONTAINS toLower($q)
    RETURN n.id as id, n.name as name, labels(n)[0] as type
    LIMIT 10
    """
    try:
        with conn.get_session() as session:
            result = session.run(query, q=q)
            results = [{"id": record["id"], "name": record["name"], "type": record["type"]} for record in result]
            return {"results": results}
    finally:
        conn.close()

@router.get("/node/{node_id}")
def get_node(node_id: str):
    """Get the full metadata of a node."""
    conn = Neo4jConnection()
    query = """
    MATCH (n {id: $node_id})
    RETURN properties(n) as props, labels(n)[0] as type
    """
    try:
        with conn.get_session() as session:
            result = session.run(query, node_id=node_id).single()
            if not result:
                raise HTTPException(status_code=404, detail="Node not found")
            return {"type": result["type"], "properties": result["props"]}
    finally:
        conn.close()

@router.get("/neighbors/{node_id}")
def get_neighbors(node_id: str):
    """Get the 1-hop neighborhood for a node."""
    conn = Neo4jConnection()
    query = """
    MATCH (n {id: $node_id})-[r]-(m)
    RETURN 
        n.id as source_id, 
        n.name as source_name,
        labels(n)[0] as source_type,
        m.id as target_id, 
        m.name as target_name, 
        labels(m)[0] as target_type,
        type(r) as relationship_type, 
        properties(r) as edge_props
    """
    try:
        with conn.get_session() as session:
            result = session.run(query, node_id=node_id)
            nodes = {}
            edges = []
            
            # Note: For MVP we use 'name' as label if 'name' exists, else 'id'
            for record in result:
                source_id = record["source_id"]
                target_id = record["target_id"]
                
                if source_id not in nodes:
                    nodes[source_id] = {"id": source_id, "label": record["source_name"], "group": record["source_type"]}
                if target_id not in nodes:
                    nodes[target_id] = {"id": target_id, "label": record["target_name"], "group": record["target_type"]}
                
                edges.append({
                    "source": source_id,
                    "target": target_id,
                    "type": record["relationship_type"],
                    **record["edge_props"]
                })
                
            return {"nodes": list(nodes.values()), "edges": edges}
    finally:
        conn.close()

@router.get("/timeline")
def get_timeline(year: int):
    """Get the state of the graph at a specific year."""
    conn = Neo4jConnection()
    # Simplified logic for MVP: just return 100 edges
    query = """
    MATCH (n)-[r]->(m)
    RETURN n.id as source, m.id as target, type(r) as relationship_type
    LIMIT 100
    """
    try:
        with conn.get_session() as session:
            result = session.run(query)
            nodes = set()
            edges = []
            for record in result:
                nodes.add(record["source"])
                nodes.add(record["target"])
                edges.append({
                    "source": record["source"],
                    "target": record["target"],
                    "type": record["relationship_type"]
                })
            
            return {
                "year": year,
                "nodes": [{"id": n, "label": n} for n in nodes],
                "edges": edges
            }
    finally:
        conn.close()
