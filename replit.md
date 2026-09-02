# SOMU GAME Marketplace

A nostalgic browser-game marketplace featuring five directly playable games.

## Run & Operate

- Run the managed `artifacts/somu-game-marketplace: web` workflow to open the marketplace at `/`.
- `pnpm --filter @workspace/somu-game-marketplace run typecheck` — typecheck the marketplace.
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- The current marketplace is frontend-only and does not require the API server.
- Run the managed `artifacts/api-server: API Server` workflow only when developing API features.
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- API/DB features require `DATABASE_URL` — a PostgreSQL connection string.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/somu-game-marketplace/` — the marketplace React/Vite app.
- `artifacts/api-server/` — the optional Express API service.
- `lib/api-spec/openapi.yaml` — API contract source of truth.
- `lib/db/` — PostgreSQL and Drizzle configuration.
- `attached_assets/` — imported game source documents and brand assets.

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Browse a SOMU GAME arcade marketplace.
- Open five browser games in embedded playable surfaces.
- Navigate marketplace, collection, and community sections.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
