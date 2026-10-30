# Rollers Republic

Production e-commerce storefront for Rollers Republic.

## Overview
This repository contains the storefront, the reference API, and the deployment-facing wrapper for the business.

## Stack
- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- Zustand
- TanStack Query
- Node reference API
- Vercel deployment

## Repository structure
```text
.
├── app/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── server/
│   ├── index.js
│   ├── seed.json
│   └── ...
├── api/
│   └── ...
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── SSOT.md
│   ├── ONBOARDING.md
│   ├── TESTING.md
│   ├── DECISIONS.md
│   ├── CHANGELOG.md
│   └── ...
├── AGENTS.md
├── CONTRIBUTING.md
├── README.md
├── .github/
│   ├── copilot-instructions.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── package.json
└── ...
```

## Quick start
```bash
npm run doctor
npm run setup
cd app
npm run dev
```

## Development modes

### Local bundled catalog
```bash
cd app
npm run dev
```

### Remote API mode
```bash
cd app
VITE_USE_REMOTE_API=true VITE_API_BASE_URL=http://localhost:8787 npm run dev
```

### Reference API
```bash
cd server
npm start
```

## Quality checks
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

## Important rules
- The application uses `server/seed.json` as the source of truth for product data.
- Generated catalog output must not be hand-edited.
- Update API docs, product docs, and tests together when behavior changes.
- Accessibility is required for all UI changes.
- Do not invent product facts, mock customer reviews, or fake business claims.

## Contributing
See `CONTRIBUTING.md` and `AGENTS.md`.

## License
Follow the repository's legal policy and any project-specific licensing files.
