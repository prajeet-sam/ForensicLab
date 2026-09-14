import { useSEO } from '../lib/seo'
import { quizModules } from '../data/quizzes'
import { PageHeader, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'
import { getQuizScore } from '../lib/progress'
import { QuizEngine } from '../components/engines'

export default function QuizzesPage() {
  useSEO({
    title: 'Quizzes',
    description: 'Module quizzes across forensic science — multiple choice, true/false and matching with explanations.',
  })

  return (
    <div className="page-container max-w-4xl">
      <PageHeader
        eyebrow="Assessment"
        title="Quizzes"
        description="Each quiz tests the concepts behind a module and explains every answer. Don't aim for a perfect score — aim to understand the reasoning."
      />

      <div className="space-y-10">
        {quizModules.map((m) => {
          const score = getQuizScore(m.id)
          return (
            <div key={m.id}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Icon name="quiz" className="w-4 h-4 text-cyan-400" />
                    {m.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">{m.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 bg-navy-800 border border-navy-600/50 rounded-full px-2.5 py-1">
                    {m.category}
                  </span>
                  {score && (
                    <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/40 rounded-full px-2.5 py-1">
                      {score.correct}/{score.total}
                    </span>
                  )}
                </div>
              </div>
              <QuizEngine quizId={m.id} questions={m.questions} title={m.title} />
            </div>
          )
        })}
      </div>

      <div className="mt-10">
        <InfoBlock title="Fair testing" tone="cyan">
          Questions are built to reward calibrated reasoning, not memorised slogans. Watch for the question that
          tries to tempt you into overconfidence — that is the point of the exercise.
        </InfoBlock>
      </div>
    </div>
  )
}