import type { LabModule, LabWorkflowItem, LabEvidenceItem } from '../lib/types'

export const labWorkflowItems: LabWorkflowItem[] = [
  {
    id: 'lw-1',
    title: 'Evidence Received',
    purpose: 'Receive, log and verify that the physical item matches the accompanying documentation.',
    risks: ['Lost chain-of-custody records', 'Damaged packaging', 'Wrong evidence label'],
    documentation: ['Receiving log', 'Condition report', 'Storage assignment'],
    science: 'Before any examination, the laboratory must verify identity and condition. A result from an unverified item carries no legal weight.',
  },
  {
    id: 'lw-2',
    title: 'Case Registration',
    purpose: 'Create the laboratory case file and allocate it to a qualified examiner.',
    risks: ['Misallocation of examiner competence', 'Duplicate case numbers', 'Missing crime-scene notes'],
    documentation: ['Laboratory case ID', 'Assignment record', 'Reviewer requirements'],
    science: 'Laboratory registration separates the intake from the examination — a deliberate record gap that protects quality and avoids premature interpretation.',
  },
  {
    id: 'lw-3',
    title: 'Evidence Verification',
    purpose: 'Confirm packaging integrity, seals and sample suitability before work begins.',
    risks: ['Seal breakage in transit', 'Contaminated swab', 'Degraded or wrong sample'],
    documentation: ['Verification form', 'Photographs', 'Refusal to examine (if necessary)'],
    science: 'Verification is quality control before quality control — a procedural step to catch problems before they are compounded by interpretation.',
  },
  {
    id: 'lw-4',
    title: 'Examination',
    purpose: 'Apply the validated method to the evidence under controlled conditions.',
    risks: ['Cross-contamination', 'Method drift', 'Contaminating reference material'],
    documentation: ['Examination record', 'Observations', 'Instrument logs'],
    science: 'Every examination takes place in a controlled environment; method validation ensures the readout can mean what we claim it means.',
  },
  {
    id: 'lw-5',
    title: 'Instrument & Calibration',
    purpose: 'Verify that the instrument is performing correctly against reference standards at the time of examination.',
    risks: ['Uncalibrated instrument', 'Out-of-date standard', 'Mechanical drift'],
    documentation: ['Calibration records', 'Instrument logs', 'Maintenance history'],
    science: 'Calibration connects the laboratory reading to an accepted external standard. Without it, the numbers are meaningless.',
  },
  {
    id: 'lw-6',
    title: 'Quality Control',
    purpose: 'Run blanks, controls and known references alongside each batch of work.',
    risks: ['Control failure undetected', 'False batch acceptance', 'Contaminated reagents'],
    documentation: ['Control data', 'Batch acceptance decision', 'Non-conformance action'],
    science: 'Quality control is the day-to-day immune system of the laboratory — it detects problems before they pass into reports.',
  },
  {
    id: 'lw-7',
    title: 'Interpretation',
    purpose: 'Translate measurements into conclusions with explicit statements of uncertainty.',
    risks: ['Overreaching from data to story', 'Unstated uncertainty', 'Examiner bias'],
    documentation: ['Interpretation report', 'Statistical analysis', 'Reviewer notes'],
    science: 'Interpretation is the most dangerous stage: the analyst must remember the difference between what the data say and what the analyst believes they mean.',
  },
  {
    id: 'lw-8',
    title: 'Report Generation',
    purpose: 'Write a clear, factual report that reflects the evidence, the science and its limits.',
    risks: ['Unclear language', 'Selective reporting', 'Missing limitations'],
    documentation: ['Final report', 'Signatures', 'Certificate of analysis'],
    science: 'A well-written report is both a scientific record and a legal document. Clarity and honesty protect everyone.',
  },
]

