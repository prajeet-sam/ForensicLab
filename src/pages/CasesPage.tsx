import { useSEO } from '../lib/seo'
import { cases } from '../data/cases'
import { PageHeader, InfoBlock } from '../components/ui'
import { CaseCard } from '../components/display'
import { getProgress } from '../lib/progress'

export default function CasesPage() {
  useSEO({
    title: 'Case Files',
    description: 'Fictional forensic case files that teach evidence interpretation — decide, justify, and see what the science supports.',
  })
  const progress = getProgress()

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Investigations"
        title="Case files"
        description="Fictional cases built to teach interpretation. Work through decisions one at a time; assess your conclusion against what the evidence actually supports."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {cases.map((c) => (
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

      <InfoBlock title="About these cases" tone="amber">
        All names, locations, exhibits and case IDs are fictional. The purpose is to practice a habit: reach only
        conclusions the evidence supports, say exactly how strong they are, and stop there. No case file replaces
        legal, medical or investigative advice.
      </InfoBlock>
    </div>
  )
}