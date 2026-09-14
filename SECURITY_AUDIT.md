# Security Audit — Forensic Science Learning Platform

- **Audit date:** 2026-09-14
- **Scope:** Source tree `C:\Users\HP\Desktop\Forensic-Notes` (excludes `node_modules/`, `dist/` build output re-verified separately)
- **Audit branch:** `security/audit-fixes`
- **Method:** Static review + dependency scan (`npm audit`) + targeted source greps. No dynamic/penetration tooling, no production traffic.

## Environment

| Item | Value |
|------|-------|
| Application type | Static client-side SPA: Vite 5 + React 18 + TypeScript (React Router v6, Tailwind 3) |
| Backend / database | None — no server runtime in the repo; `dist/` is a pure static bundle |
| Auth / user accounts | None — all content public; no sessions, cookies, or credentials |
| Payments / uploads / PII | None present |
| Outbound network use | Zero (`fetch`/`XHR`/`WS`/`EventSource` — none found) |
| Persistent storage | `localStorage` only (`src/lib/progress.ts`); holds progress counters, no sensitive data |
| Hosting | Not observed from repo; presumed standard static host (headers not configurable in-app) |
| Test suite | None (`npm run build` = `tsc -b && vite build`; `npm audit`; `npm ls` used for verification) |

## Phase 1 — Recon & Attack Surface Summary (verified true)

- 9 runtime deps / 184 total; 2 JS chunks + favicon in `dist/`; **0 sourcemaps** in `dist/` output.
- **Entry points (client-only):** search overlay (queries static in-memory index), quiz/exam submission (graded locally), simulator interactions, and static URL paths. Nothing is serialized outbound.
- **Inbound data:** static TS data modules (`src/data/*.ts`) rendered through React (auto-escaped).
- **Sinks:** no `dangerouslySetInnerHTML`, `eval`, `innerHTML=`, `document.write`, or `insertAdjacentHTML` anywhere in `src/`.
- **Input → output flows:** search query is bounded-input only; `GlossaryPage.tsx:75` encodes IDs (`encodeURIComponent`) before path interpolation; all `Link`/`Navigate` targets are static strings or static-data-derived (`${id}` paths from data, never raw user input).
- **Secrets:** none found. No `.env`/`secrets`/credential/backup/admin files in tree; git history has **zero commits**, so nothing was ever committed.
- **Regex inventory** (ReDoS check): `bench.tsx:232` anchored date match; `ModuleLibraryPage.tsx:161` prefix-strip. Linear, non-exploitable.

## Phase 2 — OWASP-Oriented Checklist Sweep

| Area | Verdict | Notes |
|------|---------|-------|
| A01 Broken Access Control | N/A | No auth/roles; all routes public by design |
| A02 Cryptographic Failures | N/A (low) | No sensitive data at rest/in transit; HTTPS is hosting responsibility |
| A03 Injection (XSS/SQLi/etc.) | Low | No sinks (verified); no server for SQLi/command/template injection; React default escaping |
| A04 Insecure Design | Low | No trust boundaries; lab content is static; client-side scoring only |
| A05 Security Misconfiguration | Medium | Missing security headers/CSP (`index.html` has none — R4); no `.gitignore` (R3) |
| A06 Vulnerable & Outdated Components | High | `react-router-dom` in prod bundle (R2); `vite`/`esbuild` dev-only (R1) |
| A07 Identification & Auth Failures | N/A | No auth mechanism exists |
| A08 Software & Data Integrity | Medium | `package-lock.json` present (pins installs) but **untracked** — root cause R3 |
| A09 Logging & Monitoring | N/A | No backend events to log |
| A10 SSRF | N/A | No server-side request capability |
| Open redirect | Low | Static internal targets only; react-router advisory applies to user-supplied URLs (none exist) |
| Redos, prototype pollution, zip-slip, clickjacking | Low / N/A | See A05 (frame-ancestors) and regex inventory above |

## Findings & Risk Register

Severity scale: **Critical / High / Medium / Low / Info**.

