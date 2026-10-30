# Decision Log

This file records the important design and implementation decisions that shape the project.

## Decision 1: Single source of truth for catalog data
The product catalog must come from `server/seed.json`.

Rationale:
- avoids drift between frontend and backend
- keeps the catalog consistent and reproducible
- reduces onboarding confusion and maintenance burden

## Decision 2: Generated catalog files are not manually edited
Generated catalog files are derived artifacts.

Rationale:
- prevents duplication and silent drift
- reduces review churn
- aligns with reproducible generation workflows

## Decision 3: Avoid fabricated business claims and fake customer proof
The storefront should not invent review counts, statistics, endorsements, or pricing claims unless explicitly sourced and verified.

Rationale:
- prevents trust and compliance issues
- keeps the project honest
- reduces the risk of misleading demo content

## Decision 4: Accessibility is a first-class requirement
UI changes must maintain accessible semantics, touch targets, color contrast, and heading structure.

Rationale:
- reduces regressions
- helps maintain usability for all users
- keeps the project ready for CI and review

## Decision 5: Small, verifiable changes beat broad rewrites
Changes should be narrow, easy to understand, and directly validated.

Rationale:
- easier debugging
- simpler reviews
- better AI-agent reproducibility

## Decision 6: Documentation must evolve with behavior
Any user-visible or contract-visible change requires docs updates.

Rationale:
- keeps onboarding accurate
- reduces confusion
- preserves institutional memory
