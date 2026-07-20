from sqlalchemy import Column, String, Float, Text, DateTime, JSON, Enum, Boolean
from sqlalchemy.orm import declarative_base
import enum
import uuid

Base = declarative_base()

class ReviewStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    EDITED = "edited"

class CandidateRelationship(Base):
    __tablename__ = 'candidate_relationships'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    source_node = Column(String, nullable=False)
    target_node = Column(String, nullable=False)
    relationship_type = Column(String, nullable=False) # e.g. EVOLVES_INTO
    
    # Payload from extraction pipeline
    knowledge_dna = Column(JSON, nullable=True)
    mutation = Column(JSON, nullable=True)
    confidence = Column(Float, nullable=False)
    strength = Column(Float, nullable=False)
    evidence = Column(JSON, nullable=False)
    provenance = Column(JSON, nullable=False)
    
    # Review Metadata
    status = Column(Enum(ReviewStatus), default=ReviewStatus.PENDING)
    reviewer_id = Column(String, nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    review_notes = Column(Text, nullable=True)
    
    # Qualitative Validation Answers
    is_correct = Column(Boolean, nullable=True)
    is_meaningful = Column(Boolean, nullable=True)
    is_evidence_sufficient = Column(Boolean, nullable=True)
    would_agree = Column(Boolean, nullable=True)
    
    # Evaluation Benchmark Flag
    is_golden = Column(Boolean, default=False)
