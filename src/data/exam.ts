import type { Category, QuizQuestion } from '../lib/types'
import { quizModules } from './quizzes'

export interface ExamQuestion extends QuizQuestion {
  category: Category
}

export const examQuestions: ExamQuestion[] = [
  {
    id: 'ex-1',
    category: 'principles',
    type: 'mcq',
    question: 'The verdict in a criminal trial is decided by:',
    options: [
      'The forensic scientist who examined the evidence',
      'The trier of fact (court or jury), using all lawful evidence',
      'The laboratory examiner who wrote the report',
      'The officer who arrested the suspect',
    ],
    answer: 'The trier of fact (court or jury), using all lawful evidence',
    explanation:
      'Forensic science supplies findings and degrees of support; the decision about guilt is made by the trier of fact, not by the scientist.',
  },
  {
    id: 'ex-2',
    category: 'principles',
    type: 'tf',
    question: 'Locard exchange guarantees that a detectable trace is always left at every contact.',
    answer: 'False',
    explanation:
      'Contact always transfers material in principle, but the trace may be too small, degraded or removed to be detected.',
  },
  {
    id: 'ex-3',
    category: 'principles',
    type: 'mcq',
    question: 'Individual characteristics allow an examiner to:',
    options: [
      'Name the person who committed the crime',
      'Discriminate a single source under defined comparison standards',
      'Always exclude every other person on Earth',
      'Prove the exact activity that occurred',
    ],
    answer: 'Discriminate a single source under defined comparison standards',
    explanation:
      'Individualisation is a defined, standards-based statement of common source under the framework used; it is not a metaphysical guarantee nor a verdict.',
  },
  {
    id: 'ex-4',
    category: 'principles',
    type: 'matching',
    question: 'Match each principle to its core claim.',
    pairs: [
      { left: 'Locard exchange', right: 'Contact transfers material' },
      { left: 'Progressive change', right: 'Evidence continually changes' },
      { left: 'Analysis vs interpretation', right: 'Separate measurement from conclusion' },
      { left: 'Probabilistic support', right: 'Strength is stated, not certainty' },
    ],
    answer: ['Locard exchange', 'Progressive change', 'Analysis vs interpretation', 'Probabilistic support'],
    explanation:
      'Principles frame how evidence is sought, preserved and reported: transfer, change, disciplined reasoning and honest statements of support.',
  },
  {
    id: 'ex-5',
    category: 'principles',
    type: 'tf',
    question: 'Absence of a detectable trace is proof that no contact or activity ever occurred.',
    answer: 'False',
    explanation:
      'Negative results have detection limits and timing limits; they exclude detection, not the possibility of an event.',
  },
  {
    id: 'ex-6',
    category: 'biology',
    type: 'mcq',
    question: 'Which approach is used to confirm that a stain is of human origin before DNA work?',
    options: [
      'Luminol chemiluminescence',
      'A species-specific immunodiffusion or precipitin method',
      'Measurement of the stain pH',
      'Counting the number of stains',
    ],
    answer: 'A species-specific immunodiffusion or precipitin method',
    explanation:
      'Presumptive tests detect heme-like activity and are not species-specific; human origin is confirmed serologically before costly DNA analysis.',
  },
  {
    id: 'ex-7',
    category: 'biology',
    type: 'mcq',
    question: 'The absorption-elution technique is used for:',
    options: [
      'Confirming the species of an unknown animal',
      'ABO grouping of dried bloodstains',
      'Quantifying the total amount of DNA',
      'Detecting firearm discharge residue',
    ],
    answer: 'ABO grouping of dried bloodstains',
    explanation:
      'Absorption-elution recovers the ABO grouping from dried stains by exposing antigen sites, loading antibody and releasing it for detection.',
  },
  {
    id: 'ex-8',
    category: 'biology',
    type: 'mcq',
    question: 'Which of the following provides the greatest discriminating power?',
    options: [
      'ABO blood grouping',
      'A full STR DNA profile',
      'A positive presumptive blood screen',
      'Species determination as human',
    ],
    answer: 'A full STR DNA profile',
    explanation:
      'ABO puts a stain into one of four large groups shared by millions; an STR profile across many loci is strongly individualising.',
  },
  {
    id: 'ex-9',
    category: 'biology',
    type: 'tf',
    question: 'A match between a suspect DNA profile and a stain proves the suspect performed the action that deposited it.',
    answer: 'False',
    explanation:
      'A resulting match addresses the source of the DNA; how and when it got there (activity, transfer, secondary transfer) is a separate question.',
  },
  {
    id: 'ex-10',
    category: 'biology',
    type: 'matching',
    question: 'Match each test to the component it detects.',
    pairs: [
      { left: 'Luminol / Kastle-Meyer', right: 'Heme pseudoperoxidase activity' },
      { left: 'Phadebas', right: 'Salivary alpha-amylase' },
      { left: 'RSID-Semen', right: 'Semenogelin' },
      { left: 'Takayama', right: 'Hemochromogen crystals' },
    ],
    answer: ['Luminol / Kastle-Meyer', 'Phadebas', 'RSID-Semen', 'Takayama'],
    explanation:
      'Screening tests target characteristic components of each body fluid; each has known interferences and limits.',
  },
  {
    id: 'ex-11',
    category: 'biology',
    type: 'tf',
    question: 'A hair without a root can be reliably profiled for full nuclear STR DNA.',
    answer: 'False',
    explanation:
      'Full nuclear STR profiling needs nuclear DNA found in the root; rootless hair may carry degraded or mitochondrial DNA at best.',
  },
  {
    id: 'ex-12',
    category: 'chemistry',
    type: 'mcq',
    question: 'Why is GC-MS required after a positive immunoassay drug screen?',
    options: [
      'Because immunoassay screens are presumptive and can cross-react',
      'Because screens cannot be performed in a laboratory',
      'Because mass spectrometry is cheaper than screening',
      'Because screening destroys the sample every time',
    ],
    answer: 'Because immunoassay screens are presumptive and can cross-react',
    explanation:
      'Screens indicate possible drug classes; an instrument method confirms identity and quantity before a result is reported.',
  },
  {
    id: 'ex-13',
    category: 'chemistry',
    type: 'mcq',
    question: 'Characteristic gunshot residue particles found by SEM-EDX typically contain:',
    options: [
      'Only carbon and oxygen',
      'Lead, barium and antimony',
      'Sodium and chloride exclusively',
      'Calcium and phosphorus',
    ],
    answer: 'Lead, barium and antimony',
    explanation:
      'The primer of most ammunition produces characteristic Pb-Ba-Sb particles; their presence is a strong indicator of a discharge event.',
  },
  {
    id: 'ex-14',
    category: 'chemistry',
    type: 'matching',
    question: 'Match each analytical technique to its typical forensic application.',
    pairs: [
      { left: 'Gas chromatography-mass spectrometry', right: 'Confirming drug identity' },
      { left: 'Scanning electron microscopy with EDX', right: 'Characterising gunshot residue' },
      { left: 'Presumptive colour (spot) tests', right: 'Screening unknown substances' },
      { left: 'Ouchterlony immunodiffusion', right: 'Detecting soluble serum proteins' },
    ],
    answer: ['Gas chromatography-mass spectrometry', 'Scanning electron microscopy with EDX', 'Presumptive colour (spot) tests', 'Ouchterlony immunodiffusion'],
    explanation:
      'Each technique answers a different question: identity, composition, screening or protein detection.',
  },
  {
    id: 'ex-15',
    category: 'physics',
    type: 'mcq',
    question: 'The refractive index of a glass fragment is most commonly determined by:',
    options: [
      'Weighing the fragment in water',
      'Immersion in oils of known refractive index and observing vanishing point',
      'Burning the fragment in a flame',
      'Counting surface scratches under magnification',
    ],
    answer: 'Immersion in oils of known refractive index and observing vanishing point',
    explanation:
      'When the oil refractive index matches the glass, the fragment becomes invisible; the immersion temperature identifies the matching index.',
  },
  {
    id: 'ex-16',
    category: 'physics',
    type: 'tf',
    question: 'A class-level match alone can conclusively link a paint chip to one specific vehicle.',
    answer: 'False',
    explanation:
      'Many vehicles share the same paint system; class evidence supports consistency but does not individualise a single vehicle.',
  },
  {
    id: 'ex-17',
    category: 'physics',
    type: 'mcq',
    question: 'The comparison microscope is primarily used to compare:',
    options: [
      'Blood splatter patterns',
      'Toolmarks and firearm striations side by side',
      'Two different DNA samples',
      'Chemical spot test colours',
    ],
    answer: 'Toolmarks and firearm striations side by side',
    explanation:
      'Juxtaposing questioned and known marks under one optical system lets an examiner directly compare alignment of striations.',
  },
  {
    id: 'ex-18',
    category: 'physics',
    type: 'matching',
    question: 'Match each trace evidence type to its most characteristic examination.',
    pairs: [
      { left: 'Glass fragments', right: 'Refractive index and elemental analysis' },
      { left: 'Paint chips', right: 'Layer structure and pigment chemistry' },
      { left: 'Soil', right: 'Mineral content and particle size' },
      { left: 'Toolmarks', right: 'Striation comparison' },
    ],
    answer: ['Glass fragments', 'Paint chips', 'Soil', 'Toolmarks'],
    explanation:
      'Each trace type favours physical or chemical examination suited to what it is made of and how it is compared.',
  },
  {
    id: 'ex-19',
    category: 'document',
    type: 'mcq',
    question: 'Electrostatic Detection Apparatus (ESDA) is used to reveal:',
    options: [
      'Invisible ink recipes',
      'Indented (second-page) writing impressions',
      'The age of paper through carbon dating',
      'Alterations made with correction fluid only',
    ],
    answer: 'Indented (second-page) writing impressions',
    explanation:
      'ESDA charges the paper and applies toner so that impressions left on underlying sheets appear, revealing what was written on the sheet above.',
  },
  {
    id: 'ex-20',
    category: 'document',
    type: 'mcq',
    question: 'For latent fingerprints on a porous surface such as paper, the preferred development treatment is:',
    options: [
      'Black powder brushing',
      'Ninhydrin (or DFO) reacting with amino acids',
      'Cyanoacrylate fuming alone',
      'Magnetic powder on bare glass',
    ],
    answer: 'Ninhydrin (or DFO) reacting with amino acids',
    explanation:
      'Porous surfaces absorb secretions; amino acid reagents like ninhydrin develop prints, whereas powders suit non-porous surfaces.',
  },
  {
    id: 'ex-21',
    category: 'document',
    type: 'matching',
    question: 'Match each print type to how it is formed.',
    pairs: [
      { left: 'Latent print', right: 'Naturally deposited sweat and oils' },
      { left: 'Patent print', right: 'Visible transfer of a contaminant' },
      { left: 'Plastic print', right: 'Indentation into soft material' },
    ],
    answer: ['Latent print', 'Patent print', 'Plastic print'],
    explanation:
      'The three classes differ by visibility and by whether the ridge detail records transfer or indentation.',
  },
  {
    id: 'ex-22',
    category: 'laboratory',
    type: 'mcq',
    question: 'Why are blanks and control samples run alongside casework?',
    options: [
      'To make the batch take longer',
      'To detect contamination, instrument error or batch-specific problems',
      'To replace the need for calibration',
      'To satisfy the interested parties',
    ],
    answer: 'To detect contamination, instrument error or batch-specific problems',
    explanation:
      'Controls with known answers are studied in the same run; a failed control invalidates the batch and alerts the laboratory to a problem.',
  },
  {
    id: 'ex-23',
    category: 'laboratory',
    type: 'tf',
    question: 'Calibration of forensic instruments is a one-time event performed before first use.',
    answer: 'False',
    explanation:
      'Calibration is periodic and traceable to certified standards; ongoing recalibration verifies continuing reliability.',
  },
  {
    id: 'ex-24',
    category: 'laboratory',
    type: 'matching',
    question: 'Match each evidence-lifecycle stage to its action.',
    pairs: [
      { left: 'Recognition', right: 'Spot an item as potential evidence' },
      { left: 'Preservation', right: 'Protect the item from change and loss' },
      { left: 'Documentation', right: 'Record the item before it is moved' },
      { left: 'Collection', right: 'Package and label under custody' },
    ],
    answer: ['Recognition', 'Preservation', 'Documentation', 'Collection'],
    explanation:
      'The stages run in order so that evidence is found, protected, recorded and recovered defensibly.',
  },
  {
    id: 'ex-25',
    category: 'other',
    type: 'mcq',
    question: 'PRNU (photo response non-uniformity) is used in digital media authentication to:',
    options: [
      'Compress video files',
      'Identify the sensor fingerprint of the camera that captured an image',
      'Erase metadata',
      'Encrypt a seized drive',
    ],
    answer: 'Identify the sensor fingerprint of the camera that captured an image',
    explanation:
      'Sensor noise patterns act as a camera fingerprint; comparing them helps determine whether a questioned image came from a specific device.',
  },
  {
    id: 'ex-26',
    category: 'other',
    type: 'tf',
    question: 'After seizure, the integrity of a digital exhibit is protected by write-blocking and hashing.',
    answer: 'True',
    explanation:
      'Working from an image of the device and verifying hash values prevents the original data from being altered.',
  },
  {
    id: 'ex-27',
    category: 'other',
    type: 'mcq',
    question: 'In forensic practice, an AI-assisted tool is best reported as:',
    options: [
      'The sole expert decision-maker',
      'Decision support whose output is reviewed by a qualified examiner',
      'Automatic proof of tampering',
      'A replacement for chain of custody',
    ],
    answer: 'Decision support whose output is reviewed by a qualified examiner',
    explanation:
      'AI flags and assists, but every output must be explainable, validated and reviewed by a human expert before it is used in court.',
  },
]

