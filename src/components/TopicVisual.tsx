import { ScientificDiagram, FlowBox, FlowArrow } from './display'
import type { Topic } from '../lib/types'

export function TopicVisual({ topic }: { topic: Topic }) {
  const id = topic.id
  switch (id) {
    case 'abo-blood-grouping':
      return <ABOTable />
    case 'antigen-antibody':
      return <AntigenAntibody />
    case 'agglutination':
      return <AgglutinationDiagram />
    case 'precipitation':
      return <PrecipitationDiagram />
    case 'immunodiffusion':
      return <ImmunodiffusionDiagram />
    case 'central-dogma':
      return <CentralDogmaDiagram />
    case 'dna-profiling':
      return <DNAPipeline />
    default:
      return null
  }
}

function ABOTable() {
  const rows = [
    { group: 'A', antigens: 'A', antibodies: 'anti-B', symbol: '🅰︎' },
    { group: 'B', antigens: 'B', antibodies: 'anti-A', symbol: '🅱' },
    { group: 'AB', antigens: 'A + B', antibodies: 'none', symbol: '🆎' },
    { group: 'O', antigens: 'none', antibodies: 'anti-A + anti-B', symbol: '🅾' },
  ]
  return (
    <ScientificDiagram title="The four ABO phenotypes" caption="Antigens sit on the red cell; the plasma carries the opposite antibodies.">
      <div className="overflow-x-auto" tabIndex={0} aria-label="ABO phenotype table">
        <table className="w-full min-w-[26rem] border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-mono uppercase tracking-wider text-cyan-400 border-b border-navy-600/60">Group</th>
              <th className="text-left px-3 py-2 text-xs font-mono uppercase tracking-wider text-cyan-400 border-b border-navy-600/60">RBC antigen</th>
              <th className="text-left px-3 py-2 text-xs font-mono uppercase tracking-wider text-cyan-400 border-b border-navy-600/60">Plasma antibody</th>
              <th className="text-left px-3 py-2 text-xs font-mono uppercase tracking-wider text-cyan-400 border-b border-navy-600/60">Cell</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.group} className="border-b border-navy-700/40 last:border-0">
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-2 font-bold text-white">
                    <span className="h-6 w-6 rounded-full bg-crimson-600/60 flex items-center justify-center text-xs">{r.group}</span>
                    {r.symbol}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-gray-300">{r.antigens}</td>
                <td className="px-3 py-2.5 text-gray-300">{r.antibodies}</td>
                <td className="px-3 py-2.5">
                  <CellDots kind={r.group} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScientificDiagram>
  )
}

function CellDots({ kind }: { kind: string }) {
  const variants: Record<string, { a: boolean; b: boolean }> = {
    A: { a: true, b: false },
    B: { a: false, b: true },
    AB: { a: true, b: true },
    O: { a: false, b: false },
  }
  const v = variants[kind]
  return (
    <span className="inline-flex items-center gap-1">
      {v.a && <span className="h-2.5 w-2.5 rounded-full bg-crimson-400" title="A antigen" />}
      {v.b && <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" title="B antigen" />}
      {!v.a && !v.b && <span className="text-gray-600 text-xs">— H only</span>}
    </span>
  )
}

function AntigenAntibody() {
  return (
    <ScientificDiagram title="Lock-and-key binding" caption="Anti-A binds the A structure; it ignores the B structure.">
      <div className="grid sm:grid-cols-3 gap-4 items-center">
        <div className="text-center space-y-1">
          <span className="inline-flex h-12 w-12 rounded-full bg-crimson-600/40 border-2 border-crimson-400 items-center justify-center text-xs font-bold text-white">RBC</span>
          <p className="text-[11px] text-crimson-300">carries <b>A antigen</b> (carbohydrate)</p>
        </div>
        <div className="text-center text-gray-500 text-lg font-bold" aria-hidden="true">+</div>
        <div className="text-center space-y-1">
          <span className="inline-flex h-12 w-12 rounded-full bg-cyan-600/40 border-2 border-cyan-400 items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyan-300"><path d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 4c2 2 2 6 0 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
          <p className="text-[11px] text-cyan-300">complementary <b>anti-A</b></p>
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-center">
        <p className="text-sm text-emerald-200 font-medium">Binding occurs → agglutination</p>
      </div>
    </ScientificDiagram>
  )
}

function AgglutinationDiagram() {
  return (
    <ScientificDiagram title="Agglutination cascade" caption="Antibodies bridge many red cells into a visible lattice.">
      <div className="flex items-center gap-2 justify-center flex-wrap">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-8 w-8 rounded-full bg-crimson-600/50 border border-crimson-400/60 shrink-0 animate-pulse-slow" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
        <span className="text-gray-500 font-mono text-xs px-2">→</span>
        <span className="h-10 w-10 rounded-full bg-crimson-400/60 border-2 border-crimson-300 shrink-0 flex items-center justify-center" />
        <span className="h-8 w-8 rounded-full bg-crimson-600/50 border border-crimson-400/60 shrink-0" />
        <span className="h-9 w-9 rounded-full bg-crimson-400/50 border border-crimson-300/60 shrink-0" />
        <span className="h-7 w-7 rounded-full bg-crimson-600/50 border border-crimson-400/60 shrink-0" />
      </div>
      <p className="mt-4 text-center text-sm text-gray-300">
        Individual cells → <b className="text-crimson-300">clumped lattice</b>
      </p>
    </ScientificDiagram>
  )
}

function PrecipitationDiagram() {
  return (
    <ScientificDiagram title="Soluble → insoluble" caption="Unlike cell clumping, precipitation forms from dissolved reactants meeting in optimal proportion.">
      <div className="space-y-2 text-sm text-gray-300">
        {[
          { label: 'Soluble antigen', eq: 'Ab3 + Ag3 → immune complex' },
          { label: 'Visible precipitin line', eq: 'zon of equivalence' },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-2 justify-between rounded-lg bg-navy-800 px-4 py-3 border border-navy-600/40">
            <span>{r.label}</span>
            <span className="font-mono text-[11px] text-cyan-400">{r.eq}</span>
          </div>
        ))}
      </div>
    </ScientificDiagram>
  )
}

