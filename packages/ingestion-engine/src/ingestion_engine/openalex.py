import httpx
from schema.models import KnowledgeNode, TemporalEdge
from knowledge_engine.neo4j_client import Neo4jClient
from typing import Optional
import urllib.parse

class OpenAlexConnector:
    BASE_URL = "https://api.openalex.org"
    
    def __init__(self, email: str = "evolith@example.com"):
        self.email = email
        self.client = httpx.Client(headers={"User-Agent": f"Evolith-Ingestion/1.0 (mailto:{email})"})
        self.neo4j = Neo4jClient()
        
    def fetch_and_ingest_paper(self, search_query: str) -> Optional[str]:
        """Search for a paper by title, ingest it, its authors, and its references."""
        
        # 1. Search OpenAlex
        safe_query = urllib.parse.quote(search_query)
        res = self.client.get(f"{self.BASE_URL}/works?filter=title.search:{safe_query}&per-page=1")
        if res.status_code != 200 or not res.json().get("results"):
            print(f"Failed to fetch or no results for query: {search_query}")
            return None
            
        work = res.json()["results"][0]
        work_id = work["id"].split("/")[-1]
        
        # 2. Ingest Paper Node
        paper_node = KnowledgeNode(
            id=work_id,
            type="paper",
            label=work.get("title", "Unknown Title"),
            description=str(work.get("abstract_inverted_index", "")), # Just raw for now, requires assembly
            year=work.get("publication_year"),
            source="openalex",
            layers=["research"]
        )
        self.neo4j.upsert_node(paper_node)
        print(f"Ingested Paper: {paper_node.label}")
        
        # 3. Ingest Authors and Created_By edges
        for authorship in work.get("authorships", []):
            author = authorship["author"]
            author_id = author["id"].split("/")[-1]
            
            author_node = KnowledgeNode(
                id=author_id,
                type="person",
                label=author["display_name"],
                source="openalex",
                layers=["research"]
            )
            self.neo4j.upsert_node(author_node)
            
            edge = TemporalEdge(
                source_id=author_id,
                target_id=work_id,
                type="authored",
                valid_from=paper_node.year,
                confidence=1.0,
                evidence_count=1
            )
            self.neo4j.upsert_edge(edge)
            print(f"  Ingested Author: {author_node.label}")
            
        # 4. Ingest Referenced Works (citations)
        referenced_works = work.get("referenced_works", [])[:10] # Cap at 10 for demo speed
        for ref_url in referenced_works:
            ref_id = ref_url.split("/")[-1]
            # Create a placeholder node for the referenced work (to be fully hydrated later)
            ref_node = KnowledgeNode(
                id=ref_id,
                type="paper",
                label=f"Referenced Work {ref_id}",
                source="openalex",
                layers=["research"]
            )
            self.neo4j.upsert_node(ref_node)
            
            # CITED edge
            cited_edge = TemporalEdge(
                source_id=work_id,
                target_id=ref_id,
                type="cited",
                valid_from=paper_node.year,
                confidence=1.0,
                evidence_count=1
            )
            self.neo4j.upsert_edge(cited_edge)
            
        return work_id

if __name__ == "__main__":
    # Test script for Milestone 1 ingestion
    connector = OpenAlexConnector()
    connector.neo4j.create_constraints()
    connector.fetch_and_ingest_paper("Attention is all you need")
    connector.neo4j.close()
