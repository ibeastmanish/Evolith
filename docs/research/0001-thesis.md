# ADR 0001: The Core Thesis

## Context
Traditional knowledge graphs model factual relationships statically. Technical knowledge, however, is not static; it evolves. Frameworks are born, they grow, peak, and are eventually obsoleted by new paradigms. 

## Decision
Evolith models technical knowledge as a **living, evolving ecosystem** whose concepts, technologies, and implementations are born, influence one another, merge, split, and decline over time. 

## Consequences
- The graph cannot be static. Time must be a first-class dimension.
- Every node and edge requires temporal metadata (birth, peak, decline).
- Visualization will prioritize timeline sliders and animations over static node-link diagrams.
