import type { ReactNode } from 'react'
import { Icon } from './Icon'

/* ---------------------------------- bench meta chip row ---------------------------------- */

export interface BenchMetaItem {
  label: string
  value: string
}

export function BenchMeta({ items }: { items: BenchMetaItem[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
      {items.map((it) => (
        <div key={it.label} className="flex items-baseline gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{it.label}</span>
          <span className="text-[11px] font-mono text-gray-300">{it.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------------------------------- status LED ---------------------------------- */

export type LedState = 'idle' | 'run' | 'ok' | 'fail' | 'warn'

const ledTone: Record<LedState, { dot: string; label: string }> = {
  idle: { dot: 'bg-gray-500 shadow-none', label: 'text-gray-500' },
  run: { dot: 'bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.7)]', label: 'text-amber-300' },
  ok: { dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(255,94,194,0.7)]', label: 'text-emerald-300' },
  fail: { dot: 'bg-crimson-500 shadow-[0_0_8px_rgba(225,29,72,0.7)]', label: 'text-crimson-400' },
  warn: { dot: 'bg-amber-500 shadow-[0_0_8px_rgba(255,127,102,0.7)]', label: 'text-amber-400' },
}

export function StatusLed({ state, label }: { state: LedState; label?: string }) {
  const t = ledTone[state]
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono ${t.label}`}>
      <span className={`h-2 w-2 rounded-full ${t.dot}`} />
      {label ?? state.toUpperCase()}
    </span>
  )
}

/* ---------------------------------- instrument-style bench panel ---------------------------------- */

export function BenchPanel({
  title,
  status = 'idle',
  meta,
  children,
}: {
  title: string
  status?: LedState
  meta?: BenchMetaItem[]
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-navy-500/40 bg-gradient-to-b from-navy-900 to-[#170a11] overflow-hidden shadow-lg shadow-black/30">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-navy-600/50 bg-navy-950/60">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson-500" aria-hidden="true" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-gray-300">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusLed state={status} />
          <StatusLed state={status === 'fail' ? 'fail' : 'idle'} label="PWR" />
        </div>
      </div>
      {meta && (
        <div className="px-4 py-2 border-b border-navy-700/50 bg-navy-950/40">
          <BenchMeta items={meta} />
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}

/* ---------------------------------- barcode-ish strip ---------------------------------- */

export function Barcode({ value, className = 'w-24 h-8' }: { value: string; className?: string }) {
  const seed = value.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const bars: number[] = []
  let x = seed
  for (let i = 0; i < 24; i++) {
    x = (x * 9301 + 49297) % 233280
    bars.push((x % 5) + 1)
  }
  return (
    <span
      className={`inline-block ${className} rounded-sm`}
      role="img"
      aria-label={`Barcode ${value}`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, #f9d1e8 0 1px, transparent 1px ${(bars[0] % 3) + 1}px), repeating-linear-gradient(90deg, #f9d1e8 0 1px, transparent 1px ${(bars[1] % 3) + 1}px)`,
        opacity: 0.9,
      }}
    />
  )
}

/* ---------------------------------- evidence packet ---------------------------------- */

export function EvidenceEnvelope({
  exhibit,
  item,
  note,
  sealed = true,
}: {
  exhibit: string
  item: string
  note?: string
  sealed?: boolean
}) {
  return (
    <figure className="w-56 shrink-0 select-none" aria-label={`Evidence packet ${exhibit}`}>
      <svg viewBox="0 0 220 140" className="w-full h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]" aria-hidden="true">
        <defs>
          <linearGradient id="envPaper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8b98a" />
            <stop offset="55%" stopColor="#c9a56e" />
            <stop offset="100%" stopColor="#b98f58" />
          </linearGradient>
          <linearGradient id="envShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <rect x="8" y="22" width="204" height="106" rx="4" fill="url(#envPaper)" stroke="#8a6a3a" strokeWidth="1.5" />
        <path d="M8 22 L114 82 L212 22" fill="none" stroke="#8a6a3a" strokeWidth="1.5" opacity="0.7" />
        <path d="M96 22 L124 46 L152 22" fill="#b98f58" opacity="0.6" />
        <rect x="14" y="86" width="112" height="36" rx="3" fill="#f3ead6" stroke="#8a6a3a" strokeWidth="1" />
        <text x="22" y="100" fontSize="6.5" fontFamily="monospace" fill="#3a2f1e" letterSpacing="1">EVIDENCE EXHIBIT</text>
        <text x="22" y="110" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#1f1a10">{exhibit}</text>
        <text x="22" y="118" fontSize="5" fontFamily="monospace" fill="#5c4a2a">{item.toUpperCase().slice(0, 26)}{item.length > 26 ? '…' : ''}</text>
        <rect x="196" y="92" width="12" height="20" rx="1" fill="#8a1f32" opacity="0.85" />
        <text x="202" y="111" fontSize="6" fontFamily="monospace" fill="#ffe4e4" textAnchor="middle" transform="rotate(90 202 102)">SEAL</text>
        {sealed && (
          <>
            <path d="M108 92 l6 -7 l6 7 z" fill="#be123c" />
            <path d="M111 92 v-4 a3 3 0 1 1 6 0 v4" fill="none" stroke="#e11d48" strokeWidth="1" opacity="0.9" />
          </>
        )}
      </svg>
      <figcaption className="mt-1 text-[10px] font-mono text-gray-500 leading-relaxed">
        {note && `${note} · `}seals {sealed ? 'intact' : 'noted'}
      </figcaption>
    </figure>
  )
}

/* ---------------------------------- official paper document ---------------------------------- */

export function PaperDoc({
  agency,
  formCode,
  title,
  refNo,
  children,
  footer,
}: {
  agency: string
  formCode: string
  title: string
  refNo: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="bg-lab-100 text-gray-900 px-5 py-6 sm:px-7">
        <div className="flex items-start justify-between gap-4 border-b-2 border-gray-900 pb-3 mb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{formCode}</p>
            <h4 className="text-base font-bold tracking-tight mt-0.5">{agency}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{title}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Ref No.</p>
            <p className="text-xs font-mono font-semibold">{refNo}</p>
          </div>
        </div>
        <div className="space-y-3">{children}</div>
        {footer && <div className="mt-6 pt-3 border-t border-gray-300">{footer}</div>}
      </div>
    </div>
  )
}

export function PaperField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{label}</p>
      <div className="mt-0.5 text-sm leading-relaxed border-b border-dotted border-gray-400 pb-1">{children}</div>
    </div>
  )
}

export function PaperRule({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed">{children}</p>
}

/* ---------------------------------- approval / status stamp ---------------------------------- */

export function Stamp({ text, tone = 'ok' }: { text: string; tone?: 'ok' | 'fail' | 'warn' }) {
  const tones = {
    ok: 'border-emerald-600 text-emerald-700',
    fail: 'border-crimson-600 text-crimson-600',
    warn: 'border-amber-600 text-amber-700',
  }
  return (
    <span
      className={`inline-block -rotate-6 border-[3px] rounded-md px-3 py-1 text-[13px] font-black uppercase tracking-[0.2em] select-none ${tones[tone]}`}
      style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.08)' }}
    >
      {text}
    </span>
  )
}

/* ---------------------------------- small helper: local date-time ---------------------------------- */

export function nowLocalInput(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function formatReadable(v: string): string {
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/)
  const d = m
    ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]))
    : new Date(v)
  if (isNaN(d.getTime())) return v
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]} ${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export { Icon }