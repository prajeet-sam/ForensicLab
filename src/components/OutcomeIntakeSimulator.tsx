import { useState } from 'react'
import type { ReactNode } from 'react'
import { Icon } from './Icon'
import { completeSimulator } from '../lib/progress'
import { BenchPanel, PaperDoc, PaperField, PaperRule, Stamp, EvidenceEnvelope, nowLocalInput, formatReadable } from './bench'

const AGENCY = 'State Forensic Laboratory — Biology & DNA Unit'
const stmtNo = () => 'STMT/26-' + Math.floor(1000 + Math.random() * 9000)
const caseRef = () => 'FSL/26-' + Math.floor(100 + Math.random() * 900)

const roles = ['Accredited forensic analyst', 'Forensic examiner', 'Laboratory director', 'External consultant']

const products = [
  {
    id: 'full',
    label: 'Full analytical work product',
    self: 'Report + data + laboratory notes, submitted for disclosure.',
    court: 'The strongest form: the court can test every step. Disclosure regimes usually grant this to the defence as part of the duty of disclosure.',
  },
  {
    id: 'opinion',
    label: 'Expert opinion statement',
    self: 'The conclusion and its basis, presented as the expert’s stated opinion.',
    court: 'The opinion is admitted as evidence derived from expertise — but the underlying data must remain available for challenge.',
  },
  {
    id: 'raw',
    label: 'Raw data / instrument files',
    self: 'Uninterpreted output of the instrument.',
    court: 'Raw data carries no meaning by itself. Without interpretation it is not a forensic inference — most courts expect it to accompany, not replace, a report.',
  },
  {
    id: 'summary',
    label: 'One-page plain-language summary',
    self: 'A digest written for the bench and the defence.',
    court: 'Excellent for the bench book — but it is a translation, not the record. It never substitutes for the underlying analysis.',
  },
]

const outcomeTiers = [
  {
    id: 'expert',
    label: 'Expert-only statement',
    self: 'I present the inference personally, as my own opinion.',
    consequence: 'Admission rests on my expertise and credibility. Strong personal accountability — and the strongest target in cross-examination.',
  },
  {
    id: 'qualified',
    label: 'Qualified expert statement',
    self: 'I present the inference with explicit restrictions attached.',
    consequence: 'Defensible and honest. The restriction (scope, pending confirmation, peer-review condition) defines exactly what is and is not being claimed.',
  },
  {
    id: 'full-work',
    label: 'Full work product submission',
    self: 'Report, data, notes and history are all filed with the finding.',
    consequence: 'Maximum transparency: every step is checkable. Requires the strongest laboratory documentation discipline.',
  },
  {
    id: 'consult',
    label: 'Consultation only',
    self: 'Nothing is admitted as evidence — I brief the legal team.',
    consequence: 'No evidential weight. Appropriate when the analysis does not yet meet reporting standards, or when the question is one for the lawyers.',
  },
]

const restrictions = [
  'Limited to source-level association — no activity claim',
  'Subject to confirmatory confirmation before finalisation',
  'Subject to independent peer review before submission',
  'Excludes interpretation of activity or timing',
]

const intakeSteps = [
  { id: 'identity', label: 'Identity' },
  { id: 'product', label: 'Work product' },
  { id: 'inference', label: 'Inference' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'ledger', label: 'Evidence ledger' },
]

