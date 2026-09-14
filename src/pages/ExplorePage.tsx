import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useSEO } from '../lib/seo'
import { disciplineGroups, getDisciplinesByGroup, getDiscipline } from '../data/disciplines'
import { getTopic } from '../data/topics-index'
import { PageHeader, InfoBlock } from '../components/ui'
import { EvidenceTag } from '../components/ui'

export default function ExplorePage() {
  useSEO({
    title: 'Explore Forensic Disciplines',
    description: 'An interactive map of forensic biology, chemistry, physics and other disciplines — what they study, their methods, and their limits.',
  })

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Evidence map"
        title="Explore forensic disciplines"
        description="Every discipline answers a specific question about evidence. Explore where each one sits, what it studies, and — just as importantly — what it cannot conclude."
      />
      <div className="space-y-12">
        {disciplineGroups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-5">
              <span className={`h-2.5 w-2.5 rounded-full ${
                g.accent === 'crimson' ? 'bg-crimson-500' : g.accent === 'amber' ? 'bg-amber-500' : g.accent === 'cyan' ? 'bg-cyan-500' : 'bg-gray-400'
              }`} />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{g.name}</h2>
                <p className="text-sm text-gray-400">{g.description}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {getDisciplinesByGroup(g.id).map((d) => (
                <DisciplineTile key={d.id} id={d.id} name={d.name} blurb={d.blurb} icon={d.icon} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function DisciplineTile({ id, name, blurb, icon }: { id: string; name: string; blurb: string; icon: string }) {
  return (
    <Link
      to={`/explore/${id}`}
      className="glass-panel p-4 hover:border-cyan-500/40 hover:bg-navy-800/80 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <span className="h-10 w-10 rounded-lg bg-cyan-600/10 flex items-center justify-center shrink-0">
          <Icon name={icon as never} className="w-5 h-5 text-cyan-400" />
        </span>
        <div>
          <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{name}</h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{blurb}</p>
          <span className="inline-flex items-center gap-1 text-xs text-cyan-400 mt-2 group-hover:gap-2 transition-all">
            Open discipline <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function SectionList({ sections }: { sections: { title: string; body: ReactNode }[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.title}>
          <h2 className="text-lg font-bold mb-3">{s.title}</h2>
          {s.body}
        </section>
      ))}
    </>
  )
}

export function DisciplinePage() {
  const { disciplineId } = useParams<{ disciplineId: string }>()
  const discipline = getDiscipline(disciplineId ?? '')

  useSEO({
    title: discipline ? `${discipline.name} — Forensic Discipline` : 'Discipline not found',
    description: discipline?.blurb,
  })

  if (!discipline) {
    return (
      <div className="page-container">
        <PageHeader title="Discipline not found" />
        <Link to="/explore" className="topic-link">← Back to the discipline map</Link>
      </div>
    )
  }

  const group = disciplineGroups.find((g) => g.id === discipline.group)

  return (
    <div className="page-container">
      <Link to="/explore" className="topic-link text-sm">← All disciplines</Link>
      <header className="mt-4 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-12 w-12 rounded-xl bg-cyan-600/15 flex items-center justify-center">
            <Icon name={discipline.icon as never} className="w-6 h-6 text-cyan-400" />
          </span>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              {group?.name ?? discipline.group}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{discipline.name}</h1>
          </div>
        </div>
        <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">{discipline.blurb}</p>
      </header>

      <div className="grid lg:grid-cols-6 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <SectionList
            sections={[
              {
                title: 'What it studies',
                body: (
                  <ul className="grid gap-2">
                    {discipline.studies.map((s) => (
                      <li key={s} className="glass-panel px-4 py-3 text-sm text-gray-200">{s}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Evidence examples',
                body: (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {discipline.evidenceExamples.map((e) => (
                      <div key={e} className="flex items-center gap-2.5 glass-panel px-3.5 py-3">
                        <EvidenceTag label="EVI" />
                        <span className="text-sm text-gray-300">{e}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: 'Common methods',
                body: (
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {discipline.methods.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm text-gray-300 glass-panel px-4 py-3">
                        <Icon name="check" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Forensic applications',
                body: (
                  <ul className="space-y-2">
                    {discipline.applications.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-gray-300">
                        <Icon name="arrow-right" className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-5">
            <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Icon name="warning" className="w-4 h-4 text-amber-400" /> Limitations
            </h2>
            <ul className="space-y-2.5">
              {discipline.limitations.map((l) => (
                <li key={l} className="text-xs text-gray-300 leading-relaxed border-l-2 border-amber-500/40 pl-3">
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <InfoBlock title="Related modules" tone="cyan">
            <div className="flex flex-wrap gap-1.5 mt-1">
              {discipline.relatedTopics.map((t) => {
                const topic = getTopic(t)
                if (!topic) return null
                return (
                  <Link key={t} to={`/learn/${t}`} className="text-[11px] px-2.5 py-1 rounded-full border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/20 transition-colors">
                    {topic.shortTitle ?? topic.title}
                  </Link>
                )
              })}
            </div>
          </InfoBlock>
        </aside>
      </div>
    </div>
  )
}