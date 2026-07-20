"""
Anti Gravity — Data Models

Pydantic models for provenance, evidence, hypothesis, reproducibility, and graph events.
"""

from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime


# --- Scientific Provenance (Refinement 2) ---

class Provenance(BaseModel):
    """Full provenance record for any claim in the system."""
    claim: str
    source_paper: Optional[dict] = None  # {doi, title, authors}
    location: Optional[dict] = None  # {section, paragraph, page}
    equation_ref: Optional[str] = None
    confidence: float = Field(ge=0.0, le=1.0, default=0.0)
    verification_status: Literal[
        "verified", "partially_verified", "unverified", "contradicted"
    ] = "unverified"
    verified_against: list[str] = Field(default_factory=list)
    extraction_timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    extraction_agent_version: str = "extraction-agent@1.0.0"
    model_used: str = "unknown"


# --- Evidence Chain ---

class Evidence(BaseModel):
    """A single piece of evidence supporting or contradicting a claim."""
    id: str
    claim: str
    source_doi: Optional[str] = None
    source_title: Optional[str] = None
    source_section: Optional[str] = None
    quote: Optional[str] = None
    confidence: float = Field(ge=0.0, le=1.0, default=0.0)
    relationship: Literal["supports", "contradicts", "neutral"] = "neutral"


# --- Discovery Score ---

class DiscoveryScore(BaseModel):
    """9-metric Discovery Score for hypotheses."""
    novelty: float = Field(ge=0.0, le=1.0, default=0.0)
    impact: float = Field(ge=0.0, le=1.0, default=0.0)
    evidence: float = Field(ge=0.0, le=1.0, default=0.0)
    risk: float = Field(ge=0.0, le=1.0, default=0.0)
    confidence: float = Field(ge=0.0, le=1.0, default=0.0)
    testability: float = Field(ge=0.0, le=1.0, default=0.0)
    consistency: float = Field(ge=0.0, le=1.0, default=0.0)
    research_gap: float = Field(ge=0.0, le=1.0, default=0.0)
    citation_coverage: float = Field(ge=0.0, le=1.0, default=0.0)


# --- Hypothesis ---

class Hypothesis(BaseModel):
    """AI-generated hypothesis following the AI-as-tool pattern."""
    id: str
    objective: str
    # AI-as-tool output structure (Refinement 4)
    evidence_items: list[Evidence] = Field(default_factory=list)
    observed_pattern: str = ""
    candidate_explanation: str = ""
    competing_explanations: list[str] = Field(default_factory=list)
    missing_evidence: list[str] = Field(default_factory=list)
    recommended_experiments: list[str] = Field(default_factory=list)
    # Scoring
    discovery_score: DiscoveryScore = Field(default_factory=DiscoveryScore)
    # Metadata
    mode: Literal["research", "discovery"] = "discovery"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    reproducibility: Optional["ReproducibilityRecord"] = None


# --- Reproducibility Record (Refinement 5) ---

class ReproducibilityRecord(BaseModel):
    """Metadata for recreating any AI-generated output."""
    model: str
    prompt_version: str
    retrieved_papers: list[str] = Field(default_factory=list)  # DOIs
    embedding_model: str = "text-embedding-3-small"
    vector_db_snapshot: Optional[str] = None  # Hash
    graph_version: int = 0
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    software_version: str = "antigravity@0.1.0"


# --- Graph Event (Refinement 3: Versioned Knowledge Graph) ---

class GraphEvent(BaseModel):
    """Versioned graph mutation event for reproducibility."""
    id: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    event_type: Literal["node_added", "edge_added", "edge_removed", "edge_updated"]
    payload: dict
    triggered_by: str  # "paper_import", "hypothesis", "manual"
    version: int


# --- Paper ---

class Paper(BaseModel):
    """Imported paper metadata."""
    id: str
    title: str
    authors: list[str] = Field(default_factory=list)
    abstract: Optional[str] = None
    doi: Optional[str] = None
    arxiv_id: Optional[str] = None
    url: Optional[str] = None
    source: str  # "arxiv", "doi", "url", "pdf"
    status: Literal["importing", "extracting", "indexed", "error"] = "importing"
    equations: list[str] = Field(default_factory=list)
    references: list[str] = Field(default_factory=list)
    imported_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# --- AI Response ---

class Explainability(BaseModel):
    """Explainability metadata for every AI response (Refinement 9)."""
    sources: list[dict] = Field(default_factory=list)
    reasoning_summary: str = ""
    confidence: float = Field(ge=0.0, le=1.0, default=0.0)
    alternative_interpretations: list[str] = Field(default_factory=list)
    limitations: list[str] = Field(default_factory=list)
    verification_status: Literal[
        "verified", "partially_verified", "unverified"
    ] = "unverified"


class AIResponse(BaseModel):
    """Structured AI response with full explainability."""
    answer: str
    mode: Literal["research", "discovery"]
    explainability: Explainability = Field(default_factory=Explainability)
    provenance: list[Provenance] = Field(default_factory=list)
