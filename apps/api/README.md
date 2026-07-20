# Anti Gravity Backend

The backend is built with FastAPI, providing high-performance async endpoints for the multi-agent system.

## Components
- `api/`: Route definitions (Assistant, Papers, Graph, Hypothesis).
- `agents/`: AI logic modules (`orchestrator.py`, `extraction.py`, `hypothesis.py`).
- `pipeline/`: RAG implementation (`chunker.py`, `embedder.py`).
- `schema/`: Pydantic models for explicit structured validation.
