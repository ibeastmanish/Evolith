# Contributing to Evolith

Thank you for your interest in contributing to Evolith! 

Evolith is a **Computational Knowledge Evolution Engine**, not just another graph database visualization. We prioritize scientific rigor, data provenance, and architectural cleanliness over shipping massive amounts of unverified features.

## How to Contribute

### 1. Understand the Philosophy
Please read `README.md` and `ARCHITECTURE.md` before writing code. Familiarize yourself with the Tripartite Architecture (Engine, Studio, OS).

### 2. Branching Strategy
* We use trunk-based development. Branch off `main` and submit PRs.
* Name branches descriptively: `feat/neo4j-writer`, `fix/timeline-animation`, `docs/ontology`.

### 3. Pull Request Standards
Every Pull Request must pass the CI/CD pipeline (Milestone 3.5).
Before submitting a PR, ensure:
* You have added tests (Pytest for backend, Vitest for frontend).
* `uv run ruff check .` passes (Python linting).
* `npm run lint` passes (Next.js linting).
* If altering the graph schema, you must update the Pydantic models in `backend/schema/models.py`.

### 4. Adding New Features
If you want to add a major feature, please open an Issue first to propose the idea. We adhere to the rule: *Does this improve the quality, credibility, or usability of the existing system?* If it doesn't, it will be deferred.

## Local Setup
See the Quick Start guide in `README.md` for getting the monorepo running locally.
