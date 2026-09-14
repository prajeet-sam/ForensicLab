import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { moduleNotes, getModuleBySlug } from '../data/modules'
import type { ModuleNote } from '../data/modules'
import { PageHeader, InfoBlock, DefinitionStrip } from '../components/ui'
import { Icon } from '../components/Icon'
import { getTopic } from '../data/topics-index'

const categoryFilters: { label: string; value: ModuleNote['category'] | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Biology', value: 'biology' },
  { label: 'Physics', value: 'physics' },
  { label: 'Laboratory', value: 'laboratory' },
  { label: 'Other', value: 'other' },
]

export default function ModuleLibraryPage() {
  useSEO({
    title: 'Module Library',
    description:
      'Full lecture-note content for all five foundational forensic-science modules — crime scene investigation, biological evidence, non-biological evidence, criminal investigation and forensic serology.',
  })

  const [filter, setFilter] = useState<ModuleNote['category'] | 'all'>('all')
  const filtered = filter === 'all' ? moduleNotes : moduleNotes.filter((m) => m.category === filter)

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Reading room"
        title="Module Library"
        description="The full lecture content that underpins every module on this platform — restructured for screen reading with linked topics and searchable glossary terms. Select a module to read it in full."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {categoryFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
              filter === f.value
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'border-navy-600 text-gray-400 hover:border-navy-400 hover:text-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No modules match this filter.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((m) => (
            <Link
              key={m.slug}
              to={`/modules/${m.slug}`}
              className="glass-panel p-5 hover:border-cyan-500/40 hover:bg-navy-800/80 transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <span className="h-11 w-11 rounded-xl bg-cyan-600/15 flex items-center justify-center shrink-0 group-hover:bg-cyan-600/25 transition-colors">
                  <Icon name={m.icon as never} className="w-5.5 h-5.5 text-cyan-400" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    {m.title}
                  </h3>
                  <p className="text-xs text-cyan-400/80 font-mono mt-0.5">{m.subtitle}</p>
                  <p className="text-sm text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{m.description}</p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-2">
                    <Icon name="document" className="w-3 h-3" />
                    {m.sections.length} sections
                    <span className="mx-1.5 text-navy-600">·</span>
                    {m.sourceFile}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <InfoBlock title="About these notes" tone="amber">
        These notes are derived from NIOS / IGNOU / university forensic-science lecture PDFs and restructured for
        on-screen reading. They are educational — all cases and examples are fictional and no real forensic case data
        is reproduced. Refer to the glossary for definitions of any unfamiliar terms.
      </InfoBlock>
    </div>
  )
}

export function ModuleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const mod = getModuleBySlug(slug ?? '')

  useSEO({
    title: mod ? `${mod.title} — Module Library` : 'Module not found',
    description: mod?.description,
  })

  if (!mod) {
    return (
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-3">Module not found</h1>
        <Link to="/modules" className="topic-link">← Back to the module library</Link>
      </div>
    )
  }

  const relatedTopics = (mod.relatedTopics ?? []).map((id) => getTopic(id)).filter(Boolean)

  return (
    <div className="page-container max-w-3xl">
      <Link to="/modules" className="topic-link text-sm">← All modules</Link>

      <header className="mt-4 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-12 w-12 rounded-xl bg-cyan-600/15 flex items-center justify-center">
            <Icon name={mod.icon as never} className="w-6 h-6 text-cyan-400" />
          </span>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400">{mod.subtitle}</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{mod.title}</h1>
          </div>
        </div>
        <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">{mod.description}</p>
        <p className="text-xs text-gray-500 font-mono mt-2">Source: {mod.sourceFile}</p>
      </header>

      {/* Table of contents */}
      <nav className="glass-panel p-4 sm:p-5 mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">Contents</h2>
        <ol className="space-y-1.5">
          {mod.sections.map((s, i) => (
            <li key={i}>
              <a
                href={`#section-${i}`}
                className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <div className="space-y-8">
        {mod.sections.map((s, i) => (
          <section key={i} id={`section-${i}`} className="scroll-mt-24">
            <DefinitionStrip>{s.title}</DefinitionStrip>
            <div className="mt-4 space-y-4">
              {s.content.map((para, j) => {
                const isStep = /^\d+\./.test(para) || /^-\s/.test(para)
                if (isStep) {
                  return (
                    <div key={j} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                      <Icon name="arrow-right" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{para.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '')}</span>
                    </div>
                  )
                }
                return (
                  <p key={j} className="text-gray-200 text-[15px] leading-relaxed">{para}</p>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Related topics */}
      {relatedTopics.length > 0 && (
        <section className="mt-10 pt-8 border-t border-navy-700/50">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">Related modules</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((t) => (
              <Link
                key={t!.id}
                to={`/learn/${t!.id}`}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/20 transition-colors"
              >
                <Icon name="arrow-right" className="w-3 h-3" />
                {t!.shortTitle ?? t!.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <InfoBlock title="A note on content" tone="amber">
        These notes are derived from NIOS / IGNOU / university forensic-science lecture PDFs and restructured
        for on-screen reading. They are educational — no real forensic case data is reproduced.
      </InfoBlock>
    </div>
  )
}
