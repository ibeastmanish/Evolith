# ADR 0008: Semantic Query Language (KQL)

## Context
While Neo4j and Cypher power the backend graph traversals, users (and future AI agents) should not need to write Cypher. We need a domain-specific semantic query language—Knowledge Query Language (KQL)—that maps directly to the evolutionary thesis.

## Decision
Evolith will implement a semantic translation layer that parses natural language or structured KQL commands into optimized Cypher queries. 

### Core Primitives
* `SHOW evolution OF [Node]` -> Returns the timeline of ancestors and successors.
* `SHOW ancestors OF [Node]` -> Traverses upstream `EVOLVES_INTO`, `INFLUENCES` edges.
* `SHOW descendants OF [Node]` -> Traverses downstream edges.
* `SHOW technologies REPLACED_BY [Node]` -> Traverses upstream `OBSOLETES` edges.
* `COMPARE [Node A] WITH [Node B]` -> Computes the similarity score and highlights Knowledge Mutations.
* `SHOW shortest_path BETWEEN [Node A] AND [Node B]` -> Graph traversal for influence mapping.
* `SHOW strongest_influences OF [Node]` -> Sorts upstream edges by `confidence` and `strength`.

### Advanced / Predictive (V2)
* `SIMULATE removal OF [Node]` -> Drops node and recalculates downstream dependency fragility.
* `PREDICT successors OF [Node]` -> Invokes the GNN/Similarity engine to guess the next mutation.

## Consequences
- The API layer will expose these semantic routes (e.g., `GET /api/kql?query=SHOW evolution OF React`).
- This abstraction allows the underlying graph schema to evolve without breaking the user-facing mental model.
