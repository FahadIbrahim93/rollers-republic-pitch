# GitHub Copilot instructions

## Purpose
Assist with implementation, maintenance, documentation, and verification in this repository.

## Mandatory context before patching
Before writing code, read:
- `AGENTS.md`
- `docs/SSOT.md`
- `docs/ARCHITECTURE.md`
- `docs/API.md`
- the exact files being modified

## Core repository rules
- Do not invent product or customer data.
- Do not manually edit generated catalog files.
- Treat `server/seed.json` as the source of truth.
- Keep frontend and API contracts aligned.
- Prefer small, targeted changes.
- Preserve accessibility and semantic HTML.
- Ensure support for both local bundled-data and remote API modes unless the task explicitly scopes otherwise.
- Do not create fake or nonfunctional UI.
- Do not add placeholder features that look complete but do not work.

## Architecture awareness
- `app/` contains the storefront UI.
- `server/` contains the reference API and seed data.
- `api/` contains the production serverless wrapper.
- `docs/` contains architecture, onboarding, and contract references.

## Workflow
1. Read the docs and relevant code.
2. Make the smallest correct change.
3. Validate the smallest affected scope.
4. Update docs when behavior changes.
5. Summarize the evidence with commands run.

## Validation
Before claiming completion, run the relevant checks:
- frontend lint/tests/build as needed
- backend tests when server logic changes
- affected accessibility or E2E checks when UI changes
- catalog validation when product data changes

## Response expectations
- Be explicit about what changed.
- Cite verification commands run.
- Distinguish between assumptions and verified facts.
- Prefer project patterns over new frameworks or shortcuts.
