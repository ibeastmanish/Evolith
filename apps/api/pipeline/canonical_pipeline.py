import os
import sys
import uuid

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from crawler.wikipedia import WikipediaCrawler
from extractors.dna import DNAExtractor
from staging.database import SessionLocal, init_db
from staging.models import CandidateRelationship

def run_seed_pipeline(seeds):
    init_db()
    crawler = WikipediaCrawler()
    extractor = DNAExtractor()
    db = SessionLocal()
    
    for seed in seeds:
        print(f"Crawling Wikipedia for: {seed}")
        text = crawler.fetch_page_text(seed)
        if not text:
            print(f"  -> Could not find Wikipedia page for {seed}")
            continue
            
        print(f"Extracting Knowledge DNA for: {seed}")
        try:
            node = extractor.extract_node(seed, text)
            
            # Save the node's outbound edges to SQLite staging
            for edge in node.outbound_edges:
                candidate = CandidateRelationship(
                    id=str(uuid.uuid4()),
                    source_node=node.name,
                    target_node=edge.target_node,
                    relationship_type=edge.edge_type,
                    knowledge_dna=node.dna.model_dump() if node.dna else None,
                    mutation=edge.mutations.model_dump() if edge.mutations else None,
                    confidence=edge.confidence,
                    strength=edge.strength,
                    evidence=edge.provenance.quotes,
                    provenance=edge.provenance.model_dump()
                )
                db.add(candidate)
            db.commit()
            print(f"  -> Successfully staged {len(node.outbound_edges)} candidate relationships for {seed}")
        except Exception as e:
            print(f"  -> Failed to extract {seed}: {e}")
            db.rollback()
            
    db.close()
    print("\nPipeline complete. Review candidates in Knowledge Studio.")

if __name__ == "__main__":
    # Stage 1 Progressive Validation
    frontend_seeds = ["React (software)", "Vue.js", "Rust (programming language)"]
    run_seed_pipeline(frontend_seeds)
