import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { getCaseBySlug, cases } from '../data/cases'
import { PageHeader, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'
import { EvidenceCard, ProcessTimeline } from '../components/display'
import { recordCaseDecision } from '../lib/progress'

const correctAnswers: Record<string, Record<string, number>> = {
  'red-stain': { 'ds-1': 1, 'ds-2': 1, 'ds-3': 1, 'ds-4': 1, 'ds-5': 0, 'ds-6': 1, 'ds-7': 3 },
  'silent-poison': { 'tp-1': 1, 'tp-2': 1, 'tp-3': 1, 'tp-4': 1 },
  'broken-glass': { 'bg-1': 1, 'bg-2': 1, 'bg-3': 1 },
}

const feedbackText: Record<string, Record<string, string>> = {
  'red-stain': {
    'ds-1':
      'Documentation first. Photography, scales, measurements and a sketch capture context before any physical step can alter the exhibit — the foundation of everything that follows.',
    'ds-2':
      'Presumptive screening first. You establish the category of the stain (possible blood?) before spending scarce, confirmatory resources. DNA profiling comes much later.',
    'ds-3':
      'Presumptive ≠ proof. The pink colour indicates heme-like activity; it is neither species-specific nor confirmatory. More specific methods and profiling follow.',
    'ds-4':
      'The chain-of-custody record is compromised. If the laboratory cannot prove who handled the item and when, every result can be challenged — even a perfect profile.',
    'ds-5':
      'DNA comparison is the right step, and it needs references. Compare against everyone legitimately present, not only one person — so the interpretation is not biased by a single hypothesis.',
    'ds-6':
      'Source-level match only. The profile indicates the complainant’s biological material is present on the door frame. Activity (how it got there) is a separate question.',
    'ds-7':
      'All of the above. Presence does not prove the person was at the scene, the stain’s age is beyond this evidence, and a stain alone never “proves a crime.” Honest reports state each gap.',
  },
  'silent-poison': {
    'tp-1':
      'Immunoassays are presumptive screens. They flag possible drug classes quickly, but identity confirmation always comes from a more specific method.',
    'tp-2':
      'Cross-reactivity. Antibodies can recognize similar molecules, so a “positive” screen must be confirmed by gas or liquid chromatography–mass spectrometry.',
    'tp-3':
      'Published ranges give context, but interpretation is individual — tolerance, timing and pathology all modify the meaning of a concentration.',
    'tp-4':
      'Interpretation after death is genuinely harder: redistribution, delayed metabolism, post-mortem concentration changes and individual tolerance all add uncertainty.',
  },
  'broken-glass': {
    'bg-1':
      'Refractive index is a class-level property. It says the questioned and known glass could share a source — it cannot name the exact window.',
    'bg-2':
      'Consistent characteristics support a possible common source, but green float glass is extremely common and transfers easily. The conclusion must stay at that level.',
    'bg-3':
      'Green float glass is common, transfers on ordinary contact, and fragments are easy to pick up. That makes glass a useful corroborative marker but a weak individualizer.',
  },
}

const interpretGuide = [
  { key: 'supported', label: 'Supported', desc: 'Your wording matched a source-level, calibwered conclusion ("consistent with", "could be", "supports contact").', tone: 'green' },
  { key: 'requires', label: 'Requires additional evidence', desc: 'The conclusion is reasonable but more context is needed before it contributes meaning.', tone: 'amber' },
  { key: 'overstated', label: 'Overstated', desc: 'Your wording asserted more than the data support — certainty and activity claims beyond source level.', tone: 'crimson' },
  { key: 'notsupported', label: 'Not supported', desc: 'Your conclusion went against what the evidence can show.', tone: 'slate' },
]

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{label}</span>
      <span className="text-[11px] font-mono text-gray-300">{value}</span>
    </div>
  )
}

