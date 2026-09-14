import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { QuizQuestion } from '../lib/types'
import { Icon } from './Icon'
import { recordQuizScore } from '../lib/progress'

interface ExamEngineProps {
  examId: string
  title: string
  questions: QuizQuestion[]
  minutes: number | null
  onFinish: () => void
}

type AnswerState = Record<string, { value: string | string[]; checked: boolean }>

const countCorrect = (questions: QuizQuestion[], answers: AnswerState): number =>
  questions.reduce((acc, q) => {
    const a = answers[q.id]
    if (!a) return acc
    if (q.type === 'matching') {
      const pairs = a.value as string[]
      if (pairs.length !== q.pairs?.length) return acc
      return q.pairs.every((p, i) => pairs[i] === p.left) ? acc + 1 : acc
    }
    return a.value === q.answer ? acc + 1 : acc
  }, 0)

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

function scoreBand(pct: number): { label: string; cls: string; note: string } {
  if (pct >= 90)
    return { label: 'Exam ready', cls: 'border-emerald-500/40 bg-emerald-500/10', note: 'Outstanding. Keep reviewing your weak spots to stay sharp.' }
  if (pct >= 70)
    return { label: 'Passing', cls: 'border-cyan-500/40 bg-cyan-600/10', note: 'Solid understanding. Review the questions you missed before moving on.' }
  if (pct >= 50)
    return { label: 'Developing', cls: 'border-amber-500/40 bg-amber-500/10', note: 'Core ideas are forming. Use the Quick Revision section to consolidate.' }
  return { label: 'Revision needed', cls: 'border-crimson-500/40 bg-crimson-600/10', note: 'Do not panic. Re-read the related topics, then retake.' }
}

