# Onboarding Guide

This document explains how to get productive quickly in this repository, including for AI coding agents.

## 1. Read these first
Read in this order:
1. `AGENTS.md`
2. `README.md`
3. `docs/SSOT.md`
4. `docs/ARCHITECTURE.md`
5. `docs/API.md`

## 2. Understand the repo
- `app/` — storefront UI
- `server/` — reference API and canonical catalog seed
- `api/` — deployment-facing wrapper
- `docs/` — system, onboarding, and contract documentation

## 3. Critical constraints
- Do not invent product or customer data.
- Do not edit generated catalog files by hand.
- Use `server/seed.json` as the source of truth.
- Keep API behavior and docs synchronized.
- Preserve accessibility and semantic HTML.
- Prefer surgical fixes over broad rewrites.

## 4. Local setup
```bash
npm run doctor
npm run setup
cd app
npm run dev
```

If you need remote API behavior:
```bash
cd app
VITE_USE_REMOTE_API=true VITE_API_BASE_URL=http://localhost:8787 npm run dev
```

If you need the reference backend:
```bash
cd server
npm start
```

## 5. Standard workflow
1. Understand the task.
2. Read the exact files involved.
3. Propose the smallest correct change.
4. Implement the fix.
5. Validate the changed scope.
6. Update docs if behavior changes.
7. Summarize with evidence.

## 6. AI-agent checklist
- [ ] I read `AGENTS.md`
- [ ] I read the relevant implementation files
- [ ] I checked whether the change affects product data, API, SEO, or auth
- [ ] I ran the relevant validation commands
- [ ] I updated docs when behavior changed
- [ ] I checked accessibility
- [ ] I avoided invented data or fake UI

## 7. When stuck
- Re-read `AGENTS.md` and `docs/SSOT.md`
- Search for relevant surrounding patterns
- Prefer the existing modules in `app/src/lib` and `app/src/components`

## 8. Final confidence check
Before concluding work:
- tests pass where relevant
- build passes where relevant
- no stale docs
- no duplicate data sources
- no fake or placeholder behavior

## 9. Success criteria
A good patch is:
- correct
- minimal
- documented
- tested
- accessible
- aligned with the repo’s source-of-truth rules
