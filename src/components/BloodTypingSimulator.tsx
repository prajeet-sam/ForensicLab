import { useState } from 'react'
import type { Phenotype } from './ABOInheritanceSimulator'

const typings: Record<
  Phenotype,
  { antiA: boolean; antiB: boolean; antigens: ('A' | 'B')[]; desc: string }
> = {
  A: { antiA: true, antiB: false, antigens: ['A'], desc: 'A antigens only' },
  B: { antiA: false, antiB: true, antigens: ['B'], desc: 'B antigens only' },
  AB: { antiA: true, antiB: true, antigens: ['A', 'B'], desc: 'Both A and B antigens' },
  O: { antiA: false, antiB: false, antigens: [], desc: 'No A or B antigens' },
}

function Rbc({ size = 56, antigens }: { size?: number; antigens: ('A' | 'B')[] }) {
  const bumps: { angle: number; type: 'A' | 'B' }[] = []
  const positions = [135, 45, 225, 315, 0, 180, 90, 270]
  antigens.forEach((a, i) => {
    bumps.push({ angle: positions[i * 2] ?? positions[i], type: a })
  })
  const r = size / 2
  return (
<svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="drop-shadow-[0_0_12px_rgba(225,29,72,0.25)]">
  <circle cx={r} cy={r} r={r - 5} fill="#6b0d26" stroke="#e11d48" strokeWidth="2" />
  <circle cx={r} cy={r} r={r - 10} fill="none" stroke="#be123c" strokeWidth="1" opacity="0.6" />
      {bumps.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180
        const x = r + (r - 7) * Math.cos(rad)
        const y = r + (r - 7) * Math.sin(rad)
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4.5" fill={b.type === 'A' ? '#ec4899' : '#c026d3'} stroke="#fff" strokeWidth="1" />
          </g>
        )
      })}
    </svg>
  )
}

