"""
Anti Gravity — Main API Gateway

Routes requests to sub-modules and initializes systems.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import Base, engine
from api import graph, papers, assistant, hypothesis

# Create SQLite tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(graph.router, prefix="/api")
app.include_router(papers.router, prefix="/api")
app.include_router(assistant.router, prefix="/api")
app.include_router(hypothesis.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok", "version": settings.APP_VERSION}
