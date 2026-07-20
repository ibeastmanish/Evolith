from pydantic import BaseModel, Field
from typing import List, Optional

class Provenance(BaseModel):
    origin_source: str
    retrieval_date: str
    llm_version: str
    quotes: List[str]

class Mutation(BaseModel):
    added: List[str] = Field(description="Architectural paradigms or features added compared to parent.")
    removed: List[str] = Field(description="Architectural paradigms or features removed compared to parent.")
    similarity_score: float = Field(ge=0.0, le=1.0, description="Computed similarity between parent and child DNA.")

class TemporalEdge(BaseModel):
    target_node: str
    edge_type: str # EVOLVES_INTO, OBSOLETES, INFLUENCES, etc.
    confidence: float = Field(ge=0.0, le=1.0)
    strength: float = Field(ge=0.0, le=1.0)
    provenance: Provenance
    mutations: Optional[Mutation] = None

class KnowledgeDNA(BaseModel):
    paradigms: List[str]
    memory_model: Optional[str]
    type_system: Optional[str]
    concurrency_model: Optional[str]
    target_domains: List[str]

class NodeLifecycle(BaseModel):
    birth: Optional[str] = None
    growth: Optional[str] = None
    peak: Optional[str] = None
    decline: Optional[str] = None
    deprecated: Optional[str] = None
    archived: Optional[str] = None

class CanonicalNode(BaseModel):
    name: str
    node_type: str # Technology, Concept, Package
    aliases: List[str]
    categories: List[str]
    
    dna: Optional[KnowledgeDNA] = None
    lifecycle: NodeLifecycle
    outbound_edges: List[TemporalEdge]
