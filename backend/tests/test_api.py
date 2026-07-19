import pytest
from fastapi.testclient import TestClient
from main import app
from staging.database import get_db, Base, engine
from sqlalchemy.orm import sessionmaker

# Create a test database
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_get_review_queue():
    response = client.get("/api/review/queue")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_approve_nonexistent_candidate():
    response = client.post("/api/review/invalid-id/approve")
    assert response.status_code == 404

def test_reject_nonexistent_candidate():
    response = client.post("/api/review/invalid-id/reject")
    assert response.status_code == 404
