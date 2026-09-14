import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { completeSimulator } from '../lib/progress'
import { BenchPanel, EvidenceEnvelope, StatusLed, nowLocalInput, formatReadable, type LedState } from './bench'

interface CaseItem {
  id: string
  label: string
  substrate: string
  truth: string
  luminol: boolean
  km: boolean
  note: string
}

const items: CaseItem[] = [
  {
    id: 'blood',
    label: 'Bloodstain swab — door jamb',
    substrate: 'Swab of dark smear, painted wood',
    truth: 'Human blood',
    luminol: true,
    km: true,
    note: 'Both screening tests react because heme has peroxidase-like activity. Confirmatory species testing and STR work are required before anyone is named.',
  },
  {
    id: 'dil-blood',
    label: 'Faint swab — cleaned area',
    substrate: 'Wet swab of an apparently cleaned surface',
    truth: 'Very dilute human blood',
    luminol: true,
    km: false,
    note: 'Luminol is far more sensitive and detects dilute or cleaned stains the Kastle-Meyer swab misses. Positive screen still ≠ proven blood.',
  },
  {
    id: 'peroxidase',
    label: 'Vegetable residue smear',
    substrate: 'Smear of dark plant material, tile',
    truth: 'Plant peroxidase (e.g., horseradish)',
    luminol: false,
    km: true,
    note: 'Some plant peroxidases catalyse the same phenolphthalein oxidation — a classic Kastle-Meyer false positive. Only confirmation separates the two.',
  },
  {
    id: 'chemical',
    label: 'Household residue stain',
    substrate: 'Discoloured contact stain, worktop',
    truth: 'Rust / bleach contact stain',
    luminol: true,
    km: false,
    note: 'Luminol can give positive reactions with some oxidants, paints and metals that have nothing to do with blood. Confirmation always decides.',
  },
]

interface QcResult {
  id: string
  label: string
  kind: string
  expected: string
  observed: string | null
  pass: boolean | null
}

const qcControls: Omit<QcResult, 'observed' | 'pass'>[] = [
  { id: 'C-002', label: 'Whole-blood control', kind: 'Positive control', expected: 'Positive' },
  { id: 'B-011', label: 'Reagent blank', kind: 'Blank', expected: 'Negative' },
  { id: 'N-004', label: 'Clean-surface swipe', kind: 'Negative control', expected: 'Negative' },
]

const reagentLots: Record<string, { name: string; lot: string }> = {
  luminol: { name: 'Luminol 0.1% w/v, pH 10.4', lot: 'L-1148' },
  km: { name: 'Phenolphthalein work. + 3% H2O2', lot: 'P-2214 / H-3301' },
}

