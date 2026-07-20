from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from staging.database import get_db
from staging import models

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.get("/quality")
def get_quality_report(db: Session = Depends(get_db)):
    """
    Computes graph quality metrics.
    - Knowledge Confidence Calibration: Mismatches between confidence and human agreement
    - Evidence Diversity: Score evidence based on sources
    """
    candidates = db.query(models.CandidateRelationship).filter(models.CandidateRelationship.would_agree.isnot(None)).all()
    
    total_reviews = len(candidates)
    if total_reviews == 0:
        return {"error": "No reviewed candidates available for quality metrics"}

    calibration_mismatches = 0
    total_confidence = 0.0
    
    # Simple metric: LLM Confidence > 0.8 but human disagreed
    for c in candidates:
        total_confidence += c.confidence
        if c.confidence > 0.8 and not c.would_agree:
            calibration_mismatches += 1

    return {
        "total_reviews": total_reviews,
        "calibration_mismatches": calibration_mismatches,
        "average_confidence": total_confidence / total_reviews,
        "calibration_mismatch_rate": round(calibration_mismatches / total_reviews, 2)
    }

@router.get("/ontology-health")
def get_ontology_health(db: Session = Depends(get_db)):
    """
    Automatically detects ontology issues in the candidate graph.
    """
    candidates = db.query(models.CandidateRelationship).all()
    
    issues = {
        "missing_evidence": 0,
        "invalid_edge_types": 0,
        "duplicate_technologies": 0
    }
    
    seen_edges = set()
    valid_edge_types = {"EVOLVES_INTO", "INFLUENCES", "OBSOLETES", "IMPLEMENTS", "USES"}
    
    for c in candidates:
        if not c.evidence:
            issues["missing_evidence"] += 1
            
        if c.relationship_type not in valid_edge_types:
            issues["invalid_edge_types"] += 1
            
        edge_signature = f"{c.source_node}->{c.relationship_type}->{c.target_node}"
        if edge_signature in seen_edges:
            issues["duplicate_technologies"] += 1
        seen_edges.add(edge_signature)
        
    return {
        "total_candidates": len(candidates),
        "issues": issues,
        "health_score": round(1.0 - (sum(issues.values()) / max(len(candidates), 1)), 2)
    }
