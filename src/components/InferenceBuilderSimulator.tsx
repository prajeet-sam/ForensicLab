import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { completeSimulator } from '../lib/progress'
import { BenchPanel, PaperDoc, PaperField, PaperRule, Stamp, StatusLed, nowLocalInput, formatReadable } from './bench'

interface Analysis {
  id: string
  label: string
  icon: string
  level: 'source' | 'association' | 'weak-source'
  note: string
  truth: { source: string; activity: string; scene: string }
}

const analyses: Analysis[] = [
  {
    id: 'str',
    label: 'STR DNA profiling',
    icon: 'dna',
    level: 'source',
    note: 'Associates the stained profile with a known person at source level — it cannot, by itself, say what activity deposited the DNA.',
    truth: {
      source: 'Ties the profile to a known person. Source-level claim is directly supported.',
      activity: 'Cannot, on its own, say how or when the DNA was deposited — transfer, timing and mechanism stay open.',
      scene: 'Cannot narrate events. It reports a property of the sample, not a story of the crime.',
    },
  },
  {
    id: 'fing',
    label: 'Fingerprint comparison',
    icon: 'fingerprint',
    level: 'source',
    note: 'Associates a latent mark with a known print source — with no information about when or how it was deposited.',
    truth: {
      source: 'Ties the mark to a print source. A mark can be individualised with stated uncertainty.',
      activity: 'Cannot say when the mark was left, for how long, or under what pressure.',
      scene: 'Cannot narrate events on its own — presence of a mark is not a description of what happened.',
    },
  },
  {
    id: 'fire',
    label: 'Firearms comparison',
    icon: 'ballistic',
    level: 'source',
    note: 'Associates fired ammunition with a questioned barrel or action through toolmark correspondence.',
    truth: {
      source: 'Links fired ammunition to a questioned barrel/action where correspondence is sufficient.',
      activity: 'Only limited activity statements with extra context (distance, sequence). Brandishing and firing remain separate questions.',
      scene: 'Cannot narrate the event — correspondence is silent on who held the weapon or why it fired.',
    },
  },
  {
    id: 'glass',
    label: 'Glass comparison',
    icon: 'glass',
    level: 'association',
    note: 'Supports an association with evidential weight — glass rarely, if ever, individualises to a single source.',
    truth: {
      source: 'Class-level association only — "consistent with a common source" at best, never individualising.',
      activity: 'Transfer timing unknowable. Glass is common background and transfers on ordinary contact.',
      scene: 'Cannot narrate events. Presence of glass says nothing about a break-in sequence.',
    },
  },
  {
    id: 'abo',
    label: 'ABO grouping',
    icon: 'abo',
    level: 'weak-source',
    note: 'A classic exclusion tool. It can rule people out, but only weakly supports an association because most people share common types.',
    truth: {
      source: 'Exclusion is strong; inclusion is weak — most people share each group. No individualisation.',
      activity: 'Cannot carry activity claims of any kind.',
      scene: 'Cannot carry narrative claims of any kind.',
    },
  },
]

interface Level {
  id: 'source' | 'activity' | 'scene'
  label: string
  self: string
}

const levels: Level[] = [
  { id: 'source', label: 'Source', self: 'Originated from — "the profile matches the suspect."' },
  { id: 'activity', label: 'Activity', self: 'An action happened here — "the suspect punched the victim and bled on the floor."' },
  { id: 'scene', label: 'Whole-scene narrative', self: 'A full story of the event — "the suspect attacked the victim in this room."' },
]

interface Weight {
  id: 'verbal' | 'lr' | 'percent' | 'none'
  label: string
  self: string
}

const weights: Weight[] = [
  { id: 'verbal', label: 'Verbal scale', self: '"extremely likely that it originates from…"' },
  { id: 'lr', label: 'Quantified likelihood ratio', self: '"a likelihood ratio of around 1 in 1,000,000,000 for an unrelated person"' },
  { id: 'percent', label: 'Single percentage', self: '"a 99.9% probability of a match"' },
  { id: 'none', label: 'No explicit weight', self: '"it is a match."' },
]

