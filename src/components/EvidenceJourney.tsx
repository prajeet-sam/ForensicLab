const journeyStages = [
  { title: 'Crime Scene', desc: 'Recognise & document', icon: 'camera' as const, tone: 'crimson' },
  { title: 'Collection', desc: 'Recover & protect', icon: 'glove' as const, tone: 'amber' },
  { title: 'Preservation', desc: 'Package & store', icon: 'bag' as const, tone: 'amber' },
  { title: 'Laboratory', desc: 'Registration & QC', icon: 'lab' as const, tone: 'cyan' },
  { title: 'Analysis', desc: 'Validated methods', icon: 'microscope' as const, tone: 'cyan' },
  { title: 'Interpretation', desc: 'Uncertainty stated', icon: 'scale' as const, tone: 'cyan' },
  { title: 'Court', desc: 'Findings reported', icon: 'court' as const, tone: 'slate' },
]

export function EvidenceJourney() {
  return (
    <div className="relative">
      <div className="flex items-stretch gap-0 overflow-x-auto pb-2 px-1 -mx-1 snap-x" aria-label="Evidence journey">
        {journeyStages.map((stage, i) => (
          <div key={stage.title} className="flex items-center snap-start shrink-0 last:pr-0">
            <div
              className={`w-[9.5rem] rounded-xl border p-3.5 text-center ${
                stage.tone === 'crimson'
                  ? 'border-crimson-500/40 bg-crimson-600/10'
                  : stage.tone === 'cyan'
                  ? 'border-cyan-500/40 bg-cyan-600/10'
                  : 'border-navy-500/50 bg-navy-800'
              }`}
            >
              <span
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border ${
                  stage.tone === 'crimson'
                    ? 'border-crimson-500/50 text-crimson-300'
                    : stage.tone === 'cyan'
                    ? 'border-cyan-500/50 text-cyan-300'
                    : 'border-navy-400/50 text-gray-300'
                }`}
              >
                <span className="text-[10px] font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <p className={`mt-2 text-sm font-semibold ${
                stage.tone === 'crimson' ? 'text-crimson-200' : stage.tone === 'cyan' ? 'text-cyan-200' : 'text-white'
              }`}>
                {stage.title}
              </p>
              <p className="text-[11px] mt-0.5 text-gray-400">{stage.desc}</p>
            </div>
            {i < journeyStages.length - 1 && (
              <span className="flex items-center px-0.5 text-gray-500 shrink-0" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function JourneyLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-gray-400">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-sm bg-crimson-400" /> Scene &amp; recovery
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-sm bg-cyan-400" /> Laboratory &amp; science
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-sm bg-gray-500" /> Reporting &amp; court
      </span>
    </div>
  )
}