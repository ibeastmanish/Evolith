"""
Anti Gravity — Physics Ontology

Defines 15+ node types and 14 edge types for the physics knowledge graph.
Every node and edge has domain-specific fields validated by Pydantic.
"""

from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


# --- Node Types ---

class NodeType(str, Enum):
    THEORY = "theory"
    LAW = "law"
    PRINCIPLE = "principle"
    EQUATION = "equation"
    VARIABLE = "variable"
    DIMENSION = "dimension"
    PARTICLE = "particle"
    FIELD = "field"
    INTERACTION = "interaction"
    EXPERIMENT = "experiment"
    OBSERVABLE = "observable"
    DATASET = "dataset"
    INSTITUTION = "institution"
    RESEARCHER = "researcher"
    CITATION = "citation"
    PHENOMENON = "phenomenon"
    CONSTANT = "constant"
    SYMMETRY = "symmetry"
    PREDICTION = "prediction"


class EdgeType(str, Enum):
    DERIVES_FROM = "DERIVES_FROM"
    PREDICTS = "PREDICTS"
    CONTRADICTS = "CONTRADICTS"
    SUPPORTS = "SUPPORTS"
    OBSERVES = "OBSERVES"
    AUTHORED_BY = "AUTHORED_BY"
    CONDUCTED_AT = "CONDUCTED_AT"
    MEASURES = "MEASURES"
    UNIFIES = "UNIFIES"
    BREAKS = "BREAKS"
    GENERALIZES = "GENERALIZES"
    APPROXIMATES = "APPROXIMATES"
    CONSTRAINS = "CONSTRAINS"
    FALSIFIES = "FALSIFIES"


# --- Base Ontology Node ---

class OntologyNode(BaseModel):
    """Base node in the physics ontology."""
    id: str
    name: str
    node_type: NodeType
    description: Optional[str] = None
    aliases: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)


# --- Specialized Node Types ---

class TheoryNode(OntologyNode):
    node_type: NodeType = NodeType.THEORY
    mathematical_framework: Optional[str] = None
    domain: Optional[str] = None  # e.g., "quantum mechanics", "cosmology"
    predictions: list[str] = Field(default_factory=list)
    assumptions: list[str] = Field(default_factory=list)
    open_problems: list[str] = Field(default_factory=list)
    year_proposed: Optional[int] = None


class LawNode(OntologyNode):
    node_type: NodeType = NodeType.LAW
    mathematical_form: Optional[str] = None  # LaTeX
    domain: Optional[str] = None
    conditions: list[str] = Field(default_factory=list)


class EquationNode(OntologyNode):
    node_type: NodeType = NodeType.EQUATION
    latex: str
    variables: list[str] = Field(default_factory=list)
    derivation_from: list[str] = Field(default_factory=list)
    domain: Optional[str] = None


class ParticleNode(OntologyNode):
    node_type: NodeType = NodeType.PARTICLE
    mass: Optional[str] = None
    charge: Optional[str] = None
    spin: Optional[str] = None
    classification: Optional[str] = None  # fermion, boson, etc.


class ExperimentNode(OntologyNode):
    node_type: NodeType = NodeType.EXPERIMENT
    year: Optional[int] = None
    location: Optional[str] = None
    instruments: list[str] = Field(default_factory=list)
    result: Optional[str] = None


class ResearcherNode(OntologyNode):
    node_type: NodeType = NodeType.RESEARCHER
    affiliation: Optional[str] = None
    fields: list[str] = Field(default_factory=list)
    notable_works: list[str] = Field(default_factory=list)


class ConstantNode(OntologyNode):
    node_type: NodeType = NodeType.CONSTANT
    symbol: Optional[str] = None
    value: Optional[str] = None
    units: Optional[str] = None


# --- Ontology Edge ---

class OntologyEdge(BaseModel):
    """Edge in the physics ontology with provenance."""
    id: str
    source_id: str
    target_id: str
    edge_type: EdgeType
    confidence: float = Field(ge=0.0, le=1.0)
    description: Optional[str] = None
    evidence: list[str] = Field(default_factory=list)
