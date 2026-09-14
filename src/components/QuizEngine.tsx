import { useCallback, useEffect, useMemo, useState } from 'react'
import type { QuizQuestion } from '../lib/types'
import { Icon } from './Icon'
import { recordQuizScore, getQuizScore } from '../lib/progress'

interface QuizEngineProps {
  quizId: string
  questions: QuizQuestion[]
  title?: string
  onComplete?: (correct: number, total: number) => void
}

type AnswerState = Record<string, { value: string | string[]; checked: boolean }>

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function QuizEngine({ quizId, questions, title, onComplete }: QuizEngineProps) {
  const [answers, setAnswers] = useState<AnswerState>({})
  const [submitted, setSubmitted] = useState(false)
  const [started, setStarted] = useState(false)
  const [retryKey, setRetryKey] = useState(0)

  const prior = useMemo(() => getQuizScore(quizId), [quizId, retryKey])

  const correctCount = useMemo(() => {
    return questions.reduce((acc, q) => {
      const a = answers[q.id]
      if (!a) return acc
      if (q.type === 'matching') {
        const pairs = a.value as string[]
        if (pairs.length !== q.pairs?.length) return acc
        const ok = q.pairs!.every((p, i) => pairs[i] === p.left)
        return ok ? acc + 1 : acc
      }
      if (q.type === 'tf') return a.value === q.answer ? acc + 1 : acc
      return a.value === q.answer ? acc + 1 : acc
    }, 0)
  }, [answers, questions])

  useEffect(() => {
    if (submitted && onComplete) onComplete(correctCount, questions.length)
  }, [submitted, correctCount, questions.length, onComplete])

  const checkAnswer = useCallback(
    (q: QuizQuestion): boolean => {
      const a = answers[q.id]
      if (!a) return false
      if (q.type === 'matching') {
        const pairs = a.value as string[]
        return pairs.length === q.pairs?.length && q.pairs!.every((p, i) => pairs[i] === p.left)
      }
      return a.value === q.answer
    },
    [answers]
  )

  if (!started) {
    return (
      <div className="glass-panel p-6" id={`quiz-${quizId}`}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="quiz" className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold">{title ?? 'Knowledge Check'}</h3>
        </div>
        <p className="text-sm text-gray-300 mb-1">{questions.length} questions</p>
        {prior && (
          <p className="text-sm text-gray-400 mb-4">
            Previous attempt: {prior.correct}/{prior.total} correct.
          </p>
        )}
        {!prior && <p className="text-sm text-gray-400 mb-4">Test what you just learned — explanations follow every answer.</p>}
        <div className="mt-4">
          <button className="btn-primary" onClick={() => setStarted(true)}>
            Start quiz
          </button>
        </div>
      </div>
    )
  }

  const allAnswered = questions.every((q) => {
    const a = answers[q.id]
    if (!a) return false
    if (q.type === 'matching') return (a.value as string[]).length === q.pairs?.length
    return a.value !== undefined && a.value !== ''
  })

  return (
    <div className="glass-panel p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="quiz" className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold">{title ?? 'Knowledge Check'}</h3>
        </div>
        {submitted && (
          <span className={`text-sm font-mono px-3 py-1 rounded-full border ${
            correctCount === questions.length
              ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
              : correctCount >= questions.length * 0.6
              ? 'border-cyan-500/40 text-cyan-400 bg-cyan-600/10'
              : 'border-amber-500/40 text-amber-400 bg-amber-500/10'
          }`}>
            {correctCount}/{questions.length} correct
          </span>
        )}
      </div>

      <ol className="space-y-6">
        {questions.map((q, i) => {
          const a = answers[q.id]
          const isCorrect = submitted && checkAnswer(q)
          return (
            <li key={q.id} className="space-y-2 border border-navy-600/40 rounded-lg p-4">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 text-xs font-mono text-gray-500 bg-navy-800 rounded-md px-1.5 py-0.5">
                  Q{i + 1}
                </span>
                <div className="flex-1">
                  {q.scenario && (
                    <p className="text-sm text-gray-400 italic mb-1.5 bg-navy-800/60 rounded-md px-3 py-2">
                      {q.scenario}
                    </p>
                  )}
                  <h4 className="text-sm font-semibold text-white leading-relaxed">
                    {q.type === 'tf' && <BadgeTf />} {q.question}
                  </h4>
                </div>
                {submitted && (
                  <span className={`shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-400' : 'text-crimson-400'}`}>
                    <Icon name={isCorrect ? 'check' : 'close'} className="w-4 h-4" />
                  </span>
                )}
              </div>

              {q.type === 'mcq' && q.options && (
                <div className="ml-7 grid gap-1.5">
                  {q.options.map((opt) => {
                    const selected = a?.value === opt
                    const state =
                      submitted && (isCorrect || (!isCorrect && opt === q.answer))
                        ? 'correct'
                        : submitted && selected
                        ? 'wrong'
                        : null
                    return (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => {
                          if (submitted) return
                          setAnswers((prev) => ({ ...prev, [q.id]: { value: opt, checked: true } }))
                        }}
                        className={`text-left text-sm px-3.5 py-2.5 rounded-lg border transition-all duration-150 ${
                          state === 'correct'
                            ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
                            : state === 'wrong'
                            ? 'border-crimson-500/60 bg-crimson-600/15 text-crimson-200'
                            : selected
                            ? 'border-cyan-500/70 bg-cyan-600/15 text-cyan-100'
                            : 'border-navy-600/50 text-gray-300 hover:border-cyan-500/40 hover:bg-navy-800'
                        }`}
                      >
                        {opt}
                        {state === 'correct' && <span className="float-right text-emerald-400"><Icon name="check" className="w-4 h-4 inline" /></span>}
                        {state === 'wrong' && <span className="float-right text-crimson-400"><Icon name="close" className="w-4 h-4 inline" /></span>}
                      </button>
                    )
                  })}
                </div>
              )}

              {q.type === 'tf' && (
                <div className="ml-7 flex gap-2">
                  {['True', 'False'].map((opt) => {
                    const selected = a?.value === opt
                    const isRight = opt === q.answer
                    const state = submitted && isRight ? 'correct' : submitted && selected ? 'wrong' : null
                    return (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => {
                          if (submitted) return
                          setAnswers((prev) => ({ ...prev, [q.id]: { value: opt, checked: true } }))
                        }}
                        className={`flex-1 sm:flex-none sm:px-8 text-sm px-3.5 py-2.5 rounded-lg border transition-all duration-150 ${
                          state === 'correct'
                            ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
                            : state === 'wrong'
                            ? 'border-crimson-500/60 bg-crimson-600/15 text-crimson-200'
                            : selected
                            ? 'border-cyan-500/70 bg-cyan-600/15 text-cyan-100'
                            : 'border-navy-600/50 text-gray-300 hover:border-cyan-500/40 hover:bg-navy-800'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}

              {q.type === 'matching' && q.pairs && (
                <MatchingPart
                  pairs={q.pairs}
                  value={(a?.value as string[]) ?? []}
                  disabled={submitted}
                  onChange={(paired) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: { value: paired, checked: true } }))
                  }
                />
              )}

              {submitted && (
                <div className={`ml-7 text-sm leading-relaxed rounded-md px-3 py-2.5 ${
                  isCorrect ? 'bg-emerald-500/10 text-emerald-200/90' : 'bg-crimson-600/10 text-crimson-200/90'
                }`}>
                  <span className="font-semibold">{isCorrect ? 'Correct. ' : 'Review. '}</span>
                  {q.explanation}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-navy-600/40">
        {!submitted ? (
          <button className="btn-primary" disabled={!allAnswered} onClick={() => {
            setSubmitted(true)
            recordQuizScore(quizId, questions.length, correctCount)
          }}>
            Submit answers
          </button>
        ) : (
          <button
            className="btn-secondary"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
              setRetryKey((k) => k + 1)
            }}
          >
            Retry quiz
          </button>
        )}
        {!allAnswered && !submitted && (
          <p className="text-xs text-gray-500">Answer all questions to submit.</p>
        )}
      </div>
    </div>
  )
}

function MatchingPart({
  pairs,
  value,
  disabled,
  onChange,
}: {
  pairs: { left: string; right: string }[]
  value: string[]
  disabled: boolean
  onChange: (paired: string[]) => void
}) {
  const rights = useMemo(() => {
    const r = pairs.map((p) => ({ left: p.left, right: p.right }))
    for (const item of r) {
      item.right = item.right
    }
    return r
  }, [pairs])

  const shuffledRights = useMemo(() => shuffle(rights.map((r) => r.right)), [rights, disabled ? 1 : 1])

  return (
    <div className="ml-7 grid gap-3">
      {rights.map((p, i) => {
        const chosen = value[i]
        return (
          <div key={p.left} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm text-white bg-navy-800 flex-1 rounded-md px-3 py-2 border border-navy-600/40">
              {p.left}
            </span>
            <span className="text-center text-gray-600 text-xs sm:hidden">matches ↓</span>
            <select
              disabled={disabled}
              value={chosen ?? ''}
              onChange={(e) => {
                const next = [...value]
                next[i] = e.target.value
                onChange(next)
              }}
              aria-label={`Match for ${p.left}`}
              className="text-sm flex-1 bg-navy-800 text-gray-200 border border-navy-600/50 rounded-md px-3 py-2 outline-none focus:border-cyan-500"
            >
              <option value="">Choose…</option>
              {shuffledRights.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )
      })}
    </div>
  )
}

function BadgeTf() {
  return (
    <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded px-1.5 py-0.5 mr-1.5 align-middle">
      True/False
    </span>
  )
}