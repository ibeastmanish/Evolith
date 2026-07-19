# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Tripartite Architecture:** Formal separation of Knowledge Engine (Python), Knowledge Studio (React), and Evolith (Next.js).
- **Public Explorer:** `evolith/` frontend utilizing `react-force-graph-2d` for interactive exploration.
- **Signature Inspector:** UI panel showing Knowledge DNA, mutations, and evidence.
- **Neo4j Cypher API:** Direct graph traversal endpoints (`/api/graph/*`) in FastAPI.
- **Human-in-the-Loop Validation:** SQLite staging database to intercept LLM extractions before they reach the Neo4j Canonical Graph.
- **Foundational ADRs:** Architectural Decision Records (0001-0009) detailing the ontology and temporal constraints.

### Changed
- Shifted priority from feature expansion to Research Hardening (Phase 3).
