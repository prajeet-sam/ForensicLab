import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { ProgressDots } from './form'

interface Zone {
  id: string
  name: string
  short: string
  observation: string
  clue: string
  vignette: string
}

interface ZonePos {
  x: number
  y: number
  w: number
  h: number
  label: 'top' | 'left' | 'center'
}

const ZONES: Zone[] = [
  {
    id: 'window',
    name: 'Broken rear window',
    short: 'Window',
    observation: 'Glass shards on the carpet spread out from the sill, one pane popped outward, splinters caught in the frame. A short spray of droplets reaches the inner sill.',
    clue: 'Direction of spread suggests force from outside in. Pattern first, photos first, before anything is moved.',
    vignette: 'The shard on the floor has a clean arc — possible footwear transfer fragment.',
  },
  {
    id: 'spatter',
    name: 'Impact spatter on the hall wall',
    short: 'Spatter',
    observation: 'Neat fan of medium-velocity spatter, roughly chest height, arcing left-to-right. No satellite pattern wipe-over.',
    clue: 'Record the pattern, then sample a small representative area for confirmation. You read the fan before you touch it.',
    vignette: 'The leading edge of the fan aligns with the broken window — the sequence is worth testing.',
  },
  {
    id: 'impression',
    name: 'Shoe impression on the matte floor',
    short: 'Print',
    observation: 'A clear 3-D impression in the dust film with sole wear bars, leaving the toe section distinct.',
    clue: 'A 3-D impression: photograph with an oblique light, then cast. A tape-lift would only flatten the depth away.',
    vignette: 'Wear pattern classes match a common trainer sole — class evidence until a suspect sole is compared.',
  },
  {
    id: 'laptop',
    name: 'Laptop, lid open',
    short: 'Laptop',
    observation: 'A laptop sits open on the desk, screen showing a blank password field, no external drives attached.',
    clue: 'Do not touch it at the scene. Seize as-is, keep it powered, and image it in the lab — someone who knows the password could wipe everything.',
    vignette: 'The recent-files list is exactly what the examiner will try to preserve.',
  },
  {
    id: 'phone',
    name: 'Phone on a charger',
    short: 'Phone',
    observation: 'A phone plugged into a wall adaptor, screen dark, AOD off. The cable looks stretched toward the desk edge.',
    clue: 'Cut the network, not the power: remove it from the charger, bag it in a Faraday pouch so it cannot sync or wipe on wake.',
    vignette: 'A remote-wipe command travels over the network — the pouch is the guard.',
  },
  {
    id: 'fibre',
    name: 'Fibre caught on the door frame',
    short: 'Fibre',
    observation: 'A single dark fibre snagged at waist height on the inner edge of the frame, twisted at the catch point.',
    clue: 'Document position, then seize with tweezers into a paper fold — a vacuum would break the location and the fibre.',
    vignette: 'Its position — not just the fibre itself — is the evidence. Paper, not plastic, keeps it dry.',
  },
]

const ZONE_POS: Record<string, ZonePos> = {
  window: { x: 150, y: 12, w: 130, h: 48, label: 'top' },
  spatter: { x: 12, y: 100, w: 50, h: 96, label: 'left' },
  impression: { x: 96, y: 150, w: 120, h: 84, label: 'center' },
  laptop: { x: 252, y: 84, w: 120, h: 92, label: 'center' },
  phone: { x: 298, y: 208, w: 88, h: 60, label: 'left' },
  fibre: { x: 18, y: 212, w: 88, h: 56, label: 'left' },
}

interface Decision {
  zoneId: string
  question: string
  options: { text: string; correct: boolean }[]
  lesson: string
}

