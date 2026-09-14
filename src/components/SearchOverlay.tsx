import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import { buildSearchIndex, runSearch } from '../lib/search'
import type { SearchIndexItem } from '../lib/search'
import { topics } from '../data/topics-index'
import { disciplines } from '../data/disciplines'
import { principles } from '../data/principles'
import { glossary } from '../data/glossary'
import { cases } from '../data/cases'
import { moduleNotes } from '../data/modules'

function useGlobalIndex() {
  return useMemo<SearchIndexItem[]>(() => {
    const items: SearchIndexItem[] = [
      ...topics.map((t) => ({
        id: t.id,
        title: t.title,
        description: `${t.definition} ${t.discipline}`,
        kind: 'topic' as const,
        url: `/learn/${t.id}`,
      })),
      ...disciplines.map((d) => ({
        id: d.id,
        title: d.name,
        description: `${d.blurb} ${d.group}`,
        kind: 'discipline' as const,
        url: `/explore/${d.id}`,
      })),
      ...principles.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.definition,
        kind: 'principle' as const,
        url: `/principles#${p.id}`,
      })),
      ...glossary.map((g) => ({
        id: g.term,
        title: g.term,
        description: g.definition,
        kind: 'glossary' as const,
        url: `/glossary/${encodeURIComponent(g.term.toLowerCase())}`,
      })),
      ...cases.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.summary,
        kind: 'case' as const,
        url: `/cases/${c.slug}`,
      })),
      ...moduleNotes.map((m) => ({
        id: m.id,
        title: m.title,
        description: `${m.description} ${m.subtitle}`,
        kind: 'module' as const,
        url: `/modules/${m.slug}`,
      })),
      {
        id: 'sim-abo',
        title: 'ABO Inheritance Simulator',
        description: 'Predict possible child blood groups from parents in phenotype and genotype modes.',
        kind: 'simulator' as const,
        url: '/simulators/abo',
      },
      {
        id: 'sim-typing',
        title: 'Antigen-Antibody Blood Typing Simulator',
        description: 'Test the reaction between RBC antigens and anti-A / anti-B antibodies.',
        kind: 'simulator' as const,
        url: '/simulators/blood-typing',
      },
      {
        id: 'sim-immuno',
        title: 'Double Immunodiffusion Simulator',
        description: 'Watch Ouchterlony precipitin line formation in an animated agarose gel.',
        kind: 'simulator' as const,
        url: '/simulators/immunodiffusion',
      },
      {
        id: 'sim-presumptive',
        title: 'Presumptive Blood Test Simulator',
        description: 'Luminol and Kastle-Meyer screening chemistry with honest limitations.',
        kind: 'simulator' as const,
        url: '/simulators/presumptive-tests',
      },
      {
        id: 'sim-chain',
        title: 'Chain of Custody Simulator',
        description: 'Move an exhibit through the custody workflow and document every transfer.',
        kind: 'simulator' as const,
        url: '/simulators/chain-of-custody',
      },
      {
        id: 'sim-redstain',
        title: 'The Red Stain Case',
        description: 'Solve a blood-evidence case with careful scientific interpretation.',
        kind: 'case' as const,
        url: '/cases/red-stain',
      },
      { id: 'pg-home', title: 'Home', description: 'Forensic science learning platform', kind: 'page' as const, url: '/' },
      { id: 'pg-explore', title: 'Explore Disciplines', description: 'Interactive map of forensic disciplines', kind: 'page' as const, url: '/explore' },
      { id: 'pg-learn', title: 'Learning Hub', description: 'All learning topics', kind: 'page' as const, url: '/learn' },
      { id: 'pg-principles', title: 'Scientific Principles', description: 'Locard and the fundamental principles', kind: 'page' as const, url: '/principles' },
      { id: 'pg-simulators', title: 'Simulators', description: 'Interactive scientific simulators', kind: 'page' as const, url: '/simulators' },
      { id: 'pg-laboratory', title: 'Virtual Laboratory', description: 'Evidence workflow dashboard', kind: 'page' as const, url: '/laboratory' },
      { id: 'pg-cases', title: 'Case Files', description: 'Fictional investigative cases', kind: 'page' as const, url: '/cases' },
      { id: 'pg-quizzes', title: 'Quizzes', description: 'Module tests and explanations', kind: 'page' as const, url: '/quizzes' },
      { id: 'pg-exam', title: 'Exam Center', description: 'Mock exams, weak-area tracking and quick revision', kind: 'page' as const, url: '/exam' },
      { id: 'pg-glossary', title: 'Glossary', description: 'Searchable reference terms', kind: 'page' as const, url: '/glossary' },
      { id: 'pg-modules', title: 'Module Library', description: 'Full lecture notes for all modules', kind: 'page' as const, url: '/modules' },
      { id: 'pg-about', title: 'About & Methodology', description: 'How this platform teaches forensic science', kind: 'page' as const, url: '/about' },
    ]
    return buildSearchIndex(items)()
  }, [])
}

