export interface SimulatorEntry {
  id: string
  title: string
  blurb: string
  path: string
  tone: 'cyan' | 'crimson' | 'amber'
}

const simulators: SimulatorEntry[] = [
  {
    id: 'abo',
    title: 'ABO Inheritance Simulator',
    blurb: 'Predict possible child blood groups from parents — phenotype and genotype modes.',
    path: '/simulators/abo',
    tone: 'crimson',
  },
  {
    id: 'bloodtyping',
    title: 'Antigen–Antibody Blood Typing',
    blurb: 'Select a blood type, add reagents, and watch the reaction — learn why agglutination occurs.',
    path: '/simulators/blood-typing',
    tone: 'crimson',
  },
  {
    id: 'immunodiffusion',
    title: 'Double Immunodiffusion',
    blurb: 'Watch antigen and antibody diffuse through agarose gel and form a precipitin line.',
    path: '/simulators/immunodiffusion',
    tone: 'cyan',
  },
  {
    id: 'presumptive',
    title: 'Presumptive Blood Tests',
    blurb: 'Run luminol and Kastle-Meyer on a stain — then learn why positive never means "proven."',
    path: '/simulators/presumptive-tests',
    tone: 'cyan',
  },
  {
    id: 'chain-of-custody',
    title: 'Chain of Custody',
    blurb: 'Move a piece of evidence through the full custody workflow — document every transfer.',
    path: '/simulators/chain-of-custody',
    tone: 'amber',
  },
  {
    id: 'project-inference',
    title: 'Inference Builder',
    blurb: 'Draft a forensic inference and watch two reviewers — a scientist and a court — test it against the claim grammar.',
    path: '/simulators/project-inference',
    tone: 'cyan',
  },
  {
    id: 'outcome-intake',
    title: 'Outcome as Evidence',
    blurb: 'Take a finished analysis all the way into the evidential record — authorship, work product, inference and the intake ledger.',
    path: '/simulators/outcome-intake',
    tone: 'crimson',
  },
  {
    id: 'timelineforge',
    title: 'Timeline Forge',
    blurb: 'Reconstruct what really happened from three drifting device clocks — before the court reads your sequence.',
    path: '/simulators/timelineforge',
    tone: 'cyan',
  },
  {
    id: 'witnessbox',
    title: 'The Witness Box',
    blurb: 'Answer five questions under cross-examination. Calibrate — neither overclaim the science nor give it away.',
    path: '/simulators/witness-box',
    tone: 'amber',
  },
  {
    id: 'scene-explorer',
    title: 'Scene Explorer',
    blurb: 'Walk a secured crime scene: survey the zones before you touch, then make the recovery decisions that survive court.',
    path: '/simulators/scene-explorer',
    tone: 'crimson',
  },
]

export function getAllSimulators(): SimulatorEntry[] {
  return simulators
}

export function getSimulator(id: string): SimulatorEntry | undefined {
  return simulators.find((s) => s.id === id)
}