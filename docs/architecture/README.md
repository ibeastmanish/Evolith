# Architecture Overview

Anti Gravity uses a modular architecture combining a Next.js React frontend and a FastAPI backend orchestrating multiple specialized AI agents.

## Core Flow
1. User interacts with the UI in Research or Discovery Mode.
2. The Request hits the FastAPI Gateway.
3. The Orchestrator Agent analyzes intent.
4. If retrieving facts, the Knowledge Graph Agent queries Neo4j.
5. If analyzing documents, the RAG Retriever fetches vectors from ChromaDB.
6. The Verification Agent cross-checks extracted facts.
7. Explanations and provenance data are streamed back to the UI.
