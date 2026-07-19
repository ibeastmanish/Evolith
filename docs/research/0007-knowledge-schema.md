# ADR 0007: Formal Ontology Specification (Schema v1.0)

## The Core Axiom
Evolith is NOT a graph database.
Evolith is NOT a search engine.
Evolith is NOT an AI assistant.
**Evolith is a Computational Knowledge Evolution Engine.**
Every engineering decision should support that thesis.

## 1. Node Definitions
Every node must have a universally unique identifier (UUID), canonical name, aliases, description, and "Knowledge DNA".
* **Technology:** Realized software, languages, frameworks (e.g., "Rust").
* **Concept:** Theoretical paradigms, algorithms (e.g., "Virtual DOM", "Ownership").
* **Repository:** Codebase hosted on a VCS (e.g., `facebook/react`).
* **Paper:** Academic literature (e.g., arXiv/DOI).
* **Package:** Distributed artifacts (e.g., `npm/react`).
* **Problem:** A technical challenge a concept or technology attempts to solve.
* **Standard/RFC:** Formal specifications.
* **Version:** A specific historical state of a Technology.
* **Event:** Significant occurrences (e.g., "React 16 Release", "Log4j Vulnerability").

### 1.1 The "Knowledge DNA" (Genome) Model
Instead of treating technologies as isolated nodes, they are modeled as structured genomes. This allows the computational engine to measure "evolutionary similarity" (e.g., "Which language is architecturally closest to Rust?").
Example Genome for a Programming Language:
* Paradigms (e.g., Functional, Imperative)
* Memory Model
* Type System
* Concurrency Model
* Target Domains

## 2. Edge Definitions
Directed relationships representing evolutionary flow.
* `INTRODUCES`: (Paper|Standard) -> (Concept|Technology)
* `IMPLEMENTS`: (Repository) -> (Technology|Concept|Paper)
* `INFLUENCES`: (Node) -> (Node)
* `EVOLVES_INTO`: (Technology) -> (Technology)
* `REPLACES`: (Technology) -> (Technology)
* `OBSOLETES`: (Technology) -> (Technology)
* `DEPENDS_ON`: (Technology|Repository|Package) -> (Technology|Repository|Package)
* `INSPIRED_BY`: (Node) -> (Node)
* `MERGES_WITH`: (Technology) -> (Technology)
* `SPLITS_INTO`: (Technology) -> (Technology)
* `USES`: (Repository|Technology) -> (Concept|Technology)
* `STANDARDIZES`: (Standard/RFC) -> (Technology|Concept)

## 3. Temporal Properties
Time is a first-class dimension. Nodes must track their lifecycle state:
* `birth`: Date of inception/first commit.
* `growth`: Date when adoption accelerated.
* `peak`: Date of maximum relative market share/mindshare.
* `decline`: Date when adoption began falling.
* `deprecated`: Date of official deprecation.
* `archived`: Date of abandonment/EOL.

## 4. Confidence Model
Every edge is probabilistic, reflecting the engine's certainty in the relationship.
* `confidence`: Float (0.0 to 1.0).
* `strength`: Magnitude of influence (e.g., how heavily did X influence Y?).
* `evidence_count`: Number of sources corroborating this edge.
* `source_count`: Number of distinct domains corroborating (e.g., Wikipedia + arXiv).
* `confidence_method`: "LLM_EXTRACTION", "CITATION_ANALYSIS", "MANUAL_CURATION".

## 5. Provenance
Every edge must declare its origin to ensure trace-ability.
* `origin_source`: URI/identifier of the source document.
* `retrieval_date`: When it was ingested.
* `parser_version`: Version of the ingestion pipeline.
* `llm_version`: e.g., "gemini-2.5-pro".
* `verification_status`: "UNVERIFIED", "VERIFIED_BY_COMMUNITY", "REJECTED".

## 6. Evidence Model
Every relationship must be explainable. The edge must store:
* `citations`: Array of source URIs (papers, github, documentation, RFC, Wikipedia).
* `quotes`: Exact text snippets used to justify the edge.

## 7. Validation Rules (Graph Invariants)
* **Illegal Edges:** E.g., `(Concept) -[EVOLVES_INTO]-> (Paper)` is invalid. Circular `EVOLVES_INTO` is invalid.
* **Temporal Consistency:** If `A -[INFLUENCES]-> B`, then `A.birth` MUST be ≤ `B.birth`.
* **Missing Timestamps:** Nodes cannot enter the graph without at least a `birth` estimate.
* **Confidence Thresholds:** Edges below a specific threshold (e.g. 0.4) are dropped.
* **Entity Resolution:** Deduplication rules (e.g., "JS" merges into "JavaScript").

## 8. Versioning
* **Schema Version:** v1.0
* **Migration Strategy:** Additive-only for attributes. Node type changes require a schema upgrade script.
* **Backward Compatibility:** All visualizers must default missing temporal properties gracefully.