interface Rubric {
  id: string
  check: string
  ref: 'Science' | 'Court'
  status: 'ok' | 'warn' | 'fail'
  text: string
}

const MIN_WORDS = 8

const verbalNote =
  'A calibrated verbal scale is accepted in many courts — provided the scale words, their probabilities and the underlying data stay in the report.'
const lrNote =
  'Quantifying the strength of evidence is the most honest currency — but the LR only works if the report states the propositions and population data behind it.'

const reviewers = [
  { id: 'sci', name: 'Dr A. Verma', title: 'Peer reviewer · Science', org: 'Biology & DNA Unit' },
  { id: 'crt', name: 'R. Osei', title: 'Peer reviewer · Court presentation', org: 'Witness Standards Unit' },
]

function wordCount(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length
}

export function InferenceBuilderSimulator({ onDone }: { onDone?: () => void }) {
  const [analysisId, setAnalysisId] = useState('str')
  const [levelId, setLevelId] = useState<Level['id']>('source')
  const [weightId, setWeightId] = useState<Weight['id']>('lr')
  const [claim, setClaim] = useState('')
  const [reviewed, setReviewed] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [signedAt, setSignedAt] = useState('')

  const analysis = analyses.find((a) => a.id === analysisId)!

  const finish = () => {
    if (!completed) {
      completeSimulator('project-inference')
      setCompleted(true)
      setSignedAt(nowLocalInput())
      onDone?.()
    }
  }

  const runReview = () => {
    setReviewing(true)
    setReviewed(false)
    setTimeout(() => {
      setReviewed(true)
      setReviewing(false)
    }, 1300)
  }

  const rubric = useMemo<Rubric[]>(() => {
    const rules: Rubric[] = []

    if (analysis.level === 'source') {
      if (levelId === 'source') {
        rules.push({ id: 'g-src', check: 'Grounding at source', ref: 'Science', status: 'ok', text: 'This analysis directly supports a source claim. State it as an association of profiles, not as an identity verdict. The record shows the proposition that the profile originated from the reference.' })
      } else if (levelId === 'activity') {
        rules.push({ id: 'g-act', check: 'Activity claim vs data', ref: 'Science', status: 'warn', text: 'Your analysis connects evidence to a source, not to an action. An activity-level claim needs extra activity-context data (timing, transfer, physical explanation) before it is supportable.' })
      } else {
        rules.push({ id: 'g-sc', check: 'Scene narrative vs data', ref: 'Science', status: 'fail', text: 'A whole-scene narrative far exceeds what a single analytical result can establish. The analysis does not witness the event; it reports a property of the sample.' })
      }
    } else if (analysis.level === 'association') {
      if (levelId === 'source') {
        rules.push({ id: 'g-gls', check: 'Individualisation vs association', ref: 'Science', status: 'warn', text: 'Glass comparisons give you an association with evidential weight — they cannot claim one, single, exclusive source. Phrase it as "consistent with and supports the proposition that…".' })
      } else {
        rules.push({ id: 'g-glf', check: 'Level vs method', ref: 'Science', status: 'fail', text: 'This method supports an association, not an activity or a narrative. Higher-level claims need a completely different analytical basis.' })
      }
    } else {
      if (levelId === 'source') {
        rules.push({ id: 'g-abo', check: 'Common-trait caveat', ref: 'Science', status: 'warn', text: 'ABO can include or exclude, but the value of an "inclusion" is small because most people share each type. Weight it accordingly — do not present it as individualising.' })
      } else {
        rules.push({ id: 'g-abf', check: 'Level vs method', ref: 'Science', status: 'fail', text: 'ABO grouping cannot carry an activity or narrative claim on its own.' })
      }
    }

    if (weightId === 'verbal') {
      rules.push({ id: 'w-verb', check: 'Weight stated', ref: 'Court', status: 'ok', text: verbalNote })
    } else if (weightId === 'lr') {
      rules.push({ id: 'w-lr', check: 'Weight stated', ref: 'Court', status: 'ok', text: lrNote })
    } else if (weightId === 'percent') {
      rules.push({ id: 'w-pct', check: 'Probability phrasing', ref: 'Court', status: 'warn', text: 'A single percentage without its model invites a courtroom misunderstanding of the "prosecutor’s fallacy". It only has meaning when the proposition and the model are defined.' })
    } else {
      rules.push({ id: 'w-none', check: 'Weight stated', ref: 'Court', status: 'fail', text: 'Without any weight, the statement is a bare assertion. It is not a scientific conclusion and it will not survive cross-examination.' })
    }

    if (wordCount(claim) < MIN_WORDS) {
      rules.push({ id: 'd-short', check: 'Plain-language digest', ref: 'Court', status: 'fail', text: 'The claim is too thin to digest. A court should be able to repeat, verbatim, what you concluded and on what basis — one breath per clause.' })
    } else if (claim.length < 40) {
      rules.push({ id: 'd-ok', check: 'Plain-language digest', ref: 'Court', status: 'ok', text: 'The claim is readable. Keep the guard clauses ("supports the proposition", "is consistent with", the scale used) inside the sentence itself.' })
    } else {
      rules.push({ id: 'd-len', check: 'Plain-language digest', ref: 'Court', status: 'warn', text: 'The claim is dense. Split it into an outcome sentence and a support sentence; a paragraph is a report, not an inference statement.' })
    }

    return rules
  }, [analysis, levelId, weightId, claim])

  const issues = rubric.filter((r) => r.status !== 'ok').length
  const verdict =
    issues === 0
      ? { label: 'Sound', tone: 'ok' as const, note: 'Both reviewers could sign this statement. The inference is grounded in the analysis, carries an explicit weight, and is digestible.' }
      : issues === 1
      ? { label: 'Borderline', tone: 'warn' as const, note: 'One issue stands between this inference and a clean submission. Fix the flagged item and the same claim becomes defensible.' }
      : { label: 'Overreach — return', tone: 'fail' as const, note: 'This inference would not survive serious questioning — it asks the analysis to mean more than it can. Rebuild it, then resubmit.' }

  const scienceChecks = rubric.filter((r) => r.ref === 'Science')
  const courtChecks = rubric.filter((r) => r.ref === 'Court')

  return (
    <div className="space-y-5">
      {/* 1 · The analysis */}
      <BenchPanel title="Commissioned analysis · method ceiling" status={reviewed ? 'ok' : 'run'} meta={[{ label: 'Request', value: 'INF-26-' + Math.floor(100 + Math.random() * 900) }, { label: 'Method', value: analysis.label }]}>
        <h3 className="text-sm font-bold text-white mb-1">1 · Choose the commissioned analysis</h3>
        <p className="text-xs text-gray-400 mb-4">Every method has a ceiling. Choose one, then read what it can — and cannot — establish.</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {analyses.map((a) => (
            <button
              key={a.id}
              onClick={() => { setAnalysisId(a.id); setReviewed(false); setCompleted(false) }}
              className={`text-left rounded-lg border px-3.5 py-3 transition-colors ${
                analysisId === a.id ? 'border-cyan-500/60 bg-cyan-600/10' : 'border-navy-600/40 hover:bg-navy-800'
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <Icon name={a.icon as never} className="w-4 h-4 text-cyan-400" />
                {a.label}
              </span>
              <span className="block text-[11px] text-gray-400 mt-1.5 leading-relaxed">{a.note}</span>
            </button>
          ))}
        </div>

        {/* Source-level truth record */}
        <div className="mt-4 rounded-lg border border-navy-600/40 bg-navy-950/50 overflow-hidden">
          <div className="px-4 py-2 border-b border-navy-700/50 flex items-center gap-2">
            <StatusLed state="run" label="LOOK-UP FEED" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Method ceiling — the record {analysis.label}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left text-[10px] font-mono uppercase text-gray-500 border-b border-navy-700/50">
                  <th className="px-4 py-2">Claim level</th>
                  <th className="px-4 py-2">What the record can truthfully support</th>
                </tr>
              </thead>
              <tbody>
                {(['source', 'activity', 'scene'] as const).map((l) => {
                  const level = levels.find((x) => x.id === l)!
                  const active = levelId === l
                  return (
                    <tr key={l} className={`border-b border-navy-800/60 ${active ? 'bg-cyan-600/5' : ''}`}>
                      <td className="px-4 py-2 align-top whitespace-nowrap">
                        <span className={`font-mono text-[11px] ${active ? 'text-cyan-300' : 'text-gray-400'}`}>▸ {level.label}</span>
                      </td>
                      <td className="px-4 py-2 text-gray-400 leading-relaxed">{analysis.truth[l]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </BenchPanel>

      {/* 2 · The level */}
      <BenchPanel title="Claim level · proposition grammar" status={reviewed ? 'ok' : 'run'}>
        <h3 className="text-sm font-bold text-white mb-1">2 · The claim level</h3>
        <p className="text-xs text-gray-400 mb-4">What do you want the inference to say — and is the method able to carry it? Check against the look-up feed above.</p>
        <div className="grid sm:grid-cols-3 gap-2">
          {levels.map((l) => (
            <button
              key={l.id}
              onClick={() => { setLevelId(l.id); setReviewed(false); setCompleted(false) }}
              className={`text-left rounded-lg border px-3.5 py-3 transition-colors ${
                levelId === l.id ? 'border-cyan-500/60 bg-cyan-600/10' : 'border-navy-600/40 hover:bg-navy-800'
              }`}
            >
              <span className="block text-sm font-semibold text-white">{l.label}</span>
              <span className="block text-[11px] text-gray-400 mt-1 leading-relaxed">{l.self}</span>
            </button>
          ))}
        </div>
      </BenchPanel>

      {/* 3 · The weight + claim */}
      <BenchPanel title="Statement draft · weight & digest" status={reviewed ? 'ok' : 'run'}>
        <h3 className="text-sm font-bold text-white mb-1">3 · Weight + the claim sentence</h3>
        <p className="text-xs text-gray-400 mb-4">How is the strength of the finding expressed — and can the court repeat the conclusion back correctly?</p>
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {weights.map((w) => (
            <button
              key={w.id}
              onClick={() => { setWeightId(w.id); setReviewed(false); setCompleted(false) }}
              className={`text-left rounded-lg border px-3.5 py-3 transition-colors ${
                weightId === w.id ? 'border-cyan-500/60 bg-cyan-600/10' : 'border-navy-600/40 hover:bg-navy-800'
              }`}
            >
              <span className="block text-sm font-semibold text-white">{w.label}</span>
              <span className="block text-[11px] text-gray-400 mt-1 leading-relaxed">{w.self}</span>
            </button>
          ))}
        </div>
        <label className="block mb-2">
          <span className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">Draft the inference statement</span>
          <textarea
            value={claim}
            onChange={(e) => { setClaim(e.target.value); setReviewed(false); setCompleted(false) }}
            rows={3}
            placeholder={`e.g., The DNA profile obtained from the bloodstain is ${
              weightId === 'lr' ? 'over a trillion times more probable if it originated from Mr X than from an unrelated person' :
              weightId === 'verbal' ? 'extremely likely to have originated from Mr X' :
              weightId === 'percent' ? 'a 99.9% match to Mr X' :
              'a match to Mr X'
            }, which supports the proposition that the stain was left by him.`}
            className="input-base resize-none"
            aria-label="Inference statement draft"
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-gray-500">
            {wordCount(claim) >= MIN_WORDS ? `${wordCount(claim)} words — enough to digest.` : `At least ${MIN_WORDS} words so the court can repeat it back.`}
          </span>
          <button onClick={runReview} disabled={reviewing || wordCount(claim) < MIN_WORDS} className="btn-primary !px-5 !py-2.5 !text-sm">
            <Icon name={reviewing ? 'clock' : 'check'} className="w-4 h-4" />
            {reviewing ? 'Reviewing…' : 'Submit for independent review'}
          </button>
        </div>
      </BenchPanel>

      {/* Review in progress */}
      {reviewing && (
        <BenchPanel title="Independent peer review · circuits" status="run">
          <div className="animate-pulse-slow text-sm text-cyan-300">
            Two reviewers are reading the inference independently — one is checking science, the other the court…
          </div>
        </BenchPanel>
      )}

      {/* 4 · The review documents */}
      {reviewed && !reviewing && !completed && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">Review records</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500">Issued {formatReadable(nowLocalInput())}</span>
              <Stamp text={verdict.label} tone={verdict.tone} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reviewers.map((r) => {
              const checks = r.id === 'sci' ? scienceChecks : courtChecks
              return (
                <PaperDoc key={r.id} agency={r.org} formCode="PR-REV" title={r.title} refNo={(r.id === 'sci' ? 'SCI' : 'CRT') + '-26-' + Math.floor(10 + Math.random() * 89)}>
                  <p className="text-xs text-gray-600">
                    Statement works referred by the case file. The reviewer checked the claim set against the method ceiling and the requirements of disclosure.
                  </p>
                  <PaperField label="Statement under review">
                    <PaperRule>{claim || '—'}</PaperRule>
                  </PaperField>
                  <PaperField label="Method & claim level">
                    {analysis.label} · {levels.find((l) => l.id === levelId)?.label}
                  </PaperField>
                  <div className="pt-1 space-y-1.5">
                    {checks.map((ch) => (
                      <div key={ch.id} className="flex items-start gap-2 text-xs">
                        <Icon
                          name={ch.status === 'ok' ? 'check' : ch.status === 'warn' ? 'warning' : 'close'}
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${ch.status === 'ok' ? 'text-emerald-500' : ch.status === 'warn' ? 'text-amber-500' : 'text-crimson-500'}`}
                        />
                        <div>
                          <span className="font-semibold text-gray-800">{ch.check}: </span>
                          <span className="text-gray-700">{ch.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Reviewer</p>
                      <p className="text-sm font-semibold">{r.name}</p>
                      <p className="text-[10px] text-gray-600">{r.title}</p>
                    </div>
                    <Signature name={r.name} />
                  </div>
                </PaperDoc>
              )
            })}
          </div>

          <div className={`rounded-xl border p-5 ${verdict.tone === 'ok' ? 'border-emerald-500/40 bg-emerald-500/5' : verdict.tone === 'warn' ? 'border-amber-500/40 bg-amber-500/5' : 'border-crimson-500/40 bg-crimson-600/10'}`}>
            <div className="flex items-center gap-2.5 mb-2">
              <Icon name={issues === 0 ? 'check' : 'warning'} className={`w-5 h-5 ${verdict.tone === 'ok' ? 'text-emerald-400' : verdict.tone === 'warn' ? 'text-amber-400' : 'text-crimson-400'}`} />
              <h3 className="font-bold text-white">Review verdict: {verdict.label}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-200">{verdict.note}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {rubric.map((r) => (
                <span key={r.id} className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  r.status === 'ok' ? 'text-emerald-300 border-emerald-500/40' : r.status === 'warn' ? 'text-amber-300 border-amber-500/40' : 'text-crimson-300 border-crimson-500/40'
                }`}>
                  {r.check}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <p className="flex items-center gap-2 text-xs text-amber-200/90 leading-relaxed">
              <Icon name="lightbulb" className="w-4 h-4 shrink-0 text-amber-400" />
              Keep the discipline: a defensible inference = grounded in the analysis + explicitly weighted + repeatable by a court. Conventionally, the strongest single sentence is the {weights.find(w => w.id === 'lr')?.label.toLowerCase()} — if its propositions are also disclosed — following the scale used in the report.
            </p>
          </div>

          <div className="flex justify-end">
            <button onClick={finish} className="btn-secondary !px-5 !py-2.5 !text-sm">
              {completed ? 'Reviewed — thank you' : 'Accept the lessons · issue certificate'}
            </button>
          </div>
        </div>
      )}

      {/* 5 · Completed state */}
      {completed && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Icon name="check" className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Peer review complete</h3>
            </div>
            <Stamp text={verdict.label} tone={verdict.tone} />
          </div>

          <PaperDoc agency="State Forensic Laboratory — Quality & Standards" formCode="CRT-INF" title="Certificate of peer review — inference statement" refNo={signedAt ? 'INF/26-' + signedAt.replace(/[^0-9]/g, '').slice(0, 6) : 'INF/26-000000'}>
            <PaperField label="Statement reviewed">
              <PaperRule>{claim || '—'}</PaperRule>
            </PaperField>
            <PaperField label="Method & claim level">
              {analysis.label} · {levels.find((l) => l.id === levelId)?.label} · {weights.find((w) => w.id === weightId)?.label}
            </PaperField>
            <PaperField label="Independent reviews completed">
              {reviewers.map((r) => r.name).join(' and ')}
            </PaperField>
            <PaperField label="Committee verdict">
              {verdict.label} — {verdict.note}
            </PaperField>
            <PaperField label="Grounding confirmed">
              {analysis.truth[levelId]}
            </PaperField>
            <PaperField label="Date of issue">
              {signedAt ? formatReadable(signedAt) : '—'}
            </PaperField>
            <div className="pt-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">What this certificate stands for</p>
                <p className="text-xs text-gray-600 max-w-md leading-relaxed">
                  The inference is reviewable, weighted and grounded. It is now ready to be filed by a named author
                  into an evidential record as an outcome — the next simulator's job.
                </p>
              </div>
              <Signature name="C. Ferreira · QS lead" />
            </div>
          </PaperDoc>

          <BenchPanel title="Review file" status="ok" meta={[{ label: 'Verdict', value: verdict.label }, { label: 'Signed', value: signedAt ? formatReadable(signedAt) : '—' }]}>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left text-[10px] font-mono uppercase text-gray-500 border-b border-navy-700/50">
                  <th className="px-2 py-2">Check</th>
                  <th className="px-2 py-2">Ref</th>
                  <th className="px-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {rubric.map((r) => (
                  <tr key={r.id} className="border-b border-navy-800/60">
                    <td className="px-2 py-2 text-gray-300">{r.check}</td>
                    <td className="px-2 py-2 text-gray-500 font-mono">{r.ref}</td>
                    <td className="px-2 py-2">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase ${
                        r.status === 'ok' ? 'text-emerald-400' : r.status === 'warn' ? 'text-amber-400' : 'text-crimson-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          r.status === 'ok' ? 'bg-emerald-400' : r.status === 'warn' ? 'bg-amber-400' : 'bg-crimson-500'
                        }`} />
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex flex-wrap justify-between items-center gap-3">
              <p className="text-xs text-gray-500">Next: file this statement as an outcome in the evidential intake.</p>
              <LinkIcon to="/simulators/outcome-intake" />
            </div>
          </BenchPanel>
        </div>
      )}
    </div>
  )
}

function Signature({ name }: { name: string }) {
  return (
    <div className="text-right">
      <svg width="110" height="34" viewBox="0 0 110 34" className="text-gray-800" aria-label={`Signature ${name}`}>
        <path
          d="M8 26 C 16 8, 22 10, 26 20 S 38 8, 44 22 S 56 12, 62 24 S 74 8, 82 20 S 94 14, 102 12"
          fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75"
        />
        <path d="M8 28 h94" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      </svg>
      <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 -mt-1">{name}</p>
    </div>
  )
}

function LinkIcon({ to }: { to: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
      Continue to outcome intake <Icon name="arrow-right" className="w-3.5 h-3.5" />
    </Link>
  )
}

export default InferenceBuilderSimulator