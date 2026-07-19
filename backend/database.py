"""
Anti Gravity — Database Connections

Initializes connections to Neo4j (Graph), ChromaDB (Vector Store), and SQLite (Staging).
"""

from neo4j import GraphDatabase
import chromadb
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from config import settings

# --- Neo4j (Canonical Graph) ---
class Neo4jConnection:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )

    def close(self):
        self.driver.close()

    def get_session(self):
        return self.driver.session()

neo4j_conn = Neo4jConnection()


# --- ChromaDB (Vector Store) ---
# For MVP, we use the persistent client
chroma_client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)


# --- SQLite (Staging, Papers, UI State) ---
engine = create_engine(
    settings.SQLITE_URL,
    connect_args={"check_same_thread": False} # Needed for SQLite + FastAPI
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
