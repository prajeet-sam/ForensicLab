import { useState } from 'react'
import type { ReactNode } from 'react'
import { chainOfCustodySteps } from '../data/lab'
import { Icon } from './Icon'
import { completeSimulator } from '../lib/progress'
import { BenchPanel, EvidenceEnvelope, StatusLed, nowLocalInput, formatReadable } from './bench'

interface TransferRecord {
  seq: string
  datetime: string
  from: string
  to: string
  handler: string
  seal: string
  reason: string
  condition: string
  signedBy: string
  signedAt: string
}

const stationCode = (location: string) => {
  const map: Record<string, string> = {
    'Crime Scene': 'CS-01',
    Investigator: 'INV-01',
    'Evidence Store': 'EVST-01',
    Laboratory: 'LAB-01',
    Analyst: 'ANL-01',
    Court: 'CRT-01',
  }
  return map[location] ?? location.toUpperCase().slice(0, 6)
}

const conditionOptions = [
  'Packaging intact · seals unbroken',
  'Packaging intact · seal number noted',
  'Visible damage — documented & photographed',
  'Item loose — repackaged with new seal',
]

const reasonOptions = [
  'Routine transfer to next custody point',
  'Forward for laboratory examination',
  'Return to store after examination',
  'Present at court / hearing',
]

