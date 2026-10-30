# GitHub Copilot instructions for Rollers Republic

## Project overview
This repo is a production-grade storefront for Rollers Republic, a headshop e-commerce brand. It has two main runtime pieces:

- `app/`: React 19 + TypeScript storefront (Vite 7, Tailwind CSS 4, React Router 7, Zustand, TanStack Query)
- `server/`: zero-dependency Node reference API that implements the storefront contract in `docs/API.md`
- `api/`: Vercel serverless wrapper used for same-origin production requests

The single source of truth for product data is `server/seed.json`; generated app catalog data must be derived from it, not edited manually.

## Mandatory reading before coding
Before making changes, read the relevant implementation and documentation:

- `AGENTS.md`
- `docs/SSOT.md`
- `docs/ARCHITECTURE.md`
- `docs/API.md`
- the specific files being edited

If a change affects product data, checkout flow, SEO, or auth behavior, also read the relevant docs and the current implementation in `app/src/lib` and `server/index.js` before patching.

## Core rules
- Never invent data or fake product content. If a feature needs real data, use the existing catalog and API contract.
- Never hand-edit generated app catalog files; update `server/seed.json` and regenerate via the project scripts.
- Keep API contracts aligned with the frontend. Do not change request/response shapes without updating docs and tests.
- Prefer small, targeted changes; do not broad-scope refactors unless explicitly requested.
- Preserve accessibility standards: aria-labels for icon-only controls, semantic headings, color contrast, touch targets.
- Keep the app working in both bundled-data mode and remote API mode unless a task explicitly scopes to one path.

## Local development
Use the repo scripts instead of ad hoc commands:

```bash
npm run doctor
npm run setup
cd app
npm run dev
```

For remote API work:

```bash
cd app
VITE_USE_REMOTE_API=true VITE_API_BASE_URL=http://localhost:8787 npm run dev
```

For the reference API:

```bash
cd server
npm start
```

## Quality gates
Before declaring work complete, run the relevant commands:

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

If a change affects UI logic, run at least the focused unit or E2E tests for that area. If it affects product data, run `catalog:check`.

## Commit and PR hygiene
- Keep changes scoped to the task.
- Update docs when behavior changes.
- Include evidence-based validation in the PR summary.
- Do not claim a task is complete without running the relevant commands.

## Definition of done
A task is not done if any of the following are true:

- there are failing lint/test/build checks
- docs are stale for a changed behavior
- product data is duplicated or manually edited in the wrong source
- the solution is speculative, unverified, or merely “looks right”

## File map
- `app/src/pages/` — route-level screens
- `app/src/lib/` — API client, config, SEO, validation, cart logic
- `app/src/store/` — Zustand state
- `app/src/components/` — UI primitives and reusable layout sections
- `server/index.js` — API implementation
- `server/seed.json` — catalog single source of truth
- `docs/SSOT.md` — business rules and implementation expectations
- `docs/API.md` — contract between frontend and API

## AI-specific safety rules
- Do not create dummy UIs or placeholder controls that do not work.
- Do not reference nonexistent images/assets.
- Do not create duplicate data sources or mock implementations when a real project source exists.
- Ensure routes include a safe fallback for unknown paths.
- Prefer project-native patterns and existing libraries over new frameworks or ad hoc architecture.

## When in doubt
Follow the repo’s existing conventions, read the relevant docs, and prefer the minimal fix that matches the current architecture and rules.
