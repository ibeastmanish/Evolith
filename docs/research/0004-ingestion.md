# ADR 0004: Hybrid Ingestion Strategy

## Context
Relying solely on LLMs to extract a knowledge graph from the internet leads to hallucinated edges and inconsistent naming. Relying solely on structured data misses the nuanced relationships (e.g., "React was inspired by XHP").

## Decision
We use a canonical-first hybrid strategy:
1. **Canonical Seeds:** Wikipedia and Official Docs establish the ground truth nodes (Technologies, Concepts) and their lifecycles.
2. **Academic Enrichment:** Semantic Scholar/arXiv attaches theoretical provenance.
3. **Implementation Enrichment:** GitHub provides real adoption metrics.
4. **LLM usage:** LLMs are strictly constrained to classifying edge types and extracting entities via NER against the known canonical ontology.
