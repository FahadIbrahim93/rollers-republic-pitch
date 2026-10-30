# Source of Truth (SSOT)

## Purpose
This repository must not have conflicting product sources.

## Canonical product source
The canonical source for catalog data is:
- `server/seed.json`

## Rules
- Never hand-edit generated app catalog data.
- Never create a second catalog source.
- Never duplicate product data across app files.
- Regenerate app catalog data when seed content changes.

## Why this matters
Conflicting product sources create:
- stale products
- fake or missing entries
- broken assortment logic
- inconsistent pricing and SEO
- onboarding confusion

## Implementation expectations
- The app must derive product data from the canonical source.
- Generated catalog output should match the API contract.
- Any catalog-related task should inspect both the seed and its generated output.

## Validation
Use:
```bash
cd server
npm run catalog:check
```

## Enforcement
If product data changes, validate the catalog and confirm that the app remains aligned with the source of truth.