const DECISIONS: Decision[] = [
  {
    zoneId: 'window',
    question: 'On the doorstep, before you even step forward — what comes first?',
    options: [
      { text: 'Photograph the window and spray pattern from two angles with a scale, then move in.', correct: true },
      { text: 'Step straight in and lift the largest glass shard into an evidence bag.', correct: false },
      { text: 'Swab the sill droplets first in case the pattern is lost.', correct: false },
    ],
    lesson: 'Record before you recover. The pattern is one-time evidence; the swab can always be retaken later, the shape cannot.',
  },
  {
    zoneId: 'spatter',
    question: 'How far does sampling go?',
    options: [
      { text: 'Photograph and note the fan, then sample a small representative patch for confirmatory analysis.', correct: true },
      { text: 'Swab every single droplet in the room — you cannot be too careful.', correct: false },
      { text: 'Trust the visual and skip sampling entirely.', correct: false },
    ],
    lesson: 'Sampling is representative, not wholesale. Each excess swab doubles contamination risk for no added probative value.',
  },
  {
    zoneId: 'impression',
    question: 'The print is 3-D in dust. Best recovery?',
    options: [
      { text: 'Oblique-light photography, then a dental stone cast.', correct: true },
      { text: 'A sticky tape-lift across the whole impression.', correct: false },
      { text: 'Vacuum the dust into a filter for later analysis.', correct: false },
    ],
    lesson: 'A 3-D impression needs a cast to preserve depth. A tape-lift flattens it; a vacuum destroys the spatial relationship wholesale.',
  },
  {
    zoneId: 'laptop',
    question: 'Laptop open, screen waiting. Your move?',
    options: [
      { text: 'Leave it as-is, record its state, and seize it powered for lab imaging.', correct: true },
      { text: 'Log in with the sticky-note password and screenshot the files.', correct: false },
      { text: 'Pull the battery and power cord out immediately.', correct: false },
    ],
    lesson: 'Touching a live device at the scene can mutate exactly the volatile data the examiner wants. Seize as found; image under controlled conditions.',
  },
  {
    zoneId: 'phone',
    question: 'The charger and phone — seize both, or one?',
    options: [
      { text: 'Remove it from the charger, bag the phone in a Faraday pouch, and take the adaptor too.', correct: true },
      { text: 'Leave it charging until the lab can act — the battery might die otherwise.', correct: false },
      { text: 'Reboot it to unlock the lock screen first.', correct: false },
    ],
    lesson: 'A powered phone reaching a network can sync or wipe. Faraday isolates it; keeping the charger adaptor protects chain of custody for its history.',
  },
  {
    zoneId: 'fibre',
    question: 'Single fibre on the frame. Recovery without losing where it sat?',
    options: [
      { text: 'Document position and seize with tweezers into a folded paper packet.', correct: true },
      { text: 'Vacuum the frame edge into the filter.', correct: false },
      { text: 'Moisten a swab and roll it along the frame to collect everything.', correct: false },
    ],
    lesson: 'The fibre\u2019s location is probative; the fibre\u2019s integrity is analytical. Tweezers + paper fold keeps both. Vacuum or moist swabs trade one away.',
  },
]

interface KitItem {
  id: string
  label: string
  required: boolean
}

const KIT_ITEMS: KitItem[] = [
  { id: 'gloves', label: 'Nitrile gloves', required: true },
  { id: 'shoe', label: 'Shoe covers', required: true },
  { id: 'suit', label: 'Disposable scene suit', required: true },
  { id: 'mask', label: 'Half-mask respirator', required: true },
  { id: 'goggles', label: 'Visor goggles', required: true },
  { id: 'coffee', label: 'Iced coffee', required: false },
  { id: 'tie', label: 'Work tie', required: false },
  { id: 'phonec', label: 'Your personal phone', required: false },
]

const fmtPad = (n: number) => String(n).padStart(2, '0')

function ZoneSpot({ zone, done, active, onClick }: { zone: Zone; done: boolean; active: boolean; onClick: () => void }) {
  const p = ZONE_POS[zone.id]
  const cx = p.x + p.w / 2
  const cy = p.y + p.h / 2
  return (
    <g onClick={onClick} className="cursor-pointer">
      <rect
        x={p.x}
        y={p.y}
        width={p.w}
        height={p.h}
        rx={9}
        strokeWidth={1.6}
        className={
          done
            ? active
              ? 'fill-cyan-600/30 stroke-cyan-300'
              : 'fill-cyan-600/20 stroke-cyan-400'
            : 'fill-navy-800/70 stroke-navy-500'
        }
        strokeDasharray={done ? undefined : '6 4'}
      />
      <text
        x={cx}
        y={p.y + 15}
        textAnchor="middle"
        fontSize={11}
        className={done ? 'fill-cyan-400' : 'fill-gray-400'}
        style={{ pointerEvents: 'none' }}
      >
        {zone.short}
      </text>
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fontSize={done ? 13 : 11}
        className={done ? 'fill-emerald-400' : 'fill-gray-500'}
        style={{ pointerEvents: 'none' }}
      >
        {done ? '✓ recorded' : 'survey'}
      </text>
    </g>
  )
}

