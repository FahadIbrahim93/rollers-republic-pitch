# AI Onboarding Guide

This document is the entry point for anyone working on the Rollers Republic repo, including AI coding agents. It consolidates the key setup steps, architecture map, and guardrails so onboarding is fast and consistent.

## 1) What this repo is
Rollers Republic is a production e-commerce storefront for a Bangladeshi headshop brand. It includes:

- a customer-facing storefront in `app/`
- a Node reference API in `server/`
- a Vercel serverless wrapper in `api/`
- supporting design, SEO, and operational documentation in `docs/`

The primary goal is to provide a polished storefront experience, a real catalog flow, a checkout journey, and an SEO-aware static build.

## 2) Startup essentials
### Minimum requirements
- Node.js 20+
- npm 10+
- a POSIX shell or Git Bash/PowerShell equivalents

### One-time setup
```bash
npm run doctor
npm run setup
```

That should install app and server dependencies, verify the repo is consistent, and reduce onboarding errors.

### Run the app
```bash
cd app
npm run dev
```

The app defaults to local bundled data. For the remote reference API:

```bash
cd app
VITE_USE_REMOTE_API=true VITE_API_BASE_URL=http://localhost:8787 npm run dev
```

### Run the API
```bash
cd server
npm start
```

## 3) Project layout
```text
/
  README.md                 project overview and quick start
  AGENTS.md                 required workflow and guardrails for coders
  package.json              root scripts: doctor, build, setup, catalog checks
  app/                      React storefront
    src/                    app source files
    scripts/                catalog, prerender, sitemap, generated assets
    e2e/                    Playwright end-to-end tests
  server/                   reference API service
    index.js                backend implementation
    seed.json               product catalog single source of truth
    test/                   server integration tests
  docs/                     architecture, API, SSOT, SEO, pitch docs
  api/                      Vercel serverless wrapper
  .github/                  issue templates, PR template, workflow config
```

## 4) Documentation stack to read first
When onboarding or starting a task, read in this order:

1. `AGENTS.md`
2. `README.md`
3. `docs/SSOT.md`
4. `docs/ARCHITECTURE.md`
5. `docs/API.md`
6. the exact files affected by the task

This keeps AI and human contributors aligned on product truth, implementation conventions, and architecture.

## 5) Core business rules
The project intentionally uses a strict “single source of truth” approach:

- `server/seed.json` is the product catalog source of truth
- generated app catalog data should be refreshed from it, not edited ad hoc
- business configuration is centralized in `app/src/lib/config.ts`
- API behavior is defined by `docs/API.md`
- product and route metadata must remain consistent with the SEO and prerender requirements

Violating these rules creates inconsistent data, broken local builds, and avoidable onboarding friction.

## 6) Required workflow for code changes
Every task should follow this path:

1. Read the relevant documentation and code.
2. Identify whether the task affects app, server, or docs.
3. Plan the smallest correct fix.
4. Change the minimum needed files.
5. Verify with the most relevant test commands.
6. Update docs if behavior changed.

## 7) Quality gates
Run these checks before finalizing a task:

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
cd .. && npm run catalog:check
```

If a task only touches a subset of behavior, use the smallest relevant test subset, but do not skip the project’s required verification before completion.

## 8) Accessibility and product quality expectations
All work must respect the same standards as the live storefront:

- WCAG 2.1 AA is the baseline
- icon-only buttons and links need accessible labels
- route flows must remain usable for keyboard and screen-reader users
- forms must be wired to actual handlers, not decorative UI
- checkout, search, filtering, and cart behaviors must remain consistent

## 9) Common pitfalls
Avoid these common onboarding mistakes:

- editing generated files instead of source-of-truth files
- using mock data as a substitute for real app/API behavior
- leaving routes unhandled or broken
- ignoring SEO and prerender requirements for product pages
- changing API contract shapes without updating docs and tests
- shipping UI that looks finished but is not actually connected

## 10) Working with AI agents
AI coders are expected to:

- read the repo before patching
- keep changes targeted and evidence-based
- validate with commands instead of assumptions
- follow the repo’s guardrails and documentation first
- ask for clarification only when the required business/technical truth is genuinely ambiguous

This repo is not a generic starter app; it is a production storefront with a defined contract and explicit standards.

## 11) Useful commands summary
```bash
# Validate project health
npm run doctor

# Install dependencies
npm run setup

# Run frontend
cd app && npm run dev

# Run API
cd server && npm start

# Validate repo
cd app && npm run lint && npm test -- --run && npm run build
cd server && npm test
cd .. && npm run catalog:check
```

## 12) Support and ownership
If a task touches launch-critical flows, consult the project’s documentation and business rules first. If you are uncertain whether a change is in scope, default to the existing architecture, source-of-truth patterns, and project docs.
