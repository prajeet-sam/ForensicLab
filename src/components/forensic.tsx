import type { ReactNode } from 'react'

export type EvidenceTone = 'cyan' | 'crimson' | 'amber' | 'emerald' | 'slate'

const toneClass: Record<EvidenceTone, { text: string; border: string }> = {
  crimson: { text: 'text-crimson-400', border: 'border-crimson-500/40' },
  cyan: { text: 'text-cyan-400', border: 'border-cyan-500/40' },
  amber: { text: 'text-amber-300', border: 'border-amber-500/40' },
  emerald: { text: 'text-emerald-400', border: 'border-emerald-500/40' },
  slate: { text: 'text-gray-400', border: 'border-navy-500/40' },
}

export function ExhibitTag({
  id,
  tone = 'crimson',
  children,
}: {
  id: string
  tone?: EvidenceTone
  children?: ReactNode
}) {
  const t = toneClass[tone]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest ${t.border} ${t.text}`}
    >
      <span className="opacity-70">Exh</span>
      <span>{id}</span>
      {children}
    </span>
  )
}

export function ChainStatusDot({ open }: { open: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${open ? 'animate-pulse bg-amber-400' : 'bg-emerald-400'}`} />
      <span
        className={`text-[9px] font-mono uppercase tracking-widest ${
          open ? 'text-amber-300' : 'text-emerald-400'
        }`}
      >
        {open ? 'Open — awaiting practice' : 'Sealed — custody intact'}
      </span>
    </span>
  )
}

export function CaseStampBar({
  entries,
  state,
}: {
  entries: { label: string; value: string; tone?: EvidenceTone }[]
  state: { open: boolean }
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-lg border border-dashed border-crimson-500/25 bg-navy-900/40 px-4 py-2.5">
      {entries.map((e, i) => {
        const t = toneClass[e.tone ?? 'slate']
        return (
          <span key={i} className="flex items-baseline gap-1.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{e.label}</span>
            <span className={`text-[10px] font-mono uppercase tracking-wider ${t.text}`}>{e.value}</span>
          </span>
        )
      })}
      <span className="ml-auto">
        <ChainStatusDot open={state.open} />
      </span>
    </div>
  )
}