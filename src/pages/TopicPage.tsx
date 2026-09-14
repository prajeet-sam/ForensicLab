import { useParams, Link } from 'react-router-dom'
import { getTopic, categoryLabel } from '../data/topics-index'
import { useSEO } from '../lib/seo'
import { TopicVisual } from '../components/TopicVisual'
import { QuizEngine } from '../components/engines'
import { ProcessTimeline, ScientificDiagram, FlowBox, FlowArrow, HorizontalFlow } from '../components/display'
import { DefinitionStrip, Badge, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'
import { completeTopic, isTopicCompleted } from '../lib/progress'
import { useState } from 'react'
import { getAllSimulators } from '../data/simulators'
import type { Topic } from '../lib/types'

const PROCESS_STEPS_PREVIEW = 4

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const topic = getTopic(topicId ?? '')
  const [completed, setCompleted] = useState(() => isTopicCompleted(topicId ?? ''))

  useSEO({
    title: topic ? `${topic.title} — Learning Topic` : 'Topic not found',
    description: topic?.definition,
    path: `/learn/${topicId}`,
  })

  if (!topic) {
    return (
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-3">Topic not found</h1>
        <p className="text-gray-300 mb-6">This learning module doesn’t exist yet.</p>
        <Link to="/learn" className="topic-link">← Back to the learning hub</Link>
      </div>
    )
  }

  const toggleComplete = () => {
    if (completed) return
    completeTopic(topic.id)
    setCompleted(true)
  }

  const tone = (topic.color ?? 'cyan') as 'cyan' | 'crimson' | 'amber' | 'slate'
  const topicVisualRendered = TopicVisual({ topic })
  const simulator = getSimulator(topic.simulator)

  return (
    <div className="page-container">
      {/* Breadcrumb + status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link to="/learn" className="hover:text-cyan-400 transition-colors">Learn</Link>
          <span aria-hidden="true">/</span>
          <Link to="/learn" className="hover:text-cyan-400 transition-colors">{categoryLabel(topic.category)}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-300">{topic.title}</span>
        </nav>
        <div className="flex items-center gap-2">
          <Badge tone={tone}>{categoryLabel(topic.category)}</Badge>
          {completed ? (
            <button className="text-xs font-mono text-emerald-400 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10">
              <Icon name="check" className="w-3 h-3" /> Completed
            </button>
          ) : (
            <button
              onClick={toggleComplete}
              className="btn-ghost !px-2.5 !py-1 !text-xs text-gray-400"
              aria-label={`Mark ${topic.title} as completed`}
            >
              Mark complete
            </button>
          )}
        </div>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{topic.title}</h1>
        <div className="mt-4">
          <DefinitionStrip>{topic.definition}</DefinitionStrip>
        </div>
        <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
          {topic.simpleExplanation}
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-8">
          <section aria-label="Why it matters">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Icon name="lightbulb" className="w-4 h-4 text-amber-400" /> Why it matters
            </h2>
            <p className="text-gray-300 leading-relaxed">{topic.whyItMatters}</p>
          </section>

          {topic.corePrinciple && (
            <section aria-label="Core principle">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Icon name="principles" className="w-4 h-4 text-cyan-400" /> Core principle
              </h2>
              <InfoBlock title="The principle" tone="cyan">
                {topic.corePrinciple}
              </InfoBlock>
            </section>
          )}

          <section aria-label="Visual explanation">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Icon name="eye" className="w-4 h-4 text-cyan-400" /> Visual explanation
            </h2>
            {topicVisualRendered ? (
              topicVisualRendered
            ) : (
              <ScientificDiagram title="Step-by-step" tone={tone === 'crimson' ? 'crimson' : 'cyan'}>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(topic.process ?? []).slice(0, PROCESS_STEPS_PREVIEW).map((p) => (
                    <div key={p.title} className="rounded-lg border border-navy-600/40 bg-navy-800 px-4 py-3">
                      <p className="text-sm font-semibold text-white">{p.title}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </ScientificDiagram>
            )}
          </section>

          {topic.process && topic.process.length > 0 && (
            <section aria-label="Step-by-step process">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="transfer" className="w-4 h-4 text-cyan-400" /> Step-by-step process
              </h2>
              <ProcessTimeline steps={topic.process} accent={tone === 'crimson' ? 'crimson' : 'cyan'} />
            </section>
          )}

          {topic.example && (
            <section aria-label="Example">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Icon name="case" className="w-4 h-4 text-crimson-400" /> Example
              </h2>
              <div className="glass-panel p-5">
                <p className="text-gray-300 leading-relaxed">{topic.example}</p>
              </div>
            </section>
          )}

          {topic.applications && topic.applications.length > 0 && (
            <section aria-label="Forensic applications">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Icon name="shield" className="w-4 h-4 text-cyan-400" /> Forensic applications
              </h2>
              <ul className="space-y-2">
                {topic.applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Icon name="check" className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {topic.quiz && topic.quiz.length > 0 && (
            <section aria-label="Mini quiz" id="miniquiz" className="scroll-mt-20 pt-2">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="quiz" className="w-4 h-4 text-cyan-400" /> Check yourself
              </h2>
              <QuizEngine quizId={`topic-${topic.id}`} questions={topic.quiz} title={`Mini quiz · ${topic.title}`} />
            </section>
          )}

          {simulator && (
            <section aria-label="Simulator">
              <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-600/10 to-transparent p-5">
                <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <Icon name="testtube" className="w-4 h-4 text-cyan-400" /> Try the simulator
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Put this concept into practice.{' '}
                  {simulator.blurb}
                </p>
                <Link to={simulator.path} className="btn-primary">
                  Open simulator
                  <Icon name="arrow-right" className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Side column */}
        <aside className="lg:col-span-4 space-y-5">
          {topic.limitations && topic.limitations.length > 0 && (
            <div className="glass-panel p-5">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Icon name="warning" className="w-4 h-4 text-amber-400" /> Limitations & honesty
              </h2>
              <ul className="space-y-2.5">
                {topic.limitations.map((l) => (
                  <li key={l} className="text-xs text-gray-300 leading-relaxed border-l-2 border-amber-500/40 pl-3">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.relatedTopics && topic.relatedTopics.length > 0 && (
            <div className="glass-panel p-5">
              <h2 className="text-sm font-bold mb-3">Related topics</h2>
              <div className="flex flex-wrap gap-1.5">
                {topic.relatedTopics.map((r) => {
                  const rel = getTopic(r)
                  if (!rel) return null
                  return (
                    <Link
                      key={r}
                      to={`/learn/${r}`}
                      className="text-[11px] px-2.5 py-1.5 rounded-full border border-navy-500/50 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                    >
                      {rel.shortTitle ?? rel.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <ModuleChecklist topic={topic} hasVisual={!!topicVisualRendered} />

          <InfoBlock title="Scientific habit" tone="amber">
            Every module ends with the same reminder: state what the data support, then stop there.
          </InfoBlock>
        </aside>
      </div>
    </div>
  )
}

function getSimulator(simulatorId?: string) {
  if (!simulatorId) return null
  return getAllSimulators().find((s) => s.id === simulatorId) ?? null
}

function ModuleChecklist({ topic, hasVisual }: { topic: Topic; hasVisual: boolean }) {
  return (
    <div className="glass-panel p-5">
      <h2 className="text-sm font-bold mb-3">In this module</h2>
      <HorizontalFlow>
        {[
          { label: 'Definition', ok: true },
          { label: 'Why it matters', ok: true },
          { label: 'Visual', ok: hasVisual },
          { label: 'Process', ok: (topic.process?.length ?? 0) > 0 },
          { label: 'Limits', ok: (topic.limitations?.length ?? 0) > 0 },
          { label: 'Quiz', ok: (topic.quiz?.length ?? 0) > 0 },
        ].map((c) => (
          <span key={c.label} className="flex items-baseline gap-1.5 text-xs text-gray-400">
            <Icon name={c.ok ? 'check' : 'info'} className={`w-3 h-3 ${c.ok ? 'text-emerald-400' : 'text-gray-500'}`} />
            {c.label}
          </span>
        ))}
      </HorizontalFlow>
    </div>
  )
}