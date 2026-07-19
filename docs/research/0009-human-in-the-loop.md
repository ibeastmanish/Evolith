# ADR 0009: Human-in-the-Loop Validation

## Context
Evolith is a Computational Knowledge Evolution Engine. The canonical graph must prioritize correctness over automation. Relying solely on LLMs to dump data directly into Neo4j risks polluting the canonical ontology with hallucinations, missed nuances, and unverified edges.

## Decision
We introduce a mandatory Human-in-the-Loop (HITL) Validation Layer between the extraction pipeline and Neo4j. 
* The LLM pipeline generates a **Candidate Graph** (stored in a staging area).
* Human reviewers use a dashboard to validate relationships and knowledge DNA.
* Only relationships explicitly marked as `approved` are promoted to the **Canonical Graph** (Neo4j).

## Consequences
- Every extracted object (Node/Edge) requires a wrapper capturing review metadata: `status` (pending/approved/rejected/edited), `reviewer_id`, `timestamp`, and `review_notes`.
- We must build a Review Dashboard (Phase 1.5) before writing the Neo4j ingestion worker.
- This creates an Evaluation Framework to benchmark the LLM pipeline's precision and hallucination rates over time.