function assessInterpretation(text: string): { flags: Set<string>; reason: string } {
  const t = text.toLowerCase()
  const flags = new Set<string>()
  const words = t.split(/\s+/).filter(Boolean)
  const certainty = /prove[d]?|proves|definitely|definitive|guilt(?:y)?|committed|certain(?:ty)?|must have|undoubted|conclusive/.test(t)
  const calibrated = /consistent with|could be|may be|might be|possible|possibly|suggest|support[s]?|indicat|source|contact|cannot|not proven|requires|need[s]?|uncertain/.test(t)
  const overreach = /proved (he|she|they)|guilty|definitely|committed the (crime|burglary|assault|offence)/.test(t)

  if (words.length < 8) {
    flags.add('requires')
    return { flags, reason: 'Very little was stated. A scientific conclusion should name the evidence, the level of the finding, and the remaining uncertainty.' }
  }
  if (certainty && !calibrated) {
    flags.add('overstated')
    flags.add('notsupported')
    return { flags, reason: 'Strong certainty language dominated. Blood/DNA presence establishes source, not activity or guilt — asserting certainty overreaches the data.' }
  }
  if (certainty && calibrated) {
    flags.add('overstated')
    return { flags, reason: 'The conclusion mixed calibrated language with certainty claims. Consider dropping the certainty claims to line up the wording with the true strength of the evidence.' }
  }
  if (overreach) {
    flags.add('notsupported')
    return { flags, reason: 'The wording attributes activity or guilt to the source match — that is not what biological source evidence can establish.' }
  }
  if (calibrated) {
    flags.add('supported')
    return { flags, reason: 'Your wording is calibrated to the strength of the evidence: source or presence claims with appropriately hedged language. This is exactly the right habit.' }
  }
  flags.add('requires')
  return { flags, reason: 'The conclusion neither over-claimed nor clearly grounded itself in the evidence. Try naming the specific finding and its meaningful limit.' }
}

