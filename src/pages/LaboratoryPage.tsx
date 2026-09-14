import { useSEO } from '../lib/seo'
import { labModules, laboratoryEvidence } from '../data/lab'
import { PageHeader, ProgressBar, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'
import { LaboratoryWorkflow } from '../components/LaboratoryWorkflow'
import { ProcessTimeline } from '../components/display'
import type { LabEvidenceItem } from '../lib/types'

const statusTone: Record<LabEvidenceItem['status'], { text: string; dot: string }> = {
  Received: { text: 'text-gray-400 border-navy-500/50', dot: 'bg-gray-400' },
  'Under Examination': { text: 'text-amber-400 border-amber-500/40', dot: 'bg-amber-400' },
  'QC Review': { text: 'text-cyan-400 border-cyan-500/40', dot: 'bg-cyan-400' },
  Completed: { text: 'text-emerald-400 border-emerald-500/40', dot: 'bg-emerald-400' },
}

const CASE_PROGRESS = 42

export default function LaboratoryPage() {
  useSEO({
    title: 'Virtual Forensic Laboratory',
    description: 'Follow evidence through the forensic laboratory — reception, verification, examination, quality control, interpretation and reporting.',
  })

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Educational workflow"
        title="Virtual forensic laboratory"
        description="A simplified, educational view of how a real Forensic Science Laboratory (FSL) manages evidence from reception to reporting. Case IDs are fictional."
      />

      {/* Case header */}
      <div className="glass-panel p-5 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Fictional case · State Forensic Science Laboratory</p>
            <p className="font-mono text-cyan-400 font-bold text-lg">ICD/26/184 · FSL/26-184</p>
            <p className="text-sm text-gray-400 mt-1">Biological & trace evidence check · filed 12 Mar 2026</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Laboratory status</p>
            <p className="text-sm font-medium text-emerald-400 inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              In examination
            </p>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar value={CASE_PROGRESS} label="Case progress" tone="cyan" />
        </div>

        {/* Evidence register */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm border-collapse">
            <caption className="text-left text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              Evidence register
            </caption>
            <thead>
              <tr className="border-b border-navy-600/50">
                <th className="text-left py-2 pr-4 text-[10px] font-mono uppercase text-gray-500">Exhibit</th>
                <th className="text-left py-2 pr-4 text-[10px] font-mono uppercase text-gray-500">Description</th>
                <th className="text-left py-2 pr-4 text-[10px] font-mono uppercase text-gray-500">Category</th>
                <th className="text-left py-2 text-[10px] font-mono uppercase text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {laboratoryEvidence.map((ev) => (
                <tr key={ev.id} className="border-b border-navy-700/40">
                  <td className="py-2.5 pr-4 font-mono text-cyan-400">{ev.id}</td>
                  <td className="py-2.5 pr-4 text-gray-300">{ev.description}</td>
                  <td className="py-2.5 pr-4">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-navy-500/40 text-gray-400">
                      {ev.category}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full border ${statusTone[ev.status].text}`}>
                      <span className={`h-1 w-1 rounded-full ${statusTone[ev.status].dot}`} />
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workflow stages */}
      <section className="mb-10">
        <h2 className="text-xl font-bold tracking-tight mb-1">The workflow, on one screen</h2>
        <p className="text-gray-400 mb-5">
          Every exhibit moves through the same discipline. If you spot a broken stage in the story below, you spot an
          evidence-handling weakness.
        </p>
        <LaboratoryWorkflow />
      </section>

      {/* Module flows */}
      <section>
        <h2 className="text-xl font-bold tracking-tight mb-5">Examination modules</h2>
        <div className="grid lg:grid-cols-2 gap-4">
          {labModules.map((m) => (
            <div key={m.id} className="glass-panel p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-9 w-9 rounded-lg bg-cyan-600/10 flex items-center justify-center">
                  <Icon name="microscope" className="w-4.5 h-4.5 text-cyan-400" />
                </span>
                <div>
                  <h3 className="font-bold text-white">{m.title}</h3>
                  <p className="text-xs text-gray-400">{m.description}</p>
                </div>
              </div>
              <ProcessTimeline steps={m.steps} compact />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <InfoBlock title="Quality note" tone="cyan">
          Case IDs, exhibits and statuses here are fictional and simplified for teaching. A real lab adds audits,
          retesting on challenge, proficiency programs and documented validation to every step you can see.
        </InfoBlock>
      </div>
    </div>
  )
}