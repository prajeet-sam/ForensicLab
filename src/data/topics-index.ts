import topics from './topics'
import type { Topic, Category } from '../lib/types'

export { topics }

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id)
}

export function getTopicsByCategory(category: Category): Topic[] {
  return topics.filter((t) => t.category === category)
}

export function getTopicCategories(): Category[] {
  return Array.from(new Set(topics.map((t) => t.category))) as Category[]
}

export function categoryLabel(category: Category): string {
  const labels: Record<string, string> = {
    biology: 'Forensic Biology',
    chemistry: 'Forensic Chemistry',
    physics: 'Forensic Physics',
    other: 'Other Disciplines',
    principles: 'Principles & Foundations',
    laboratory: 'Laboratory & Evidence',
    document: 'Documents & Records',
  }
  return labels[category] ?? category
}

export function firstTopicByCategory(category: Category): Topic | undefined {
  return topics.find((t) => t.category === category)
}

export function allTopicIds(): string[] {
  return topics.map((t) => t.id)
}