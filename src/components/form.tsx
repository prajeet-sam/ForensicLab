import type { ReactNode } from 'react'
import { Icon } from './Icon'

/* ---------------------------------- labelled form field ---------------------------------- */

export function FormField({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
        {label} {required && <span className="text-crimson-400">*</span>}
      </label>
      {children}
    </div>
  )
}

/* ---------------------------------- ok / fail feedback banner ---------------------------------- */

export function FeedbackBanner({ status, msg, className }: { status: 'ok' | 'fail'; msg: string; className?: string }) {
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed animate-fade-in ${
      status === 'ok' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200/90' : 'border-crimson-500/50 bg-crimson-600/10 text-crimson-200/90 font-medium'
    } ${className ?? ''}`}>
      {status === 'ok' ? <Icon name="check" className="w-4 h-4 inline mr-1 -mt-0.5" /> : <Icon name="warning" className="w-4 h-4 inline mr-1 -mt-0.5" />}
      {msg}
    </div>
  )
}

/* ---------------------------------- horizontal step-dot progress ---------------------------------- */

export function ProgressDots({
  total,
  completed,
  current,
  labels,
  onSelect,
  dotClass = 'h-1.5 flex-1 rounded-full',
  ariaLabel = 'Intake steps',
}: {
  total: number
  completed: number
  current?: number
  labels?: ReactNode[]
  onSelect?: (index: number) => void
  dotClass?: string
  ariaLabel?: string
}) {
  if (!labels) {
    return (
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`${dotClass} ${i < completed ? 'bg-cyan-400' : 'bg-navy-700'}`} />
        ))}
      </div>
    )
  }
  const active = current ?? completed
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={ariaLabel}>
      {labels.map((label, i) => (
        <button
          key={i}
          onClick={() => i < active && onSelect?.(i)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
            i === active
              ? 'border-cyan-500/60 bg-cyan-600/10 text-cyan-300'
              : i < active
              ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300'
              : 'border-navy-600/50 text-gray-500'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${i === active ? 'bg-cyan-400 animate-pulse-slow' : i < active ? 'bg-emerald-400' : 'bg-navy-500'}`} />
          {label}
        </button>
      ))}
    </div>
  )
}