import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { PageHeader, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'
import { ExamEngine } from '../components/ExamEngine'
import { composeExam, examCategories, examLengths, revisionSheets } from '../data/exam'
import { quizModules } from '../data/quizzes'
import { getProgress } from '../lib/progress'
import { getTopicsByCategory, categoryLabel } from '../data/topics-index'
import type { Category, QuizQuestion } from '../lib/types'

interface SessionConfig {
  id: string
  title: string
  questions: QuizQuestion[]
  minutes: number | null
}

interface CatRow {
  cat: string
  label: string
  correct: number
  total: number
  attempts: number
  pct: number
}

function labelFor(cat: string): string {
  const found = examCategories.find((c) => c.id === cat)
  if (found) return found.label
  try {
    return categoryLabel(cat as Category)
  } catch {
    return cat
  }
}

function buildPerformance() {
  const p = getProgress()
  const byCat = new Map<string, { correct: number; total: number; attempts: number }>()
  let totalCorrect = 0
  let totalQuestions = 0
  let attempts = 0

  for (const [key, score] of Object.entries(p.quizScores)) {
    let cat: string | null = null
    if (key.startsWith('exam-')) {
      const rest = key.slice(5)
      cat = examCategories.some((c) => c.id === rest) ? rest : 'all'
    } else {
      const mod = quizModules.find((m) => m.id === key)
      if (mod) cat = mod.category
    }
    if (!cat) continue
    const cur = byCat.get(cat) ?? { correct: 0, total: 0, attempts: 0 }
    cur.correct += score.correct
    cur.total += score.total
    cur.attempts += 1
    byCat.set(cat, cur)
    totalCorrect += score.correct
    totalQuestions += score.total
    attempts += 1
  }

  const rows: CatRow[] = [...byCat.entries()].map(([cat, s]) => ({
    cat,
    label: labelFor(cat),
    correct: s.correct,
    total: s.total,
    attempts: s.attempts,
    pct: s.total ? Math.round((s.correct / s.total) * 100) : 0,
  }))

  const weak = rows
    .filter((r) => r.attempts > 0 && r.pct < 60)
    .sort((a, b) => a.pct - b.pct)

  return {
    rows: rows.sort((a, b) => b.pct - a.pct),
    weak,
    totals: { totalCorrect, totalQuestions, attempts, topicsDone: p.completedTopics.length },
  }
}

export default function ExamPage() {
  useSEO({
    title: 'Exam Center',
    description:
      'Timed mock exams, weak-area performance tracking and quick-revision sheets for forensic-science examination preparation.',
  })

  const [category, setCategory] = useState<'all' | Category>('all')
  const [count, setCount] = useState(15)
  const [untimed, setUntimed] = useState(false)
  const [session, setSession] = useState<SessionConfig | null>(null)
  const [refresh, setRefresh] = useState(0)

  const perf = useMemo(() => buildPerformance(), [refresh, session])

  const launch = () => {
    const questions = composeExam(category, count)
    if (questions.length === 0) return
    const catLabel = examCategories.find((c) => c.id === category)?.label ?? 'Full syllabus'
    setSession({
      id: `exam-${category}`,
      title: `${catLabel} · ${questions.length}-question mock exam`,
      questions,
      minutes: untimed ? null : questions.length,
    })
  }

  if (session) {
    return (
      <div className="page-container max-w-4xl">
        <PageHeader eyebrow="Mock Examination" title={session.title} description="Answer every question, or let the timer decide. Explanations are revealed after submission." />
        <ExamEngine
          examId={session.id}
          title={session.title}
          questions={session.questions}
          minutes={session.minutes}
          onFinish={() => {
            setSession(null)
            setRefresh((r) => r + 1)
          }}
        />
      </div>
    )
  }

  return (
    <div className="page-container max-w-4xl">
      <PageHeader
        eyebrow="Examination"
        title="Exam Center"
        description="Three tools to get you exam-ready: timed mock exams from the full question bank, a performance dashboard that finds your weak areas, and quick-revision cheat sheets."
      />

      {/* ───────────── MOCK EXAM ───────────── */}
      <section className="glass-panel p-6 mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="clock" className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold">Mock Exam</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          Compose a timed paper from mixed multiple-choice, true/false and matching questions — one minute per
          question. Answer everything, or let the clock auto-submit.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Syllabus focus</label>
            <div className="flex flex-wrap gap-1.5">
              {examCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                    category === c.id
                      ? 'border-cyan-500/60 bg-cyan-600/15 text-cyan-200'
                      : 'border-navy-600/50 text-gray-400 hover:border-cyan-500/40 hover:text-gray-200'
                  }`}
                >
                  <Icon name={c.icon as never} className="w-3.5 h-3.5" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Paper length</label>
            <div className="flex flex-wrap gap-1.5">
              {examLengths.map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    count === n
                      ? 'border-cyan-500/60 bg-cyan-600/15 text-cyan-200'
                      : 'border-navy-600/50 text-gray-400 hover:border-cyan-500/40 hover:text-gray-200'
                  }`}
                >
                  {n} questions · {n} min
                </button>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 mt-3 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={untimed}
                onChange={(e) => setUntimed(e.target.checked)}
                className="accent-cyan-500"
              />
              Untimed practice mode (no clock)
            </label>
          </div>
        </div>

        <button className="btn-primary" onClick={launch}>
          <Icon name="play" className="w-4 h-4 inline mr-2" />
          Start mock exam
        </button>
      </section>

      {/* ───────────── PERFORMANCE & WEAK AREAS ───────────── */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="report" className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold">Performance & Weak Areas</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          Built from every quiz and mock exam you have taken on this device. Categories below 60% are flagged so you
          know exactly where to study next.
        </p>

        {perf.rows.length === 0 ? (
          <div className="glass-panel p-6 text-sm text-gray-400">
            No attempts recorded yet. Take your first mock exam or a quiz to populate this dashboard.
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              <div className="glass-panel p-4">
                <p className="text-2xl font-mono font-bold text-white">
                  {perf.totals.attempts}
                </p>
                <p className="text-xs text-gray-400 mt-1">attempts recorded</p>
              </div>
              <div className="glass-panel p-4">
                <p className="text-2xl font-mono font-bold text-emerald-400">
                  {perf.totals.totalQuestions ? Math.round((perf.totals.totalCorrect / perf.totals.totalQuestions) * 100) : 0}%
                </p>
                <p className="text-xs text-gray-400 mt-1">overall accuracy ({perf.totals.totalCorrect}/{perf.totals.totalQuestions})</p>
              </div>
              <div className="glass-panel p-4">
                <p className="text-2xl font-mono font-bold text-cyan-400">{perf.totals.topicsDone}</p>
                <p className="text-xs text-gray-400 mt-1">topics completed</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {perf.rows.map((r) => (
                <div key={r.cat} className="glass-panel p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-gray-200">{r.label}</span>
                    <span className={`text-xs font-mono ${r.pct < 60 ? 'text-crimson-400' : r.pct < 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {r.pct}% · {r.correct}/{r.total}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-navy-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        r.pct < 60 ? 'bg-crimson-500' : r.pct < 80 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.max(r.pct, 2)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {perf.weak.length > 0 && (
              <div className="glass-panel p-5 border-crimson-600/40">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="lightbulb" className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-white">Recommended study targets</h3>
                </div>
                <div className="space-y-3">
                  {perf.weak.map((w) => {
                    const topics = getTopicsByCategory(w.cat as Category).slice(0, 3)
                    return (
                      <div key={w.cat}>
                        <p className="text-sm text-crimson-300 font-semibold">{w.label} — {w.pct}%</p>
                        {topics.length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {topics.map((t) => (
                              <li key={t.id}>
                                <Link to={`/learn/${t.id}`} className="topic-link text-sm">
                                  → {t.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-gray-500 mt-1">Review the module notes for this area.</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* ───────────── QUICK REVISION ───────────── */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="principles" className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold">Quick Revision</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          One-line exam essentials and memory aids for every syllabus area. Read these the night before the paper.
        </p>

        <div className="space-y-4">
          {revisionSheets.map((sheet) => (
            <details key={sheet.category} className="glass-panel p-5 group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-white text-sm">{sheet.label}</h3>
                </div>
                <span className="text-gray-500 text-xs font-mono group-open:hidden">expand</span>
              </summary>
              <ul className="mt-4 space-y-2">
                {sheet.points.map((p, i) => (
                  <li key={i} className="text-sm text-gray-300 leading-relaxed flex gap-2.5">
                    <span className="text-cyan-500 font-mono shrink-0">•</span>
                    {p}
                  </li>
                ))}
              </ul>
              {sheet.mnemonics.length > 0 && (
                <div className="mt-4 pt-3 border-t border-navy-600/40">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 mb-2">Memory aids</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {sheet.mnemonics.map((m, i) => (
                      <div key={i} className="rounded-md bg-navy-800/70 border border-navy-600/40 px-3 py-2">
                        <p className="text-sm font-mono font-semibold text-amber-300">{m.line}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{m.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </details>
          ))}
        </div>
      </section>

      <InfoBlock title="How to use this center" tone="cyan">
        Do not aim for perfect scores on the first attempt. Run a mock paper, read every explanation whether you were
        right or wrong, then retake the same paper. The weak-areas dashboard will tell you which syllabus section to
        open in the learning hub next.
      </InfoBlock>
    </div>
  )
}