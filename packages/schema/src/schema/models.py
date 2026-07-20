from typing import Literal, Optional, List
from pydantic import BaseModel, Field

NodeType = Literal["tech", "paper", "person", "company"]
EdgeType = Literal[
    "influenced",
    "created_by",
    "authored",
    "published",
    "cited"
]

class KnowledgeNode(BaseModel):
    id: str = Field(..., description="Unique identifier for the node (e.g., 'attention-is-all-you-need')")
    type: NodeType = Field(..., description="Type of the node")
    label: str = Field(..., description="Human-readable label")
    description: Optional[str] = Field(default=None, description="Short summary or description")
    year: Optional[int] = Field(default=None, description="Year of inception or publication")
    
    # Metadata
    source: str = Field(..., description="Source of this node (e.g., 'openalex', 'manual')")
    layers: List[str] = Field(default_factory=list, description="Knowledge layers (e.g., ['research', 'industry'])")
    
    class Config:
        frozen = True

class TemporalEdge(BaseModel):
    source_id: str = Field(..., description="ID of the source node")
    target_id: str = Field(..., description="ID of the target node")
    type: EdgeType = Field(..., description="Type of the relationship")
    
    # Temporal aspects
    valid_from: Optional[int] = Field(default=None, description="Year this relationship started or became relevant")
    valid_to: Optional[int] = Field(default=None, description="Year this relationship ended (if applicable)")
    
    # Evidence
    confidence: float = Field(default=1.0, ge=0.0, le=1.0, description="Confidence score of this relationship")
    evidence_count: int = Field(default=1, ge=0, description="Number of underlying citations or proofs")
    explanation: Optional[str] = Field(default=None, description="AI or manual explanation of the relationship")
    
    class Config:
        frozen = True
