from neo4j import GraphDatabase
from typing import List, Dict, Any
import os

from schema.models import KnowledgeNode, TemporalEdge

class Neo4jClient:
    def __init__(self, uri: str = None, user: str = None, password: str = None):
        self.uri = uri or os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self.user = user or os.getenv("NEO4J_USER", "neo4j")
        self.password = password or os.getenv("NEO4J_PASSWORD", "evolith_secret")
        
        self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password))
        
    def close(self):
        self.driver.close()

    def create_constraints(self):
        """Initialize database constraints and indexes."""
        with self.driver.session() as session:
            # Enforce unique IDs on Nodes
            session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (n:Node) REQUIRE n.id IS UNIQUE")
            # Create indexes for temporal queries
            session.run("CREATE INDEX IF NOT EXISTS FOR ()-[r:INFLUENCED]-() ON (r.valid_from)")
            session.run("CREATE INDEX IF NOT EXISTS FOR ()-[r:CITED]-() ON (r.valid_from)")

    def upsert_node(self, node: KnowledgeNode):
        """Insert or update a knowledge node."""
        query = """
        MERGE (n:Node {id: $id})
        SET n.label = $label,
            n.type = $type,
            n.description = $description,
            n.year = $year,
            n.source = $source,
            n.layers = $layers
        // Assign the specific type label dynamically
        WITH n
        CALL apoc.create.addLabels(n, [$type]) YIELD node
        RETURN node
        """
        # APOC is required for dynamic labels, which we added to docker-compose
        with self.driver.session() as session:
            session.run(query, **node.model_dump())

    def upsert_edge(self, edge: TemporalEdge):
        """Insert or update a temporal edge between two nodes."""
        # Using APOC to merge relationship dynamically by type
        query = """
        MATCH (source:Node {id: $source_id})
        MATCH (target:Node {id: $target_id})
        CALL apoc.merge.relationship(
            source, 
            $type_upper, 
            {}, 
            {
                valid_from: $valid_from,
                valid_to: $valid_to,
                confidence: $confidence,
                evidence_count: $evidence_count,
                explanation: $explanation
            }, 
            target
        ) YIELD rel
        RETURN rel
        """
        
        data = edge.model_dump()
        # Neo4j relationships are typically uppercase
        data["type_upper"] = edge.type.upper()
        
        with self.driver.session() as session:
            session.run(query, **data)
            
    def get_universe_at_year(self, year: int) -> Dict[str, List[Dict[str, Any]]]:
        """Fetch the entire graph up to a specific year (Temporal Query)."""
        query = """
        MATCH (n:Node)
        WHERE n.year <= $year OR n.year IS NULL
        
        OPTIONAL MATCH (n)-[r]->(m:Node)
        WHERE m.year <= $year 
          AND (r.valid_from <= $year OR r.valid_from IS NULL)
          AND (r.valid_to >= $year OR r.valid_to IS NULL)
          
        RETURN 
            collect(DISTINCT n) as nodes,
            collect(DISTINCT {
                source: n.id,
                target: m.id,
                type: type(r),
                valid_from: r.valid_from,
                valid_to: r.valid_to,
                confidence: r.confidence,
                evidence_count: r.evidence_count
            }) as edges
        """
        with self.driver.session() as session:
            result = session.run(query, year=year).single()
            if not result:
                return {"nodes": [], "edges": []}
                
            return {
                "nodes": [dict(n) for n in result["nodes"]],
                # Filter out null edges that were collected due to OPTIONAL MATCH
                "edges": [e for e in result["edges"] if e.get("source") and e.get("target")]
            }
