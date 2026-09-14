import { Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { PageHeader, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'

const corrections = [
  {
    title: 'Serum is not plasma',
    body: 'Plasma is blood without the cells but with clotting factors. Serum is plasma from which the clotting factors have been removed after clotting. The two are not interchangeable — the notes say serum, the plates say plasma. This platform stays precise.',
  },
  {
    title: 'ABO antigens are carbohydrates',
    body: 'A and B antigens are glycan structures on the red cell surface, not proteins. Getting the chemistry right matters when teaching the basis of the grouping reaction.',
  },
  {
    title: 'Luminol is presumptive',
    body: 'A blue glow indicates "possible blood" through heme’s peroxidase-like chemistry. It is never, by itself, proof of blood — let alone of a crime.',
  },
  {
    title: 'Kastle-Meyer is presumptive',
    body: 'The pink colour comes from phenolphthalein oxidation catalysed by heme in the presence of hydrogen peroxide. Some plant peroxidases give the same colour, so a positive result cannot stand alone.',
  },
  {
    title: 'Agglutination ≠ precipitation',
    body: 'Agglutination clumps particulate antigens (red cells); precipitation insolubilises soluble antigen-antibody complexes in a gel. Different phenomena, different endpoints, different tests.',
  },
  {
    title: 'ABO does not individualize',
    body: 'Groups are shared by whole populations. ABO may exclude or support inclusion — it cannot name a single donor the way STR profiling can approach.',
  },
  {
    title: 'Locard is not a guarantee',
    body: 'Transfer is expected, but many contacts leave no detectable trace, and many traces die by the time they are collected. And a trace found does not identify the activity that placed it.',
  },
  {
    title: 'Calibration = measurement against standards',
    body: 'Calibration compares instrument readings with known reference standards. It is not "chronological analysis." Every validated laboratory result stands on it.',
  },
  {
    title: 'Uncertainty is part of the result',
    body: 'Forensic conclusions must state their limitations. Overstatement is the single most damaging habit in forensic practice — this platform is built to avoid it.',
  },
]

const corrections2 = [
  {
    title: 'Analyse before interpret',
    body: 'Establish what the item is, then decide what that means. The two steps are logged separately and kept apart.',
  },
  {
    title: 'Confirm before conclude',
    body: 'Screening finds; confirmation establishes; individualization (when possible) narrows further. Skipping a tier overstates a result.',
  },
  {
    title: 'Match is not a verdict',
    body: 'A source-level match supports a source question. Activity questions — who did what — need separate, careful reasoning that no single test answers.',
  },
  {
    title: 'Context counts',
    body: 'A stain, a fiber, a phone record — each contributes. Their combined probative value depends on context, and context is always stated in the report.',
  },
]

export default function AboutPage() {
  useSEO({
    title: 'About & Methodology',
    description: 'How this platform teaches forensic science — its scientific corrections, pedagogical method and responsible-evidence principles.',
  })

  return (
    <div className="page-container max-w-4xl">
      <PageHeader
        eyebrow="Methodology"
        title="About this platform"
        description="ForensicLab turns classroom notes into interactive learning. This page explains how the content was built — and the scientific corrections built into it."
      />

      <section className="mb-12">
        <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Icon name="principles" className="w-4 h-4 text-cyan-400" /> Pedagogical method
        </h2>
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {[
            { t: 'Learn', d: 'Every topic: definition → why it matters → core principle → visual → process → example → limits → check.' },
            { t: 'Simulate', d: 'Real logic reproduced visually — agglutination, diffusion, screening chemistry — with the honest limits kept in view.' },
            { t: 'Investigate', d: 'Evidence workflows and chain-of-custody games train the discipline of documentation.' },
            { t: 'Interpret', d: 'Case files score your conclusions against what the evidence can actually support.' },
          ].map((m) => (
            <div key={m.t} className="glass-panel p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-1.5">{m.t}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
        <InfoBlock title="No CSI magic" tone="amber">
          Real forensic science is slower, far less dramatic, and much more honest than television. This platform
          deliberately teaches its limitations — presumptive ≠ proof, match ≠ verdict, and correlation ≠ causation.
        </InfoBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold tracking-tight mb-2">Scientific corrections incorporated</h2>
        <p className="text-gray-400 mb-5 text-sm">
          The original classroom notes contained several common inaccuracies. Where the science says otherwise, this
          platform follows the science:
        </p>
        <div className="space-y-3">
          {corrections.map((c) => (
            <div key={c.title} className="glass-panel p-5">
              <h3 className="font-bold text-white mb-1.5 flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-emerald-400 shrink-0" />
                {c.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold tracking-tight mb-4">The standards we hold</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {corrections2.map((c) => (
            <div key={c.title} className="glass-panel p-5">
              <h3 className="font-bold text-white mb-1.5">{c.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold tracking-tight mb-4">Structure & content source</h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <Icon name="check" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Foundation: principles, evidence life-cycle, chain of custody, quality and NABL, FSL workflow.
          </li>
          <li className="flex items-start gap-2">
            <Icon name="check" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Biology: blood, ABO grouping, antigens/antibodies, agglutination, precipitation, immunodiffusion, presumptive testing, DNA profiling, central dogma.
          </li>
          <li className="flex items-start gap-2">
            <Icon name="check" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Chemistry & physics: toxicology, narcotics, explosives, glass, paint, soil, toolmarks, audio-video.
          </li>
          <li className="flex items-start gap-2">
            <Icon name="check" className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Other disciplines: ballistics, digital forensics, fingerprints, questioned documents, photography, anthropology, odontology.
          </li>
        </ul>
        <p className="text-xs text-gray-500 mt-4">
          The structured content file it is based on is the primary source. Where the file was unavailable, the topic
          model above and standard, publicly available forensic-science teaching material were used — no unsupported
          course-specific claims were invented.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to="/learn/introduction" className="btn-primary">
          Start learning
          <Icon name="arrow-right" className="w-4 h-4" />
        </Link>
        <Link to="/principles" className="btn-secondary">
          Read the principles
        </Link>
      </div>
    </div>
  )
}