export default function CasePage() {
  const { caseSlug } = useParams<{ caseSlug: string }>()
  const c = getCaseBySlug(caseSlug ?? '')

  useSEO({
    title: c ? `${c.title} — Case File` : 'Case not found',
    description: c?.summary,
    path: `/cases/${caseSlug}`,
  })

  const [answers, setAnswers] = useState<Record<string, { chosen: number; hintUsed: boolean }>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [interpretation, setInterpretation] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)
  const [showHint, setShowHint] = useState<Record<string, boolean>>({})

  const guidance = useMemo(() => (submitted ? assessInterpretation(interpretation) : null), [submitted, interpretation])

  if (!c) {
    return (
      <div className="page-container">
        <PageHeader title="Case not found" />
        <Link to="/cases" className="topic-link">← All case files</Link>
      </div>
    )
  }

  const correctFor = correctAnswers[c.id] ?? {}
  const feedbackFor = feedbackText[c.id] ?? {}

  const answeredCount = Object.keys(answers).length
  const correctCount = Object.entries(answers).filter(([id, a]) => correctFor[id] === a.chosen).length
  const current = c.decisions[stepIndex]
  const isLast = stepIndex === c.decisions.length - 1
  const allAnswered = answers[current.id] !== undefined

  const select = (optIdx: number) => {
    if (revealed[current.id]) return
    const next = { ...answers, [current.id]: { chosen: optIdx, hintUsed: !!showHint[current.id] } }
    setAnswers(next)
    setRevealed((r) => ({ ...r, [current.id]: true }))
    recordCaseDecision(c.id, Object.keys(next).length, false)
  }

  const nextStep = () => {
    if (isLast) return
    setStepIndex((s) => s + 1)
  }

  const submitInterpretation = () => {
    setSubmitted(true)
    setShowAssessment(true)
    recordCaseDecision(c.id, c.decisions.length, true)
  }

  const progressPct = Math.round((answeredCount / c.decisions.length) * 100)

  return (
    <div className="page-container">
      <Link to="/cases" className="topic-link text-sm">← All case files</Link>

      <div className="mt-4 mb-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-3 rounded-lg border border-navy-600/40 bg-navy-900/50 px-4 py-3">
          <Meta label="Agency" value={c.agency ?? 'State Forensic Science Laboratory'} />
          <Meta label="Case ref" value={c.caseRef ?? c.tag.split(' · ')[0]} />
          <Meta label="Filed" value={c.date ?? '2026'} />
          <Meta label="Unit" value={c.tag.split(' · ')[1] ?? 'Laboratory'} />
          <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-gray-500">Difficulty · {c.difficulty}</span>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-crimson-400 mb-2">{c.tag}</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{c.title}</h1>
        <p className="text-gray-400 mt-2">{c.subtitle}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Investigation progress</span>
          <span className="font-mono">{answeredCount}/{c.decisions.length} decisions · {progressPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-navy-700 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-crimson-500 to-crimson-400 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Brief & scenario */}
      <section className="mb-8">
        <div className="space-y-4">
          <div className="glass-panel p-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <Icon name="report" className="w-4 h-4" /> Case brief
            </h2>
            <p className="text-gray-300 leading-relaxed">{c.brief}</p>
          </div>

          <div className="glass-panel p-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <Icon name="camera" className="w-4 h-4" /> Scene summary
            </h2>
            <ul className="space-y-2">
              {c.scenario.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="text-[10px] font-mono text-gray-500 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <Icon name="bag" className="w-4 h-4" /> Exhibits
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {c.evidence.map((e) => (
                <EvidenceCard key={e.id} id={e.id} label={e.description} tone="crimson" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Decisions flow */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-xl font-bold tracking-tight">Decision {stepIndex + 1} of {c.decisions.length}</h2>
          <div className="flex gap-1.5" aria-label="Decision steps">
            {c.decisions.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setStepIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  answers[d.id] ? 'bg-emerald-400' : i === stepIndex ? 'bg-crimson-400' : 'bg-navy-600 hover:bg-navy-500'
                }`}
                aria-label={`Jump to decision ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div key={current.id} className="glass-panel p-5 sm:p-6 animate-fade-in">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1.5">
                {current.kind === 'free-text' ? 'Write your answer' : 'Choose the best response'} · {String(stepIndex + 1).padStart(2, '0')}
              </p>
              <h3 className="text-lg font-bold text-white leading-snug">{current.question}</h3>
            </div>
            <button
              onClick={() => setShowHint((h) => ({ ...h, [current.id]: !h[current.id] }))}
              className="shrink-0 btn-ghost !px-2.5 !py-1.5 !text-xs text-amber-400"
              aria-expanded={showHint[current.id]}
            >
              {showHint[current.id] ? 'Hide hint' : 'Hint'}
            </button>
          </div>

          {showHint[current.id] && !revealed[current.id] && (
            <p className="text-sm text-amber-300/90 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 mb-4 animate-fade-in">
              <Icon name="lightbulb" className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
              {current.hint}
            </p>
          )}

          {current.kind === 'choice' && current.options ? (
            <div className="grid gap-2" role="group">
              {current.options.map((opt, i) => {
                const chosen = answers[current.id]?.chosen === i
                const isCorrect = correctFor[current.id] === i
                const state = revealed[current.id] ? (isCorrect ? 'correct' : chosen ? 'wrong' : 'muted') : 'idle'
                return (
                  <button
                    key={opt}
                    onClick={() => select(i)}
                    disabled={revealed[current.id]}
                    className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
                      state === 'correct'
                        ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-100'
                        : state === 'wrong'
                        ? 'border-crimson-500/60 bg-crimson-600/15 text-crimson-100'
                        : state === 'muted'
                        ? 'border-navy-600/40 text-gray-500'
                        : chosen
                        ? 'border-crimson-500/70 bg-crimson-600/10 text-white'
                        : 'border-navy-600/50 text-gray-300 hover:border-crimson-500/50 hover:bg-navy-800'
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-mono border ${
                        state === 'correct' ? 'border-emerald-500/60 text-emerald-400'
                        : state === 'wrong' ? 'border-crimson-500/60 text-crimson-400'
                        : 'border-navy-500/60 text-gray-500'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <textarea
              value={(answers[current.id] as unknown as { text?: string } | undefined)?.text ?? ''}
              onChange={(e) => {
                const next = { ...answers, [current.id]: { chosen: -1, hintUsed: !!showHint[current.id], text: e.target.value } }
                setAnswers(next)
              }}
              rows={4}
              placeholder={current.textPlaceholder ?? 'Write your reasoning…'}
              className="w-full bg-navy-800 border border-navy-600/50 text-gray-200 text-sm rounded-lg px-4 py-3 outline-none focus:border-cyan-500"
            />
          )}

          {revealed[current.id] && feedbackFor[current.id] && (
            <div className={`mt-4 rounded-lg px-4 py-3 text-sm leading-relaxed animate-fade-in ${
              correctFor[current.id] === answers[current.id]?.chosen
                ? 'bg-emerald-500/10 text-emerald-200/90 border border-emerald-500/30'
                : 'bg-crimson-600/10 text-crimson-200/90 border border-crimson-500/30'
            }`}>
              <span className="font-semibold">
                {correctFor[current.id] === answers[current.id]?.chosen ? 'Correct reasoning. ' : 'This choice cuts against the science. '}
              </span>
              {feedbackFor[current.id]}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {!isLast ? (
              <button className="btn-secondary" disabled={!revealed[current.id] && !allAnswered} onClick={nextStep}>
                Next decision
                <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            ) : !submitted ? (
              <span className="text-xs text-gray-500">All decisions are the foundation — now make your interpretation below.</span>
            ) : null}
            {stepIndex > 0 && (
              <button className="btn-ghost !px-3 !py-2 !text-sm" onClick={() => setStepIndex((s) => Math.max(0, s - 1))}>
                ← Previous
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Interpretation */}
      <section className="mb-10">
        <div className="glass-panel p-5 sm:p-6 border-crimson-500/30">
          <h2 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <Icon name="scale" className="w-5 h-5 text-crimson-400" /> Your interpretation
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            In two or three sentences, state what this evidence supports — and what it does not. Use the language of
            science, not of a verdict.
          </p>
          <textarea
            value={interpretation}
            onChange={(e) => setInterpretation(e.target.value)}
            rows={5}
            placeholder="Example: 'The presumptive test indicates possible blood, confirmed as human by species-specific testing. The DNA profile is consistent with the complainant's reference. This supports that the complainant's biological material is present on the door frame. It cannot establish how or when the material was deposited, and it does not by itself prove a crime occurred.'"
            className={`w-full bg-navy-800 border text-gray-200 text-sm rounded-lg px-4 py-3 outline-none transition-colors ${
              submitted ? 'border-navy-600/40 opacity-80' : 'border-navy-600/50 focus:border-cyan-500'
            }`}
            disabled={submitted}
            aria-label="Your scientific interpretation of the evidence"
          />
          {!submitted ? (
            <button className="btn-primary mt-4" onClick={submitInterpretation} disabled={interpretation.trim().length < 20}>
              Submit interpretation
              <Icon name="check" className="w-4 h-4" />
            </button>
          ) : (
            <button className="btn-ghost mt-4 !text-sm text-cyan-400" onClick={() => {
              setSubmitted(false)
              setShowAssessment(false)
            }}>
              Revise interpretation
            </button>
          )}
          {!submitted && interpretation.trim().length > 0 && interpretation.trim().length < 20 && (
            <p className="text-xs text-amber-400 mt-2">A useful interpretation needs more than one clause — add the level and the limits.</p>
          )}
        </div>
      </section>

      {/* Scientific assessment */}
      {submitted && guidance && showAssessment && (
        <section className="mb-10 animate-fade-in">
          <h2 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <Icon name="shield" className="w-5 h-5 text-cyan-400" /> Scientific assessment
          </h2>
          <p className="text-sm text-gray-400 mb-5">
            An automated, educational screen of your wording. No code can fully judge an interpretation — but it can
            catch the classic overstatement pattern.
          </p>

          <div className="glass-panel p-5 sm:p-6 mb-5">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Automated reading</p>
            <p className="text-gray-200 leading-relaxed">{guidance.reason}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {interpretGuide.map((g) => {
              const flagged =
                (g.key === 'supported' && guidance.flags.has('supported')) ||
                (g.key === 'requires' && guidance.flags.has('requires')) ||
                (g.key === 'overstated' && guidance.flags.has('overstated')) ||
                (g.key === 'notsupported' && guidance.flags.has('notsupported'))
              return (
                <div key={g.key} className={`rounded-lg border p-4 transition-colors ${
                  flagged ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-navy-600/40 bg-navy-900/50'
                }`}>
                  <h3 className={`font-bold mb-1.5 ${flagged ? 'text-emerald-300' : 'text-gray-300'}`}>
                    {flagged && <Icon name="check" className="w-4 h-4 inline mr-1 -mt-0.5" />}
                    {g.label}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{g.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Decision score */}
          <div className="glass-panel p-5 mt-6">
            <h3 className="font-bold text-white mb-1">Decision review</h3>
            <p className="text-sm text-gray-400 mb-4">
              You answered {correctCount} of {c.decisions.length} decisions with the scientifically supported choice.
            </p>
            <div className="space-y-1.5">
              {c.decisions.map((d, i) => {
                const got = correctFor[d.id] === answers[d.id]?.chosen
                return (
                  <div key={d.id} className="flex items-center gap-2.5 text-sm">
                    <span className={`h-5 w-5 shrink-0 rounded-md inline-flex items-center justify-center ${
                      got ? 'bg-emerald-500/20 text-emerald-400' : 'bg-crimson-600/20 text-crimson-400'
                    }`}>
                      <Icon name={got ? 'check' : 'close'} className="w-3 h-3" />
                    </span>
                    <span className="text-gray-300">{d.question.length > 90 ? d.question.slice(0, 90) + '…' : d.question}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Expected concepts + objectives */}
      {!submitted && (
        <section className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="glass-panel p-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-3">What good practice expects</h2>
            <ul className="space-y-2">
              {c.expectedConcepts.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-gray-300">
                  <Icon name="check" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-crimson-400 mb-3">Learning objectives</h2>
            <ul className="space-y-2">
              {c.learningObjectives.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-gray-300">
                  <Icon name="lightbulb" className="w-4 h-4 text-crimson-400 mt-0.5 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Key science */}
      <section className="mb-10">
        <h2 className="text-xl font-bold tracking-tight mb-4">Science in this case</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {c.keyScience.map((k) => (
            <div key={k.title} className="glass-panel p-5">
              <h3 className="font-bold text-white mb-2">{k.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{k.body}</p>
            </div>
          ))}
        </div>
      </section>

      <InfoBlock title="Interpretation note" tone="amber">
        {c.interpretationNote}
      </InfoBlock>
    </div>
  )
}