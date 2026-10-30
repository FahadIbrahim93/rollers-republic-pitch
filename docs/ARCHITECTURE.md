# Architecture

## Overview
This repo is organized into three runtime layers:
- frontend storefront
- reference API
- production Vercel API wrapper

## Frontend
The storefront lives in `app/` and is responsible for:
- product browsing
- cart and checkout flow
- static metadata and SEO
- account and auth flow
- route rendering and navigation

## Backend
The reference API lives in `server/` and implements the API behavior described in `docs/API.md`.

## Production wrapper
The `api/` layer provides same-origin deployment behavior for the app.

## Data flow
1. Product data originates from `server/seed.json`.
2. Catalog output is generated for the app.
3. The storefront reads the generated catalog or remote API responses.
4. Checkout and account experiences rely on the same contract and state shape.

## Key design principles
- single source of truth for catalog data
- small, domain-based modules
- minimal cross-layer surprises
- testable behavior
- accessible UX
- no fake claims or fabricated data

## Folder guide
- `app/src/pages` — route-level screens
- `app/src/components` — reusable UI
- `app/src/lib` — configuration, API logic, validation, SEO, utils
- `app/src/store` — client state
- `server/` — API implementation and seed data
- `docs/` — architecture and contract docs
