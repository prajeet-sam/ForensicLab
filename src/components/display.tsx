import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import type { ProcessStep } from '../lib/types'

export function ProcessTimeline({
  steps,
  compact,
  accent = 'cyan',
}: {
  steps: ProcessStep[]
  compact?: boolean
  accent?: 'cyan' | 'crimson' | 'amber'
}) {
  const dot = accent === 'crimson' ? 'bg-crimson-500' : accent === 'amber' ? 'bg-amber-500' : 'bg-cyan-500'
  return (
    <ol className={`space-y-0 ${compact ? '' : ''}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-3.5 pb-5 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute left-[7px] top-5 bottom-0 w-px ${accent === 'crimson' ? 'bg-crimson-500/30' : accent === 'amber' ? 'bg-amber-500/30' : 'bg-cyan-500/30'}`}
            />
          )}
          <span className={`mt-1 h-[15px] w-[15px] shrink-0 rounded-full ${dot} ring-4 ring-navy-900/40`} />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white">
              <span className="mr-1.5 text-[10px] font-mono text-gray-500">{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mt-0.5">{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function ScientificDiagram({
  title,
  caption,
  children,
  tone = 'cyan',
}: {
  title?: string
  caption?: string
  children: ReactNode
  tone?: 'cyan' | 'crimson' | 'amber'
}) {
  const border = tone === 'crimson' ? 'border-crimson-500/30' : tone === 'amber' ? 'border-amber-500/30' : 'border-cyan-500/30'
  const tag = tone === 'crimson' ? 'text-crimson-400' : tone === 'amber' ? 'text-amber-400' : 'text-cyan-400'
  return (
    <figure className={`border ${border} rounded-xl bg-navy-900/60 overflow-hidden`}>
      {title && (
        <figcaption className={`flex items-center gap-2 px-4 py-2.5 border-b ${border}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" style={{ color: 'inherit' }} />
          <span className={`text-xs font-mono uppercase tracking-widest ${tag}`}>{title}</span>
        </figcaption>
      )}
      <div className="p-4 sm:p-5">{children}</div>
      {caption && (
        <p className="px-4 pb-4 -mt-1 text-xs text-gray-400 leading-relaxed">{caption}</p>
      )}
    </figure>
  )
}

export function FlowBox({
  label,
  sub,
  tone = 'cyan',
}: {
  label: string
  sub?: string
  tone?: 'cyan' | 'crimson' | 'amber' | 'slate'
}) {
  const tones: Record<string, string> = {
    cyan: 'border-cyan-500/40 bg-cyan-600/10 text-cyan-200',
    crimson: 'border-crimson-500/40 bg-crimson-600/10 text-crimson-200',
    amber: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
    slate: 'border-navy-500/60 bg-navy-800 text-gray-200',
  }
  return (
    <div className={`rounded-lg border px-3 py-2.5 text-center ${tones[tone]}`}>
      <p className="font-semibold text-sm">{label}</p>
      {sub && <p className="text-[11px] opacity-75 mt-0.5">{sub}</p>}
    </div>
  )
}

export function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-0.5" aria-hidden="true">
      <Icon name="arrow-right" className="w-4 h-4 text-gray-500 rotate-90" />
      {label && <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 -mt-1">{label}</span>}
    </div>
  )
}

export function HorizontalFlow({ children }: { children: ReactNode }) {
  return <div className="flex flex-col sm:flex-row sm:items-stretch sm:gap-0.5 gap-1">{children}</div>
}

export function EvidenceCard({
  id,
  label,
  note,
  tone = 'slate',
}: {
  id: string
  label: string
  note?: string
  tone?: 'cyan' | 'crimson' | 'amber' | 'slate'
}) {
  const tones: Record<string, string> = {
    cyan: 'border-cyan-500/40',
    crimson: 'border-crimson-500/40',
    amber: 'border-amber-500/40',
    slate: 'border-navy-500/60',
  }
  return (
    <div className={`rounded-lg border ${tones[tone]} bg-navy-900/70 p-3.5`}>
      <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{id}</p>
      <p className="text-sm font-medium text-white mt-1">{label}</p>
      {note && <p className="text-xs text-gray-400 mt-1 leading-relaxed">{note}</p>}
    </div>
  )
}

export function PrincipleCard({
  id,
  title,
  definition,
  children,
}: {
  id: string
  title: string
  definition: string
  children?: ReactNode
}) {
  return (
    <article id={id} className="glass-panel p-5 sm:p-6 scroll-mt-24">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">{definition}</p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </article>
  )
}

export function TopicCard({
  id,
  title,
  definition,
  category,
  icon = 'microscope',
  tone = 'cyan',
  completed,
}: {
  id: string
  title: string
  definition: string
  category?: string
  icon?: string
  tone?: 'cyan' | 'crimson' | 'amber' | 'slate'
  completed?: boolean
}) {
  const tones: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-600/10',
    crimson: 'text-crimson-400 bg-crimson-600/10',
    amber: 'text-amber-400 bg-amber-500/10',
    slate: 'text-gray-300 bg-navy-700',
  }
  return (
    <Link
      to={`/learn/${id}`}
      className="glass-panel p-4 hover:border-cyan-500/40 hover:bg-navy-800/80 transition-all duration-200 group block"
    >
      <div className="flex items-start gap-3">
        <span className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${tones[tone]}`}>
          <Icon name={icon as never} className="w-4.5 h-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {title}
            </h3>
            {completed && <Icon name="check" className="w-4 h-4 text-emerald-400 shrink-0" />}
          </div>
          {category && <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mt-0.5">{category}</p>}
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{definition}</p>
        </div>
      </div>
    </Link>
  )
}

export function DisciplineCard({
  id,
  name,
  blurb,
  icon = 'microscope',
  group,
}: {
  id: string
  name: string
  blurb: string
  icon?: string
  group?: string
}) {
  return (
    <Link
      to={`/explore/${id}`}
      className="glass-panel p-4 hover:border-cyan-500/40 hover:bg-navy-800/80 transition-all duration-200 group block"
    >
      <div className="flex items-start gap-3">
        <span className="h-9 w-9 rounded-lg bg-cyan-600/10 flex items-center justify-center shrink-0">
          <Icon name={icon as never} className="w-4.5 h-4.5 text-cyan-400" />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{name}</h3>
          {group && <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mt-0.5">{group}</p>}
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{blurb}</p>
        </div>
      </div>
    </Link>
  )
}

export function CaseCard({
  slug,
  title,
  subtitle,
  difficulty,
  tag,
  summary,
  progress,
}: {
  slug: string
  title: string
  subtitle: string
  difficulty: string
  tag: string
  summary: string
  progress?: { decisionsDone: number; submitted: boolean } | null
}) {
  const diffTone =
    difficulty === 'Beginner' ? 'green' : difficulty === 'Intermediate' ? 'amber' : 'crimson'
  return (
    <Link
      to={`/cases/${slug}`}
      className="glass-panel p-5 hover:border-crimson-500/40 hover:bg-navy-800/80 transition-all duration-200 group block"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-crimson-400">{tag}</span>
        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
          diffTone === 'green'
            ? 'text-emerald-400 border-emerald-500/40'
            : diffTone === 'amber'
            ? 'text-amber-400 border-amber-500/40'
            : 'text-crimson-400 border-crimson-500/40'
        }`}>
          {difficulty}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="h-10 w-10 rounded-lg bg-crimson-600/15 flex items-center justify-center shrink-0">
          <Icon name="case" className="w-5 h-5 text-crimson-400" />
        </span>
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-crimson-300 transition-colors">{title}</h3>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">{summary}</p>
      {progress?.submitted ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
          <Icon name="check" className="w-3.5 h-3.5" /> Completed
        </span>
      ) : progress && progress.decisionsDone > 0 ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400">
          <Icon name="clock" className="w-3.5 h-3.5" /> In progress · {progress.decisionsDone} steps done
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
          <Icon name="case" className="w-3.5 h-3.5" /> Open case file
        </span>
      )}
    </Link>
  )
}

export function SimulatorShell({
  title,
  definition,
  children,
  tone = 'cyan',
}: {
  title: string
  definition?: string
  children: ReactNode
  tone?: 'cyan' | 'crimson' | 'amber'
}) {
  const chipBg = tone === 'crimson' ? 'bg-crimson-600/15' : tone === 'amber' ? 'bg-amber-500/10' : 'bg-cyan-600/15'
  const chipIcon = tone === 'crimson' ? 'text-crimson-400' : tone === 'amber' ? 'text-amber-300' : 'text-cyan-400'
  return (
    <div className="space-y-4">
      <div className="glass-panel p-5">
        <div className="flex items-center gap-3">
          <span className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${chipBg}`}>
            <Icon name="testtube" className={`w-5 h-5 ${chipIcon}`} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {definition && <p className="text-sm text-gray-400 leading-relaxed">{definition}</p>}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
      <span className={`h-2.5 w-2.5 rounded-sm ${color}`} />
      {label}
    </span>
  )
}