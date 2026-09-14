import { Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { principles, fundamentalForensicPrinciples } from '../data/principles'
import { PageHeader, DefinitionStrip, InfoBlock } from '../components/ui'
import { Icon } from '../components/Icon'
import { PrincipleCard, ScientificDiagram, FlowBox, FlowArrow, HorizontalFlow } from '../components/display'

const principleVisuals: Record<string, { title: string; body: string }[]> = {
  locard: [
    { title: 'Person ↔ Environment', body: 'A person leaves material at the scene; the scene deposits material on the person. It goes both ways.' },
    { title: 'Possible transfer', body: 'Hairs, fibers, soil, glass, biological fluids — any of these can move.' },
  ],
  individuality: [
    { title: 'Source level vs class level', body: 'A shared class characteristic narrows the field. A unique detail narrows it to one — but only with strong evidence.' },
  ],
  progressive: [
    { title: 'Change is constant', body: 'Blood dries, DNA degrades, electronic files overwrite. Interpret the evidence as it is now — not as it was.' },
  ],
  comparison: [
    { title: 'Questioned ↔ Known', body: 'Two items compared side by side — same conditions, same instruments. The principle asks: could they share a source?' },
  ],
}

export default function PrinciplesPage() {
  useSEO({
    title: 'Scientific Principles',
    description: 'The foundational ideas behind forensic science — Locard, comparison, probability and the limits of evidence.',
  })

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Foundations"
        title="Scientific principles"
        description="Every forensic finding stands on these ideas. Understanding them is the first defence against overstated conclusions."
      />

      {/* The 7 key principles */}
      <section className="mb-14 space-y-4">
        {principles.map((p) => (
          <PrincipleCard key={p.id} id={p.id} title={p.title} definition={p.definition}>
            {p.id === 'locard' ? (
              <div className="mt-2 space-y-3">
                <ScientificDiagram title="The exchange" tone="amber">
                  <div className="flex items-center justify-center gap-4">
                    <FlowBox label="Person" tone="cyan" />
                    <FlowArrow />
                    <FlowBox label="Trace exchange" tone="amber" />
                    <FlowArrow />
                    <FlowBox label="Scene / Object" tone="crimson" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    The transfer is two-way, but presence of a trace never automatically proves who was there or when.
                  </p>
                </ScientificDiagram>
              </div>
            ) : (
              <div className="space-y-2">
                {p.metaphor && (
                  <InfoBlock title="Visual metaphor" tone="slate">
                    {p.metaphor}
                  </InfoBlock>
                )}
                <p className="text-sm text-gray-300 leading-relaxed mt-1">
                  <span className="text-gray-500 font-mono text-xs mr-1">EXAMPLE:</span>
                  {p.example}
                </p>
                <p className="text-sm text-amber-300/90 leading-relaxed border-l-2 border-amber-500/50 pl-3">
                  <span className="font-semibold">Limitation: </span>
                  {p.limitation}
                </p>
              </div>
            )}
          </PrincipleCard>
        ))}
      </section>

      {/* Additional fundamental principles */}
      <section className="mb-14">
        <h2 className="section-heading">More fundamental principles</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {fundamentalForensicPrinciples.map((p) => (
            <div key={p.title} className="glass-panel p-5">
              <h3 className="font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="max-w-3xl">
        <h2 className="section-heading">Putting it together</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Evidence transfers. Evidence changes. The analyst compares. Statistics express strength. And every conclusion is
          bound by the honest statement of what the science can — and cannot — show.
        </p>
        <InfoBlock title="The scientific habit" tone="amber">
          State what the evidence supports. Stop where it stops. Never assert more than the data warrant.
        </InfoBlock>
      </section>
    </div>
  )
}