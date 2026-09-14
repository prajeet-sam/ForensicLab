import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { glossary, glossaryLetters, searchGlossary, getGlossaryTerm } from '../data/glossary'
import { PageHeader, InfoBlock, DefinitionStrip } from '../components/ui'
import { Icon } from '../components/Icon'
import { getTopic } from '../data/topics-index'

export default function GlossaryPage() {
  useSEO({
    title: 'Glossary',
    description: 'Searchable forensic science glossary — antigens, antibodies, agglutination, DNA profiling, chain of custody and more.',
  })

  const [query, setQuery] = useState('')
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const results = query.trim()
    ? searchGlossary(query)
    : activeLetter
    ? glossary.filter((t) => t.term[0].toUpperCase() === activeLetter)
    : glossary

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Reference"
        title="Glossary"
        description="Every term used on this platform — defined in one place, with a simple explanation, scientific detail and links to related modules."
      />

      <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
        <div className="flex-1 relative">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveLetter(null) }}
            placeholder="Search terms…"
            className="w-full bg-navy-800 border border-navy-600/50 text-white text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-cyan-500 transition-colors"
            aria-label="Search glossary terms"
          />
        </div>
        <button
          onClick={() => { setQuery(''); setActiveLetter(null) }}
          className="btn-ghost !px-3 !py-2 text-xs"
          aria-label="Clear search"
        >
          Clear
        </button>
      </div>

      {/* Alphabet filters */}
      <div className="flex flex-wrap gap-1.5 mb-6 overflow-x-auto pb-2">
        {glossaryLetters.map((l) => (
          <button
            key={l}
            onClick={() => { setActiveLetter(l); setQuery('') }}
            className={`h-8 w-8 rounded-md text-xs font-mono font-bold border transition-colors ${
              activeLetter === l
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'border-navy-600 text-gray-400 hover:border-navy-400 hover:text-gray-200'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No terms match your search. Try a broader term.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {results.map((t) => (
            <Link
              key={t.term}
              to={`/glossary/${encodeURIComponent(t.term.toLowerCase())}`}
              className="glass-panel p-4 hover:border-cyan-500/40 transition-all duration-200 group"
            >
              <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors">{t.term}</h3>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed line-clamp-2">{t.definition}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function GlossaryTermPage() {
  const { term } = useParams<{ term: string }>()
  const decoded = decodeURIComponent(term ?? '')
  const t = getGlossaryTerm(decoded)

  useSEO({
    title: t ? `${t.term} — Glossary` : 'Term not found',
    description: t?.definition,
  })

  if (!t) {
    return (
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-3">Term not found</h1>
        <Link to="/glossary" className="topic-link">← Back to glossary</Link>
      </div>
    )
  }

  return (
    <div className="page-container max-w-3xl">
      <Link to="/glossary" className="topic-link text-sm">← All glossary terms</Link>
      <header className="mt-4 mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Glossary term</p>
        <h1 className="text-3xl font-bold tracking-tight">{t.term}</h1>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-2">Definition</h2>
          <DefinitionStrip>{t.definition}</DefinitionStrip>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-2">In simple terms</h2>
          <p className="text-gray-200 leading-relaxed">{t.simpleExplanation}</p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-2">Scientific detail</h2>
          <p className="text-gray-300 leading-relaxed">{t.scientificDetail}</p>
        </section>

        {t.relatedTopics.length > 0 && (
          <section>
            <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-3">Related modules</h2>
            <div className="flex flex-wrap gap-2">
              {t.relatedTopics.map((r) => {
                const topic = getTopic(r)
                return (
                  <Link key={r} to={`/learn/${r}`} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/20 transition-colors">
                    <Icon name="arrow-right" className="w-3 h-3" />
                    {topic?.title ?? r}
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}