| ID | Sev | Type | Finding | Evidence |
|----|-----|------|---------|----------|
| F1 | ~~High (dev-only)~~ **FIXED** | Vulnerable component | `vite@5.4.21` + `esbuild@<=0.24.2`: path-traversal in optimized-deps `.map` handling (GHSA-4w7w-66w2-5vf9), Windows `server.fs.deny` bypass (GHSA-fx2h-pf6j-xcff, CVSS 7.5), launch-editor NTLMv2 disclosure (GHSA-v6wh-96g9-6wx3), and dev-server request exfil (GHSA-67mh-4wv8-2f99). **Only affects `vite dev`/`preview`, not the static production bundle.** | `npm audit` |
| F2 | ~~Medium~~ **FIXED** | Vulnerable component | `react-router-dom@6.30.6` ships vulnerable `react-router@^6` (CVE-2025-68470 bypass: open redirect via backslash in `Link`/`useNavigate`; GHSA-337j-9hxr-rhxg constructor injection via `deserializeErrors()`, SSR-hydration only). App **is in prod bundle** but uses only static internal paths and no SSR — exploitability currently low. Fix available only via major bump to `7.18.3`. | `npm audit` |
| F3 | ~~Medium~~ **FIXED** | Misconfiguration | **No `.gitignore`.** Repo initialized but commit-less; `node_modules/`, `dist/`, `tsconfig.tsbuildinfo`, and a future `.env` would all be swept into an initial `git add .`. Supply-chain/secret hygiene risk. | `Test-Path .gitignore` = missing |
| F4 | ~~Low~~ **FIXED** | Misconfiguration | No security headers / CSP / referrer policy anywhere; static host default only. No `<meta>` CSP in `index.html` head. Clickjacking/referrer-leak mitigation currently absent. | `index.html` head review |

Not raised: no CVEs affect the shipped bundle (F1 is build-time only); no secrets historically present; no XSS sinks; no outbound data flow. `npm audit` total: 4 advisories (0 critical, 1 high [dev-only], 3 moderate), 0 vulnerable prod-runtime packages beyond the router.

## Remediation Plan (Phase 4 — applied, see CHANGELOG-SECURITY.md)

| Fix | Change | Status |
|-----|--------|--------|
| R3 | Add `.gitignore` (`node_modules/`, `dist/`, `*.tsbuildinfo`, `.env*`, OS junk) | ✅ Applied (baseline commit `eaf36f5`) |
| R2 | Upgrade `react-router-dom` → `7.18.3`; declarative mode preserved; build + nav verified | ✅ Applied (`13c3a8d`) |
| R1 | Upgrade `vite` → `8.3.0` (`manualChunks` → function form, alias via `import.meta.url`); build verified | ✅ Applied (`24bcc00`) |
| R4 | Add conservative `<meta>` CSP + referrer policy to `index.html` (`script-src 'self' 'unsafe-inline'`, `style-src 'self' 'unsafe-inline'`, `object-src 'none'`, `frame-ancestors 'none'`, …) | ✅ Applied (baseline commit `eaf36f5`) |

Production — none.

**Post-fix:** `npm audit` = **0 vulnerabilities**; `npm run build` green on Vite 8.3.0.

## Verification Plan (Phase 5)

1. `npm run build` — must stay green (86 modules baseline).
2. `npm audit` — re-run; expect 0 remaining.
3. `npm ls` — confirm no duplicate/patched-versions drift.
4. Manual smoke: search, glossary links (has `encodeURIComponent`), simulator routes, mobile nav, `ParticleField` render.
5. If F2/F1 upgraded: verify `dist/` output unchanged in entry points + `manualChunks` still emit `vendor` chunk.

## Assumptions & Limitations

- Hosting-level controls (TLS, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, server-side CSP headers) are out of repo scope; verified only in so far as they can be influenced from `index.html` (meta CSP, referrer policy).
- No live/service scan; static-source + dependency-level audit only.
- No secrets were printed; nothing was committed; no production endpoints exist to touch.