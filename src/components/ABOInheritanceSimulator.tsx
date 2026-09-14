import { useMemo, useState } from 'react'
import { FlowBox } from './display'

// ABO inheritance simulator — predicts a child's blood group from the parents.
// Phenotype mode lists the possible child groups; genotype mode renders a
// Punnett square of exactly equal zygote outcomes.

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

function gametesOf(genotype: GenotypeKey): Allele[] {
  return genotypeOptions.find((o) => o.key === genotype)!.gametes
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

function childGenotype(alleleA: Allele, alleleB: Allele): GenotypeKey {
  const pair = [alleleA, alleleB].sort() as Allele[]
  if (pair.includes('IA') && pair.includes('IB')) return 'IAIB'
  if (pair[0] === 'IA' && pair[1] === 'IA') return 'IAIA'
  if (pair[0] === 'i' && pair.includes('IA')) return 'IAi'
  if (pair[0] === 'IB' && pair[1] === 'IB') return 'IBIB'
  if (pair[0] === 'i' && pair.includes('IB')) return 'IBi'
  return 'ii'
}

function phenotypeOfGenotype(genotype: GenotypeKey): Phenotype {
  return genotypeOptions.find((o) => o.key === genotype)!.phenotype
}

const phenotypeTone: Record<Phenotype, { text: string; bg: string }> = {
  A: { text: 'text-crimson-300', bg: 'bg-crimson-600/25' },
  B: { text: 'text-cyan-300', bg: 'bg-cyan-600/25' },
  AB: { text: 'text-amber-300', bg: 'bg-amber-500/25' },
  O: { text: 'text-gray-200', bg: 'bg-navy-700' },
}

function rbcAntigens(phenotype: Phenotype) {
  return phenotype === 'A' ? 'A' : phenotype === 'B' ? 'B' : phenotype === 'AB' ? 'A + B' : 'A — none (H only)'
}
function plasmaAntibodies(phenotype: Phenotype) {
  return phenotype === 'A' ? 'anti-B' : phenotype === 'B' ? 'anti-A' : phenotype === 'AB' ? 'none' : 'anti-A + anti-B'
}

export function ABOInheritanceSimulator() {
  const [mode, setMode] = useState<'phenotype' | 'genotype'>('phenotype')
  const [motherPhenotype, setMotherPhenotype] = useState<Phenotype>('A')
  const [fatherPhenotype, setFatherPhenotype] = useState<Phenotype>('B')
  const [motherGenotype, setMotherGenotype] = useState<GenotypeKey>('IAi')
  const [fatherGenotype, setFatherGenotype] = useState<GenotypeKey>('IBi')

  const motherAlleles = useMemo(() => gametesOf(motherGenotype), [motherGenotype])
  const fatherAlleles = useMemo(() => gametesOf(fatherGenotype), [fatherGenotype])

  const punnettCells = useMemo(() => {
    const cells: { genotype: GenotypeKey; phenotype: Phenotype }[] = []
    for (const a of motherAlleles) {
      for (const b of fatherAlleles) {
        const g = childGenotype(a, b)
        cells.push({ genotype: g, phenotype: phenotypeOfGenotype(g) })
      }
    }
    return cells
  }, [motherAlleles, fatherAlleles])

  const possibleChildPhenotypes = useMemo(() => {
    const motherGenotypes = allelesForPhenotype(motherPhenotype)
    const fatherGenotypes = allelesForPhenotype(fatherPhenotype)
    const phenotypes = new Set<Phenotype>()
    for (const motherGeno of motherGenotypes) {
      for (const fatherGeno of fatherGenotypes) {
        for (const alleleA of gametesOf(motherGeno)) {
          for (const alleleB of gametesOf(fatherGeno)) {
            phenotypes.add(phenotypeOfGenotype(childGenotype(alleleA, alleleB)))
          }
        }
      }
    }
    return phenotypes
  }, [motherPhenotype, fatherPhenotype])

  const phenotypeCounts = useMemo(() => {
    const count: Record<Phenotype, number> = { A: 0, B: 0, AB: 0, O: 0 }
    punnettCells.forEach((cell) => {
      count[cell.phenotype] += 1
    })
    return count
  }, [punnettCells])

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
      {/* parent selection */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ParentPicker
          title="Mother"
          isMother
          mode={mode}
          phenotype={motherPhenotype}
          genotype={motherGenotype}
          onPhenotype={setMotherPhenotype}
          onGenotype={setMotherGenotype}
        />
        <ParentPicker
          title="Father"
          isMother
          mode={mode}
          phenotype={fatherPhenotype}
          genotype={fatherGenotype}
          onPhenotype={setFatherPhenotype}
          onGenotype={setFatherGenotype}
        />
      </div>

      {/* results — possible child groups (phenotype) or Punnett square (genotype) */}
      {mode === 'phenotype' ? (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-600/5 p-5">
          <h3 className="text-sm font-bold text-cyan-300 mb-1">Possible child blood groups</h3>
          <p className="text-xs text-gray-400 mb-4">
            With phenotypes alone, exact probabilities cannot be given — group A can be IᴬIᴬ or Iᴬi and group B can be
            IᴮIᴮ or Iᴮi. Switch to genotype mode for precise outcomes.
          </p>
          <div className="flex flex-wrap gap-2 animate-fade-in" key={`${motherPhenotype}-${fatherPhenotype}`}>
            {phenotypes.map((p) => (
              <div
                key={p}
                className={`rounded-lg border px-4 py-3 ${phenotypeTone[p].bg} ${
                  possibleChildPhenotypes.has(p) ? 'border-cyan-500/50' : 'border-navy-600/40 opacity-30'
                }`}
              >
                <p className={`text-xl font-bold ${phenotypeTone[p].text}`}>Group {p}</p>
                <p className="text-[11px] text-gray-400 mt-1">
                  {rbcAntigens(p)} · {plasmaAntibodies(p)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-1.5 text-xs">
            {phenotypes.filter((p) => possibleChildPhenotypes.has(p)).map((p) => (
              <p key={p} className="text-gray-300">
                <span className={`font-mono font-bold ${phenotypeTone[p].text}`}>{p}</span> — cells carry{' '}
                {rbcAntigens(p)}; plasma has {plasmaAntibodies(p)}.
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
                {motherAlleles.map((motherAllele, motherIdx) => (
                  <tr key={motherAllele}>
                    <td className="p-1">
                      <ParentGamete allele={motherAllele} parent="mother" />
                    </td>
                    {fatherAlleles.map((fatherAllele, fatherIdx) => {
                      const g = childGenotype(motherAllele, fatherAllele)
                      const p = phenotypeOfGenotype(g)
                      const cellIndex = motherIdx * fatherAlleles.length + fatherIdx
                      return (
                        <td key={`${motherAllele}-${fatherAllele}`} className="p-1 text-center animate-fade-in" style={{ animationDelay: `${cellIndex * 0.15}s` }}>
                          <div className={`rounded-lg border px-3 py-2.5 ${phenotypeTone[p].bg} ${
                            p === 'AB' ? 'border-amber-500/50' : p === 'A' ? 'border-crimson-500/40' : p === 'B' ? 'border-cyan-500/40' : 'border-navy-500/40'
                          }`}>
                            <p className={`font-bold ${phenotypeTone[p].text}`}>{genotypeLabel(g)}</p>
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
              const n = phenotypeCounts[p]
              const frac = { A: 4, B: 4, AB: 4, O: 4 }[p] || 4
              return (
                <div key={p} className={`rounded-lg px-3 py-2.5 border ${phenotypeTone[p].bg} ${
                  p === 'AB' ? 'border-amber-500/40' : p === 'A' ? 'border-crimson-500/30' : p === 'B' ? 'border-cyan-500/30' : 'border-navy-500/40'
                }`}>
                  <p className={`text-lg font-extrabold ${phenotypeTone[p].text}`}>Group {p}</p>
                  <p className="text-xs text-gray-400 font-mono">
                    {n}/{punnettCells.length} cells{punnettCells.length > 0 && n > 0 ? ` · ${Math.round((n / punnettCells.length) * 100)}%` : ''}
                  </p>
                </div>
              )
            })}
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            In this example the Punnett square is 2 × 2, so each cell equals 25%. Clear the common simplification: inheritance is
            per-conception — the percentages describe a distribution over many offspring, not a guarantee for any one child.
          </p>
        </div>
      )}

      {/* selected cross — antigens & antibodies summary */}
      <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 p-5">
        <h3 className="text-sm font-bold text-white mb-3">Selected cross — antigens & antibodies</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          <div className="rounded-lg bg-navy-800 border border-navy-600/40 p-3">
            <p className="text-xs font-mono uppercase tracking-wider text-crimson-400 mb-1">{mode === 'phenotype' ? `Mother · ${motherPhenotype}` : `Mother · ${genotypeLabel(motherGenotype)}`}</p>
            <p className="text-xs text-gray-300">RBC: {rbcAntigens(motherPhenotype)}</p>
            <p className="text-xs text-gray-300">Plasma: {plasmaAntibodies(motherPhenotype)}</p>
          </div>
          <div className="rounded-lg bg-navy-800 border border-navy-600/40 p-3">
            <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">{mode === 'phenotype' ? `Father · ${fatherPhenotype}` : `Father · ${genotypeLabel(fatherGenotype)}`}</p>
            <p className="text-xs text-gray-300">RBC: {rbcAntigens(fatherPhenotype)}</p>
            <p className="text-xs text-gray-300">Plasma: {plasmaAntibodies(fatherPhenotype)}</p>
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

function genotypeLabel(genotype: GenotypeKey): string {
  return genotypeOptions.find((o) => o.key === genotype)!.label
}

function ParentPicker({
  title,
  isMother,
  mode,
  phenotype,
  genotype,
  onPhenotype,
  onGenotype,
}: {
  title: string
  isMother: boolean
  mode: 'phenotype' | 'genotype'
  phenotype: Phenotype
  genotype: GenotypeKey
  onPhenotype: (p: Phenotype) => void
  onGenotype: (g: GenotypeKey) => void
}) {
  return (
    <div className={`rounded-xl border p-4 ${isMother ? 'border-crimson-500/30 bg-crimson-600/5' : 'border-cyan-500/30 bg-cyan-600/5'}`}>
      <div className="flex items-center gap-2 mb-3">
        <FlowBox label={title} tone={isMother ? 'crimson' : 'cyan'} />
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
                  ? isMother
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
                  ? isMother
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