export const evidenceLifecycleItems = [
  { id: 'el-1', title: 'Recognition', icon: 'eye', purpose: 'Noticing something at the scene that may have forensic value.' },
  { id: 'el-2', title: 'Documentation', icon: 'camera', purpose: 'Creating a permanent record before the scene is altered.' },
  { id: 'el-3', title: 'Collection', icon: 'glove', purpose: 'Recovering items in a way that preserves evidence and prevents loss.' },
  { id: 'el-4', title: 'Packaging', icon: 'bag', purpose: 'Protecting each item appropriately during transport and storage.' },
  { id: 'el-5', title: 'Chain of Custody', icon: 'chain', purpose: 'Recording every transfer, so integrity can be demonstrated.' },
  { id: 'el-6', title: 'Laboratory Examination', icon: 'microscope', purpose: 'Applying validated methods under controlled conditions.' },
  { id: 'el-7', title: 'Quality Control', icon: 'check', purpose: 'Verifying results alongside known controls.' },
  { id: 'el-8', title: 'Interpretation', icon: 'scale', purpose: 'Translating data into conclusions — explicitly stating what is known and unknown.' },
  { id: 'el-9', title: 'Reporting', icon: 'report', purpose: 'Documenting findings clearly and completely for the record.' },
  { id: 'el-10', title: 'Court', icon: 'court', purpose: 'Presenting the science honestly and defending the findings.' },
]

export const chainOfCustodySteps = [
  { id: 'cs-1', location: 'Crime Scene', action: 'Evidence is collected, packaged and labeled by the scene officer.' },
  { id: 'cs-2', location: 'Investigator', action: 'Evidence is transferred to the case investigator under documented conditions.' },
  { id: 'cs-3', location: 'Evidence Store', action: 'The item is stored securely in the property store, temperature and access controlled.' },
  { id: 'cs-4', location: 'Laboratory', action: 'The item is received, logged, verified and assigned a laboratory case ID.' },
  { id: 'cs-5', location: 'Analyst', action: 'The examiner works on the sample under controlled conditions and records observations.' },
  { id: 'cs-6', location: 'Court', action: 'The analyst presents the findings, their basis and their limits.' },
]

export const laboratoryEvidence: LabEvidenceItem[] = [
  { id: 'FSL/26-184-A', description: 'Bloodstain extract (door frame)', category: 'Biology', status: 'Received' },
  { id: 'FSL/26-184-B', description: 'Reference buccal swab', category: 'Biology', status: 'Under Examination' },
  { id: 'FSL/26-133-A', description: 'Micro-glass fragments (suspect clothing)', category: 'Trace', status: 'Completed' },
  { id: 'FSL/26-133-B', description: 'Known glass reference (window frame)', category: 'Trace', status: 'QC Review' },
  { id: 'FSL/26-291-A', description: 'Powder sachet (seized)', category: 'Chemistry', status: 'Received' },
]

export const labModules: LabModule[] = [
  {
    id: 'serology-module',
    title: 'Serology & Biology Module',
    description: 'Biological evidence examination workflow.',
    steps: [
      { title: 'Sample receipt', description: 'Verify seals, condition and identity.' },
      { title: 'Presumptive testing', description: 'Screen for possible blood, semen, saliva.' },
      { title: 'Species confirmation', description: 'Confirm human origin by appropriate method.' },
      { title: 'ABO grouping (when relevant)', description: 'Determine ABO phenotype where useful.' },
      { title: 'DNA extraction', description: 'Recover DNA from the sample.' },
      { title: 'STR profiling', description: 'Generate a DNA profile at validated loci.' },
      { title: 'Interpretation', description: 'Compare to references and quantify strength of association.' },
      { title: 'Report', description: 'Document results, methods, controls and limits.' },
    ],
  },
  {
    id: 'chemistry-module',
    title: 'Chemistry & Toxicology Module',
    description: 'Chemical and toxicological evidence examination workflow.',
    steps: [
      { title: 'Sample receipt', description: 'Verify labels, seals and condition.' },
      { title: 'Screening', description: 'Presumptive color tests or immunoassays.' },
      { title: 'Confirmation', description: 'GC-MS or LC-MS to confirm substance identity.' },
      { title: 'Quantification', description: 'Measure amount or concentration where relevant.' },
      { title: 'Comparison', description: 'Compare questioned vs reference material.' },
      { title: 'Interpretation', description: 'Translate data into conclusion with uncertainty.' },
      { title: 'Report', description: 'Document all methods, results and limits.' },
    ],
  },
]