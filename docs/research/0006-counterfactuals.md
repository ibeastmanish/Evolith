# ADR 0006: Counterfactuals & Prediction

## Context
If we accurately model the history of technological evolution, the system should be able to simulate alternate histories or predict the future.

## Decision
This is deferred to V2. However, the architecture (specifically the Neo4j temporal indexes and the confidence scores) must be designed from day one to support predictive Graph Neural Networks (GNNs) and temporal queries (e.g., "What happens to the graph if we remove node X in 2015?").
