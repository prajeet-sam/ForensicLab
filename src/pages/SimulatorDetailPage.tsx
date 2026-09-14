import { Link, useParams } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { getAllSimulators } from '../data/simulators'
import { SimulatorShell } from '../components/display'
import { ABOInheritanceSimulator } from '../components/ABOInheritanceSimulator'
import { BloodTypingSimulator } from '../components/BloodTypingSimulator'
import { ImmunodiffusionSimulator } from '../components/ImmunodiffusionSimulator'
import { PresumptiveTestSimulator } from '../components/PresumptiveTestSimulator'
import { ChainOfCustodyGame } from '../components/ChainOfCustodyGame'
import { InferenceBuilderSimulator } from '../components/InferenceBuilderSimulator'
import { OutcomeIntakeSimulator } from '../components/OutcomeIntakeSimulator'
import { TimelineForgeSimulator } from '../components/TimelineForgeSimulator'
import { WitnessBoxSimulator } from '../components/WitnessBoxSimulator'
import { SceneExplorerSimulator } from '../components/SceneExplorerSimulator'
import { InfoBlock } from '../components/ui'
import { CaseStampBar } from '../components/forensic'
import { isSimulatorCompleted } from '../lib/progress'
import { useState } from 'react'

export default function SimulatorDetailPage() {
  const { simulatorId } = useParams<{ simulatorId: string }>()
  const sim = getAllSimulators().find((s) => s.path.endsWith('/' + simulatorId)) ?? getAllSimulators().find((s) => s.id === simulatorId)
  const [refresh, setRefresh] = useState(0)
  useSEO({
    title: sim ? `${sim.title} — Simulator` : 'Simulator not found',
    description: sim?.blurb,
    path: `/simulators/${simulatorId}`,
  })

  if (!sim) {
    return (
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-3">Simulator not found</h1>
        <Link to="/simulators" className="topic-link">← Back to all simulators</Link>
      </div>
    )
  }

  const done = isSimulatorCompleted(sim.id)
  const caseNo = 'FSL-SIM-2026-' + String(getAllSimulators().findIndex((x) => x.id === sim.id) + 1).padStart(3, '0')
  const markDone = () => {
    if (!done) setRefresh((r) => r + 1)
  }

  return (
    <div className="page-container max-w-4xl">
      <Link to="/simulators" className="topic-link text-sm">← All simulators</Link>
      <div className="mt-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Interactive simulation</span>
          {isSimulatorCompleted(sim.id) && (
            <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/40 rounded-full px-2 py-0.5">
              Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{sim.title}</h1>
        <CaseStampBar
          state={{ open: !done }}
          entries={[
            { label: 'Case no', value: caseNo, tone: sim.tone },
            { label: 'Exhibit', value: `EXH 0${getAllSimulators().findIndex((x) => x.id === sim.id) + 1}` },
            { label: 'Bench', value: 'Interactive simulator' },
            { label: 'Analyst', value: 'Self (learner)' },
            { label: 'Class', value: 'Educational exercise' },
          ]}
        />
      </div>

      <SimulatorShell title={sim.title} definition={sim.blurb} tone={sim.tone}>
        {sim.id === 'abo' && <ABOInheritanceSimulator />}
        {sim.id === 'bloodtyping' && <BloodTypingSimulator />}
        {sim.id === 'immunodiffusion' && <ImmunodiffusionSimulator />}
        {sim.id === 'presumptive' && <PresumptiveTestSimulator onDone={markDone} />}
        {sim.id === 'chain-of-custody' && <ChainOfCustodyGame onDone={markDone} />}
        {sim.id === 'project-inference' && <InferenceBuilderSimulator onDone={markDone} />}
        {sim.id === 'outcome-intake' && <OutcomeIntakeSimulator onDone={markDone} />}
        {sim.id === 'timelineforge' && <TimelineForgeSimulator onDone={markDone} />}
        {sim.id === 'witnessbox' && <WitnessBoxSimulator onDone={markDone} />}
        {sim.id === 'scene-explorer' && <SceneExplorerSimulator onDone={markDone} />}
      </SimulatorShell>

      <div className="mt-8">
        <InfoBlock title="Educational simulation" tone="amber">
          This simulator reproduces the conceptual logic of laboratory and legal practice for learning. It is not a
          real instrument and produces no real forensic result — it must never be used for actual casework.
        </InfoBlock>
      </div>
    </div>
  )
}