import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useSEO } from '../lib/seo'
import { EvidenceJourney, JourneyLegend } from '../components/EvidenceJourney'
import { TopicCard, DisciplineCard, CaseCard } from '../components/display'
import { topics, getTopicsByCategory } from '../data/topics-index'
import { disciplines } from '../data/disciplines'
import { principles } from '../data/principles'
import { cases } from '../data/cases'
import { getProgress, getCompletionPercent } from '../lib/progress'
import type { Category } from '../lib/types'

const learnCategories: { category: Category; title: string; blurb: string; icon: string }[] = [
  { category: 'biology', title: 'Forensic Biology', blurb: 'Blood, serology, DNA and human remains.', icon: 'blood' },
  { category: 'chemistry', title: 'Forensic Chemistry', blurb: 'Drugs, toxins, explosives and trace chemicals.', icon: 'chemistry' },
  { category: 'physics', title: 'Forensic Physics', blurb: 'Glass, paint, soil, toolmarks and media.', icon: 'glass' },
  { category: 'other', title: 'Other Disciplines', blurb: 'Ballistics, digital, fingerprints, documents.', icon: 'fingerprint' },
]

const principlesPreview = principles.slice(0, 3)

export default function HomePage() {
  useSEO({
    title: 'Forensic Science: From Crime Scene to Courtroom',
    description:
      'Explore how science transforms evidence into interpretable findings — from blood and DNA to fingerprints, toxicology, digital evidence and trace materials.',
  })

  const allTopics = topics
  const progress = getProgress()
  const per = getCompletionPercent(allTopics.map((t) => t.id))
  const biology = getTopicsByCategory('biology').slice(0, 4)
  const packed = allTopics.filter((t) => t.simulator).slice(0, 2)

  return (
    <div>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden border-b border-navy-700/50">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(236,72,153,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-crimson-600/10 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14 sm:pt-20 sm:pb-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-600/10 border border-cyan-500/30 rounded-full px-3 py-1.5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              Interactive forensic-science learning
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
              Forensic Science:{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                From Crime Scene
              </span>{" "}
              to Courtroom
            </h1>
            <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-2xl text-balance">
              Explore how science transforms evidence into interpretable findings — from blood and DNA to
              fingerprints, toxicology, digital evidence and trace materials.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/learn/introduction" className="btn-primary">
                Start Learning
                <Icon name="arrow-right" className="w-4 h-4" />
              </Link>
              <Link to="/cases" className="btn-secondary">
                <Icon name="case" className="w-4 h-4" />
                Explore Case Files
              </Link>
            </div>
            {per > 0 && (
              <p className="mt-6 text-xs text-gray-400 font-mono">
                {progress.completedTopics.length} topics completed · {per}% of the learning path
              </p>
            )}
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-mono uppercase tracking-widest text-gray-400">
                The evidence journey
              </h2>
              <JourneyLegend />
            </div>
            <div className="glass-panel p-4 sm:p-5 overflow-hidden">
              <EvidenceJourney />
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              A finding is only as strong as its weakest stage — every transfer, seal and record matters.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── DISCIPLINES ───────────────────────── */}
      <section className="page-container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="section-heading !mb-1">Explore forensic disciplines</h2>
            <p className="text-gray-400 max-w-2xl">
              Where does each discipline sit, what evidence does it study, and what can it actually conclude?
            </p>
          </div>
          <Link to="/explore" className="btn-ghost !px-3 !py-1.5 text-sm text-cyan-400">
            Full map →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {learnCategories.map((c) => {
            const first = getTopicsByCategory(c.category)[0]
            const count = getTopicsByCategory(c.category).length
            return (
              <Link
                key={c.category}
                to={`/explore#${c.category}`}
                className="glass-panel p-4 hover:border-cyan-500/40 transition-all duration-200 group"
              >
                <span className="h-10 w-10 rounded-lg bg-cyan-600/10 flex items-center justify-center mb-3">
                  <Icon name={c.icon as never} className="w-5 h-5 text-cyan-400" />
                </span>
                <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors">{c.title}</h3>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">{c.blurb}</p>
                <p className="text-[11px] font-mono text-gray-500 mt-3">{count} modules{first ? ` · starts with ${first.shortTitle ?? first.title}` : ''}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ───────────────────────── SIMULATIONS ───────────────────────── */}
      <section className="border-y border-navy-700/50 bg-navy-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Learn through simulations</h2>
              <p className="text-gray-400 max-w-2xl">
                Watch the science happen: blood grouping, immunodiffusion and presumptive testing — with honest
                interpretation built in.
              </p>
            </div>
            <Link to="/simulators" className="btn-ghost !px-3 !py-1.5 text-sm text-cyan-400">
              All simulators →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { to: '/simulators/abo', icon: 'abo' as const, title: 'ABO Inheritance', desc: 'Predict child blood groups from parents — phenotype & genotype modes.' },
              { to: '/simulators/blood-typing', icon: 'lattice' as const, title: 'Antigen–Antibody', desc: 'Add anti-A and anti-B to each blood type and watch agglutination.' },
              { to: '/simulators/immunodiffusion', icon: 'gel' as const, title: 'Immunodiffusion', desc: 'Animate two fronts meeting and forming a precipitin line.' },
              { to: '/simulators/presumptive-tests', icon: 'testtube' as const, title: 'Presumptive Tests', desc: 'Luminol and Kastle-Meyer — what a screen can and cannot say.' },
              { to: '/simulators/chain-of-custody', icon: 'chain' as const, title: 'Chain of Custody', desc: 'Move evidence through every custody point and document the history.' },
              { to: '/simulators/project-inference', icon: 'scale' as const, title: 'Inference Builder', desc: 'Draft a forensic claim and watch two reviewers test its limits.' },
              { to: '/simulators/outcome-intake', icon: 'court' as const, title: 'Outcome as Evidence', desc: 'Take a finished analysis through the evidential intake workflow.' },
              { to: '/simulators/timelineforge', icon: 'clock' as const, title: 'Timeline Forge', desc: 'Reconstruct a night from three drifting device clocks before the court reads it.' },
              { to: '/simulators/witness-box', icon: 'court' as const, title: 'The Witness Box', desc: 'Survive cross-examination by calibrating exactly what the science can say.' },
              { to: '/simulators/scene-explorer', icon: 'camera' as const, title: 'Scene Explorer', desc: 'Survey a secured scene, then make the recovery calls that hold in court.' },
            ].map((s) => (
              <Link key={s.to} to={s.to} className="glass-panel p-4 hover:border-cyan-500/40 hover:bg-navy-800/80 transition-all duration-200 group">
                <span className="h-10 w-10 rounded-lg bg-crimson-600/15 flex items-center justify-center mb-3 group-hover:bg-crimson-600/25 transition-colors">
                  <Icon name={s.icon} className="w-5 h-5 text-crimson-400" />
                </span>
                <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors">{s.title}</h3>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── LAB / CASES ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6 hover:border-cyan-500/40 transition-all duration-200">
            <span className="h-11 w-11 rounded-lg bg-cyan-600/15 flex items-center justify-center mb-4">
              <Icon name="lab" className="w-5 h-5 text-cyan-400" />
            </span>
            <h2 className="text-xl font-bold tracking-tight mb-1">Follow evidence through the laboratory</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              Reception → verification → examination → quality control → interpretation → report. Step inside a
              working (educational) forensic workflow.
            </p>
            <Link to="/laboratory" className="topic-link text-sm">
              Enter the virtual laboratory →
            </Link>
          </div>
          <div className="glass-panel p-6 hover:border-crimson-500/40 transition-all duration-200">
            <span className="h-11 w-11 rounded-lg bg-crimson-600/15 flex items-center justify-center mb-4">
              <Icon name="case" className="w-5 h-5 text-crimson-400" />
            </span>
            <h2 className="text-xl font-bold tracking-tight mb-1">Solve case files</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Work the fictional “Red Stain” case decision by decision. Every choice is graded by what the evidence
              actually supports. No CSI magic — real reasoning.
            </p>
            <Link to="/cases/red-stain" className="text-crimson-400 hover:text-crimson-300 font-medium text-sm underline underline-offset-2">
              Open “The Red Stain” →
            </Link>
          </div>
          <div className="glass-panel p-6 hover:border-cyan-500/40 transition-all duration-200">
            <span className="h-11 w-11 rounded-lg bg-cyan-600/15 flex items-center justify-center mb-4">
              <Icon name="document" className="w-5 h-5 text-cyan-400" />
            </span>
            <h2 className="text-xl font-bold tracking-tight mb-1">Read the module library</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              Full lecture notes for all foundational modules — crime scene investigation, biological and
              non-biological evidence, and forensic serology, restructured for the screen.
            </p>
            <Link to="/modules" className="topic-link text-sm">
              Open the module library →
            </Link>
          </div>
          <div className="glass-panel p-6 hover:border-emerald-500/40 transition-all duration-200">
            <span className="h-11 w-11 rounded-lg bg-emerald-600/15 flex items-center justify-center mb-4">
              <Icon name="check" className="w-5 h-5 text-emerald-400" />
            </span>
            <h2 className="text-xl font-bold tracking-tight mb-1">Get exam ready</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              Timed mock exams, a weak-areas performance dashboard and quick-revision cheat sheets for every syllabus
              area — built from the same question bank as your quizzes.
            </p>
            <Link to="/exam" className="topic-link text-sm">
              Open the exam center →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── PRINCIPLES ───────────────────────── */}
      <section className="border-y border-navy-700/50 bg-navy-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Scientific principles</h2>
              <p className="text-gray-400 max-w-2xl">
                The rules of the game: why forensic conclusions must state uncertainty, and why transfer never
                equals guilt.
              </p>
            </div>
            <Link to="/principles" className="btn-ghost !px-3 !py-1.5 text-sm text-cyan-400">
              All principles →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {principlesPreview.map((p, i) => (
              <Link key={p.id} to={`/principles#${p.id}`} className="glass-panel p-5 hover:border-amber-500/40 transition-all duration-200 group">
                <p className="text-[10px] font-mono text-amber-400/80 mb-2">PRINCIPLE {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors">{p.title}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed line-clamp-3">{p.definition}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── POPULAR MODULES ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="section-heading !mb-1">Popular learning modules</h2>
            <p className="text-gray-400">The core path for a beginner: start at Introduction, then follow the biology sequence.</p>
          </div>
          <Link to="/learn" className="btn-ghost !px-3 !py-1.5 text-sm text-cyan-400">
            Browse all topics →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {getTopicsByCategory('biology').slice(0, 6).map((t) => (
            <TopicCard
              key={t.id}
              id={t.id}
              title={t.title}
              definition={t.definition}
              category={t.discipline}
              icon={t.icon}
              tone={t.color as never}
              completed={progress.completedTopics.includes(t.id)}
            />
          ))}
        </div>
      </section>

      {/* ───────────────────────── FEATURED CASE ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="section-heading">Featured case file</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {cases.slice(0, 3).map((c) => (
            <CaseCard
              key={c.slug}
              slug={c.slug}
              title={c.title}
              subtitle={c.subtitle}
              difficulty={c.difficulty}
              tag={c.tag}
              summary={c.summary}
              progress={progress.caseProgress[c.id]}
            />
          ))}
        </div>
      </section>

      {/* ───────────────────────── FINAL CTA ───────────────────────── */}
      <section className="border-t border-navy-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Turn text into understanding.</h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Start with one topic, run one simulator, solve one case. The glossary is a tap away whenever a term
            gets fuzzy.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/learn/introduction" className="btn-primary">
              Start Learning
            </Link>
            <Link to="/glossary" className="btn-secondary">
              <Icon name="glossary" className="w-4 h-4" />
              Search the Glossary
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}