import { useMemo, useState } from 'react'
import { FlowBox } from './display'

export type Allele = 'IA' | 'IB' | 'i'
export type GenotypeKey = 'IAIA' | 'IAi' | 'IBIB' | 'IBi' | 'IAIB' | 'ii'
export type Phenotype = 'A' | 'B' | 'AB' | 'O'

export const genotypeOptions: { key: GenotypeKey; label: string; gametes: Allele[]; phenotype: Phenotype }[] = [
  { key: 'IAIA', label: 'IᴬIᴬ', gametes: ['IA', 'IA'], phenotype: 'A' },
  { key: 'IAi', label: 'Iᴬi', gametes: ['IA', 'i'], phenotype: 'A' },
  { key: 'IBIB', label: 'IᴮIᴮ', gametes: ['IB', 'IB'], phenotype: 'B' },
  { key: 'IBi', label: 'Iᴮi', gametes: ['IB', 'i'], phenotype: 'B' },
  { key: 'IAIB', label: 'IᴬIᴮ', gametes: ['IA', 'IB'], phenotype: 'AB' },
  { key: 'ii', label: 'ii', gametes: ['i', 'i'], phenotype: 'O' },
]

const phenotypes: Phenotype[] = ['A', 'B', 'AB', 'O']

function genotypeOf(key: GenotypeKey): Allele[] {
  const g = genotypeOptions.find((o) => o.key === key)!
  return g.gametes.map((allele) => allele) // returns [g1, g2]
}

function allelesForPhenotype(p: Phenotype): GenotypeKey[] {
  switch (p) {
    case 'A':
      return ['IAIA', 'IAi']
    case 'B':
      return ['IBIB', 'IBi']
    case 'AB':
      return ['IAIB']
    case 'O':
      return ['ii']
  }
}

function childGenotype(a: Allele, b: Allele): GenotypeKey {
  const pair = [a, b].sort() as Allele[]
  if (pair.includes('IA') && pair.includes('IB')) return 'IAIB'
  if (pair[0] === 'IA' && pair[1] === 'IA') return 'IAIA'
  if (pair[0] === 'i' && pair.includes('IA')) return 'IAi'
  if (pair[0] === 'IB' && pair[1] === 'IB') return 'IBIB'
  if (pair[0] === 'i' && pair.includes('IB')) return 'IBi'
  return 'ii'
}

function phenotypeOfGenotype(g: GenotypeKey): Phenotype {
  return genotypeOptions.find((o) => o.key === g)!.phenotype
}

const phenotypeStyles: Record<Phenotype, { text: string; bg: string }> = {
  A: { text: 'text-crimson-300', bg: 'bg-crimson-600/25' },
  B: { text: 'text-cyan-300', bg: 'bg-cyan-600/25' },
  AB: { text: 'text-amber-300', bg: 'bg-amber-500/25' },
  O: { text: 'text-gray-200', bg: 'bg-navy-700' },
}

function RbcAntigens(p: Phenotype) {
  return p === 'A' ? 'A' : p === 'B' ? 'B' : p === 'AB' ? 'A + B' : 'A — none (H only)'
}
function PlasmaAntibodies(p: Phenotype) {
  return p === 'A' ? 'anti-B' : p === 'B' ? 'anti-A' : p === 'AB' ? 'none' : 'anti-A + anti-B'
}

