import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

type Grade = 'calibrated' | 'overreach' | 'cautious' | 'stall'

interface Response {
  text: string
  grade: Grade
}

interface Round {
  speaker: string
  challenge: string
  pressure: string
  objection: string
  responses: Response[]
  model: string
}

const ROUNDS: Round[] = [
  {
    speaker: 'Prosecution',
    challenge: 'Your report says his DNA is on the knife. So he handled it. Is that what you are telling this jury?',
    pressure: 'The court is watching whether you treat source and activity as the same thing.',
    objection: 'Leading, and it smuggles in the activity — "handled it" — as if it were already proven. The judge will sustain that.',
    responses: [
      {
        text: 'The profile is consistent with him being the source of the DNA on the knife — but DNA alone does not tell us when or how it got there.',
        grade: 'calibrated',
      },
      {
        text: 'Yes — if his DNA is there, he must have held it during the offence.',
        grade: 'overreach',
      },
      {
        text: 'I am not sure it matters. The DNA is there and that is what is important.',
        grade: 'cautious',
      },
    ],
    model: 'Keep source (who) separate from activity (what they did). DNA says the profile could come from him; it does not prove the action.',
  },
  {
    speaker: 'Prosecution',
    challenge: 'Your test came back positive. Positive means blood. Simple, correct?',
    pressure: 'One word — "confirmed" — would be fatal here.',
    objection: '"Simple" instructs the witness on the very conclusion at issue. The question tells the witness what to say.',
    responses: [
      {
        text: 'The presumptive test was positive. That is a screening indication, not a confirmation, and it is not species-specific.',
        grade: 'calibrated',
      },
      {
        text: 'Correct — a positive result confirms it is blood.',
        grade: 'overreach',
      },
      {
        text: 'Perhaps. Or perhaps not. I really cannot say either way.',
        grade: 'cautious',
      },
    ],
    model: 'Name the test and its level. "Presumptive positive" is precise; "confirmed" overclaims because the reaction is not specific to human blood.',
  },
  {
    speaker: 'Defence',
    challenge: 'One in a billion. So there is a one-in-a-billion chance my client is innocent, is there not?',
    pressure: 'This is the classic confusion between randomness and guilt.',
    objection: 'Misstates the statistic — the witness never put a probability on innocence. The figure is a rarity of the profile, not a probability of guilt.',
    responses: [
      {
        text: 'No. That figure describes how rare this profile is among random members of the population. It is not the probability of his guilt or innocence.',
        grade: 'calibrated',
      },
      {
        text: 'Essentially yes — a billion to one against him is what the science says.',
        grade: 'overreach',
      },
      {
        text: 'Statistics are beyond my expertise, so I will not discuss them.',
        grade: 'cautious',
      },
    ],
    model: 'Match probability states how often a profile is expected at random. Rarity is not the same as the chance a specific person committed the act.',
  },
  {
    speaker: 'Defence',
    challenge: 'You never tested every other person who could have touched that surface. So your examination is incomplete, is it not?',
    pressure: 'The attempt is to turn a bounded assignment into a universal failure.',
    objection: 'Assumes a duty that was never in the submission. The question builds its own conclusion into the premise.',
    responses: [
      {
        text: 'My work addressed the evidence submitted to the laboratory. The weighing of all explanations across the whole case is the court\u2019s role, and I state the scope of what I did.',
        grade: 'calibrated',
      },
      {
        text: 'You are right, the examination is therefore worthless.',
        grade: 'overreach',
      },
      {
        text: 'I cannot answer a legal question like that.',
        grade: 'cautious',
      },
    ],
    model: 'Acknowledge scope honestly without conceding invalidity: the laboratory examines what is submitted, and the court integrates the full picture.',
  },
  {
    speaker: 'Defence',
    challenge: 'You cannot rule out laboratory contamination, so your result cannot be trusted, can it?',
    pressure: 'A vague "yes, anything is possible" would discard legitimate science.',
    objection: 'No evidential foundation for contamination — it is offered as a bare possibility wrapped as a fact.',
    responses: [
      {
        text: 'I can state the control samples behaved as expected and the measures in place. I cannot rule out every hypothetical, but the controls give me a defined basis for confidence.',
        grade: 'calibrated',
      },
      {
        text: 'If contamination is possible at all, then the whole result is meaningless.',
        grade: 'overreach',
      },
      {
        text: 'I suppose anything is possible. I will not claim any reliability.',
        grade: 'cautious',
      },
    ],
    model: 'Do not overclaim (no test is perfect) and do not overcharge a general possibility into a destroyed result. Report the controls and the limits.',
  },
]

