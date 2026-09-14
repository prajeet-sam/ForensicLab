const MATCH_WEIGHTS = {
  exact: 100,
  prefix: 60,
  subtitle: 30,
  body: 10,
  token: 5,
} as const

export interface SearchIndexItem {
  id: string
  title: string
  description: string
  kind: 'topic' | 'discipline' | 'principle' | 'glossary' | 'case' | 'simulator' | 'module' | 'page'
  url: string
  searchableText?: string
}

export function buildSearchIndex(items: SearchIndexItem[]): () => SearchIndexItem[] {
  const normalized = items.map((item) => ({
    ...item,
    searchableText: `${item.title} ${item.description}`.toLowerCase(),
  }))
  return () => normalized
}

export function runSearch(index: SearchIndexItem[], query: string): SearchIndexItem[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  const scored = index
    .map((item) => {
      const hay = item.searchableText ?? `${item.title} ${item.description}`.toLowerCase()
      let score = 0
      if (item.title.toLowerCase() === needle) score += MATCH_WEIGHTS.exact
      if (item.title.toLowerCase().startsWith(needle)) score += MATCH_WEIGHTS.prefix
      if (item.title.toLowerCase().includes(needle)) score += MATCH_WEIGHTS.subtitle
      if (hay.includes(needle)) score += MATCH_WEIGHTS.body
      // boost title token matches
      const tokens = needle.split(/\s+/)
      for (const t of tokens) {
        if (item.title.toLowerCase().includes(t)) score += MATCH_WEIGHTS.token
      }
      return { item, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.map((x) => x.item)
}