export function ABOInheritanceSimulator() {
  const [mode, setMode] = useState<'phenotype' | 'genotype'>('phenotype')
  const [motherP, setMotherP] = useState<Phenotype>('A')
  const [fatherP, setFatherP] = useState<Phenotype>('B')
  const [motherG, setMotherG] = useState<GenotypeKey>('IAi')
  const [fatherG, setFatherG] = useState<GenotypeKey>('IBi')

  const motherAlleles = useMemo(() => genotypeOf(motherG), [motherG])
  const fatherAlleles = useMemo(() => genotypeOf(fatherG), [fatherG])

  const grid = useMemo(() => {
    const cells: { g: GenotypeKey; p: Phenotype }[] = []
    for (const a of motherAlleles) {
      for (const b of fatherAlleles) {
        const g = childGenotype(a, b)
        cells.push({ g, p: phenotypeOfGenotype(g) })
      }
    }
    return cells
  }, [motherAlleles, fatherAlleles])

  const possibleFromPhenotype = useMemo(() => {
    const mgs = allelesForPhenotype(motherP)
    const fgs = allelesForPhenotype(fatherP)
    const phenotypes = new Set<Phenotype>()
    for (const mg of mgs) {
      for (const fg of fgs) {
        for (const a of genotypeOf(mg)) {
          for (const b of genotypeOf(fg)) {
            phenotypes.add(phenotypeOfGenotype(childGenotype(a, b)))
          }
        }
      }
    }
    return phenotypes
  }, [motherP, fatherP])

  const results = useMemo(() => {
    const count: Record<Phenotype, number> = { A: 0, B: 0, AB: 0, O: 0 }
    grid.forEach((c) => {
      count[c.p] += 1
    })
    return count
  }, [grid])

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Simulator mode">
        <button
          role="tab"
          aria-selected={mode === 'phenotype'}
          onClick={() => setMode('phenotype')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            mode === 'phenotype' ? 'bg-cyan-600 text-white border-cyan-500' : 'border-navy-600 text-gray-300 hover:bg-navy-800'
          }`}
        >
          Phenotype mode (A / B / AB / O)
        </button>
        <button
          role="tab"
          aria-selected={mode === 'genotype'}
          onClick={() => setMode('genotype')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            mode === 'genotype' ? 'bg-cyan-600 text-white border-cyan-500' : 'border-navy-600 text-gray-300 hover:bg-navy-800'
          }`}
        >
          Genotype mode (exact alleles)
        </button>
      </div>

      {/* Parent selection */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ParentPicker
          title="Mother"
          mother={true}
          mode={mode}
          phenotype={motherP}
          genotype={motherG}
          onPhenotype={setMotherP}
          onGenotype={setMotherG}
        />
        <ParentPicker
          title="Father"
          mother={false}
          mode={mode}
          phenotype={fatherP}
          genotype={fatherG}
          onPhenotype={setFatherP}
          onGenotype={setFatherG}
        />
      </div>

      {/* Results */}
      {mode === 'phenotype' ? (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-600/5 p-5">
          <h3 className="text-sm font-bold text-cyan-300 mb-1">Possible child blood groups</h3>
          <p className="text-xs text-gray-400 mb-4">
            With phenotypes alone, exact probabilities cannot be given — group A can be IᴬIᴬ or Iᴬi and group B can be
            IᴮIᴮ or Iᴮi. Switch to genotype mode for precise outcomes.
          </p>
          <div className="flex flex-wrap gap-2 animate-fade-in" key={`${motherP}-${fatherP}`}>
            {phenotypes.map((p) => (
              <div
                key={p}
                className={`rounded-lg border px-4 py-3 ${phenotypeStyles[p].bg} ${
                  possibleFromPhenotype.has(p) ? 'border-cyan-500/50' : 'border-navy-600/40 opacity-30'
                }`}
              >
                <p className={`text-xl font-bold ${phenotypeStyles[p].text}`}>Group {p}</p>
                <p className="text-[11px] text-gray-400 mt-1">
                  {RbcAntigens(p)} · {PlasmaAntibodies(p)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-1.5 text-xs">
            {phenotypes.filter((p) => possibleFromPhenotype.has(p)).map((p) => (
              <p key={p} className="text-gray-300">
                <span className={`font-mono font-bold ${phenotypeStyles[p].text}`}>{p}</span> — cells carry{' '}
                {RbcAntigens(p)}; plasma has {PlasmaAntibodies(p)}.
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-600/5 p-5">
          <h3 className="text-sm font-bold text-cyan-300 mb-1">Punnett-square outcome</h3>
          <p className="text-xs text-gray-400 mb-4">
            Mother’s gametes on the left, father’s across the top. Each inner cell is one equally likely zygote.
          </p>

          <div className="overflow-x-auto">
            <table className="border-collapse text-sm mx-auto min-w-[22rem]">
              <tbody>
                <tr>
                  <td className="p-2" />
                  {fatherAlleles.map((al) => (
                    <td key={al} className="p-1 text-center">
                      <ParentGamete allele={al} parent="father" />
                    </td>
                  ))}
                </tr>
                {motherAlleles.map((mal, mi) => (
                  <tr key={mal}>
                    <td className="p-1">
                      <ParentGamete allele={mal} parent="mother" />
                    </td>
                    {fatherAlleles.map((fal, fi) => {
                      const g = childGenotype(mal, fal)
                      const p = phenotypeOfGenotype(g)
                      const cellIdx = mi * fatherAlleles.length + fi
                      return (
                        <td key={`${mal}-${fal}`} className="p-1 text-center animate-fade-in" style={{ animationDelay: `${cellIdx * 0.15}s` }}>
                          <div className={`rounded-lg border px-3 py-2.5 ${phenotypeStyles[p].bg} ${
                            p === 'AB' ? 'border-amber-500/50' : p === 'A' ? 'border-crimson-500/40' : p === 'B' ? 'border-cyan-500/40' : 'border-navy-500/40'
                          }`}>
                            <p className={`font-bold ${phenotypeStyles[p].text}`}>{genotypeLabel(g)}</p>
                            <p className="text-[11px] text-gray-400">→ {p}</p>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {phenotypes.map((p) => {
              const n = results[p]
              const frac = { A: 4, B: 4, AB: 4, O: 4 }[p] || 4
              return (
                <div key={p} className={`rounded-lg px-3 py-2.5 border ${phenotypeStyles[p].bg} ${
                  p === 'AB' ? 'border-amber-500/40' : p === 'A' ? 'border-crimson-500/30' : p === 'B' ? 'border-cyan-500/30' : 'border-navy-500/40'
                }`}>
                  <p className={`text-lg font-extrabold ${phenotypeStyles[p].text}`}>Group {p}</p>
                  <p className="text-xs text-gray-400 font-mono">
                    {n}/{grid.length} cells{grid.length > 0 && n > 0 ? ` · ${Math.round((n / grid.length) * 100)}%` : ''}
                  </p>
                </div>
              )
            })}
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            In this example the grid is 2 × 2, so each cell equals 25%. Clear the common simplification: inheritance is
            per-conception — the percentages describe a distribution over many offspring, not a guarantee for any one child.
          </p>
        </div>
      )}

      {/* Antigens + antibodies summary */}
      <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 p-5">
        <h3 className="text-sm font-bold text-white mb-3">Selected cross — antigens & antibodies</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          <div className="rounded-lg bg-navy-800 border border-navy-600/40 p-3">
            <p className="text-xs font-mono uppercase tracking-wider text-crimson-400 mb-1">{mode === 'phenotype' ? `Mother · ${motherP}` : `Mother · ${genotypeLabel(motherG)}`}</p>
            <p className="text-xs text-gray-300">RBC: {RbcAntigens(motherP)}</p>
            <p className="text-xs text-gray-300">Plasma: {PlasmaAntibodies(motherP)}</p>
          </div>
          <div className="rounded-lg bg-navy-800 border border-navy-600/40 p-3">
            <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">{mode === 'phenotype' ? `Father · ${fatherP}` : `Father · ${genotypeLabel(fatherG)}`}</p>
            <p className="text-xs text-gray-300">RBC: {RbcAntigens(fatherP)}</p>
            <p className="text-xs text-gray-300">Plasma: {PlasmaAntibodies(fatherP)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ParentGamete({ allele, parent }: { allele: Allele; parent: 'mother' | 'father' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-mono font-bold ${
      allele === 'IA'
        ? 'border-crimson-500/50 text-crimson-300 bg-crimson-600/10'
        : allele === 'IB'
        ? 'border-cyan-500/50 text-cyan-300 bg-cyan-600/10'
        : 'border-navy-500/60 text-gray-300 bg-navy-800'
    }`}>
      {allele === 'IA' ? 'Iᴬ' : allele === 'IB' ? 'Iᴮ' : 'i'}
      <span className="text-[9px] text-gray-500 font-sans">{parent === 'mother' ? '· maternal' : '· paternal'}</span>
    </span>
  )
}

function genotypeLabel(g: GenotypeKey): string {
  return genotypeOptions.find((o) => o.key === g)!.label
}

function ParentPicker({
  title,
  mother,
  mode,
  phenotype,
  genotype,
  onPhenotype,
  onGenotype,
}: {
  title: string
  mother: boolean
  mode: 'phenotype' | 'genotype'
  phenotype: Phenotype
  genotype: GenotypeKey
  onPhenotype: (p: Phenotype) => void
  onGenotype: (g: GenotypeKey) => void
}) {
  const accent = mother ? 'crimson' : 'cyan'
  return (
    <div className={`rounded-xl border p-4 ${mother ? 'border-crimson-500/30 bg-crimson-600/5' : 'border-cyan-500/30 bg-cyan-600/5'}`}>
      <div className="flex items-center gap-2 mb-3">
        <FlowBox label={title} tone={mother ? 'crimson' : 'cyan'} />
        <span className="text-xs text-gray-500">
          {mode === 'phenotype' ? `phenotype ${phenotype}` : `genotype ${genotypeLabel(genotype)}`}
        </span>
      </div>
      {mode === 'phenotype' ? (
        <div className="flex flex-wrap gap-1.5">
          {phenotypes.map((p) => (
            <button
              key={p}
              onClick={() => onPhenotype(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                phenotype === p
                  ? mother
                    ? 'bg-crimson-600 text-white border-crimson-500'
                    : 'bg-cyan-600 text-white border-cyan-500'
                  : 'border-navy-600 text-gray-300 hover:bg-navy-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {genotypeOptions.map((g) => (
            <button
              key={g.key}
              onClick={() => onGenotype(g.key)}
              className={`px-2 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                genotype === g.key
                  ? mother
                    ? 'bg-crimson-600 text-white border-crimson-500'
                    : 'bg-cyan-600 text-white border-cyan-500'
                  : 'border-navy-600 text-gray-300 hover:bg-navy-800'
              }`}
            >
              {g.label}
              <span className="ml-1 text-[9px] text-gray-400 font-sans">→ {g.phenotype}</span>
            </button>
          ))}
        </div>
      )}
      <p className="text-[11px] text-gray-500 mt-3">
        {mode === 'phenotype'
          ? 'Phenotype only sets the antigen type — the genotype behind it is unknown.'
          : 'Exact gametes are known here, so zygote outcomes are exact.'}
      </p>
    </div>
  )
}