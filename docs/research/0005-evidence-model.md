# ADR 0005: Evidence & Provenance Model

## Context
A graph relationship without a citation is untrustworthy. If a user sees `(A)-[INFLUENCED]->(B)`, they will ask "Why?".

## Decision
Every edge in Evolith must include:
- `confidence`: A float (0.0 to 1.0) indicating the certainty of the relationship.
- `source_uri`: A link to the document (Wikipedia URL, GitHub README, Paper DOI) that proves the edge.
- `context`: The specific excerpt of text that the LLM/Extractor used to justify creating the edge.
