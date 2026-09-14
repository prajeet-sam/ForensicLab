import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

interface EvidenceEvent {
  id: string
  label: string
  device: 'Doorbell' | 'Phone' | 'Laptop'
  rawMinutes: number
  offsetMinutes: number
  trueMinutes: number
  truthIndex: number
}

const EVENTS: EvidenceEvent[] = [
  { id: 'e1', label: 'Front door opened', device: 'Doorbell', rawMinutes: 8, offsetMinutes: 5, trueMinutes: 3, truthIndex: 0 },
  { id: 'e2', label: 'Phone unlock (face recognition)', device: 'Phone', rawMinutes: 5, offsetMinutes: 0, trueMinutes: 5, truthIndex: 1 },
  { id: 'e3', label: 'Laptop login', device: 'Laptop', rawMinutes: 4, offsetMinutes: -2, trueMinutes: 6, truthIndex: 2 },
  { id: 'e4', label: 'Motion at back window', device: 'Doorbell', rawMinutes: 14, offsetMinutes: 5, trueMinutes: 9, truthIndex: 3 },
  { id: 'e5', label: 'Messaging app: message sent', device: 'Phone', rawMinutes: 12, offsetMinutes: 0, trueMinutes: 12, truthIndex: 4 },
  { id: 'e6', label: 'File marked for deletion', device: 'Laptop', rawMinutes: 11, offsetMinutes: -2, trueMinutes: 13, truthIndex: 5 },
  { id: 'e7', label: 'Doorbell camera offline', device: 'Doorbell', rawMinutes: 20, offsetMinutes: 5, trueMinutes: 15, truthIndex: 6 },
]

const DEVICE_NOTES: Record<EvidenceEvent['device'], string> = {
  Doorbell: 'runs 5 minutes fast',
  Phone: 'on accurate network time',
  Laptop: 'runs 2 minutes slow',
}

