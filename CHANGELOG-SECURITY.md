# Security Changelog — Forensic Science Learning Platform

Running log of security fixes. Each entry maps to a commit on the audit branch.

## 2026-09-14

### commit `13c3a8d` — fix(deps): upgrade react-router-dom 6.30.6 → 7.18.3
- Clears `CVE-2025-68470` bypass (open redirect via backslash in `<Link>`/`useNavigate`) and `GHSA-337j-9hxr-rhxg` (constructor injection via `deserializeErrors()`, SSR-hydration only).
- No source changes required: app uses declarative mode (`<BrowserRouter>`/`<Routes>`), preserved in v7. Build verified.

### commit `24bcc00` — fix(deps): upgrade vite 5.4.21 → 8.3.0
- Clears `GHSA-4w7w-66w2-5vf9` (optimized-deps `.map` path traversal), `GHSA-fx2h-pf6j-xcff` (Windows `server.fs.deny` bypass, CVSS 7.5), `GHSA-v6wh-96g9-6wx3` (launch-editor NTLMv2 disclosure), and `GHSA-67mh-4wv8-2f99` (esbuild dev-server request exfil).
- Adapter changes for Vite 8 / Rolldown: `manualChunks` object → function form; `@` alias via `import.meta.url` instead of `__dirname` (future `configLoader: 'native'`).

### baseline commit `eaf36f5` — included with initial import
- Added `.gitignore` (excludes `node_modules/`, `dist/`, `*.tsbuildinfo`, `.env*`, OS/editor junk) — prevents future accidental commits of build artifacts or secrets (was F3).
- Added `<meta>` Content-Security-Policy + `Referrer-Policy` to `index.html` (was F4): `default-src 'self'`, `script-src 'self' 'unsafe-inline'` (required by Vite dev preamble), `style-src 'self' 'unsafe-inline'` (Tailwind inline styles), `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `frame-src 'none'`, img/font `'self' data:`, `connect-src 'self' ws: wss:` (dev HMR). Defense-in-depth; production-grade nonce/hash CSP belongs at hosting headers.

## Status after fixes
- `npm audit`: **0 vulnerabilities** (was 4: 1 high dev-only, 3 moderate).
- `npm run build`: green (Vite 8.3.0, 92 modules, vendor chunk emitted).
- Remaining recommendations (hosting-level, out of repo scope): enforce HTTPS + HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or CSP `frame-ancestors` header), and a hash/nonce-based strict CSP at the edge.

## 2026-09-14 (follow-up — observability, committed `c7763e8`)

CSP meta was widened to support optional Sentry telemetry (activated only when a DSN is set at build; see CHANGELOG-SCALABILITY.md):
- `script-src` += `https://browser.sentry-cdn.com`
- `connect-src` += `https://*.ingest.sentry.io`

No sandbox/trust boundary weakened vs the shipped app: `script-src 'self' 'unsafe-inline'` already allowed inline module preamble; the added origins are Sentry's official CDN + ingest, reachable only when an error is reported and a DSN was configured. If Sentry is never activated, these origins are allowed-but-unused. If you prefer stricter defaults, remove the two origins and Sentry stays inactive.