export function PresumptiveTestSimulator({ onDone }: { onDone?: () => void }) {
  const [stage, setStage] = useState<'intake' | 'qc' | 'bench'>('intake')
  const [operator, setOperator] = useState('A. Verma')
  const [caseRef, setCaseRef] = useState('') // auto default below
  const [startedAt] = useState(() => nowLocalInput())
  const runIdRef = useRef(0)

  // QC
  const [qcRunning, setQcRunning] = useState(false)
  const [qcRun, setQcRun] = useState(false)
  const [qcVerified, setQcVerified] = useState(false)
  const [qcResults, setQcResults] = useState<QcResult[]>([])
  const [showQcGuardWarning, setShowQcGuardWarning] = useState(false)

  // Bench
  const [selectedExhibit, setSelectedExhibit] = useState<CaseItem | null>(null)
  const [test, setTest] = useState<'luminol' | 'km'>('luminol')
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [result, setResult] = useState<{ test: 'luminol' | 'km'; positive: boolean; time: string } | null>(null)
  const [benchLog, setBenchLog] = useState<{ n: number; at: string; test: string; result: string; lot: string }[]>([])
  const [revealed, setRevealed] = useState(false)
  const [completed, setCompleted] = useState(false)

  const lotNumber = reagentLots[test]

  useEffect(() => {
    if (!caseRef) setCaseRef('FSL/26-' + String(Math.floor(1000 + Math.random() * 9000)))
  }, [caseRef])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setElapsed((e) => e + 1), 500)
    return () => clearInterval(id)
  }, [running])

  const benchStatus: LedState = running ? 'run' : result ? 'ok' : selectedExhibit ? 'idle' : 'idle'

  const runQc = () => {
    setQcRunning(true)
    runIdRef.current += 1
    const runId = runIdRef.current
    setTimeout(() => {
      const observed = new Map<string, string>()
      // deterministic per control for the currently selected test (default KM run then luminol run)
      observed.set('C-002', 'Positive')
      observed.set('B-011', 'Negative')
      observed.set('N-004', 'Negative')
      const rows = qcControls.map((c) => {
        const ok = observed.get(c.id)
        const pass = ok !== undefined && ok !== 'Missing' && ok === c.expected
        return { ...c, observed: ok ?? null, pass }
      })
      // only update if this is still the active run
      if (runId === runIdRef.current) {
        setQcResults(rows)
        setQcRun(true)
        setQcRunning(false)
      }
    }, 1300)
  }

  const beginBench = () => {
    if (!qcRun) {
      setShowQcGuardWarning(true)
      return
    }
    if (!qcVerified) {
      setShowQcGuardWarning(true)
      return
    }
    setStage('bench')
  }

  const runTest = () => {
    if (!selectedExhibit) return
    setRunning(true)
    setResult(null)
    setRevealed(false)
    setElapsed(0)
    runIdRef.current += 1
    const runId = runIdRef.current
    setTimeout(() => {
      if (runId !== runIdRef.current) return
      const positive = test === 'luminol' ? selectedExhibit.luminol : selectedExhibit.km
      const time = nowLocalInput()
      setResult({ test, positive, time })
      setRunning(false)
      setBenchLog((l) => [
        ...l,
        {
          n: l.length + 1,
          at: time,
          test: test === 'luminol' ? 'Luminol' : 'Kastle-Meyer',
          result: positive ? 'POSITIVE' : 'NEGATIVE',
          lot: lotNumber.lot,
        },
      ])
      if (!completed) {
        completeSimulator('presumptive')
        setCompleted(true)
      }
      onDone?.()
    }, 1400)
  }

  const interpretation = result
    ? result.positive
      ? 'PRESUMPTIVE POSITIVE — consistent with blood. This screen shows heme-like activity; it does not identify human blood, a person, or an activity. Confirmatory species testing, and then individualisation if the question is identity, are required before any court conclusion.'
      : 'NEGATIVE for this test on this exhibit. That rules out nothing absolutely — sensitivity, dilution and the substrate all matter. Record the negative faithfully; evidence is the record, not the hope.'
    : null

  const resetAll = () => {
    setStage('intake')
    setQcRunning(false)
    setQcRun(false)
    setQcVerified(false)
    setQcResults([])
    setShowQcGuardWarning(false)
    setSelectedExhibit(null)
    setRunning(false)
    setElapsed(0)
    setResult(null)
    setBenchLog([])
    setRevealed(false)
    setCompleted(false)
    setCaseRef('')
  }

  return (
    <div className="space-y-5">
      {/* --- intake stage --- */}
      {stage === 'intake' && (
        <BenchPanel title="Bench log-in · Serology / Biology" status="idle" meta={[{ label: 'Shift', value: '08:00–16:00' }, { label: 'Room', value: 'SER-03' }, { label: 'Started', value: formatReadable(startedAt) }]}>
          <div className="flex flex-col lg:flex-row gap-5">
            <EvidenceEnvelope exhibit={caseRef + '-A'} item="Suspected biological stain" note="Binomial seal intact" />
            <div className="flex-1 space-y-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                Before any chemistry, the bench is bound to the record: operator, case reference, and the item itself.
                Nothing on this screen proceeds anonymously.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">Operator (analyst)</label>
                  <input value={operator} onChange={(e) => setOperator(e.target.value)} className="input-base" aria-label="Operator name" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">Case reference</label>
                  <input value={caseRef} onChange={(e) => setCaseRef(e.target.value)} className="input-base font-mono" aria-label="Case reference" />
                </div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-amber-200/90 leading-relaxed">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Icon name="info" className="w-3.5 h-3.5" /> Bench integrity rule
                </span>
                <p className="mt-1">A test result is worthless if it cannot be tied to an operator, a case, and a sealed exhibit. That tie is what you are entering now.</p>
              </div>
              <button onClick={() => setStage('qc')} className="btn-primary !px-5 !py-2.5 !text-sm">
                Continue to quality control <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </BenchPanel>
      )}

      {/* --- QC stage --- */}
      {stage === 'qc' && (
        <BenchPanel
          title="Batch QC · Stepwise controls"
          status={qcRun && !qcVerified ? 'warn' : qcVerified ? 'ok' : qcRunning ? 'run' : 'idle'}
        >
          <div className="grid lg:grid-cols-[auto_1fr] gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Prepared for this batch</p>
              <div className="space-y-2.5">
                {qcControls.map((c) => (
                  <div key={c.id} className="rounded-lg border border-navy-600/40 bg-navy-950/60 px-3.5 py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm text-cyan-300">{c.id}</p>
                      <p className="text-[11px] text-gray-400">{c.label}</p>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-navy-500/40 text-gray-400">{c.kind}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Run the control set</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Expected: positive control → positive; blank & negative → negative. This batch uses the {test === 'luminol' ? 'luminol' : 'Kastle-Meyer'} scheme.</p>
                </div>
                <button onClick={runQc} disabled={qcRunning} className="btn-primary !px-4 !py-2 !text-sm">
                  {qcRunning ? <StatusLed state="run" label="REACTING" /> : qcRun ? 'Re-run controls' : 'Run control set'}
                </button>
              </div>

              {qcResults.length > 0 && (
                <div className="rounded-lg border border-navy-600/40 overflow-hidden animate-fade-in">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-navy-950/80 border-b border-navy-600/40 text-left text-[10px] font-mono uppercase text-gray-500">
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Expected</th>
                        <th className="px-3 py-2">Observed</th>
                        <th className="px-3 py-2">Pass</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qcResults.map((r) => (
                        <tr key={r.id} className="border-b border-navy-700/40">
                          <td className="px-3 py-2 font-mono text-cyan-300">{r.id}</td>
                          <td className="px-3 py-2 text-gray-400">{r.expected}</td>
                          <td className="px-3 py-2 text-gray-300">{r.observed ?? '…'}</td>
                          <td className="px-3 py-2">
                            {r.pass === null ? <span className="text-gray-500">—</span> : r.pass ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400"><Icon name="check" className="w-3 h-3" /> pass</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-crimson-400"><Icon name="close" className="w-3 h-3" /> fail — stop batch</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <label className="flex items-start gap-2.5 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={qcVerified}
                  onChange={(e) => setQcVerified(e.target.checked)}
                  disabled={!qcRun}
                  className="mt-0.5 h-4 w-4 accent-cyan-500"
                  aria-label="Verify QC results"
                />
                <span>QC verified: controls behaved as expected. No case exhibit may be screened until this is ticked. <span className="text-crimson-400">*</span></span>
              </label>

              {showQcGuardWarning && !qcVerified && (
                <p className="text-xs text-crimson-400 font-medium flex items-center gap-1.5 animate-fade-in">
                  <Icon name="warning" className="w-3.5 h-3.5" /> Batch cannot proceed without verified controls — screening a case sample against unverified chemistry would poison every downstream result.
                </p>
              )}

              <div className="rounded-lg border border-navy-600/40 bg-navy-950/40 p-3.5 text-xs text-gray-400 leading-relaxed">
                Why this gate: quality control is the laboratory&apos;s immune system. Controls <i>and</i> blanks tell you
                whether the reagent works and whether it stayed clean. A case reading taken while the blank glows is not
                a result — it is an incriminating artifact.
              </div>

              <div className="flex items-center justify-between">
                <button onClick={() => setStage('intake')} className="btn-secondary !px-4 !py-2 !text-sm">← Back to intake</button>
                <button onClick={beginBench} disabled={!qcRun} className="btn-primary !px-5 !py-2.5 !text-sm">
                  Proceed to case exhibit <Icon name="arrow-right" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </BenchPanel>
      )}

      {/* --- bench execution --- */}
      {stage === 'bench' && (
        <>
          <BenchPanel title="Case exhibit · Screening bay" status={benchStatus}
            meta={[{ label: 'Exhibit', value: `${caseRef}-A` }, { label: 'Operator', value: operator }, { label: 'Room', value: 'SER-03' }, { label: 'Batch QC', value: qcVerified ? 'VERIFIED' : 'MISSING' }]}>
            <div className="grid lg:grid-cols-[auto_1fr] gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Receive exhibit</p>
                {selectedExhibit ? (
                  <EvidenceEnvelope exhibit={`${caseRef}-A`} item={selectedExhibit.label} note={selectedExhibit.substrate} />
                ) : (
                  <div className="rounded-lg border border-dashed border-navy-500/50 px-4 py-8 text-center text-xs text-gray-500">
                    Choose an item from the rack to receive it onto the bench.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">1 · Select the exhibit</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {items.map((it) => (
                      <button
                        key={it.id}
                        onClick={() => { setSelectedExhibit(it); setResult(null); setRevealed(false) }}
                        className={`text-left rounded-lg border px-3.5 py-3 transition-colors ${
                          selectedExhibit?.id === it.id ? 'border-cyan-500/60 bg-cyan-600/10' : 'border-navy-600/40 hover:bg-navy-800'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Icon name="bag" className="w-4 h-4 text-cyan-400" /> {it.label}
                        </span>
                        <span className="block text-[11px] text-gray-500 mt-1">{it.substrate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">2 · Choose the screen</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => { setTest('luminol'); setResult(null) }}
                      className={`text-left rounded-lg border px-3.5 py-3 transition-colors ${
                        test === 'luminol' ? 'border-cyan-500/60 bg-cyan-600/10' : 'border-navy-600/40 hover:bg-navy-800'
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">Luminol</span>
                      <span className="block text-[11px] text-gray-500 mt-0.5">{reagentLots.luminol.name} · lot {reagentLots.luminol.lot}</span>
                      <span className="block text-[11px] text-gray-500 mt-0.5">Spray in darkness · read window 10–60 s</span>
                    </button>
                    <button
                      onClick={() => { setTest('km'); setResult(null) }}
                      className={`text-left rounded-lg border px-3.5 py-3 transition-colors ${
                        test === 'km' ? 'border-cyan-500/60 bg-cyan-600/10' : 'border-navy-600/40 hover:bg-navy-800'
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">Kastle-Meyer</span>
                      <span className="block text-[11px] text-gray-500 mt-0.5">{reagentLots.km.name} · lot {reagentLots.km.lot}</span>
                      <span className="block text-[11px] text-gray-500 mt-0.5">Swab transfer · observe within 60 s</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-gray-500">
                    {selectedExhibit ? `Exhibit sealed · awaiting ${test === 'luminol' ? 'luminol spray' : 'K-M swab'}` : 'No exhibit received.'}
                  </span>
                  <button onClick={runTest} disabled={!selectedExhibit || running} className="btn-primary !px-5 !py-2.5 !text-sm">
                    <Icon name="play" className="w-4 h-4" />
                    {running ? `Reacting · ${elapsed / 2}s` : 'Run screen'}
                  </button>
                </div>
              </div>
            </div>
          </BenchPanel>

          {/* --- result readout --- */}
          {running && (
            <BenchPanel title="Readout" status="run" meta={[{ label: 'Method', value: test === 'luminol' ? 'Luminol — chemiluminescence' : 'K-M — phenolphthalein oxid.' }, { label: 'Timer', value: `${elapsed / 2}s` }]}>
              <div className="flex items-center gap-4 py-1">
                <StatusLed state="run" label="CHEMISTRY ACTIVE" />
                <p className="text-sm text-gray-300">Stand clear, record the endpoint honestly. Read before the window closes.</p>
              </div>
            </BenchPanel>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in">
              <BenchPanel title={result.test === 'luminol' ? 'Luminol readout' : 'Kastle-Meyer readout'} status={result.positive ? 'ok' : 'idle'}
                meta={[{ label: 'Read at', value: formatReadable(result.time) }, { label: 'Lot', value: dailyLotFor(result.test) }]}>
                <div className="rounded-lg bg-navy-950 border border-navy-700 p-6 flex items-center justify-center">
                  {result.test === 'luminol' ? (
                    result.positive ? (
                      <div className="text-center">
                        <div className="relative inline-flex">
                          <span className="h-16 w-28 rounded-full bg-cyan-400 blur-md animate-[glow_2s_ease-in-out_infinite_alternate]" aria-hidden="true" />
                          <span className="absolute inset-0 flex items-center justify-center text-cyan-100 font-mono text-xs tracking-widest">CHEMI-LUMINESCENCE</span>
                        </div>
                        <p className="mt-4 text-sm text-cyan-300">Blue light recorded — screen flagged possible blood.</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No glow. Luminol returned a negative on this exhibit.</p>
                    )
                  ) : result.positive ? (
                    <div className="text-center">
                      <span className="inline-block h-12 w-24 rounded-lg bg-[#e11d48] shadow-[0_0_18px_rgba(225,29,72,0.5)]" aria-hidden="true" />
                      <p className="mt-4 text-sm font-semibold text-gray-200">Pink colour recorded — heme-like activity presumed present.</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No pink. The Kastle-Meyer swab returned negative.</p>
                  )}
                </div>
              </BenchPanel>

              <BenchPanel title="Interpretation · record the words, not the hope" status="warn">
                <p className="text-sm text-gray-200 leading-relaxed">{interpretation}</p>
              </BenchPanel>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-semibold">Readiness rule:</span> a positive screen directs confirmatory species
                  testing, then — for identity — STR profiling, each recorded on the same bench log. The scent of blood
                  is never an ID.
                </p>
                {!revealed && (
                  <button onClick={() => setRevealed(true)} className="btn-secondary !px-4 !py-2 !text-xs shrink-0">
                    Open the sealed item — what was it really?
                  </button>
                )}
              </div>

              {revealed && selectedExhibit && (
                <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 animate-fade-in">
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">Exhibit truth · after confirmation</p>
                  <p className="text-sm font-semibold text-white mb-1">{selectedExhibit.truth}</p>
                  <p className="text-xs text-amber-200/80 leading-relaxed">{selectedExhibit.note}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 max-w-xs">
                    <TruthRow label="Luminol" ok={testMatchesReveal(selectedExhibit.luminol, benchLog, 'Luminol')} />
                    <TruthRow label="Kastle-Meyer" ok={testMatchesReveal(selectedExhibit.km, benchLog, 'Kastle-Meyer')} />
                  </div>
                </div>
              )}

              <BenchPanel title="Bench log" status="ok">
                {benchLog.length === 0 ? (
                  <p className="text-xs text-gray-500">No reads recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[30rem] text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-navy-600/40 text-left text-[10px] font-mono uppercase text-gray-500">
                          <th className="py-2 pr-4">#</th>
                          <th className="py-2 pr-4">Read at</th>
                          <th className="py-2 pr-4">Test</th>
                          <th className="py-2 pr-4">Lot</th>
                          <th className="py-2 pr-4">Result</th>
                          <th className="py-2">QC status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benchLog.map((r) => (
                          <tr key={r.n} className="border-b border-navy-700/40">
                            <td className="py-2 pr-4 text-gray-500">{String(r.n).padStart(2, '0')}</td>
                            <td className="py-2 pr-4 text-gray-400">{formatReadable(r.at)}</td>
                            <td className="py-2 pr-4 text-gray-200">{r.test}</td>
                            <td className="py-2 pr-4 font-mono text-gray-500">{r.lot}</td>
                            <td className={`py-2 pr-4 font-mono font-semibold ${r.result === 'POSITIVE' ? 'text-emerald-400' : 'text-gray-400'}`}>{r.result}</td>
                            <td className="py-2"><span className="text-[10px] font-mono text-emerald-400">VERIFIED</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </BenchPanel>

              <div className="flex items-center justify-between">
                <button onClick={() => { setStage('qc'); setResult(null) }} className="btn-secondary !px-4 !py-2 !text-sm">← New batch</button>
                <button onClick={resetAll} className="btn-ghost !px-4 !py-2 !text-sm">Reset bench</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function testMatchesReveal(expected: boolean, benchLog: { test: string; result: string }[], testName: string): boolean | null {
  const row = benchLog.find((r) => r.test === testName)
  if (!row) return null
  const observed = row.result === 'POSITIVE'
  return observed === expected
}

function TruthRow({ label, ok }: { label: string; ok: boolean | null }) {
  return (
    <div className="rounded-md border border-navy-600/40 bg-navy-950/60 px-3 py-2 flex items-center justify-between">
      <span className="text-[11px] text-gray-400">{label}</span>
      {ok === null ? (
        <span className="text-[10px] text-gray-500">not run</span>
      ) : ok ? (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400"><Icon name="check" className="w-3 h-3" /> agreed with truth</span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-crimson-400"><Icon name="warning" className="w-3 h-3" /> misled you</span>
      )}
    </div>
  )
}

function dailyLotFor(test: 'luminol' | 'km'): string {
  return test === 'luminol' ? reagentLots.luminol.lot : reagentLots.km.lot
}

export default PresumptiveTestSimulator