const gradeMeta: Record<Grade, { label: string; cls: string; icon: 'check' | 'close' | 'warning' | 'clock' }> = {
  calibrated: { label: 'Calibrated', cls: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200', icon: 'check' },
  overreach: { label: 'Overclaims', cls: 'border-crimson-500/50 bg-crimson-600/10 text-crimson-200', icon: 'close' },
  cautious: { label: 'Too vague', cls: 'border-amber-500/50 bg-amber-500/10 text-amber-200', icon: 'warning' },
  stall: { label: 'Stalled', cls: 'border-crimson-500/70 bg-crimson-600/20 text-crimson-300', icon: 'clock' },
}

const TIME_LIMIT = 45

export function WitnessBoxSimulator({ onDone }: { onDone?: () => void }) {
  const [round, setRound] = useState(0)
  const [answers, setAnswers] = useState<{ grade: Grade; index: number }[]>([])
  const [chosen, setChosen] = useState<number | null>(null)
  const [objected, setObjected] = useState(false)
  const [objectedCount, setObjectedCount] = useState(0)
  const [seconds, setSeconds] = useState(TIME_LIMIT)
  const lastRoundRef = useRef(false)
  lastRoundRef.current = round === ROUNDS.length - 1

  const finished = round >= ROUNDS.length
  const r = ROUNDS[Math.min(round, ROUNDS.length - 1)]

  useEffect(() => {
    setSeconds(TIME_LIMIT)
    setChosen(null)
    setObjected(false)
  }, [round])

  useEffect(() => {
    if (finished || chosen !== null) return
    if (seconds <= 0) {
      if (answers.length === round) {
        setAnswers((a) => [...a, { grade: 'stall', index: -1 }])
        if (lastRoundRef.current) {
          setRound((n) => n + 1)
          onDone?.()
        } else {
          setRound((n) => n + 1)
        }
      }
      return
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds, chosen, round, finished, answers.length, onDone])

  const counts = useMemo(
    () =>
      answers.reduce<Record<Grade, number>>(
        (acc, a) => {
          acc[a.grade] += 1
          return acc
        },
        { calibrated: 0, overreach: 0, cautious: 0, stall: 0 }
      ),
    [answers]
  )

  const verdict =
    counts.calibrated === ROUNDS.length
      ? { label: 'Steady witness', note: 'Every answer held the line between overclaiming and abandoning the science. This is how expert testimony survives.', cls: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' }
      : counts.calibrated >= 3
      ? { label: 'Mostly calibrated', note: 'Strong, with slips that a cross-examiner could exploit. Re-read the flagged answers below.', cls: 'text-amber-400 border-amber-500/40 bg-amber-500/10' }
      : { label: 'Needs preparation', note: 'Several answers either overstated what the science shows or gave it up too easily. Study the model answers below, then retake the box.', cls: 'text-crimson-400 border-crimson-500/40 bg-crimson-600/10' }

  const pick = (index: number) => {
    if (chosen !== null) return
    setChosen(index)
    setAnswers((a) => [...a, { grade: r.responses[index].grade, index }])
  }

  const object = () => {
    if (objected || chosen !== null) return
    setObjected(true)
    setObjectedCount((c) => c + 1)
  }

  const goNext = () => {
    const last = round === ROUNDS.length - 1
    setRound((n) => n + 1)
    if (last) onDone?.()
  }

  const retake = () => {
    setRound(0)
    setAnswers([])
    setChosen(null)
    setObjected(false)
    setObjectedCount(0)
    setSeconds(TIME_LIMIT)
    onDone?.()
  }

  if (finished) {
    const stallNote = counts.stall
      ? ` You ran the clock out on ${counts.stall} question${counts.stall > 1 ? 's' : ''} — the judge noted the silence.`
      : ''
    return (
      <div className="space-y-5">
        <div className={`rounded-xl border p-5 ${verdict.cls}`}>
          <div className="flex items-center gap-2 mb-1">
            <Icon name="court" className="w-5 h-5" />
            <h3 className="font-bold">The court notes: {verdict.label}</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{verdict.note}{stallNote}</p>
          <div className="flex flex-wrap gap-2 mt-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full border border-emerald-500/40 text-emerald-400">{counts.calibrated} calibrated</span>
            <span className="px-2.5 py-1 rounded-full border border-crimson-500/40 text-crimson-400">{counts.overreach} overclaimed</span>
            <span className="px-2.5 py-1 rounded-full border border-amber-500/40 text-amber-400">{counts.cautious} too vague</span>
            {counts.stall > 0 && <span className="px-2.5 py-1 rounded-full border border-gray-500/50 text-gray-300">{counts.stall} stalled</span>}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Objections raised: {objectedCount} of {ROUNDS.length}
            {objectedCount === ROUNDS.length ? ' — you policed the form of the questions throughout.' : ' — not everything worth objecting to was challenged.'}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">With the answers that cost you</p>
          {ROUNDS.map((rn, i) => {
            const a = answers[i]
            const meta = a ? gradeMeta[a.grade] : null
            return (
              <div key={i} className={`rounded-lg border px-4 py-3 ${meta ? meta.cls : 'border-navy-600/40'}`}>
                <p className="text-xs font-semibold opacity-80">{rn.speaker}: {rn.challenge}</p>
                <p className="text-sm text-gray-200 mt-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider mr-2 opacity-70">{meta?.label}</span>
                  {a?.index === -1 ? 'The clock ran out before you answered.' : rn.model}
                </p>
              </div>
            )
          })}
        </div>

        <button className="btn-secondary" onClick={retake}>
          Retake the witness box
        </button>
        <Link to="/learn/evidence-types" className="topic-link text-sm">→ Read the topic: what evidence can and cannot show</Link>
      </div>
    )
  }

  const secondsPct = (seconds / TIME_LIMIT) * 100
  const urgent = seconds <= 10
  const timerColor = urgent ? 'bg-crimson-500' : seconds <= 25 ? 'bg-amber-400' : 'bg-cyan-400'

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 px-5 py-4">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-widest text-amber-400/80">
          <Icon name="court" className="w-4 h-4" /> {r.speaker} · question {round + 1} of {ROUNDS.length}
        </div>
        <div className="flex items-start justify-between gap-4">
          <p className="text-white font-semibold leading-relaxed">“{r.challenge}”</p>
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">{r.pressure}</p>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-navy-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${chosen !== null ? 'bg-navy-600' : timerColor}`}
              style={{ width: `${chosen !== null ? 100 : secondsPct}%` }}
            />
          </div>
          <span className={`text-[11px] font-mono w-20 text-right ${urgent && chosen === null ? 'text-crimson-400 animate-pulse' : 'text-gray-500'}`}>
            {chosen !== null ? 'answered' : `${seconds}s left`}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={object} disabled={objected || chosen !== null} className="btn-ghost !text-xs !px-3 !py-1.5 text-amber-400 border border-amber-500/40">
          <Icon name="warning" className="w-3.5 h-3.5" /> Object to the question
        </button>
        {objected && (
          <span className="text-[11px] font-mono text-amber-300/80">Sustained — the premise was loaded. Now answer anyway.</span>
        )}
      </div>

      {objected && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-1">Judge's ruling · objection sustained</p>
          <p className="text-sm text-gray-200 leading-relaxed">{r.objection}</p>
        </div>
      )}

      <ol className="grid gap-2">
        {r.responses.map((res, i) => {
          const selected = chosen === i
          const show = chosen !== null
          const meta = show && selected ? gradeMeta[res.grade] : null
          return (
            <li key={i}>
              <button
                onClick={() => pick(i)}
                disabled={chosen !== null}
                className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                  selected && show
                    ? meta!.cls
                    : 'border-navy-600/50 bg-navy-800/50 hover:border-cyan-500/40 hover:bg-navy-800 text-gray-200'
                } ${chosen !== null && !selected ? 'opacity-50' : ''}`}
              >
                <span className="flex items-start gap-2">
                  <span className="font-mono text-xs text-gray-500 pt-0.5">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{res.text}</span>
                </span>
                {meta && (
                  <span className="text-[10px] font-mono uppercase tracking-wider mt-1.5 inline-flex items-center gap-1 opacity-90">
                    <Icon name={meta.icon} className="w-3.5 h-3.5" /> {meta.label}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>

      {chosen !== null && (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-600/10 px-5 py-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1">What a calibrated witness says</p>
          <p className="text-sm text-gray-200 leading-relaxed">{r.model}</p>
          <button className="btn-primary mt-4" onClick={goNext}>
            {round === ROUNDS.length - 1 ? 'Face the verdict' : 'Next question'}
          </button>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        {ROUNDS.map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < answers.length ? 'bg-cyan-400' : 'bg-navy-700'}`} />
        ))}
      </div>
    </div>
  )
}