export function ExamEngine({ examId, title, questions, minutes, onFinish }: ExamEngineProps) {
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<AnswerState>({})
  const [submitted, setSubmitted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState((minutes ?? 0) * 60)
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null)

  const answersRef = useRef<AnswerState>({})
  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  const submittedRef = useRef(false)
  useEffect(() => {
    submittedRef.current = submitted
  }, [submitted])

  const secondsRef = useRef(secondsLeft)
  useEffect(() => {
    secondsRef.current = secondsLeft
  }, [secondsLeft])

  const submitNow = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    const correct = countCorrect(questions, answersRef.current)
    setResult({ correct, total: questions.length })
    setSubmitted(true)
    recordQuizScore(examId, questions.length, correct)
  }, [examId, questions])

  useEffect(() => {
    if (minutes === null || submittedRef.current || !started) return
    const t = window.setInterval(() => {
      if (submittedRef.current) return
      if (secondsRef.current <= 1) {
        window.clearInterval(t)
        submitNow()
        return
      }
      setSecondsLeft((s) => s - 1)
    }, 1000)
    return () => window.clearInterval(t)
  }, [minutes, submitNow, started])

  const answeredCount = useMemo(
    () =>
      questions.filter((q) => {
        const a = answers[q.id]
        if (!a) return false
        if (q.type === 'matching') return (a.value as string[]).length === q.pairs?.length
        return a.value !== undefined && a.value !== ''
      }).length,
    [answers, questions]
  )

  const allAnswered = answeredCount === questions.length
  const lowTime = started && minutes !== null && !submitted && secondsLeft < 60
  const pct = result ? Math.round((result.correct / result.total) * 100) : 0
  const band = result ? scoreBand(pct) : null

  const isAnsweredCorrect = useCallback(
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
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="clock" className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <ul className="text-sm text-gray-300 space-y-1.5 mb-5">
          <li className="flex items-center gap-2">
            <Icon name="quiz" className="w-4 h-4 text-gray-500" />
            {questions.length} questions drawn from the exam bank
          </li>
          <li className="flex items-center gap-2">
            <Icon name="clock" className="w-4 h-4 text-gray-500" />
            {minutes === null ? 'Untimed practice mode' : `${minutes} minute${minutes === 1 ? '' : 's'} · auto-submits at zero`}
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-gray-500" />
            Explanations are shown after submission
          </li>
        </ul>
        <button
          className="btn-primary"
          onClick={() => {
            setStarted(true)
            setSecondsLeft((minutes ?? 0) * 60)
          }}
        >
          Start exam
        </button>
      </div>
    )
  }

  return (
    <div className="glass-panel p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-navy-600/40">
        <div className="flex items-center gap-2">
          <Icon name="quiz" className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${
              lowTime ? 'text-crimson-300 border-crimson-500/40 bg-crimson-600/10' : 'text-gray-300 border-navy-600/50 bg-navy-800'
            }`}
          >
            <Icon name="clock" className="w-3.5 h-3.5 inline mr-1.5" />
            {minutes === null ? 'Untimed' : fmt(secondsLeft)}
          </span>
          <span className="text-xs font-mono text-gray-400 bg-navy-800 border border-navy-600/50 rounded-full px-3 py-1">
            {answeredCount}/{questions.length}
          </span>
        </div>
      </div>

      <ol className="space-y-6">
        {questions.map((q, i) => {
          const isCorrect = submitted && isAnsweredCorrect(q)
          return (
            <li key={q.id} className="space-y-2 border border-navy-600/40 rounded-lg p-4">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 text-xs font-mono text-gray-500 bg-navy-800 rounded-md px-1.5 py-0.5">
                  Q{i + 1}
                </span>
                <div className="flex-1">
                  {q.scenario && (
                    <p className="text-sm text-gray-400 italic mb-1.5 bg-navy-800/60 rounded-md px-3 py-2">{q.scenario}</p>
                  )}
                  <h4 className="text-sm font-semibold text-white leading-relaxed">
                    {q.type === 'tf' && <BadgeTf />}
                    {q.question}
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
                    const selected = answers[q.id]?.value === opt
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
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: { value: opt, checked: true } }))}
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
                        {state === 'correct' && (
                          <span className="float-right text-emerald-400">
                            <Icon name="check" className="w-4 h-4 inline" />
                          </span>
                        )}
                        {state === 'wrong' && (
                          <span className="float-right text-crimson-400">
                            <Icon name="close" className="w-4 h-4 inline" />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {q.type === 'tf' && (
                <div className="ml-7 flex gap-2">
                  {['True', 'False'].map((opt) => {
                    const selected = answers[q.id]?.value === opt
                    const state = submitted && opt === q.answer ? 'correct' : submitted && selected ? 'wrong' : null
                    return (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: { value: opt, checked: true } }))}
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
                  value={(answers[q.id]?.value as string[]) ?? []}
                  disabled={submitted}
                  onChange={(paired) => setAnswers((prev) => ({ ...prev, [q.id]: { value: paired, checked: true } }))}
                />
              )}

              {submitted && (
                <div
                  className={`ml-7 text-sm leading-relaxed rounded-md px-3 py-2.5 ${
                    isCorrect ? 'bg-emerald-500/10 text-emerald-200/90' : 'bg-crimson-600/10 text-crimson-200/90'
                  }`}
                >
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
          <button className="btn-primary" disabled={!allAnswered} onClick={submitNow}>
            Submit answers
          </button>
        ) : (
          <>
            {band && (
              <div className={`w-full rounded-lg border px-4 py-3 flex flex-wrap items-center justify-between gap-3 ${band.cls}`}>
                <div>
                  <span className="font-bold text-white">Score: {result?.correct}/{result?.total}</span>
                  <span className="ml-3 text-sm text-gray-300 font-semibold">{band.label}</span>
                </div>
                <span className="text-2xl font-mono font-bold">{pct}%</span>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-1">
              <button
                className="btn-secondary"
                onClick={() => {
                  setAnswers({})
                  setSubmitted(false)
                  setResult(null)
                  setSecondsLeft((minutes ?? 0) * 60)
                }}
              >
                Retake exam
              </button>
              <button className="btn-primary" onClick={onFinish}>
                Back to exam setup
              </button>
            </div>
          </>
        )}
        {!allAnswered && !submitted && <p className="text-xs text-gray-500">Answer all questions to submit.</p>}
      </div>

      {submitted && band && (
        <div className="text-sm text-gray-400 leading-relaxed border-t border-navy-600/40 pt-4">{band.note}</div>
      )}
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
  const rights = useMemo(() => pairs.map((p) => p.right), [pairs])
  const shuffledRights = useMemo(() => shuffle(rights), [rights])

  return (
    <div className="ml-7 grid gap-3">
      {pairs.map((p, i) => {
        const chosen = value[i]
        return (
          <div key={p.left} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm text-white bg-navy-800 flex-1 rounded-md px-3 py-2 border border-navy-600/40">
              {p.left}
            </span>
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function BadgeTf() {
  return (
    <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded px-1.5 py-0.5 mr-1.5 align-middle">
      True/False
    </span>
  )
}