const fmt = (m: number) => `20:${String(m).padStart(2, '0')}`

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function TimelineForgeSimulator({ onDone }: { onDone?: () => void }) {
  const [pool, setPool] = useState<EvidenceEvent[]>(() => shuffle(EVENTS))
  const [placed, setPlaced] = useState<EvidenceEvent[]>([])
  const [reconstructed, setReconstructed] = useState(false)
  const [normalize, setNormalize] = useState(false)
  const [dragId, setDragId] = useState<string | null>(null)
  const [warned, setWarned] = useState(false)

  const aligned = useMemo(() => {
    if (!reconstructed) return null
    return placed.filter((e, i) => e.truthIndex === i).length
  }, [reconstructed, placed])

  const eventById = (id: string) => EVENTS.find((e) => e.id === id)

  const placeAt = (id: string, index: number) => {
    const ev = eventById(id)
    if (!ev || placed.some((p) => p.id === id)) {
      if (ev) setWarned(true)
      return
    }
    setPool((p) => p.filter((x) => x.id !== id))
    setPlaced((prev) => {
      const next = [...prev]
      next.splice(Math.min(index, next.length), 0, ev)
      return next
    })
    setDragId(null)
    setWarned(false)
  }

  const removeFrom = (id: string) => {
    const ev = eventById(id)
    if (!ev) return
    setPlaced((p) => p.filter((x) => x.id !== id))
    setPool((p) => [...p, ev])
    setWarned(false)
  }

  const rebuild = () => {
    setPool(shuffle(EVENTS))
    setPlaced([])
    setReconstructed(false)
    setDragId(null)
  }

  if (reconstructed) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-600/10 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="clock" className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white">Forge report · {aligned}/{EVENTS.length} events aligned</h3>
          </div>
          <p className="text-sm text-gray-300">
            {aligned === EVENTS.length
              ? 'Every event sits in its true sequence. A court can now read a reliable chain: entry, unlock, login, window motion, message, deletion, camera offline.'
              : 'The timeline contains mis-ordered events. Clock drift on the doorbell and laptop masks the true sequence; a court would hammer on that.'}
          </p>
        </div>

        <div className="grid gap-1.5">
          {placed.map((e, i) => {
            const ok = e.truthIndex === i
            return (
              <div
                key={e.id}
                className={`flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2.5 ${
                  ok ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-crimson-500/50 bg-crimson-600/10'
                }`}
              >
                <span className="text-xs font-mono text-gray-500 bg-navy-800 rounded px-1.5 py-0.5">#{i + 1}</span>
                <span className={`text-sm font-medium ${ok ? 'text-emerald-200' : 'text-crimson-200'}`}>{e.label}</span>
                <span className="text-[11px] font-mono text-gray-400 ml-auto">
                  {e.device} · recorded {fmt(e.rawMinutes)} · true {fmt(e.trueMinutes)}
                </span>
              </div>
            )
          })}
        </div>

        {aligned !== EVENTS.length && (
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80">Divergence report</p>
            {placed.map((e, i) => {
              if (e.truthIndex === i) return null
              const expected = EVENTS[i]
              return (
                <div key={e.id} className="rounded-md bg-navy-800/70 border border-navy-600/40 px-3 py-2 text-sm text-gray-300">
                  Position #{i + 1}: you placed <span className="text-crimson-300 font-medium">{e.label}</span> but the true
                  occupant is <span className="text-emerald-300 font-medium">{expected.label}</span> (true {fmt(expected.trueMinutes)}).
                  The {e.device} log says {fmt(e.rawMinutes)} — that device's clock {DEVICE_NOTES[e.device]}, which shifts everything.
                </div>
              )
            })}
          </div>
        )}

        <div className="rounded-lg border border-navy-600/40 bg-navy-800/60 px-4 py-3 text-sm text-gray-300">
          <span className="text-amber-300 font-mono font-semibold">Deck:</span> doorbell clock {DEVICE_NOTES.Doorbell}, laptop {DEVICE_NOTES.Laptop}. Relying on raw
          timestamps across devices can reverse the true order — always normalise to a trusted clock before reading a timeline.
        </div>

        <Link to="/learn/digital-forensics-timeline" className="topic-link text-sm">→ Read the topic: Timeline reconstruction</Link>

        <button className="btn-secondary" onClick={rebuild}>
          Rebuild the timeline
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2">
        <Icon name="lightbulb" className="w-5 h-5 text-amber-400 mt-0.5" />
        <p className="text-sm text-gray-300 leading-relaxed">
          Three devices logged the night of the burglary. The logs show <span className="text-white font-medium">recorded</span> times — but
          device clocks drift. Click to append, <span className="text-cyan-300">drag to re-order</span>, and click a placed row to return it
          to the tray. Forge the sequence a corrected, trusted clock would show.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" checked={normalize} onChange={(e) => setNormalize(e.target.checked)} className="accent-cyan-500" />
          Show clock corrections
        </label>
        <span className="text-xs font-mono text-gray-500 self-center">or drop an event onto a slot to insert it there</span>
      </div>

      {normalize && (
        <div className="rounded-lg border border-navy-600/40 bg-navy-800/70 px-4 py-3 grid sm:grid-cols-3 gap-3 text-sm">
          <p className="text-gray-200"><span className="text-cyan-400 font-mono">Doorbell</span> — {DEVICE_NOTES.Doorbell}</p>
          <p className="text-gray-200"><span className="text-cyan-400 font-mono">Phone</span> — {DEVICE_NOTES.Phone}</p>
          <p className="text-gray-200"><span className="text-cyan-400 font-mono">Laptop</span> — {DEVICE_NOTES.Laptop}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Recovered log — click or drag into the timeline</p>
          <div className="space-y-1.5">
            {pool.map((e) => (
              <button
                key={e.id}
                draggable
                onDragStart={() => setDragId(e.id)}
                onClick={() => placeAt(e.id, placed.length)}
                className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors group ${
                  dragId === e.id ? 'border-cyan-400/70 bg-cyan-600/20' : 'border-navy-600/50 bg-navy-800/60 hover:border-cyan-500/40 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm ${dragId === e.id ? 'text-cyan-200' : 'text-gray-200 group-hover:text-white'}`}>{e.label}</span>
                  <span className="text-[11px] font-mono text-gray-500 shrink-0">{e.device} · {fmt(e.rawMinutes)}</span>
                </div>
                <span className="text-[11px] text-cyan-400/80 font-mono">{normalize ? `true ${fmt(e.trueMinutes)}` : 'drag ↕ or click +'}</span>
              </button>
            ))}
            {pool.length === 0 && <p className="text-sm text-gray-500">All events placed.</p>}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
            Your timeline — {placed.length}/{EVENTS.length} <span className="normal-case">(click a row to remove)</span>
          </p>
          <div
            className={`space-y-1.5 ${placed.length === 0 ? 'border-2 border-dashed border-navy-700/60 rounded-lg p-3' : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId) placeAt(dragId, placed.length)
            }}
          >
            {placed.length === 0 && (
              <p className="text-xs text-gray-600 px-2 py-6 text-center">Drop events here.</p>
            )}
            {placed.map((e, i) => {
              const maybeTrue = normalize ? fmt(e.trueMinutes) : `recorded ${fmt(e.rawMinutes)}`
              return (
                <div
                  key={e.id}
                  draggable
                  onDragStart={() => setDragId(e.id)}
                  onDragOver={(ev) => ev.preventDefault()}
                  onDrop={(ev) => {
                    ev.stopPropagation()
                    if (dragId) placeAt(dragId, i)
                  }}
                  onClick={() => removeFrom(e.id)}
                  title="Click to remove · drag to its new position"
                  className="flex items-center gap-2.5 rounded-lg border-2 border-cyan-500/40 bg-cyan-600/10 px-3 py-2 cursor-grab active:cursor-grabbing hover:border-crimson-500/50 transition-all"
                >
                  <Icon name="transfer" className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" />
                  <span className="text-xs font-mono text-gray-500 shrink-0">{i + 1}</span>
                  <span className="text-sm text-gray-100">{e.label}</span>
                  <span className="text-[11px] font-mono text-gray-500 ml-auto">{maybeTrue}</span>
                  <Icon name="close" className="w-3.5 h-3.5 text-gray-600 group-hover:text-crimson-400" />
                </div>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="btn-primary" disabled={placed.length !== EVENTS.length} onClick={() => { setReconstructed(true); onDone?.() }}>
              Forge the timeline
            </button>
            <button className="btn-secondary" disabled={placed.length === 0} onClick={() => removeFrom(placed[placed.length - 1].id)}>
              Undo last placement
            </button>
            <button className="btn-ghost" onClick={rebuild}>Reset</button>
          </div>
          {placed.length !== EVENTS.length && (
            <p className="text-xs text-gray-500 mt-2">Place all {EVENTS.length} events to forge the timeline.</p>
          )}
          {warned && (
            <p className="text-xs text-amber-400 mt-2">That event is already on the timeline — click a row to remove it first.</p>
          )}
        </div>
      </div>
    </div>
  )
}