export function BloodTypingSimulator() {
  const [bloodType, setBloodType] = useState<Phenotype>('A')
  const [antiAApplied, setAntiAApplied] = useState(false)
  const [antiBApplied, setAntiBApplied] = useState(false)
  const [explanationTarget, setExplanationTarget] = useState<'antiA' | 'antiB' | null>(null)

  const typing = typings[bloodType]

  const reset = () => {
    setAntiAApplied(false)
    setAntiBApplied(false)
    setExplanationTarget(null)
  }

  const antiAResult = antiAApplied ? typing.antiA : null
  const antiBResult = antiBApplied ? typing.antiB : null

  return (
    <div className="space-y-5">
      {/* --- blood type selection --- */}
      <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 p-5">
        <h3 className="text-sm font-bold text-white mb-3">1 · Choose the red blood cell</h3>
        <div className="flex flex-wrap gap-2">
          {(['A', 'B', 'AB', 'O'] as Phenotype[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setBloodType(p)
                reset()
              }}
              className={`px-5 py-2.5 rounded-lg font-bold border transition-colors flex items-center gap-2 ${
                bloodType === p ? 'bg-crimson-600 text-white border-crimson-500' : 'border-navy-600 text-gray-300 hover:bg-navy-800'
              }`}
            >
              Type {p}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Rbc size={72} antigens={typing.antigens} />
          <div className="text-sm text-gray-300">
            <p>
              <span className="font-mono text-crimson-400">RBC antigens:</span> {typing.desc}
            </p>
            <p className="mt-1">
              <span className="font-mono text-cyan-400">Plasma antibodies:</span>{' '}
              {bloodType === 'A' ? 'anti-B' : bloodType === 'B' ? 'anti-A' : bloodType === 'AB' ? 'none' : 'anti-A + anti-B'}
            </p>
          </div>
        </div>
      </div>

      {/* --- reagent panels --- */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ReagentPanel
          label="Anti-A"
          tone="crimson"
          applied={antiAApplied}
          onApply={() => {
            setAntiAApplied(true)
            setExplanationTarget((e) => (e === 'antiA' ? null : e))
          }}
          result={antiAResult}
          explainOpen={explanationTarget === 'antiA'}
          onToggleExplain={() => setExplanationTarget((e) => (e === 'antiA' ? null : 'antiA'))}
          bloodType={bloodType}
          rbcAntigens={typing.antigens}
        />
        <ReagentPanel
          label="Anti-B"
          tone="cyan"
          applied={antiBApplied}
          onApply={() => {
            setAntiBApplied(true)
            setExplanationTarget((e) => (e === 'antiB' ? null : e))
          }}
          result={antiBResult}
          explainOpen={explanationTarget === 'antiB'}
          onToggleExplain={() => setExplanationTarget((e) => (e === 'antiB' ? null : 'antiB'))}
          bloodType={bloodType}
          rbcAntigens={typing.antigens}
        />
      </div>

      {/* --- outcome readout --- */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-200/90 leading-relaxed">
          <span className="font-semibold">Limitations to hold onto:</span> this is a simplified model of the agglutination
          endpoint. Real forward–reverse typing, reagent controls and weak-subgroup reactions add nuance — and agglutination
          reports a blood <i>group</i>, not an identity.
        </p>
      </div>
    </div>
  )
}

function ReagentPanel({
  label,
  tone,
  applied,
  onApply,
  result,
  explainOpen,
  onToggleExplain,
  bloodType,
  rbcAntigens,
}: {
  label: string
  tone: 'crimson' | 'cyan'
  applied: boolean
  onApply: () => void
  result: boolean | null
  explainOpen: boolean
  onToggleExplain: () => void
  bloodType: Phenotype
  rbcAntigens: ('A' | 'B')[]
}) {
  const isCrimson = tone === 'crimson'
  return (
    <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 p-5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h4 className={`text-sm font-bold ${isCrimson ? 'text-crimson-300' : 'text-cyan-300'}`}>
          Apply {label} reagent
        </h4>
        <button onClick={onApply} disabled={applied} className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
          applied
            ? 'bg-navy-800 border-navy-600/50 text-gray-500 cursor-default'
            : isCrimson
            ? 'border-crimson-500/50 text-crimson-300 hover:bg-crimson-600/15'
            : 'border-cyan-500/50 text-cyan-300 hover:bg-cyan-600/15'
        }`}>
          {applied ? 'Applied' : 'Apply'}
        </button>
      </div>

      <div className="min-h-[7rem] flex items-center justify-center relative">
        {result === null ? (
          <p className="text-xs text-gray-500 text-center">Waiting… add the reagent to see the reaction.</p>
        ) : result ? (
          <AgglutinationClump count={4} color={isCrimson ? 'bg-crimson-400' : 'bg-cyan-400'} />
        ) : (
          <div className="text-center">
            <Rbc size={52} antigens={rbcAntigens} />
            <p className="mt-2 text-xs font-mono font-bold text-gray-400">No agglutination</p>
          </div>
        )}
        {result !== null && (
          <span className={`absolute top-0 right-0 text-[11px] font-mono px-2 py-1 rounded-full border ${
            result ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-navy-800 border-navy-600/50 text-gray-400'
          }`}>
            {result ? 'REACTION' : 'NO REACTION'}
          </span>
        )}
      </div>

      <button
        onClick={onToggleExplain}
        disabled={result === null}
        className={`mt-3 w-full text-xs font-medium rounded-lg px-3 py-2 border transition-colors ${
          result === null
            ? 'border-navy-600/40 text-gray-600 cursor-not-allowed'
            : explainOpen
            ? 'bg-navy-800 border-navy-500/50 text-cyan-300'
            : isCrimson
            ? 'border-crimson-500/40 text-crimson-300 hover:bg-crimson-600/10'
            : 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/10'
        }`}
      >
        {result === null ? 'Apply reagent to reveal' : explainOpen ? 'Hide explanation' : 'Explain why'}
      </button>

      {explainOpen && result !== null && (
        <div className={`mt-3 rounded-lg border p-3.5 text-xs leading-relaxed animate-fade-in ${
          isCrimson ? 'border-crimson-500/40 bg-crimson-600/10 text-crimson-200/90' : 'border-cyan-500/40 bg-cyan-600/10 text-cyan-200/90'
        }`}>
          {result ? (
            <>
              <b>Agglutination occurred.</b> The {label} antibody matched the {antigenNames(bloodType)} antigen on these
              cells. Each antibody links two red cells, and many links build a visible lattice of clumped cells. This is
              the cross-linking a forensic serologist reads as a positive forward-typing reaction.
            </>
          ) : (
            <>
              <b>No reaction.</b> The {label} antibody binds only its matching antigen. Red cells of type {bloodType} do
              not carry the {label.slice(5)} structure — so each antibody finds nothing to hold and the cells drift apart.
              No cross-linking, no clumping.
            </>
          )}
        </div>
      )}
    </div>
  )
}

function antigenNames(p: Phenotype) {
  if (p === 'A') return 'A (carbohydrate)'
  if (p === 'B') return 'B (carbohydrate)'
  if (p === 'AB') return 'A and B'
  return 'neither A nor B'
}

function AgglutinationClump({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="Agglutination — red cells clumped together">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`${color} rounded-full border border-white/40 animate-[pulse_1.6s_ease-in-out_infinite]`}
          style={{
            width: `${26 - i * 2}px`,
            height: `${26 - i * 2}px`,
            animationDelay: `${i * 0.25}s`,
            marginLeft: i === 0 ? 0 : '-6px',
          }}
        />
      ))}
    </div>
  )
}