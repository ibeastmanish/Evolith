# ADR 0002: Graph Ontology

## Context
To prevent explosive complexity in the MVP, we need a constrained but expressive ontology to model the evolution of Programming Languages and Web Frameworks.

## Decision
We define the following core node types:
- **Concept:** An abstract idea (e.g., "Virtual DOM").
- **Technology:** A specific realization (e.g., "React").
- **Paper:** Academic literature introducing a concept.
- **Repository:** The practical implementation (e.g., `facebook/react`).

Edges represent evolutionary flow:
- `EVOLVES_INTO`, `OBSOLETES`, `INFLUENCES`, `SPLITS_INTO`, `MERGES_WITH`.

People and Organizations are explicitly excluded from the MVP.
