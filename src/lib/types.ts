export type Category =
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'other'
  | 'principles'
  | 'laboratory'
  | 'document'

export interface ProcessStep {
  title: string
  description: string
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'tf' | 'matching'
  scenario?: string
  question: string
  options?: string[]
  pairs?: { left: string; right: string }[]
  answer: string | string[]
  explanation: string
}

export interface Topic {
  id: string
  title: string
  shortTitle?: string
  category: Category
  discipline: string
  definition: string
  simpleExplanation: string
  corePrinciple?: string
  whyItMatters: string
  process?: ProcessStep[]
  applications?: string[]
  limitations?: string[]
  example?: string
  relatedTopics?: string[]
  simulator?: string
  quiz?: QuizQuestion[]
  path?: string
  icon?: string
  color?: 'crimson' | 'cyan' | 'amber' | 'slate'
}

export interface Discipline {
  id: string
  name: string
  group: string
  icon: string
  blurb: string
  studies: string[]
  evidenceExamples: string[]
  methods: string[]
  applications: string[]
  limitations: string[]
  relatedTopics: string[]
}

export interface Principle {
  id: string
  title: string
  definition: string
  metaphor: string
  example: string
  application: string
  limitation: string
  visual?: 'locard' | 'individuality' | 'progressive' | 'comparison' | 'analysis' | 'probability' | 'circumstantial'
}

export interface GlossaryTerm {
  term: string
  definition: string
  simpleExplanation: string
  scientificDetail: string
  relatedTopics: string[]
}

export interface CaseDecision {
  id: string
  kind: 'choice' | 'free-text'
  question: string
  options?: string[]
  textPlaceholder?: string
  hint: string
}

export interface CaseFile {
  id: string
  slug: string
  title: string
  subtitle: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tag: string
  summary: string
  brief: string
  scenario: string[]
  evidence: { id: string; description: string; type: string }[]
  decisions: CaseDecision[]
  expectedConcepts: string[]
  interpretationNote: string
  assessmentGuidance: {
    label: string
    tone: string
    description: string
  }[]
  learningObjectives: string[]
  keyScience: { title: string; body: string }[]
  agency?: string
  date?: string
  caseRef?: string
}

export interface LabEvidenceItem {
  id: string
  description: string
  category: string
  status: 'Received' | 'Under Examination' | 'QC Review' | 'Completed'
}

export interface LabModule {
  id: string
  title: string
  description: string
  steps: ProcessStep[]
}

export interface LabWorkflowItem {
  id: string
  title: string
  purpose: string
  risks: string[]
  documentation: string[]
  science: string
}

export interface ProgressState {
  completedTopics: string[]
  quizScores: Record<string, { total: number; correct: number }>
  completedSimulators: string[]
  caseProgress: Record<string, { decisionsDone: number; submitted: boolean }>
}