export function ChainOfCustodyGame({ onDone }: { onDone?: () => void }) {
  const [step, setStep] = useState(0)
  const [records, setRecords] = useState<TransferRecord[]>([])
  const [form, setForm] = useState({
    handler: '',
    datetime: nowLocalInput(),
    reason: reasonOptions[0],
    condition: conditionOptions[0],
    seal: '',
    signed: false,
  })
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'fail'; msg: string } | null>(null)
  const [finished, setFinished] = useState(false)

  const fromNode = chainOfCustodySteps[step].location
  const toNode = chainOfCustodySteps[step + 1]?.location ?? null
  const isLast = step === chainOfCustodySteps.length - 1

  const validate = () => {
    const missing: string[] = []
    if (!form.handler.trim()) missing.push('handler identity')
    if (!form.datetime.trim()) missing.push('date & time')
    if (!form.reason.trim()) missing.push('reason for transfer')
    if (!form.condition.trim()) missing.push('condition of exhibit')
    if (!form.seal.trim()) missing.push('seal number')
    if (!form.signed) missing.push('authorised signature')
    return missing
  }

  const doTransfer = () => {
    const missing = validate()
    if (missing.length > 0) {
      const prev = records[records.length - 1]
      const holder = prev ? prev.handler : 'the scene officer'
      setFeedback({
        type: 'fail',
        msg: `Transfer ${String(step + 1).padStart(2, '0')} declared incomplete: ${missing.join(', ')}. ${holder} cannot release exhibit ${'FSL/26-1044'}–A to the next custody point without a complete record — continuity is broken and the finding later risks being ruled inadmissible.`,
      })
      return
    }
    const record: TransferRecord = {
      seq: String(records.length + 1).padStart(2, '0'),
      datetime: form.datetime,
      from: fromNode,
      to: toNode ?? 'Court',
      handler: form.handler.trim(),
      seal: form.seal.trim().toUpperCase(),
      reason: form.reason,
      condition: form.condition,
      signedBy: form.handler.trim(),
      signedAt: nowLocalInput(),
    }
    const nextRecords = [...records, record]
    setRecords(nextRecords)
    setFeedback({
      type: 'ok',
      msg: `Transfer ${record.seq} recorded. ${fromNode} → ${toNode ?? 'Court'} · seal ${record.seal} · signed ${record.signedBy} at ${formatReadable(record.signedAt)}.`,
    })
    setForm({ handler: '', datetime: nowLocalInput(), reason: reasonOptions[0], condition: conditionOptions[0], seal: '', signed: false })
    if (isLast) {
      setFinished(true)
      completeSimulator('chain-of-custody')
      onDone?.()
    } else {
      setStep((s) => s + 1)
    }
  }

  const resetGame = () => {
    setStep(0)
    setRecords([])
    setForm({ handler: '', datetime: nowLocalInput(), reason: reasonOptions[0], condition: conditionOptions[0], seal: '', signed: false })
    setFeedback(null)
    setFinished(false)
  }

  const allSealed = records.every((r) => r.seal)

  return (
    <div className="space-y-5">
      {/* Case header strip */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Case · {''} Investigative case record</p>
          <p className="font-mono text-cyan-400 font-bold">ICD/26/184 · FSL/26-1044</p>
          <p className="text-xs text-gray-400 mt-0.5">Exhibit A — bloodstained swab (door jamb). Prior acquis: burglary.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Custody status</p>
          <p className={`text-sm font-medium inline-flex items-center gap-1.5 ${records.length > 0 ? 'text-emerald-400' : 'text-gray-400'}`}>
            <StatusLed state={records.length > 0 ? 'ok' : 'idle'} />
            {records.length > 0 ? `${records.length} handover(s) documented` : 'Awaiting first handover'}
          </p>
        </div>
      </div>

      {/* Exhibit track */}
      <div className="rounded-xl border border-amber-500/30 bg-navy-900/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-white">Custody chain — every link must hold</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-navy-500/40 text-gray-400">
            {finished ? 'COMPLETE' : `station ${String(step + 1).padStart(2, '0')} / ${String(chainOfCustodySteps.length).padStart(2, '0')}`}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1" aria-label="Custody chain stations">
          {chainOfCustodySteps.map((node, i) => {
            const reached = i <= step || finished
            const isCurrent = i === step && !finished
            return (
              <div key={node.id} className="flex items-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                    isCurrent
                      ? 'border-amber-500/70 bg-amber-500/10 text-amber-300'
                      : reached
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                      : 'border-navy-600/50 text-gray-500'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${reached && !isCurrent ? 'bg-emerald-400' : isCurrent ? 'bg-amber-400 animate-pulse-slow' : 'bg-navy-500'}`} />
                  <span className="text-[9px] text-gray-500">{stationCode(node.location)}</span> {node.location}
                </span>
                {i < chainOfCustodySteps.length - 1 && <span className="text-gray-600 mx-0.5" aria-hidden="true">→</span>}
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <EvidenceEnvelope exhibit="FSL/26-1044–A" item="Bloodstained swab" note="Transit seal" sealed={!finished || allSealed} />
          <div className="text-xs text-gray-400 leading-relaxed max-w-md">
            {finished
              ? 'The exhibit has travelled scene → court with a documented handover at every point. Open seams and sealed the whole way — a defensible history.'
              : `The exhibit is currently at ${fromNode} (${stationCode(fromNode)}). Complete the handover to ${toNode ?? 'the court'} exactly as the receiving record demands.`}
          </div>
        </div>
      </div>

      {finished ? (
        <BenchPanel title="Custody record · complete" status="ok">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="check" className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Chain of custody complete</h3>
              <p className="text-sm text-gray-400">Continuity can be demonstrated end-to-end — this is what makes a laboratory finding defensible in court.</p>
            </div>
          </div>
          <CustodyTable records={records} />
          <p className="mt-4 text-xs text-gray-400 leading-relaxed">
            Continuity statement: exhibit <span className="font-mono text-cyan-300">FSL/26-1044–A</span> was in the
            possession of a named, responsible individual at every point from scene to court; every transfer, seal and
            condition was recorded and signed at the time. An unexplained gap anywhere above would leave a question
            mark over every result that follows it.
          </p>
          <div className="mt-4 flex justify-end">
            <button onClick={resetGame} className="btn-secondary !text-sm">Run a new continuity record</button>
          </div>
        </BenchPanel>
      ) : (
        <>
          <BenchPanel
            title={step === chainOfCustodySteps.length - 1 ? 'Final handover · into the record' : `Transfer ${String(step + 1).padStart(2, '0')}`}
            status={form.signed ? 'ok' : 'idle'}
            meta={[
              { label: 'From', value: `${fromNode} (${stationCode(fromNode)})` },
              { label: 'To', value: `${toNode ?? 'Court'} (${stationCode(toNode ?? 'Court')})` },
              { label: 'Exhibit', value: 'FSL/26-1044–A' },
            ]}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Handler this transfer" required>
                <input
                  value={form.handler}
                  onChange={(e) => setForm((f) => ({ ...f, handler: e.target.value }))}
                  placeholder="e.g., Insp. D. Rao, Crime Scene"
                  className="input-base"
                  aria-label="Handler name"
                />
              </Field>
              <Field label="Date & time of transfer" required>
                <input
                  type="datetime-local"
                  value={form.datetime}
                  onChange={(e) => setForm((f) => ({ ...f, datetime: e.target.value }))}
                  className="input-base text-gray-200"
                  aria-label="Date and time of transfer"
                />
              </Field>
              <Field label="Reason for transfer" required>
                <select value={form.reason} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} className="input-base" aria-label="Reason for transfer">
                  {reasonOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Exhibit condition" required>
                <select value={form.condition} onChange={(e) => setForm((f) => ({ ...f, condition: e.target.value }))} className="input-base" aria-label="Exhibit condition">
                  {conditionOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Seal number (read from exhibit)" required>
                <input
                  value={form.seal}
                  onChange={(e) => setForm((f) => ({ ...f, seal: e.target.value }))}
                  placeholder="e.g., SEAL-44813"
                  className="input-base font-mono"
                  aria-label="Seal number"
                />
              </Field>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Authorisation <span className="text-crimson-400">*</span>
                </label>
                <button
                  onClick={() => form.signed ? setForm((f) => ({ ...f, signed: false })) : setForm((f) => ({ ...f, signed: true }))}
                  className={`w-full text-left rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                    form.signed ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-navy-600/50 text-gray-400 hover:bg-navy-800'
                  }`}
                  aria-pressed={form.signed}
                >
                  {form.signed ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="check" className="w-4 h-4" />
                      Signed by {form.handler || 'handler'} · {formatReadable(nowLocalInput())}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="warning" className="w-4 h-4" /> Affix e-signature to authorise
                    </span>
                  )}
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              {chainOfCustodySteps[step].action} The receiving record is only as good as the sender&apos;s entry —
              a missed seal or unsigned line reopens a seam that was already closed.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {step > 0 && (
                <button onClick={() => { setFeedback(null); setStep((s) => s - 1) }} className="btn-secondary !px-4 !py-2 !text-sm">
                  ← Previous station
                </button>
              )}
              <button onClick={doTransfer} className="btn-primary !px-5 !py-2.5 !text-sm ml-auto">
                <Icon name="transfer" className="w-4 h-4" />
                Record handover
              </button>
            </div>
          </BenchPanel>

          {feedback && (
            <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed animate-fade-in ${
              feedback.type === 'ok' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200/90' : 'border-crimson-500/50 bg-crimson-600/10 text-crimson-200/90 font-medium'
            }`}>
              {feedback.type === 'ok' ? <Icon name="check" className="w-4 h-4 inline mr-1 -mt-0.5" /> : <Icon name="warning" className="w-4 h-4 inline mr-1 -mt-0.5" />}
              {feedback.msg}
            </div>
          )}

          {records.length > 0 && (
            <div className="mt-4">
              <CustodyTable records={records} />
            </div>
          )}
        </>
      )}

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-200/90 leading-relaxed">
          <span className="font-semibold">Educational simulation.</span> Real custody records follow jurisdictional
          rules, unique identifiers, sealing standards and audit trails. The habit this bench trains — every handover
          documented with who, when, why, condition, seal and signature — is universal: an unexplained gap is a question
          mark over every result that follows.
        </p>
      </div>
    </div>
  )
}

