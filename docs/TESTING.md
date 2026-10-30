# Testing Guide

## Standard commands
```bash
cd app
npm run lint
npm test -- --run
npm run test:coverage
npm run build
npm run test:e2e
npm run test:e2e:degraded

cd ../server
npm test
npm run catalog:check
```

## What to test
- catalog generation
- API contract behavior
- checkout flow
- cart logic
- route rendering
- SEO metadata
- accessibility regressions

## Rules
- Test behavior, not implementation details.
- Prefer focused tests for changed logic.
- Keep tests deterministic.
- Do not hide real issues behind fake network responses.
- Verify the changed behavior, not just the happy path.

## AI agent expectation
If you change behavior, add or update tests if practical. If you deliberately skip tests, explain why in the change summary.
