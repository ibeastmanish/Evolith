# ADR 0003: Temporal Model

## Context
If Evolith is a "living ecosystem," nodes must have a lifecycle, not just a creation timestamp.

## Decision
Every Node will carry the following temporal lifecycle properties:
- `birth_date`: When it was introduced.
- `growth_start`: When adoption began to accelerate.
- `peak_date`: When it hit maximum relative adoption.
- `decline_start`: When it began losing ground to successors.
- `death_date`: When it became officially deprecated or unused.

Edges will also carry `start_date` and `end_date` (if applicable) to denote when an influence or relationship was active.
