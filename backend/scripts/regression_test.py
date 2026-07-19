import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from staging.database import SessionLocal
from staging.models import CandidateRelationship
from crawler.wikipedia import WikipediaCrawler
from extractors.dna import DNAExtractor

def run_regression_test():
    print("Running Regression Test against Golden Dataset...\n")
    db = SessionLocal()
    
    # 1. Fetch Golden Dataset
    golden_relationships = db.query(CandidateRelationship).filter(CandidateRelationship.is_golden.is_(True)).all()
    
    if not golden_relationships:
        print("No golden relationships found in the dataset. Please mark some candidates as golden first.")
        db.close()
        return

    # Group by source_node
    golden_by_tech = {}
    for r in golden_relationships:
        if r.source_node not in golden_by_tech:
            golden_by_tech[r.source_node] = []
        golden_by_tech[r.source_node].append(r)
        
    crawler = WikipediaCrawler()
    extractor = DNAExtractor()
    
    total_regressions = 0

    # 2. Re-extract and Diff
    for tech, golden_edges in golden_by_tech.items():
        print(f"Testing Extraction for: {tech}")
        text = crawler.fetch_page_text(tech)
        if not text:
            print(f"  [ERROR] Could not fetch Wikipedia page for {tech}")
            continue
            
        try:
            node = extractor.extract_node(tech, text)
            
            # Map new edges
            new_edges = { f"{tech}->{e.edge_type}->{e.target_node}": e for e in node.outbound_edges }
            golden_signatures = { f"{r.source_node}->{r.relationship_type}->{r.target_node}": r for r in golden_edges }
            
            # Diff
            added = set(new_edges.keys()) - set(golden_signatures.keys())
            removed = set(golden_signatures.keys()) - set(new_edges.keys())
            
            if added or removed:
                print(f"  [WARNING] Graph signature changed for {tech}")
                total_regressions += 1
                for a in added:
                    print(f"    [+] ADDED: {a}")
                for r in removed:
                    print(f"    [-] REMOVED: {r}")
            else:
                print("  [PASS] Extraction matches Golden Graph perfectly.")
                
            # Diff confidences on matching edges
            for sig in set(new_edges.keys()).intersection(set(golden_signatures.keys())):
                old_conf = golden_signatures[sig].confidence
                new_conf = new_edges[sig].confidence
                if abs(old_conf - new_conf) > 0.1:
                    print(f"    [~] CONFIDENCE SHIFT: {sig} ({old_conf} -> {new_conf})")
                    
        except Exception as e:
            print(f"  [ERROR] Extraction failed for {tech}: {e}")
            
    print(f"\nRegression Test Complete. {total_regressions} structural changes detected.")
    db.close()

if __name__ == "__main__":
    run_regression_test()