export function SceneExplorerSimulator({ onDone }: { onDone?: () => void }) {
  const [currentStage, setCurrentStage] = useState<'kit' | 'scene' | 'casework' | 'report'>('kit')
  const [equippedItems, setEquippedItems] = useState<Set<string>>(() => new Set())
  const [delisted, setDelisted] = useState<Set<string>>(() => new Set())
  const [kitMistakes, setKitMistakes] = useState(0)
  const [surveyedZones, setSurveyedZones] = useState<Set<string>>(() => new Set())
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const [decisionStep, setDecisionStep] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  const currentDecision = DECISIONS[decisionStep]
  const isDelisted = (id: string) => delisted.has(id)

  const allDonned = KIT_ITEMS.filter((k) => k.required).every((k) => equippedItems.has(k.id))

  const donItem = (item: KitItem) => {
    if (equippedItems.has(item.id) || delisted.has(item.id)) return
    if (item.required) {
      setEquippedItems((d) => new Set(d).add(item.id))
    } else {
      setKitMistakes((m) => m + 1)
      setDelisted((x) => new Set(x).add(item.id))
    }
  }

  const survey = (zoneId: string) => {
    const next = new Set(surveyedZones)
    next.add(zoneId)
    setSurveyedZones(next)
    setActiveZone(zoneId)
  }

  const allSurveyed = surveyedZones.size === ZONES.length

  const pick = (i: number) => {
    if (chosen !== null) return
    setChosen(i)
    if (DECISIONS[decisionStep].options[i].correct) setCorrectCount((c) => c + 1)
  }

  const zone = ZONES.find((z) => z.id === (currentStage === 'casework' ? currentDecision.zoneId : activeZone))
  const entryTime = `${fmtPad(20)}:${fmtPad(10 + ZONES.length - surveyedZones.size)}`

  const resetAll = () => {
    setCurrentStage('kit')
    setEquippedItems(new Set())
    setKitMistakes(0)
    setDelisted(new Set())
    setSurveyedZones(new Set())
    setActiveZone(null)
    setDecisionStep(0)
    setChosen(null)
    setCorrectCount(0)
    onDone?.()
  }

  if (currentStage === 'kit') {
    return (
      <div className="space-y-5">
        <div className="flex items-start gap-2">
          <Icon name="glove" className="w-5 h-5 text-amber-400 mt-0.5" />
          <p className="text-sm text-gray-300 leading-relaxed">
            You are at the tape of 23 Maple Terrace. <span className="text-white font-medium">Don your entry kit</span> —
            tap the pieces you actually wear into a scene that has to stay uncontaminated. The tray holds decoys that will cost you credibility.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {KIT_ITEMS.map((item) => {
            const worn = equippedItems.has(item.id)
            const dropped = isDelisted(item.id)
            if (dropped) {
              return (
                <div key={item.id} className="rounded-lg border border-crimson-500/30 bg-crimson-600/5 px-3 py-3 text-xs text-gray-600 text-center">
                  <span className="line-through">{item.label}</span>
                  <span className="block mt-1 text-crimson-400/70 font-mono">kit slip ✕</span>
                </div>
              )
            }
            return (
              <button
                key={item.id}
                onClick={() => donItem(item)}
                className={`rounded-lg border px-3 py-3 text-center text-sm transition-colors ${
                  worn
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                    : item.required
                    ? 'border-navy-600/50 bg-navy-800/60 hover:border-cyan-500/40 hover:bg-navy-800 text-gray-200'
                    : 'border-crimson-500/40 bg-navy-900/60 text-gray-400 hover:border-crimson-500/70'
                }`}
              >
                <div className="h-6 mb-1.5 flex items-center justify-center">
                  <Icon name={item.required ? 'check' : 'close'} className={`w-4 h-4 ${worn ? 'text-emerald-400' : 'text-gray-600'}`} />
                </div>
                {item.label}
                {!worn && <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-600 mt-1">{item.required ? 'required' : 'decoy'}</span>}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-gray-500">
              {KIT_ITEMS.filter((k) => k.required).filter((k) => equippedItems.has(k.id)).length}/{KIT_ITEMS.filter((k) => k.required).length} worn
            </span>
            {kitMistakes > 0 && (
              <span className="font-mono text-crimson-400">+{kitMistakes} slip{kitMistakes > 1 ? 's' : ''} recorded</span>
            )}
          </div>
          <button className="btn-primary" disabled={!allDonned} onClick={() => setCurrentStage('scene')}>
            {allDonned ? 'Enter the scene →' : 'Don all required kit first'}
          </button>
        </div>

        {kitMistakes > 0 && (
          <div className="rounded-lg border border-crimson-500/30 bg-crimson-600/5 px-4 py-3 text-sm text-gray-300">
            <span className="text-crimson-300 font-mono font-semibold">Sergeant:</span> a coffee and a tie do not belong across the tape. Every street item you
            carry in is a vector for cross-contamination — and a note the record will have to explain.
          </div>
        )}
      </div>
    )
  }

  if (currentStage === 'casework') {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400/80">
          <Icon name="report" className="w-4 h-4" />
          Scene casework · item {decisionStep + 1} of {DECISIONS.length}
        </div>
        <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 px-5 py-4">
          <p className="text-sm font-semibold text-white mb-2">{zone?.name}</p>
          <p className="text-xs text-gray-400 italic mb-3">“{zone?.observation}”</p>
          <p className="text-sm text-gray-200">{currentDecision.question}</p>
        </div>

        <ol className="grid gap-2">
          {currentDecision.options.map((o, i) => {
            const isChosen = chosen === i
            const revealed = chosen !== null
            return (
              <li key={i}>
                <button
                  onClick={() => pick(i)}
                  disabled={chosen !== null}
                  className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                    revealed && o.correct
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                      : revealed && isChosen
                      ? 'border-crimson-500/50 bg-crimson-600/10 text-crimson-200'
                      : 'border-navy-600/50 bg-navy-800/50 hover:border-cyan-500/40 hover:bg-navy-800 text-gray-200'
                  } ${revealed && !o.correct && !isChosen ? 'opacity-50' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-500">{String.fromCharCode(65 + i)}</span>
                    <span className="flex-1">{o.text}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="flex items-center justify-center gap-5">
          <span className="text-xs font-mono text-gray-500">correct so far {correctCount}/{Math.min(decisionStep + 1, DECISIONS.length)}</span>
          <ProgressDots total={DECISIONS.length} completed={decisionStep + (chosen !== null ? 1 : 0)} dotClass="h-1.5 w-6 rounded-full" />
          <span className="text-xs font-mono text-gray-500">scene time {entryTime}</span>
        </div>

        {chosen !== null && (
          <div className={`rounded-xl border px-5 py-4 ${currentDecision.options[chosen].correct ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-crimson-500/40 bg-crimson-600/10'}`}>
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
              {currentDecision.options[chosen].correct ? 'Held the procedure' : 'Procedure slip'}
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">{currentDecision.lesson}</p>
            <button
              className="btn-primary mt-4"
              onClick={() => {
                if (decisionStep === DECISIONS.length - 1) {
                  setCurrentStage('report')
                  onDone?.()
                } else {
                  setDecisionStep((s) => s + 1)
                  setChosen(null)
                }
              }}
            >
              {decisionStep === DECISIONS.length - 1 ? 'Close the scene — compile report' : 'Next item'}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (currentStage === 'report') {
    return (
      <div className="space-y-5">
        <div className={`rounded-xl border p-5 ${correctCount >= 5 ? 'border-emerald-500/40 bg-emerald-500/10' : correctCount >= 3 ? 'border-amber-500/40 bg-amber-500/10' : 'border-crimson-500/40 bg-crimson-600/10'}`}>
          <div className="flex items-center gap-2 mb-1">
            <Icon name="report" className="w-5 h-5 text-gray-300" />
            <h3 className="font-bold">Scene report — 23 Maple Terrace</h3>
          </div>
          <p className="text-sm text-gray-300">
            {surveyedZones.size}/{ZONES.length} zones surveyed and photographed · {correctCount}/{DECISIONS.length} casework decisions held
            {kitMistakes > 0 ? ` · ${kitMistakes} kit slip${kitMistakes > 1 ? 's' : ''} in the record` : ''}.
          </p>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            {correctCount >= 5
              ? kitMistakes === 0
                ? 'A disciplined record: patterns read before sampling, electronics isolated on seizure. This scene leaves a defensible digital and physical trail.'
                : 'Strong casework, though the kit slip stands in the record — a defence examiner will ask who wore a tie inside the tape.'
              : correctCount >= 3
              ? 'A usable record with gaps — a defence examiner would probe the items where the sequence slipped.'
              : 'The record leaks credibility: missed pattern readings and hasty recovery give the defence a clean attack lane.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-1.5">
          {ZONES.map((z) => (
            <div key={z.id} className="rounded-lg border border-navy-600/40 bg-navy-800/50 px-3 py-2.5 text-sm text-gray-300 flex items-start gap-2">
              <Icon name="check" className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><span className="text-white font-medium">{z.name}</span> — {z.vignette}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-navy-600/40 bg-navy-800/60 px-4 py-3 text-sm text-gray-300">
          <span className="text-cyan-300 font-mono font-semibold">Sergeants\u2019 rule:</span> photograph → understand → recover. For every item: eyes first,
          instruments second, hands last. A scene that reads clean at step one writes clean in court at the end.
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary" onClick={resetAll}>
            Re-enter the scene
          </button>
          <Link to="/learn/crime-scene-procedures" className="btn-ghost text-sm">→ Read the topic: crime-scene examination</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-amber-400/80">
          <Icon name="camera" className="w-4 h-4" /> Survey phase · don't touch yet
        </div>
        <span className="text-[11px] font-mono text-gray-500">
          {surveyedZones.size}/{ZONES.length} zones recorded
        </span>
      </div>

      <div className="rounded-2xl border border-navy-700/60 bg-navy-950/80 p-2">
        <svg viewBox="0 0 420 320" className="w-full h-auto rounded-xl">
<rect x={8} y={8} width={404} height={304} rx={6} className="fill-navy-900 stroke-navy-600" strokeWidth={1.5} />

      <rect x={10} y={10} width={400} height={12} className="fill-navy-800 stroke-navy-600" strokeWidth={1} />
      <rect x={150} y={10} width={130} height={12} className="fill-navy-800 stroke-crimson-500/70" strokeWidth={1.4} />
      <path d="M150 13h130M190 10v12M240 10v12M205 10v12" className="stroke-crimson-500/60" strokeWidth={0.8} />

      <rect x={10} y={10} width={12} height={300} className="fill-navy-800 stroke-navy-600" strokeWidth={1} />

      <rect x={8} y={284} width={14} height={28} className="fill-navy-800 stroke-navy-500" strokeWidth={1} />
      <path d="M2 284h20v-8H2z" className="fill-navy-950 stroke-navy-500" strokeWidth={1} />

      <rect x={256} y={176} width={140} height={10} className="fill-amber-500/20 stroke-amber-500/40" strokeWidth={1} />
      <rect x={268} y={186} width={80} height={8} className="fill-amber-500/10" strokeWidth={0} />

      <rect x={290} y={258} width={10} height={8} className="fill-gray-600" strokeWidth={0} />
      <rect x={352} y={258} width={10} height={8} className="fill-gray-600" strokeWidth={0} />

      <path d="M20 20l-6 6M40 20l-6 6M60 20l-6 6" className="stroke-gray-500" strokeWidth={1} opacity={0.5} />

      <text x={40} y={307} textAnchor="middle" fontSize={10} className="fill-gray-500" style={{ pointerEvents: 'none' }}>
        front door
      </text>

      {ZONES.map((z) => (
        <ZoneSpot key={z.id} zone={z} done={surveyedZones.has(z.id)} active={activeZone === z.id} onClick={() => survey(z.id)} />
      ))}
    </svg>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-gray-500">
        <span><span className="text-navy-500 inline-block w-3">▭</span> unobserved</span>
        <span><span className="text-cyan-400 inline-block w-3">▭</span> surveyed &amp; logged</span>
        <span>click a hotspot to record it into the scene log</span>
      </div>

      <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 px-5 py-4 min-h-[9rem]">
        {zone ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80">Scene log · recorded {entryTime}</p>
              <span className="text-[11px] font-mono text-cyan-400">{zone.name}</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">{zone.observation}</p>
            <p className="text-xs text-cyan-300/90 mt-2 font-mono">{zone.clue}</p>
          </>
        ) : (
          <p className="text-sm text-gray-500">Tap a zone on the floor plan to record its observation into the scene log.</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <ProgressDots total={ZONES.length} completed={surveyedZones.size} ariaLabel="Surveyed zones" />
        <button className="btn-primary" disabled={!allSurveyed} onClick={() => { setCurrentStage('casework'); setActiveZone(null) }}>
          Begin casework {surveyedZones.size}/{ZONES.length} surveyed
        </button>
      </div>
    </div>
  )
}