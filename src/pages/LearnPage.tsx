import { useState } from 'react'
import { useSEO } from '../lib/seo'
import { topics, categoryLabel, getTopicsByCategory } from '../data/topics-index'
import { TopicCard } from '../components/display'
import { PageHeader } from '../components/ui'
import { Icon } from '../components/Icon'
import { getProgress } from '../lib/progress'
import type { Category } from '../lib/types'

const categories: Category[] = ['principles', 'biology', 'chemistry', 'physics', 'other']

const catsMeta: { id: Category; icon: string; blurb: string }[] = [
  { id: 'principles', icon: 'principles', blurb: 'Foundations every investigation rests on.' },
  { id: 'biology', icon: 'blood', blurb: 'Blood, serology, DNA and human remains.' },
  { id: 'chemistry', icon: 'chemistry', blurb: 'Drugs, toxins, explosives and trace chemicals.' },
  { id: 'physics', icon: 'glass', blurb: 'Physical trace comparisons and reconstruction.' },
  { id: 'other', icon: 'fingerprint', blurb: 'Firearms, digital, fingerprints, documents, photography.' },
]

export default function LearnPage() {
  useSEO({
    title: 'Learning Hub',
    description: 'Browse all forensic science learning topics — from ABO blood grouping to DNA profiling, toxicology and trace evidence.',
  })
  const [active, setActive] = useState<Category | 'all'>('all')
  const progress = getProgress()
  const filtered = active === 'all' ? topics : getTopicsByCategory(active)

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Curriculum"
        title="Learning hub"
        description="A structured path through forensic science. Every topic follows the same rhythm: definition → why it matters → how it works → example → limitations → check yourself."
      />

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 scrollbar-none lg:scrollbar-default" role="tablist" aria-label="Filter topics by category">
        <FilterButton active={active === 'all'} onClick={() => setActive('all')} label="All topics" count={topics.length} />
        {catsMeta.map((c) => (
          <FilterButton
            key={c.id}
            active={active === c.id}
            onClick={() => setActive(c.id)}
            label={categoryLabel(c.id)}
            count={getTopicsByCategory(c.id).length}
            icon={c.icon}
          />
        ))}
      </div>

      {active !== 'all' && (
        <p className="text-sm text-gray-400 mb-6 max-w-3xl">
          {catsMeta.find((c) => c.id === active)?.blurb}
        </p>
      )}

      <section aria-label={active === 'all' ? 'All topics' : categoryLabel(active)}>
        {categories
          .filter((c) => active === 'all' || active === c)
          .map((c) => {
            const list = getTopicsByCategory(c)
            if (list.length === 0) return null
            const done = list.filter((t) => progress.completedTopics.includes(t.id)).length
            return (
              <div key={c} className={active === 'all' ? 'mb-10' : ''}>
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Icon name={(catsMeta.find((m) => m.id === c)?.icon ?? 'learn') as never} className="w-4 h-4 text-cyan-400" />
                    {categoryLabel(c)}
                  </h2>
                  {active === 'all' && done > 0 && (
                    <span className="text-xs font-mono text-gray-500">{done}/{list.length} complete</span>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {list.map((t) => (
                    <TopicCard
                      key={t.id}
                      id={t.id}
                      title={t.title}
                      definition={t.definition}
                      category={t.discipline}
                      icon={t.icon}
                      tone={t.color as never}
                      completed={progress.completedTopics.includes(t.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
      </section>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  label,
  count,
  icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  icon?: string
}) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
        active ? 'bg-cyan-600 text-white border-cyan-500' : 'border-navy-600 text-gray-300 hover:bg-navy-800 hover:border-navy-500'
      }`}
    >
      {icon && <Icon name={icon as never} className="w-3.5 h-3.5" />}
      {label}
      <span className={`text-[10px] font-mono ${active ? 'text-white/70' : 'text-gray-500'}`}>{count}</span>
    </button>
  )
}