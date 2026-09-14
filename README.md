# ForensicLab — Interactive Forensic Science Learning Platform

> Turn the science of evidence into something you can *do* — not just read.

ForensicLab is a classroom-notes-turned-interactive learning platform that teaches forensic science the way the field actually works: by following evidence from the crime scene, through the laboratory, into the exam room, and onto the witness stand. Every topic is grounded in a real academic syllabus, every lesson is quizzed, every simulator ends with the honest limits of what the real test can conclude — and there is a full mock-exam centre to prove you are ready.

[**Live app**](https://localhost) · [**Syllabus map**](#the-learning-path) · [**Simulators**](#interactive-simulators)

---

## Why this exists

Textbooks describe the Kastle–Meyer test. This platform *runs it*.

The content was built from a forensic-science lecture series and technology showcase project, then corrected and expanded so that **the science teaching the "obvious" answer gets right, and the science that isn't obvious gets taught properly**. Key lesson corrections include:

- **A positive presumptive test is an *indication*, never a confirmation** — the reagent is not human-blood specific.
- **DNA tells you *who* — usually not *what they did***. Source and activity are different questions and courts know the difference.
- **Match statistics are about rarity, not guilt.** No probability of commission appears anywhere in the syllabus.
- **Controls are the argument.** A conclusion stands or falls on the controls that accompanied it.

## The learning path

Forty-nine topics track the real structure of a forensic syllabus, plus four support layers that hold the theory together:

| Layer | What it is |
| --- | --- |
| **Foundations** | Locard, individuality, comparison, the progressive process — the principles every case leans on |
| **Biology** | ABO & MN/ Rh grouping, antigen–antibody, agglutination, immunodiffusion, DNA profiling, dried stains |
| **Chemistry** | Presumptive & confirmatory blood tests, forensic chemistry, toxicology centre |
| **Trace & comparison** | Glass, paint, fibre, soil, toolmarks, impressions, footwear — the physics of contact |
| **Laboratory & QA** | Evidence lifecycle, chain of custody, quality control, the laboratory as a system (created as part of the reference-integrity pass that made every cross-link resolvable) |
| **Documents & prints** | Fingerprints, handwriting, questioned documents |
| **Digital & AI** | Digital-media authentication, timeline reconstruction, AI decision support |

Reinforcing all of it:

- **9 interactive learning modules** — CSI workflows, controlled-zone searching, evidence collection (biological and non-biological), origin-of-species reasoning, and the forensic-technology showcase.
- **Principle & glossary layers** — exploring why the principles matter and a 50+ term glossary with fully cross-linked topics.
- **Case studies** — three worked scenarios (a contested red stain, a silent poisoning, broken glass) that let you apply the science before you see the analyst's reasoning.

## Interactive simulators

Don't just read the science — run it. Ten simulators, built to teach a concept *and* the honest limit of the real test behind it:

| Simulator | Teaches |
| --- | --- |
| **ABO Inheritance** | Predicting child blood groups — phenotype & genotype modes |
| **Antigen–Antibody Typing** | Why agglutination happens |
| **Double Immunodiffusion** | Precipitin-line formation in agarose |
| **Presumptive Blood Tests** | Luminol & Kastle-Meyer — and why positive never means "proven" |
| **Chain of Custody** | Every transfer of an item, documented |
| **Inference Builder** | Drafting a forensic claim, then testing it against claim grammar |
| **Outcome as Evidence** | Taking a finished analysis into the evidential intake record |
| **Timeline Forge** | Reconstructing events from drifting device clocks — drag events, re-order, and read the divergence report |
| **The Witness Box** | Surviving cross-examination against the clock — calibrate, object, or stall |
| **Scene Explorer** | Don your PPE, survey a secured scene on a floor plan, then make the recovery calls that hold in court |

## Mock-Exam Centre

- **27 dedicated exam questions** merged with the exercise banks, across **8 categories** (full syllabus, foundations, biology, chemistry, physics, laboratory, documents & digital).
- **Timed runs** — the 1-minute-per-question clock, auto-submit, and score bands (Exam ready → Revision needed).
- **Performance dashboard** — built from your stored quiz history; flags weak categories and recommends three topics for each.
- **Quick Revision sheets** — one-page mnemonics per category to close the gaps the dashboard finds.
- Lengths from 10 to 30 questions, timed or untimed.

## Show-and-tell features

- **Global command search** — quickly jump across topics, disciplines, principles, glossary terms, cases, simulators, modules and pages.
- **Progress tracking** per topic, quiz and simulator — persisted locally, driving the home-screen completion ring and the exam weak-area analysis.
- **A print-aware, court-flavoured design system** — dark laboratory palette, evidence tags, and components that treat every result like a reportable finding.
- **About page** that documents exactly how the PDF source material was turned into this platform and which bits needed scientific correction.

## Screens

| Route | Page |
| --- | --- |
| `/` | Home — progress ring, learning path, simulators, modules |
| `/learn`, `/learn/:topicId` | Learning hub & topic reader |
| `/explore`, `/explore/:disciplineId` | Twenty-two disciplines, each with topic clusters |
| `/principles` | Foundational principles |
| `/modules`, `/modules/:slug` | Module library & guide |
| `/simulators`, `/simulators/:id` | Simulator bench & runners |
| `/exam` | Mock-exam centre & revision sheets |
| `/quizzes` | Quiz banks |
| `/cases`, `/cases/:slug` | Case studies |
| `/glossary`, `/glossary/:term` | Glossary with topic cross-links |
| `/laboratory` | Laboratory workflow |
| `/about` | How the content was built |
| `/more` | Off-canvas navigation panel |

## Tech

- **React 18** with TypeScript and `react-router` v7
- **Vite** 8 for an instant dev loop
- **Tailwind CSS** 3 with a custom **pink-and-black** palette — near-black `navy` surfaces with a pink undercurrent, `pink` accents and `rose` for alerts
- **Zero runtime dependencies beyond the framework** — all content lives in typed data files under `src/data`

## Getting started

```bash
# install
npm install

# run the dev server (hot reload)
npm run dev

# production build (TypeScript check + Vite build)
npm run build

# preview the production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173).

### Project layout

```
src/
  data/          typed content: topics, glossary, modules, disciplines,
                 principles, cases, quizzes, exam bank, simulators
  components/    UI primitives (Icon, UI blocks) + every simulator engine
  pages/         route-level views
  lib/           progress store, SEO helpers, types
```

## Contributing / notes

- **Icons** are declared in a whitelist in `src/components/Icon.tsx` — add new icons there, not inline.
- **Cross-linking is verified**: every topic, glossary term and discipline reference resolves to a real topic (an audit pass added six foundational topics to eliminate all dangling links).
- **Educational scope** — every simulator is a teaching replica. It reproduces the *logic* of a laboratory test; nothing a simulator produces is a real forensic result and must never be used for casework.

## Forensic-coded source conventions

This codebase is written (and reviewed) like an evidence ledger, so the naming and the discipline reinforce each other:

| Forensic idea | What it maps to here |
| --- | --- |
| Case file | A Git branch — `feat/`, `perf/`, `fix/`, `docs/` prefixes are the case *types* |
| Chain-of-custody log | `CHANGELOG-SECURITY.md` / `CHANGELOG-SCALABILITY.md` — every change is a dated entry, nothing is anonymous |
| Evidence exhibits | Typed content under `src/data/` — TypeScript is the tamper-evident seal; structural invariants fail the build rather than silently degrade |
| Evidentiary findings | UI primitives in `src/components/forensic.tsx` (`ExhibitTag`, `CaseStampBar`, `ChainStatusDot`) plus `EvidenceCard` in `display.tsx` |
| Contamination | A bug or regression; the changelogs record source, elimination, and the re-test that cleared it |
| Control runs | `npm run build` (`tsc -b` + Vite) and deep-link smoke tests — a conclusion stands or falls on the controls that accompanied it |
| Breaking the seal | Never commit secrets, never touch production, never merge without review — evidence that cannot be verified is worthless |
| Analyst | The learner/self — simulators are stamped *"Analyst: Self (learner)"* because the person running the exercise is the one accountable for the interpretation |

Rule of thumb: if a change cannot be described as a defensible entry in an evidence log, it does not land on this branch.

---

Built to be the bridge between the lecture hall and the lab bench — where the pattern is read before it is touched, the control is your argument, and the honest phrase is "presumptive positive."