import type { ProgressState } from './types'

const KEY = 'forensic-learning-progress-v1'

const EMPTY: ProgressState = {
  completedTopics: [],
  quizScores: {},
  completedSimulators: [],
  caseProgress: {},
}

function read(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw) as ProgressState
    return {
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
      completedSimulators: Array.isArray(parsed.completedSimulators) ? parsed.completedSimulators : [],
      caseProgress: parsed.caseProgress && typeof parsed.caseProgress === 'object' ? parsed.caseProgress : {},
    }
  } catch {
    return { ...EMPTY }
  }
}

function write(state: ProgressState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // storage unavailable - non-critical for the app
  }
}

export function getProgress(): ProgressState {
  return read()
}

export function isTopicCompleted(id: string): boolean {
  return read().completedTopics.includes(id)
}

export function completeTopic(id: string): ProgressState {
  const state = read()
  if (!state.completedTopics.includes(id)) {
    state.completedTopics.push(id)
    write(state)
  }
  return state
}

export function recordQuizScore(quizId: string, total: number, correct: number): ProgressState {
  const state = read()
  state.quizScores[quizId] = { total, correct }
  write(state)
  return state
}

export function getQuizScore(quizId: string): { total: number; correct: number } | null {
  return read().quizScores[quizId] ?? null
}

export function completeSimulator(id: string): ProgressState {
  const state = read()
  if (!state.completedSimulators.includes(id)) {
    state.completedSimulators.push(id)
    write(state)
  }
  return state
}

export function isSimulatorCompleted(id: string): boolean {
  return read().completedSimulators.includes(id)
}

export function recordCaseDecision(caseId: string, decisionsDone: number, submitted: boolean): ProgressState {
  const state = read()
  state.caseProgress[caseId] = { decisionsDone, submitted }
  write(state)
  return state
}

export function getCaseProgress(caseId: string): { decisionsDone: number; submitted: boolean } | null {
  return read().caseProgress[caseId] ?? null
}

export function getCompletionPercent(topics: string[]): number {
  if (topics.length === 0) return 0
  const state = read()
  const done = topics.filter((t) => state.completedTopics.includes(t)).length
  return Math.round((done / topics.length) * 100)
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}