export const examCategories: { id: 'all' | Category; label: string; icon: string }[] = [
  { id: 'all', label: 'Full syllabus', icon: 'scale' },
  { id: 'principles', label: 'Foundations & Principles', icon: 'principles' },
  { id: 'biology', label: 'Blood, Serology & DNA', icon: 'blood' },
  { id: 'chemistry', label: 'Chemistry & Toxicology', icon: 'chemistry' },
  { id: 'physics', label: 'Trace & Comparison', icon: 'glass' },
  { id: 'laboratory', label: 'Laboratory & QA', icon: 'lab' },
  { id: 'document', label: 'Documents & Prints', icon: 'document' },
  { id: 'other', label: 'Digital & AI', icon: 'digital' },
]

export const examLengths = [10, 15, 20, 30]

export function composeExam(category: 'all' | Category, count: number): QuizQuestion[] {
  const pool: ExamQuestion[] = [
    ...quizModules.flatMap((m) => m.questions.map((q) => ({ ...q, category: m.category as Category }))),
    ...examQuestions,
  ]
  const filtered = category === 'all' ? pool : pool.filter((q) => q.category === category)
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export interface RevisionSheet {
  category: string
  label: string
  points: string[]
  mnemonics: { line: string; note: string }[]
}

export const revisionSheets: RevisionSheet[] = [
  {
    category: 'principles',
    label: 'Foundations & Principles',
    points: [
      'Science reports degrees of support; the trier of fact decides guilt.',
      'Locard: contact transfers material, but the trace may be undetectable.',
      'Class characteristics place evidence in a group; individual characteristics can discriminate a single source under defined standards.',
      'Progressive change: evidence degrades with time, so act early and preserve.',
      'Keep analysis (measurement) separate from interpretation (conclusion).',
      'Absence of a trace proves little; negative results have detection limits.',
    ],
    mnemonics: [
      { line: 'Colm: Contact Leaves Maybe', note: 'Locard transfers material, but detection is never guaranteed.' },
      { line: 'AP separates: Analyse first, then Interpret', note: 'Measurement first, conclusion second.' },
    ],
  },
  {
    category: 'biology',
    label: 'Blood, Serology & DNA',
    points: [
      'ABO groups are shared by millions; grouping never individualises.',
      'Agglutination = clumping of particulate antigens; precipitation = insolubilisation of soluble complexes.',
      'Ouchterlony: a precipitin line forms where antigen and antibody meet in optimal proportion.',
      'Presumptive blood tests (luminol, Kastle-Meyer) detect heme pseudoperoxidase and are not species-specific.',
      'Confirm human origin (immunodiffusion or precipitin methods) before DNA profiling.',
      'Takayama gives hemochromogen crystals, a confirmatory blood reaction.',
      'STRs are short tandem repeats; PCR amplifies; match probability states rarity, not guilt.',
      'Presence of DNA supports contact; activity, transfer and timing are separate questions.',
    ],
    mnemonics: [
      { line: 'Anti-what-you-lack', note: 'Group O has anti-A and anti-B; group AB has neither.' },
      { line: 'RAM: Real And Matching', note: 'Recovery, Amplification, Matching - the DNA workflow.' },
    ],
  },
  {
    category: 'chemistry',
    label: 'Chemistry & Toxicology',
    points: [
      'Screens (immunoassay, spot tests) are presumptive; GC-MS or LC-MS confirms identity and quantity.',
      'GSR: characteristic Pb-Ba-Sb particles by SEM-EDX; easily lost or transferred, absence proves nothing.',
      'Post-mortem redistribution moves drugs between tissues after death, altering concentrations.',
      'Presence of a substance does not automatically mean it caused death or impairment.',
      'Trace amounts may be below detection limits; contamination produces false positives.',
    ],
    mnemonics: [
      { line: 'SS-C: Screen first, Confirm after', note: 'Presumptive screening, then instrument confirmation.' },
      { line: 'P-B-A: Primer has Barium, Antimony, Lead', note: 'Characteristic GSR elements detected by SEM-EDX.' },
    ],
  },
  {
    category: 'physics',
    label: 'Trace & Comparison',
    points: [
      'Glass: refractive index and elemental analysis (SEM-EDS) are the comparison standards.',
      'Paint: layer structure, colour, binder and pigment are compared.',
      'Soil: colour, texture, minerals, pollen and diatoms characterise provenance.',
      'Toolmarks and firearms: class characteristics first, then individual striation match.',
      'The 3R rule reads glass fracture ridges: Radial, Right angle, Rib marks.',
      'Class matches narrow the source; they do not individualise.',
    ],
    mnemonics: [
      { line: 'RRI: Radial, Right angle, Rib marks', note: 'The 3R rule for glass fracture direction.' },
      { line: 'CRM: Class then Match', note: 'Class characteristics before individual match.' },
    ],
  },
  {
    category: 'laboratory',
    label: 'Laboratory & QA',
    points: [
      'Chain of custody records every transfer: who, what, when, why. A gap risks admissibility.',
      'Evidence lifecycle order: recognition, preservation, documentation, collection, forwarding.',
      'Calibration is periodic and traceable to certified standards.',
      'NABL / ISO 17025 accreditation certifies processes, not every individual result.',
      'Controls and blanks run with casework catch contamination and batch errors.',
      'Peer review gives every result an independent second check.',
    ],
    mnemonics: [
      { line: 'RP-D-C-F: Recognise, Preserve, Document, Collect, Forward', note: 'The evidence lifecycle in order.' },
      { line: 'WHO-WHAT-WHEN-WHY', note: 'The four Ws of every custody transfer.' },
    ],
  },
  {
    category: 'document',
    label: 'Documents & Prints',
    points: [
      'ESDA reveals indented writing impressions on underlying sheets.',
      'Porous surfaces (paper): ninhydrin or DFO develop prints via amino acid reaction.',
      'Non-porous surfaces: powder, cyanoacrylate fuming then dye stain.',
      'Latent = natural deposit; patent = visible contaminant transfer; plastic = indentation.',
      'ACE-V is the fingerprint comparison framework; AFIS returns a candidate list, not a verdict.',
      'Minutiae (ridge endings, bifurcations) carry the individualising detail.',
    ],
    mnemonics: [
      { line: 'LPP: Latent, Patent, Plastic', note: 'The three print classes by formation.' },
      { line: 'NIP: Ninhydrin for Porous', note: 'Amino-acid reagents suit porous surfaces.' },
    ],
  },
  {
    category: 'other',
    label: 'Digital & AI',
    points: [
      'Preserve digital exhibits with write-blocking and hashing; verify integrity on intake.',
      'Authentication combines ELA, metadata, compression artefacts and PRNU; no single test is conclusive.',
      'PRNU identifies the sensor fingerprint of the camera that captured an image.',
      'Timeline reconstruction normalises timezones and flags clock drift and manipulation.',
      'AI in forensics is decision support: explainable, validated and human-reviewed, never the sole decision-maker.',
    ],
    mnemonics: [
      { line: 'W-H-I: Write-block, Hash, Image', note: 'Preserve, verify, then work on a copy.' },
      { line: 'EMP: ELA + Metadata + PRNU', note: 'Authentication indicators to combine.' },
    ],
  },
]