const kindStyles: Record<SearchIndexItem['kind'], { label: string; cls: string }> = {
  topic: { label: 'Topic', cls: 'bg-cyan-600/20 text-cyan-400' },
  discipline: { label: 'Discipline', cls: 'bg-navy-700 text-gray-300' },
  principle: { label: 'Principle', cls: 'bg-amber-500/15 text-amber-400' },
  glossary: { label: 'Term', cls: 'bg-crimson-600/20 text-crimson-400' },
  case: { label: 'Case', cls: 'bg-emerald-500/15 text-emerald-400' },
  simulator: { label: 'Simulator', cls: 'bg-cyan-600/20 text-cyan-400' },
  module: { label: 'Module', cls: 'bg-cyan-600/20 text-cyan-400' },
  page: { label: 'Page', cls: 'bg-navy-700 text-gray-300' },
}

export function SearchOverlay({
  open,
  onClose,
  initialQuery = '',
}: {
  open: boolean
  onClose: () => void
  initialQuery?: string
}) {
  const index = useGlobalIndex()
  const navigate = useNavigate()
  const [query, setQuery] = useState(initialQuery)
  const results = query.trim() ? runSearch(index, query).slice(0, 12) : []

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search the platform"
    >
      <div className="w-full max-w-xl glass-panel p-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-navy-600/40 pb-3 mb-3">
          <Icon name="search" className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'Enter' && results.length > 0) {
                navigate(results[0].url)
                onClose()
              }
            }}
            placeholder="Search topics, definitions, disciplines, tests…"
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-base outline-none"
            aria-label="Search query"
          />
          <button onClick={onClose} aria-label="Close search" className="btn-ghost !px-2 !py-1 text-gray-400">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>
        {query.trim() === '' ? (
          <p className="text-sm text-gray-500 py-3">
            Try <button onClick={() => setQuery('agglutination')} className="topic-link">agglutination</button>,{' '}
            <button onClick={() => setQuery('luminol')} className="topic-link">luminol</button>,{' '}
            <button onClick={() => setQuery('DNA profiling')} className="topic-link">DNA profiling</button>,{' '}
            <button onClick={() => setQuery('chain of custody')} className="topic-link">chain of custody</button> or{' '}
            <button onClick={() => setQuery('toxicology')} className="topic-link">toxicology</button>.
          </p>
        ) : results.length === 0 ? (
          <p className="text-sm text-gray-400 py-3">
            No matches for “{query}”. Try a broader term or check the glossary.
          </p>
        ) : (
          <ul className="max-h-[55vh] overflow-y-auto pr-1 space-y-1" role="listbox">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  role="option"
                  onClick={() => {
                    navigate(r.url)
                    onClose()
                  }}
                  className="w-full text-left flex items-start justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-navy-700 transition-colors group"
                >
                  <span>
                    <span className="block text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {r.title}
                    </span>
                    <span className="block text-xs text-gray-400 mt-0.5 line-clamp-2">{r.description}</span>
                  </span>
                  <span className={`shrink-0 text-[10px] font-mono uppercase px-2 py-1 rounded-full ${kindStyles[r.kind].cls}`}>
                    {kindStyles[r.kind].label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}