function CustodyTable({ records }: { records: TransferRecord[] }) {
  return (
    <div className="rounded-lg overflow-hidden border border-navy-600/40">
      <p className="px-3 py-2 bg-navy-950/80 text-xs font-mono uppercase tracking-wider text-amber-400 border-b border-navy-600/40">
        Custody log · {records.length} handover{records.length === 1 ? '' : 's'}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] text-xs border-collapse">
          <thead>
            <tr className="border-b border-navy-600/40 text-left text-[10px] font-mono uppercase text-gray-500">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Date & time</th>
              <th className="px-3 py-2">Route</th>
              <th className="px-3 py-2">Handler</th>
              <th className="px-3 py-2">Seal</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Condition</th>
              <th className="px-3 py-2">Sign.</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.seq} className="border-b border-navy-700/40 align-top">
                <td className="px-3 py-2 text-gray-500">{r.seq}</td>
                <td className="px-3 py-2 text-gray-400 whitespace-nowrap">{formatReadable(r.datetime)}</td>
                <td className="px-3 py-2 text-gray-200 whitespace-nowrap">
                  {stationCode(r.from)} <span className="text-gray-500">→</span> {stationCode(r.to)}
                </td>
                <td className="px-3 py-2 text-gray-200">{r.handler}</td>
                <td className="px-3 py-2 font-mono text-cyan-300">{r.seal}</td>
                <td className="px-3 py-2 text-gray-400">{r.reason.toLowerCase()}</td>
                <td className="px-3 py-2 text-gray-400 max-w-[14rem]">{r.condition.toLowerCase()}</td>
                <td className="px-3 py-2"><span className="text-emerald-400"><Icon name="check" className="w-3.5 h-3.5" /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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

export default ChainOfCustodyGame