from database import Neo4jConnection

def initialize_schema():
    conn = Neo4jConnection()
    with conn.get_session() as session:
        print("Creating constraints for Evolith temporal schema...")
        
        queries = [
            "CREATE CONSTRAINT concept_name IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE",
            "CREATE CONSTRAINT tech_name IF NOT EXISTS FOR (t:Technology) REQUIRE t.name IS UNIQUE",
            "CREATE CONSTRAINT paper_id IF NOT EXISTS FOR (p:Paper) REQUIRE p.id IS UNIQUE",
            "CREATE CONSTRAINT repo_id IF NOT EXISTS FOR (r:Repository) REQUIRE r.id IS UNIQUE",
            # We will create indexes on temporal properties for faster timeline filtering
            "CREATE INDEX tech_birth_year IF NOT EXISTS FOR (t:Technology) ON (t.birth_year)",
            "CREATE INDEX concept_birth_year IF NOT EXISTS FOR (c:Concept) ON (c.birth_year)"
        ]
        
        for query in queries:
            session.run(query)
            
        print("Schema constraints created successfully.")
    conn.close()

if __name__ == "__main__":
    initialize_schema()
