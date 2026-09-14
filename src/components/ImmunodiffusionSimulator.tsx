import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

const DURATION = 9000 // ms at 1x
const LINE_FORM_AT = 0.52 // fraction of max radius at which the fronts meet

export function ImmunodiffusionSimulator() {
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [lineFormed, setLineFormed] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const raf = useRef<number | null>(null)
  const progressRef = useRef(0)

  // keep the latest progress in a ref so the play loop can resume from it
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    if (progress >= 1) {
      setPlaying(false)
      setLineFormed(true)
    } else {
      setLineFormed(progress >= LINE_FORM_AT)
    }
  }, [progress])

  useEffect(() => {
    if (!playing) return
    let start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const next = Math.min(1, progressRef.current + (elapsed / DURATION) * speed)
      progressRef.current = next
      setProgress(next)
      start = now
      if (next < 1) {
        raf.current = requestAnimationFrame(tick)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [playing, speed])

  const reset = () => {
    setPlaying(false)
    setProgress(0)
    progressRef.current = 0
    setLineFormed(false)
    setShowExplanation(false)
  }

  // geometry
  const viewW = 380
  const viewH = 230
  const wellR = 11
  const agWell = { x: 78, y: viewH / 2 }
  const abWell = { x: viewW - 78, y: viewH / 2 }
  const maxR = (abWell.x - agWell.x) / 2 - 14
  const frontRadius = progress * maxR
  const frontsMet = progress >= LINE_FORM_AT
  const lineY = viewH / 2

  return (
    <div className="space-y-4">
      {/* gel visualization */}
      <div className="rounded-xl border border-cyan-500/30 bg-navy-900/70 overflow-hidden">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-auto" role="img" aria-label="Double immunodiffusion in agarose gel">
          {/* gel background */}
          <rect x="6" y="6" width={viewW - 12} height={viewH - 12} rx="10" fill="rgba(236,72,153,0.05)" stroke="rgba(236,72,153,0.3)" strokeDasharray="3 3" />
          <text x={viewW / 2} y={viewH - 10} textAnchor="middle" fontSize="7" fill="rgba(148,163,184,0.5)" fontFamily="monospace">AGAROSE GEL</text>

          {/* diffusion fronts */}
          <defs>
            <radialGradient id="agGrad">
              <stop offset="0%" stopColor="rgba(225,29,72,0.5)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="rgba(225,29,72,0)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="abGrad">
              <stop offset="0%" stopColor="rgba(192,38,211,0.5)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="rgba(192,38,211,0)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {frontRadius > 1 && (
            <circle cx={agWell.x} cy={agWell.y} r={frontRadius} fill="url(#agGrad)" opacity={frontsMet ? 0.35 : 1} />
          )}
          {frontRadius > 1 && (
            <circle cx={abWell.x} cy={abWell.y} r={frontRadius} fill="url(#abGrad)" opacity={frontsMet ? 0.35 : 1} />
          )}

          {/* precipitin line */}
          {frontsMet && (
            <g>
              <ellipse cx={viewW / 2} cy={lineY} rx={frontRadius / 2.4} ry={11} fill="rgba(255,255,255,0.05)" stroke="none" />
              <path
                d={`M ${viewW / 2 - 18} ${lineY} C ${viewW / 2 - 6} ${lineY - 9}, ${viewW / 2 + 6} ${lineY - 9}, ${viewW / 2 + 18} ${lineY}`}
                stroke="#fff"
                strokeWidth="2.6"
                fill="none"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d={`M ${viewW / 2 - 14} ${lineY + 5} C ${viewW / 2 - 4} ${lineY - 3}, ${viewW / 2 + 4} ${lineY - 3}, ${viewW / 2 + 14} ${lineY + 5}`}
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
            </g>
          )}

          {/* wells */}
          <circle cx={agWell.x} cy={agWell.y} r={wellR} fill="#3b0f24" stroke="#e11d48" strokeWidth="1.6" />
          <circle cx={abWell.x} cy={abWell.y} r={wellR} fill="#260b2e" stroke="#c026d3" strokeWidth="1.6" />

          <text x={agWell.x} y={agWell.y + 4} textAnchor="middle" fontSize="8" fill="#e11d48" fontFamily="monospace">
            Ag
          </text>
          <text x={abWell.x} y={abWell.y + 4} textAnchor="middle" fontSize="8" fill="#e879f9" fontFamily="monospace">
            Ab
          </text>

          {/* labels */}
          <text x={agWell.x} y={agWell.y + 32} textAnchor="middle" fontSize="8" fill="#fb7185" fontFamily="monospace">Antigen (Ag)</text>
          <text x={abWell.x} y={abWell.y + 32} textAnchor="middle" fontSize="8" fill="#e879f9" fontFamily="monospace">Antibody (Ab)</text>

          {frontsMet && (
            <text x={viewW / 2} y={lineY - 26} textAnchor="middle" fontSize="8" fill="#fff" fontFamily="monospace" opacity="0.95">
              precipitin line
            </text>
          )}
        </svg>
      </div>

      {/* playback controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => { if (progress >= 1) reset(); setPlaying((p) => !p) }} className="btn-primary !px-4 !py-2 !text-sm" aria-label={playing ? 'Pause diffusion' : 'Play diffusion'}>
          <Icon name={playing ? 'pause' : 'play'} className="w-4 h-4" />
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={reset} className="btn-secondary !px-4 !py-2 !text-sm" aria-label="Reset diffusion">
          <Icon name="reset" className="w-4 h-4" />
          Reset
        </button>
        <div className="flex items-center gap-1.5 ml-1" role="group" aria-label="Diffusion speed">
          <Icon name="speed" className="w-4 h-4 text-gray-400" />
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                speed === s ? 'bg-cyan-600 text-white border-cyan-500' : 'border-navy-600 text-gray-400 hover:bg-navy-800'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* status readout */}
      <div className="rounded-lg border border-navy-600/40 bg-navy-900/60 px-4 py-3">
        <p className="text-sm text-gray-200">
          {progress < 1 ? (
            <>
              <span className="font-mono text-cyan-400">Diffusing…</span> the soluble antigen (left well) and its
              antibody (right well) are moving radially through the pores of the agarose gel.
            </>
          ) : (
            <>
              <span className="font-mono text-emerald-400">Fronts fully diffused.</span> The two zones overlapped where
              their concentrations were optimal, leaving an insoluble immune complex.
            </>
          )}
        </p>
        {lineFormed && (
          <p className="mt-2 text-sm text-gray-200 animate-fade-in">
            <span className="font-mono text-white">Precipitin line formed.</span> Antigen + antibody → immune complex →
            visible line at the equivalence zone.
          </p>
        )}
      </div>

      {/* explanation toggle */}
      <button onClick={() => setShowExplanation((s) => !s)} className="topic-link text-sm">
        {showExplanation ? 'Hide' : 'Why does the line form?'}
      </button>
      {showExplanation && (
        <div className="rounded-lg border border-cyan-500/40 bg-cyan-600/10 p-4 text-sm text-gray-200 leading-relaxed animate-fade-in">
          <p>
            Each well loads a solution: antigen in one, antibody in the other. Both diffuse outward in all directions.
            Antibodies are large but mobile in the agarose pores; antigens are smaller and travel faster.
          </p>
          <p className="mt-2">
            Where the two fronts meet, the antigen:antibody ratio passes through its <b>optimal (equivalence) zone</b>.
            There, cross-linking is maximal and the soluble reactants combine into an <b>insoluble immune complex</b> that
            can no longer diffuse — so it precipitates as a visible white line.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            A curved line bending toward a well indicates the antigen or antibody is in excess on the other side.
            Line patterns between adjacent wells reveal identity, non-identity, or partial identity of two antigens —
            the basis of forensic species typing.
          </p>
        </div>
      )}
    </div>
  )
}