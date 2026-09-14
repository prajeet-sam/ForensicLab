import { useState } from 'react'
import { labWorkflowItems } from '../data/lab'
import { Icon } from './Icon'
import { EvidenceTag } from './ui'

export function LaboratoryWorkflow() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = labWorkflowItems[activeIdx]

  const icons = [
    'bag' as const,
    'report' as const,
    'check' as const,
    'microscope' as const,
    'speed' as const,
    'shield' as const,
    'scale' as const,
    'document' as const,
  ]

  return (
    <div className="rounded-xl border border-navy-600/40 bg-navy-900/60 overflow-hidden">
      {/* Stepper */}
      <div className="flex overflow-x-auto p-3 gap-1.5" role="tablist" aria-label="Laboratory workflow stages">
        {labWorkflowItems.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={i === activeIdx}
            onClick={() => setActiveIdx(i)}
            className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-150 ${
              i === activeIdx
                ? 'bg-cyan-600 border-cyan-500 text-white'
                : 'border-navy-600/50 text-gray-400 hover:text-gray-200 hover:border-navy-500'
            }`}
          >
            <Icon name={icons[i]} className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{i + 1}. {item.title}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="p-5 sm:p-6 border-t border-navy-700/50 animate-fade-in" key={active.id}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 className="text-lg font-bold text-white">
            <span className="text-[10px] font-mono text-cyan-400 mr-2">STAGE {String(activeIdx + 1).padStart(2, '0')}</span>
            {active.title}
          </h3>
          <EvidenceTag label="WORKFLOW" />
        </div>
        <p className="text-gray-300 leading-relaxed mb-4"><span className="text-gray-500 font-mono text-xs mr-1">PURPOSE:</span>{active.purpose}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Icon name="warning" className="w-3.5 h-3.5" /> Common risks
            </h4>
            <ul className="space-y-1.5">
              {active.risks.map((r) => (
                <li key={r} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>{r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Icon name="report" className="w-3.5 h-3.5" /> Documentation
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {active.documentation.map((d) => (
                <span key={d} className="text-xs px-2.5 py-1 rounded-full border border-navy-500/50 text-gray-300 bg-navy-800">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-cyan-500/30 bg-cyan-600/10 px-4 py-3">
          <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">Why it matters</p>
          <p className="text-sm text-gray-200 leading-relaxed">{active.science}</p>
        </div>
      </div>
    </div>
  )
}