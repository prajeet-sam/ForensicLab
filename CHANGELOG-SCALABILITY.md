# Changelog (Scalability) — Forensic Science Learning Platform

Running log of scale/performance fixes. Each entry: what was slow/fragile, what changed, which files, before/after measurement.

## 2026-09-14

### commit `e4d7d11` — perf: lazy-load all routes and search corpus
- **Slow/fragile:** single 606.9 kB JS chunk (`index-*.js`, 172.7 kB gzip) containing every page, all 11 simulators, and the entire search corpus shipped on every visit. Bundle grew with every added feature.
- **Changed:** all 20 routed pages + the global `SearchOverlay` → `React.lazy()` wrapped in `Suspense` (with themed fallback); `ErrorBoundary` stays above so chunk failures show fallback UI. Search index built once at module level (`getGlobalIndex()`) instead of per-mount.
- **Files:** `src/App.tsx`, `src/components/SearchOverlay.tsx`.
- **Measurement:**
  - Before (first paint): index 606.9 / 172.7 gzip + vendor 173.9 / 58.8 + runtime 0.6 + css 46.8 / 8.9 → **~828 kB raw / ~241 kB gzip**.
  - After (first paint): index 39.4 / 10.1 + vendor 173.9 / 57.4 + runtime 0.7 / 0.4 + css 45.8 / 8.9 → **~260 kB raw / ~77 kB gzip** (−68% / −68%).
  - After: SimulatorDetailPage chunk 142 kB raw (37.7 gzip) loads only on `/simulators/:id`; topics data 142.6 kB raw only on pages that render topics; search corpus (glossary+modules+cases+disciplines) only on first search open.
  - Tradeoff: navigation to a route now fetches its chunk (dev-server-first-load latency moved from page parse to chunk fetch). Acceptable; route chunks are small except simulators.

### commit `8b5432e` + `c7763e8` — feat/refactor(obs): error boundary + Sentry (observability)
- **Fragile:** zero error visibility; a broken route/simulator would go unnoticed until a user reported it.
- **Changed:** `<ErrorBoundary>` wraps routed content (themed fallback + console diagnostic). Sentry telemetry added but **zero-cost until activated**: initial design bundled `@sentry/react` (which Rolldown preloaded at entry, +158 kB gzip startup) → replaced with the official Sentry CDN loader, injected only when `VITE_SENTRY_DSN` is set at build time. No `.env` committed; `.gitignore` already excludes `.env*`.
- **Files:** `src/components/ErrorBoundary.tsx`, `src/lib/sentry.ts`, `index.html` (CSP: `script-src` + `browser.sentry-cdn.com`; `connect-src` + `*.ingest.sentry.io`), `vite.config.ts`.
- **To activate:** create `.env` with `VITE_SENTRY_DSN=https://...@o000000.ingest.sentry.io/1234567`, rebuild, deploy. Errors then flow to your project.
- **Measurement:** app payload unaffected — Sentry adds 0 bytes when DSN unset (verified: no sentry chunks in `dist/`, no modulepreload).

## What still does not scale to target (Phase 5 notes)

- The homepage's `topics.ts` data (142.6 kB raw / ~44 kB gzip) is inherent to the content rendered there. If the topic corpus ever grows ~10×, split it by discipline/route (noted as future work in SCALABILITY_AUDIT.md §5); a grew corpus would otherwise push the topics chunk.
- Production host is one of Netlify/Vercel/Cloudflare/GH Pages (D2): CDN + gzip/brotli are on-by-default — confirm `/assets/*` is cacheable `immutable` in the host's settings; nothing in repo controls this.
- Everything else on the Phase 2 checklist (database, backend, jobs, concurrency, third-party) is N/A for a static SPA with zero outbound network calls.

## Verification

- `npm run build` green at every step (final: 34 chunks, 792 kB raw *aggregate* across all chunks vs 828 kB in a single chunk before).
- Dev-server smoke: 7 deep links (Home, Learn, Topic, Simulator, Case, Exam, Glossary) all HTTP 200.
- No test suite exists in this repo; verification = typecheck+build (`tsc -b && vite build`) + deep-link smoke + bundle measurement. No load-testing tool is applicable to a static host (no server to load).