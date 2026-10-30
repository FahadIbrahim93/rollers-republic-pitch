# Workflow and issue management

This document defines the expected working rhythm for the Rollers Republic repo so that both humans and AI coders can operate consistently without ad hoc onboarding.

## 1) Project workflow

### Before touching code
Read the following in order:

1. `AGENTS.md`
2. `README.md`
3. `docs/SSOT.md`
4. `docs/ARCHITECTURE.md`
5. `docs/API.md`
6. the exact file(s) to be changed

This is the minimum safe read path. If the task affects product data, checkout, pricing, SEO, or cache/static generation, read the relevant docs and implementation code before editing.

### Standard task flow
1. Identify the root cause or desired behavior.
2. Confirm the source of truth.
3. Make the smallest safe change.
4. Add or update tests if behavior changes.
5. Validate with the relevant commands.
6. Update docs when behavior changes.
7. Submit a PR with evidence from commands run.

## 2) Source-of-truth boundaries

The repo has clear ownership for each layer:

- `server/seed.json` — product catalog truth
- `app/src/lib/config.ts` — business configuration truth
- `docs/API.md` — API contract truth
- `docs/SSOT.md` — business rules and design truth
- `app/src/pages/` and `app/src/lib/` — runtime behavior
- `server/index.js` — reference backend behavior

If a bug is caused by drift between layers, fix the source of truth and the dependent consumers in the same change set.

## 3) Issue and task classification

### Bug report
Use for broken behavior, regressions, missing functionality, or invalid content.

Required fields:
- clear reproduction steps
- expected vs actual result
- environment and version details
- impacted route or feature area
- screenshots or logs if needed

### Feature request
Use for new capability or product work.

Required fields:
- problem statement
- proposed solution
- acceptance criteria
- dependencies or blockers
- rollout or validation plan

### Documentation issue
Use if onboarding, architecture, or workflow docs are unclear or incomplete.

## 4) Definition of done
A task is not done unless all of the following are true:

- the behavior is implemented in the relevant source of truth and consumers
- tests or validation checks are run and passed
- docs are updated when behavior changes
- accessibility rules are preserved for UI changes
- no fake/mock UI or ghost dependencies are introduced
- the change is scoped to the actual task

## 5) Required validation commands

### Frontend
```bash
cd app
npm run lint
npm test -- --run
npm run test:coverage
npm run build
npm run test:e2e
npm run test:e2e:degraded
```

### Backend
```bash
cd server
npm test
```

### Catalog/data consistency
```bash
cd ..
npm run catalog:check
```

If the task is narrower, use the smallest relevant tests, but never skip the repo’s validation gate before closing a task.

## 6) PR expectations
Each PR should include:

- a short summary of the change
- what files were touched and why
- what validation was run
- notes on accessibility where relevant
- any risk or follow-up items

The repo’s PR template should be followed for every submission.

## 7) AI agent operating rules

AI contributors must:

- read the repo before patching
- prefer existing project structure and patterns
- avoid dummy UI or fake functionality
- keep changes narrow and evidence-based
- validate with commands, not assumptions
- never hand-edit generated data without updating the source-of-truth first

## 8) Handoff and continuity

When handing work to another coder or AI agent, include:

- the task goal
- root cause or issue summary
- files involved
- validation run and current status
- any open risks or dependencies

This reduces confusion and avoids repeated onboarding work.

## 9) Escalation
Escalate to a human when:

- business logic is ambiguous
- product decisions require stakeholder approval
- API or catalog changes affect the production contract materially
- deployment or SEO changes may affect customer-facing behavior

## 10) Success criteria
A contributor is successful when they can:

- bootstrap the repo without guesswork
- find the source of truth for the area they are changing
- run the right validation commands
- ship changes with clear evidence and minimal friction

That is the standard this repository aims to maintain.
