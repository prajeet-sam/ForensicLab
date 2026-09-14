import { Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { getAllSimulators } from '../data/simulators'
import { PageHeader, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'
import { isSimulatorCompleted } from '../lib/progress'

export default function SimulatorsPage() {
  useSEO({
    title: 'Interactive Simulators',
    description: 'Interactive forensic science simulators — ABO inheritance, antigen-antibody typing, immunodiffusion, presumptive blood tests and chain of custody.',
  })

  const sims = getAllSimulators()

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Laboratory bench"
        title="Interactive simulators"
        description="Don't just read the science — run it. Every simulator is built to teach a concept, and each ends with the honest limits of what the real test can conclude. Two of them go further: drafting an inference to stand, and filing the finished outcome as evidence."
      />

      <div className="space-y-8 mb-10">
        {sims.map((s, i) => {
          const done = isSimulatorCompleted(s.id)
          const flagged = s.id === 'chain-of-custody'
          const chip = s.tone === 'crimson' ? 'bg-crimson-600/15 text-crimson-400' : s.tone === 'amber' ? 'bg-amber-500/10 text-amber-300' : 'bg-cyan-600/15 text-cyan-400'
          const iconName =
            s.id === 'abo' ? 'abo'
            : s.id === 'bloodtyping' ? 'lattice'
            : s.id === 'immunodiffusion' ? 'gel'
            : s.id === 'presumptive' ? 'testtube'
            : s.id === 'chain-of-custody' ? 'chain'
            : s.id === 'project-inference' ? 'scale'
            : s.id === 'timelineforge' ? 'clock'
            : s.id === 'witnessbox' ? 'court'
            : s.id === 'scene-explorer' ? 'camera'
            : 'court'
          return (
            <section key={s.id} className={`glass-panel p-5 sm:p-6 hover:border-cyan-500/40 transition-all duration-200 ${flagged ? 'border-amber-500/30' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${chip}`}>
                  <Icon name={iconName as never} className={`w-6 h-6 ${s.tone === 'crimson' ? 'text-crimson-400' : s.tone === 'amber' ? 'text-amber-300' : 'text-cyan-400'}`} />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-white">{s.title}</h2>
                    {done && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 border border-emerald-500/40 rounded-full px-2 py-0.5">
                        <Icon name="check" className="w-3 h-3" /> completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed max-w-2xl">{s.blurb}</p>
                </div>
                <Link to={s.path} className="btn-primary shrink-0 !px-5 !py-2.5 !text-sm">
                  Launch
                  <Icon name="arrow-right" className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )
        })}
      </div>

      <InfoBlock title="A note on simulation" tone="amber">
        These simulators are educational. They reproduce the <i>logic</i> and the <i>visual logic</i> of real
        laboratory tests so you understand the concepts — they are not instruments, and nothing a simulator shows
        should be treated as a real forensic result.
      </InfoBlock>
    </div>
  )
}