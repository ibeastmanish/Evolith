import os
import sys
import json

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import Neo4jConnection
from staging.database import SessionLocal
from staging.models import CandidateRelationship, ReviewStatus

def push_approved_candidates():
    db = SessionLocal()
    conn = Neo4jConnection()
    
    # Find all approved candidates
    candidates = db.query(CandidateRelationship).filter(
        CandidateRelationship.status == ReviewStatus.APPROVED
    ).all()
    
    if not candidates:
        print("No approved candidates to write to Neo4j.")
        db.close()
        conn.close()
        return

    print(f"Found {len(candidates)} approved candidates. Pushing to Neo4j...")
    
    with conn.get_session() as session:
        for candidate in candidates:
            # Create nodes and the edge
            query = f"""
            MERGE (s:Technology {{name: $source_node}})
            MERGE (t:Technology {{name: $target_node}})
            MERGE (s)-[r:{candidate.relationship_type}]->(t)
            SET r.confidence = $confidence,
                r.strength = $strength,
                r.mutations = $mutations,
                s.knowledge_dna = $source_dna
            """
            
            mutations_json = json.dumps(candidate.mutation) if candidate.mutation else None
            dna_json = json.dumps(candidate.knowledge_dna) if candidate.knowledge_dna else None
            
            session.run(query, 
                source_node=candidate.source_node,
                target_node=candidate.target_node,
                confidence=candidate.confidence,
                strength=candidate.strength,
                mutations=mutations_json,
                source_dna=dna_json
            )
            
            # Mark as processed in SQLite (or delete it to keep staging clean)
            db.delete(candidate)
            
    db.commit()
    db.close()
    conn.close()
    print("Successfully pushed to Canonical Graph (Neo4j).")

if __name__ == "__main__":
    push_approved_candidates()
