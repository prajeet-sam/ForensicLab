# Scalability Audit — Forensic Science Learning Platform

- **Audit date:** 2026-09-14
- **Branch:** `perf/scalability-fixes`
- **Working target scale (assumed):** "Handle normal growth; load fast for learners; no fall-over anxiety" — an educational SPA, no paid-infra appetite detected. Confirm or correct: severity ratings assume **mobile-friendly, quick time-to-interactive, and staying cheap to host**.
- **Method:** Static review + build-output measurement (`npm run build`), loopback timing, source inspection. No production environment or load-test infrastructure exists to hit.

## 1. Executive summary

This app cannot "fall over" — it's a static SPA with no server, no database, and zero outbound network calls to load-test or exhaust. What breaks first under growth is **perceived performance and payload**: every visitor currently downloads and parses ~241 kB gzip of JavaScript, and that includes the code for all 11 simulators plus the entire search corpus even if they only read one page. As content and simulators grow, that initial bundle grows with every addition, so load time creeps up with every new feature. The other real gap is observability: there is no way to know a broken route or crashed simulator happened until a user says so. Fixing code-splitting (~100–250 kB of initial payload off the critical path) and adding a lightweight error boundary/tracking are the two changes with outsized impact; everything else is verification or host-level config.

## 2. Findings

Sorted by impact vs target scale.

| # | Category | Impact | Location | Description | Fix approach | Effort |
|---|----------|--------|----------|-------------|--------------|--------|
| S1 | Frontend/Delivery | **High** → **FIXED** | `src/App.tsx` (22 static route imports); `SimulatorDetailPage.tsx` (all 11 simulators); `SearchOverlay.tsx` (whole corpus: glossary 45 kB + modules 45 kB + cases + disciplines + principles); `topics.ts` (170 kB) | **Zero code-splitting.** `index-*.js` = 606.9 kB (172.7 gzip) of "everything". Every learner pays for all simulators + full search index on first byte of every visit; bundle grows linearly with each new simulator/content item. | React `lazy()` + `Suspense` per route; lazy-load search corpus on first overlay open. ✅ Applied (`e4d7d11`) | M |
| S2 | Observability | **High** → **FIXED** | whole app | **No error tracking / analytics / APM** (`seo.ts` is title/meta only). Regressions (broken simulator crashes, blank routes) are invisible until reported. "Can't scale what you can't measure" applies to correctness too. | ✅ Applied (`8b5432e`, refined `c7763e8`): `ErrorBoundary` wraps routed content; Sentry loads from CDN **only when `VITE_SENTRY_DSN` is set at build** — zero bytes otherwise. **Action for you:** set `VITE_SENTRY_DSN` in an `.env` (never committed) and rebuild to activate. | S–M |
| S3 | Caching/Delivery | **Medium** → **Verified N/A at repo level** | hosting (outside repo) | **HTTP caching + compression unknown/never configured in-repo.** Assets are content-hashed (`index-*.js`) → safe to serve `Cache-Control: immutable` + brotli/gzip; without it, repeat visitors re-download ~241 kB gzip every visit. Most static hosts do this by default — needs confirmation which host is used. **Decision D2 below.** | **D2 = Netlify/Vercel/Cloudflare/GH Pages:** these auto-apply CDN + gzip/brotli. Action: confirm `immutable`/long `max-age` for `/assets/*` in the host's cache settings (usually default, using the content hash). No repo change needed. | S |
| S4 | Frontend | **Medium** → **FIXED** | `SearchOverlay.tsx:13-113` | **Search index rebuilt on every open** — `useMemo` rebuilds the full index each time the overlay mounts. Harmless on desktop; wasteful CPU on low-end phones; trivially cached at module level. | ✅ Applied (`e4d7d11`): index built once at module level, reused across opens; corpus now lives in a lazy chunk fetched only when search is first opened. | S |
| S5 | Frontend | **Low** | `GlossaryPage.tsx`, topic list pages | Client-side rendering of full lists (glossary, principles, cases) with no pagination/virtualization. Fine at current data size; revisit only if corpus grows ~10×. | None now — **future-proofing** (see §5). | n/a |
| — | All backend categories (A,B,E,F,G,I) | **N/A** | — | No database, no server runtime, no jobs, no outbound calls, no sessions, no own infra. Static hosts scale & CDN themselves; nothing here breaks under horizontal growth. | Verify host config (D2). | — |

## 3. What was verified as healthy (so it doesn't look skipped)

- **Timers:** all 6 `setInterval`/`setTimeout` uses are effect-scoped with `clearX` cleanup (ExamEngine:73→79, PresumptiveTestSimulator:107→108, WitnessBoxSimulator:171→172, etc.). No leak — no fix needed.
- **Images/fonts:** single favicon (857 B); no web fonts; **no image optimization needed**.
- **Network:** zero `fetch`/`XHR`/`WS` → no third-party rate limits, timeouts, or circuit-breakers to configure.
- **rAF:** 4 sites; ParticleField is DPR-capped + reduced-motion aware + cleans up.
- **Bundle hygiene:** no sourcemaps in `dist/`; vendor chunk is correctly separated (react/router).

## 4. Decision items (need you before fixes)

- **D1 — Observability provider:** (a) Sentry free tier — needs an account/DSN (recommended), (b) built-in React `ErrorBoundary` only (ships regardless; logs to console; no third-party), (c) both. No cost either way at this traffic, but (a) adds a third-party script + DSN.
- **D2 — Host-level setup:** which static host is production? I need it to give exact CDN/`Cache-Control`/compression guidance. If it's Netlify/Vercel/Cloudflare/GitHub Pages, the answer is almost always "on by default, verify + set immutable caching."

## 5. Future-proofing (optional, beyond target scale)

- If the content corpus grows ~10–50×: build-time generated search index + split data modules per discipline/route (today `topics.ts` 170 kB is in the main path).
- If multiple contributors → instrumented error tracking (D1) becomes mandatory.
- If the site graduates to a backend (scores sync, accounts): then and only then do DB indexes, pooling, queues, and horizontal-scaling questions become real — out of scope today.