export function OutcomeIntakeSimulator({ onDone }: { onDone?: () => void }) {
  const [step, setStep] = useState(0)
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'fail'; msg: string } | null>(null)

  // document identity
  const [docNo] = useState(stmtNo)
  const [refNo] = useState(caseRef)

  // 1 · identity
  const [name, setName] = useState('')
  const [role, setRole] = useState(roles[0])
  const [qualified, setQualified] = useState(false)

  // 2 · work product
  const [productId, setProductId] = useState(products[0].id)

  // 3 · inference
  const [attribution, setAttribution] = useState('source')
  const [weightId, setWeightId] = useState('lr')
  const [claim, setClaim] = useState('')

  // 4 · outcome
  const [tierId, setTierId] = useState('qualified')
  const [restriction, setRestriction] = useState(restrictions[0])

  // 5 · ledger
  const [recordId, setRecordId] = useState('OUT-' + Math.random().toString(36).slice(2, 7).toUpperCase())
  const [datetime, setDatetime] = useState(() => nowLocalInput())
  const [authorised, setAuthorised] = useState(false)

  const [done, setDone] = useState(false)

  const goNext = () => {
    setFeedback(null)
    if (step === 0) {
      if (!name.trim() || !role || !qualified) {
        setFeedback({ type: 'fail', msg: 'No accountable author: an outcome with no named, qualified author cannot be tested by the court. Fill in the name, role and declaration.' })
        return
      }
      setFeedback({ type: 'ok', msg: `Accountable author registered: ${name.trim()} (${role}).` })
    }
    if (step === 2) {
      const words = claim.trim().split(/\s+/).filter(Boolean).length
      if (weightId === 'none' || words < 6) {
        setFeedback({ type: 'fail', msg: 'Incomplete inference: the statement needs both an explicit weight and a readable sentence (at least six words). A bare claim is not an inference.' })
        return
      }
      setFeedback({ type: 'ok', msg: 'The inference is complete and carries an explicit weight.' })
    }
    if (step === 4) {
      if (!datetime || !authorised) {
        setFeedback({ type: 'fail', msg: 'The ledger entry is incomplete: the outcome enters the record only with a date/time and an authorised acceptance.' })
        return
      }
      setFeedback({ type: 'ok', msg: `Record ${recordId} authorised and filed. Outcome registered as evidence.` })
      completeSimulator('outcome-intake')
      setDone(true)
      onDone?.()
      return
    }
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setFeedback(null)
    setStep((s) => Math.max(0, s - 1))
  }

  const resetAll = () => {
    setStep(0)
    setFeedback(null)
    setName('')
    setRole(roles[0])
    setQualified(false)
    setProductId(products[0].id)
    setAttribution('source')
    setWeightId('lr')
    setClaim('')
    setTierId('qualified')
    setRestriction(restrictions[0])
    setRecordId('OUT-' + Math.random().toString(36).slice(2, 7).toUpperCase())
    setDatetime(nowLocalInput())
    setAuthorised(false)
    setDone(false)
  }

  const product = products.find((p) => p.id === productId)!
  const tier = outcomeTiers.find((t) => t.id === tierId)!

  return (
    <div className="space-y-5">
      {/* Stepper */}
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Intake steps">
        {intakeSteps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => i < step && setStep(i)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              i === step ? 'border-cyan-500/60 bg-cyan-600/10 text-cyan-300'
              : i < step ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300'
              : 'border-navy-600/50 text-gray-500'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${i === step ? 'bg-cyan-400 animate-pulse-slow' : i < step ? 'bg-emerald-400' : 'bg-navy-500'}`} />
            {s.label}
          </button>
        ))}
      </div>

      {/* Document identity strip */}
      <BenchPanel title="Statement file · authorisation & disclosure" status={done ? 'ok' : step > 0 ? 'run' : 'idle'}
        meta={[
          { label: 'Form', value: 'AN-STMT/01' },
          { label: 'Statement', value: docNo },
          { label: 'Case ref', value: refNo },
          { label: 'Unit', value: 'Biology & DNA' },
        ]}>

        {step === 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white">1 · Who is accountable for this outcome?</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The court weighs an outcome by the person who stands behind it. This statement is issued under the
              authority of {AGENCY} — its value begins with the identity and qualification of its author.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name of the analyst" required>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., A. Verma" className="input-base" aria-label="Analyst name" />
              </Field>
              <Field label="Role" required>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="input-base" aria-label="Role">
                  {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={qualified} onChange={(e) => setQualified(e.target.checked)} className="mt-0.5 h-4 w-4 accent-cyan-500" aria-label="Qualification declaration" />
              <span>I am qualified to interpret findings from this analytical method and to present them as an expert. <span className="text-crimson-400">*</span></span>
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white">2 · The work product being submitted</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              What exactly is being entered into the record as evidence? Disclosure rules give a court copies of the
              record it is asked to believe.
            </p>
            <div className="space-y-2">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProductId(p.id)}
                  className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
                    productId === p.id ? 'border-cyan-500/60 bg-cyan-600/10' : 'border-navy-600/40 hover:bg-navy-800'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{p.label}</span>
                    {productId === p.id && <Icon name="check" className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">{p.self}</span>
                  <span className="block text-[11px] text-gray-500 mt-1.5 leading-relaxed">{p.court}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white">3 · The inference itself</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Attribution level" required>
                <select value={attribution} onChange={(e) => setAttribution(e.target.value)} className="input-base" aria-label="Attribution level">
                  <option value="source">Source — originated from</option>
                  <option value="activity">Activity — did an action</option>
                  <option value="scene">Whole-scene narrative</option>
                </select>
              </Field>
              <Field label="How the weight is expressed" required>
                <select value={weightId} onChange={(e) => setWeightId(e.target.value)} className="input-base" aria-label="Weight expression">
                  <option value="lr">Quantified likelihood ratio</option>
                  <option value="verbal">Verbal scale</option>
                  <option value="percent">Single percentage</option>
                  <option value="none">No explicit weight</option>
                </select>
              </Field>
            </div>
            <Field label="Inference statement" required>
              <textarea
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                rows={3}
                placeholder="One or two sentences the court can repeat back — outcome first, support second, weight included."
                className="input-base resize-none"
                aria-label="Inference statement"
              />
            </Field>
            <p className="text-xs text-gray-500">
              A court reads an inference literally. If it cannot repeat your conclusion and its basis without adding
              its own assumptions, it is not an inference yet.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white">4 · The outcome decision</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The tier you choose decides what the record claims and what must be disclosed with it.
            </p>
            <div className="space-y-2">
              {outcomeTiers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTierId(t.id)}
                  className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
                    tierId === t.id ? 'border-crimson-500/60 bg-crimson-600/10' : 'border-navy-600/40 hover:bg-navy-800'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{t.label}</span>
                    {tierId === t.id && <Icon name="check" className="w-4 h-4 text-crimson-400 shrink-0" />}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">{t.self}</span>
                  <span className="block text-[11px] text-gray-500 mt-1.5 leading-relaxed">{t.consequence}</span>
                </button>
              ))}
            </div>
            {tierId === 'qualified' && (
              <div className="mt-2">
                <Field label="Restriction attached to the statement" required>
                  <select value={restriction} onChange={(e) => setRestriction(e.target.value)} className="input-base" aria-label="Restriction">
                    {restrictions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white">5 · Enter the outcome into the evidence ledger</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The intellectual work product deserves a chain of custody of its own — a unique identity, a timestamp,
              and an authorised acceptance that mirrors the handling of the physical exhibit.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Record identifier" required>
                <input value={recordId} onChange={(e) => setRecordId(e.target.value)} className="input-base font-mono" aria-label="Record identifier" />
              </Field>
              <Field label="Date & time of authorisation" required>
                <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="input-base text-gray-200" aria-label="Date and time of authorisation" />
              </Field>
            </div>
            <div className="rounded-lg border border-navy-600/40 bg-navy-900/80 p-4 text-xs text-gray-400 leading-relaxed">
              <p className="font-mono uppercase tracking-wider text-amber-400 mb-1.5">Provenance</p>
              <p>Laboratory {product.label.toLowerCase()} → statement {docNo} (author: {name || '…'}) → record {recordId || '…'} → evidential record.</p>
              <p className="mt-1.5">Reason for transfer: filing the outcome as evidence for the case record. Condition: unedited, complete, traceable to the underlying analysis.</p>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={authorised} onChange={(e) => setAuthorised(e.target.checked)} className="mt-0.5 h-4 w-4 accent-crimson-500" aria-label="Authorisation signature" />
              <span>I authorise this outcome to enter the evidential record with my signature, and accept responsibility for its contents. <span className="text-crimson-400">*</span></span>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-navy-600/40 pt-4">
          {step > 0 && <button onClick={goBack} className="btn-secondary !px-4 !py-2 !text-sm">← Back</button>}
          <button onClick={goNext} className="btn-primary !px-5 !py-2.5 !text-sm ml-auto">
            {step === intakeSteps.length - 1 ? 'File as evidence' : 'Continue'} <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </div>

        {feedback && (
          <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed animate-fade-in mt-4 ${
            feedback.type === 'ok' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200/90' : 'border-crimson-500/50 bg-crimson-600/10 text-crimson-200/90 font-medium'
          }`}>
            {feedback.type === 'ok' ? <Icon name="check" className="w-4 h-4 inline mr-1 -mt-0.5" /> : <Icon name="warning" className="w-4 h-4 inline mr-1 -mt-0.5" />}
            {feedback.msg}
          </div>
        )}
      </BenchPanel>

      {/* ── REGISTERED ── */}
      {done && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Icon name="check" className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Outcome registered as evidence</h3>
            </div>
            <Stamp text="Registered" tone="ok" />
          </div>

          <PaperDoc agency={AGENCY} formCode="AN-STMT/01" title="Statement of findings and authority to present" refNo={`${docNo} · ${refNo}`}>
            <PaperField label="Author">
              {name || '—'} · <span className="text-gray-600">{role || '—'}</span> · {AGENCY}
            </PaperField>
            <PaperField label="Work product filed">
              {product.label} — {product.self}
            </PaperField>
            <PaperField label="Inference">
              <PaperRule>{claim || '—'}</PaperRule>
            </PaperField>
            <PaperField label="Attribution level">
              {attribution === 'source' ? 'Source — originated from' : attribution === 'activity' ? 'Activity — did an action' : 'Whole-scene narrative'}
            </PaperField>
            <PaperField label="Weight expressed as">
              {weightId === 'lr' ? 'Quantified likelihood ratio' : weightId === 'verbal' ? 'Verbal scale' : weightId === 'percent' ? 'Single percentage' : 'None'}
            </PaperField>
            <PaperField label="Outcome tier">
              {tier.label}
            </PaperField>
            {tierId === 'qualified' && <PaperField label="Restrictions"> {restriction}</PaperField>}
            <PaperField label="Filed & authorised">
              {formatReadable(datetime)} · by {name || '…'} · record {recordId}
            </PaperField>
            <div className="pt-2 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Disclosure note</p>
                <p className="text-xs text-gray-600 max-w-sm leading-relaxed">
                  This document is the record the court will see. Its weight depends on who signed it, what was filed
                  with it, and whether every analytical step behind it can be traced.
                </p>
              </div>
              <div className="text-right">
                <BarcodeBand value={recordId} />
                <p className="text-[10px] font-mono text-gray-500 mt-1">doc {recordId}</p>
              </div>
            </div>
          </PaperDoc>

          <BenchPanel title="Evidence ledger" status="ok"
            meta={[{ label: 'Ledger', value: 'EVL-26' }, { label: 'Entry', value: recordId }, { label: 'Filed', value: formatReadable(datetime) }]}>
            <div className="rounded-lg overflow-hidden border border-navy-600/40">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[38rem] text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-navy-600/40 text-left text-[10px] font-mono uppercase text-gray-500">
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Date & time</th>
                      <th className="px-3 py-2">Item filed</th>
                      <th className="px-3 py-2">Source unit</th>
                      <th className="px-3 py-2">Author</th>
                      <th className="px-3 py-2">Signed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-navy-700/40 align-top">
                      <td className="px-3 py-2 text-gray-500">01</td>
                      <td className="px-3 py-2 text-gray-400 whitespace-nowrap">{formatReadable(datetime)}</td>
                      <td className="px-3 py-2 text-gray-200">
                        {product.label}
                        <span className="block text-[10px] text-gray-500">{docNo} · inference + weight + tier</span>
                      </td>
                      <td className="px-3 py-2 text-gray-200">Biology & DNA unit</td>
                      <td className="px-3 py-2 text-gray-200">{name}</td>
                      <td className="px-3 py-2"><span className="text-emerald-400"><Icon name="check" className="w-3.5 h-3.5" /></span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <EvidenceEnvelope exhibit={recordId} item="Statement of findings" note="Filing seal" />
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 flex-1">
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-semibold">Three truths of the outcome.</span> 1 · The outcome is a <i>record</i>,
                  not a verdict — the court decides. 2 · The outcome is an <i>opinion</i>, not a fact — its strength sits
                  in how it is weighted and stated. 3 · Its legal power depends on <i>who</i> submits it, <i>what</i> is
                  submitted with it, and <i>whether every step</i> can be traced.
                </p>
              </div>
              <button onClick={resetAll} className="btn-secondary !text-sm">Run another intake</button>
            </div>
          </BenchPanel>
        </div>
      )}

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-200/90 leading-relaxed">
          <span className="font-semibold">Educational simulation.</span> The discipline trained here — authorship,
          document identity, explicit weighting and an authorised record — is what converts a laboratory result into
          admissible evidence. Real jurisdictions define the exact forms; this simulator rehearses the habit.
        </p>
      </div>
    </div>
  )
}

function BarcodeBand({ value }: { value: string }) {
  const seed = value.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return (
    <span
      className="inline-block h-8 w-24 rounded-sm"
      role="img"
      aria-label={`Barcode ${value}`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, #2f1625 0 2px, transparent 2px ${seed % 2 === 0 ? 5 : 4}px)`,
      }}
    />
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
        {label} {required && <span className="text-crimson-400">*</span>}
      </label>
      {children}
    </div>
  )
}

export default OutcomeIntakeSimulator