export interface SearchIndexItem {
  id: string
  title: string
  description: string
  kind: 'topic' | 'discipline' | 'principle' | 'glossary' | 'case' | 'simulator' | 'module' | 'page'
  url: string
  _hay?: string
}

export function buildSearchIndex(items: SearchIndexItem[]): () => SearchIndexItem[] {
  const normalized = items.map((item) => ({
    ...item,
    _hay: `${item.title} ${item.description}`.toLowerCase(),
  }))
  return () => normalized
}

export function runSearch(index: SearchIndexItem[], query: string): SearchIndexItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const scored = index
    .map((item) => {
      const hay = item._hay ?? `${item.title} ${item.description}`.toLowerCase()
      let score = 0
      if (item.title.toLowerCase() === q) score += 100
      if (item.title.toLowerCase().startsWith(q)) score += 60
      if (item.title.toLowerCase().includes(q)) score += 30
      if (hay.includes(q)) score += 10
      // boost title token matches
      const tokens = q.split(/\s+/)
      for (const t of tokens) {
        if (item.title.toLowerCase().includes(t)) score += 5
      }
      return { item, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.map((x) => x.item)
}