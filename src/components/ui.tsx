import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{title}</h1>
      {description && (
        <p className="mt-3 text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </header>
  )
}

export function SectionTitle({
  title,
  description,
  id,
}: {
  title: string
  description?: string
  id?: string
}) {
  return (
    <div className="mb-6" id={id}>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-2 text-gray-300 max-w-3xl leading-relaxed">{description}</p>}
    </div>
  )
}

export function Badge({
  children,
  tone = 'slate',
}: {
  children: ReactNode
  tone?: 'crimson' | 'cyan' | 'amber' | 'slate' | 'green'
}) {
  const tones: Record<string, string> = {
    crimson: 'bg-crimson-600/20 text-crimson-400 border-crimson-500/40',
    cyan: 'bg-cyan-600/15 text-cyan-400 border-cyan-500/40',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
    slate: 'bg-navy-700 text-gray-300 border-navy-500/50',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section' | 'li'
}) {
  return (
    <Tag
      className={`glass-panel p-5 transition-all duration-200 hover:border-cyan-500/40 ${className}`}
    >
      {children}
    </Tag>
  )
}

export function EvidenceTag({ label }: { label: string }) {
  return <span className="evidence-tag">{label}</span>
}

export function ArrowLink({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  )
}

export function InfoBlock({
  title,
  children,
  tone = 'cyan',
}: {
  title: string
  children: ReactNode
  tone?: 'cyan' | 'crimson' | 'amber' | 'slate'
}) {
  const tones: Record<string, string> = {
    cyan: 'border-cyan-500/40 bg-cyan-600/10 text-cyan-200',
    crimson: 'border-crimson-500/40 bg-crimson-600/10 text-crimson-200',
    amber: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
    slate: 'border-navy-500/50 bg-navy-700/40 text-gray-200',
  }
  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <p className="font-semibold text-sm mb-1">{title}</p>
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  )
}

export function DefinitionStrip({ children }: { children: ReactNode }) {
  return (
    <div className="laboratory-surface p-4 sm:p-5 border-l-4 border-crimson-500">
      <p className="text-xs font-mono uppercase tracking-widest text-crimson-600 mb-1">
        Definition
      </p>
      <p className="text-gray-900 font-medium leading-relaxed">{children}</p>
    </div>
  )
}

export function EmptyState({
  icon = 'search',
  title,
  description,
  action,
}: {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="text-center py-16 px-6">
      <div className="mx-auto w-14 h-14 rounded-full bg-navy-700 flex items-center justify-center mb-4">
        <span className="text-2xl" aria-hidden="true">
          {icon === 'search' ? '⌕' : icon === 'question' ? '?' : '⦿'}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-gray-400 max-w-md mx-auto leading-relaxed">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function ProgressBar({
  value,
  label,
  tone = 'cyan',
}: {
  value: number
  label?: string
  tone?: 'cyan' | 'crimson' | 'amber'
}) {
  const tones: Record<string, string> = {
    cyan: 'from-cyan-500 to-cyan-400',
    crimson: 'from-crimson-600 to-crimson-400',
    amber: 'from-amber-500 to-amber-400',
  }
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>{label}</span>
          <span className="font-mono">{value}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-navy-700 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${tones[tone]} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}

export function KeyValueRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 py-2 border-b border-navy-600/40">
      <dt className="text-xs font-mono uppercase tracking-wider text-gray-500 sm:w-40 shrink-0">
        {label}
      </dt>
      <dd className="text-sm text-gray-200 leading-relaxed">{children}</dd>
    </div>
  )
}