function ImmunodiffusionDiagram() {
  return (
    <ScientificDiagram title="Ouchterlony layout" caption="Antigen and antibody diffuse from facing wells; the precipitin line forms where they meet.">
      <div className="flex justify-center">
        <svg viewBox="0 0 200 120" className="w-full max-w-sm" role="img" aria-label="Agarose gel with antigen well, antibody well and precipitin line between them">
          <rect x="10" y="5" width="180" height="110" rx="8" fill="rgba(236,72,153,0.06)" stroke="rgba(236,72,153,0.35)" />
          <circle cx="60" cy="60" r="9" fill="none" stroke="#e11d48" strokeWidth="1.5" />
          <circle cx="140" cy="60" r="9" fill="none" stroke="#ec4899" strokeWidth="1.5" />
          <text x="42" y="96" fontSize="8" fill="#fb7185" fontFamily="monospace">Antigen</text>
          <text x="122" y="96" fontSize="8" fill="#e879f9" fontFamily="monospace">Antibody</text>
          <path d="M60 60 L140 60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 3" />
          <path d="M94 55 C96 60 96 60 94 65" stroke="none" />
          <circle cx="100" cy="60" r="10" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="0.5 3" strokeLinecap="round" />
          <text x="80" y="44" fontSize="7" fill="#e11d48" fontFamily="monospace">
            precipitin line
          </text>
          <line x1="100" y1="44" x2="100" y2="50" stroke="#e11d48" strokeWidth="0.6" />
        </svg>
      </div>
    </ScientificDiagram>
  )
}

function CentralDogmaDiagram() {
  return (
    <ScientificDiagram title="The central dogma" caption="Information flows from DNA to RNA to protein.">
      <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:justify-between">
        <FlowBox label="DNA" sub="the inherited blueprint" tone="cyan" />
        <FlowArrow label="replication" />
        <FlowBox label="DNA" sub="copied before division" tone="amber" />
        <FlowArrow label="transcription" />
        <FlowBox label="RNA" sub="messenger copy" tone="crimson" />
        <FlowArrow label="translation" />
        <FlowBox label="Protein" sub="the worker molecule" tone="slate" />
      </div>
    </ScientificDiagram>
  )
}

function DNAPipeline() {
  const steps = [
    'Biological evidence',
    'DNA extraction',
    'Quantification & quality',
    'Amplification (STR)',
    'DNA profile',
    'Reference comparison',
    'Statistical interpretation',
  ]
  return (
    <ScientificDiagram title="The DNA profiling pipeline" caption="Each step narrows uncertainty; the final number reports probability, not guarantee.">
      <div className="flex flex-col">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-stretch">
            <FlowBox label={s} tone={i === steps.length - 1 ? 'crimson' : i >= 5 ? 'amber' : 'cyan'} />
            {i < steps.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
    </ScientificDiagram>
  )
}