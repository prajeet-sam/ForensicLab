import type { CaseFile } from '../lib/types'

export const cases: CaseFile[] = [
  {
    id: 'red-stain',
    slug: 'red-stain',
    title: 'The Red Stain',
    subtitle: 'Blood Evidence — Interpretation',
    difficulty: 'Intermediate',
    tag: 'ICD/26/184 · Blood & DNA',
    agency: 'State Forensic Science Laboratory — Biology & DNA Unit',
    caseRef: 'ICD/26/184',
    date: '12 Mar 2026',
    summary:
      'A reddish-brown stain is found near a damaged door frame. Your task: document it correctly, identify the right tests and reach a scientifically honest conclusion.',
    brief:
      'A premises officer responded to a reported domestic disturbance. At the scene, a property owner reports finding a reddish-brown smear on a door frame approximately 80 cm from the floor. The stain is dark, slightly raised, and partly absorbed into the painted wood.',
    scenario: [
      'A dark reddish-brown smear (approx 3 cm × 1.2 cm) is located on the door frame.',
      'The stain shows some raised edges consistent with partial drying of a fluid.',
      'The surrounding area has minor scratches but no apparent weapon or obvious items at the scene.',
      'The officer is not sure if this is blood, food residue, paint, or rust.',
      'The officer must decide: how to handle it, what tests to run first, and what conclusions are and are not justified.',
    ],
    evidence: [
      { id: 'FSL/26-184-A', description: 'Door frame with reddish-brown smear', type: 'Physical Evidence' },
      { id: 'FSL/26-184-B', description: 'Presumptive positive smear extract', type: 'Biological Evidence' },
      { id: 'FSL/26-184-C', description: 'Partial STR profile from stain extract', type: 'DNA Evidence' },
    ],
    decisions: [
      {
        id: 'ds-1',
        kind: 'choice',
        question: 'What should be documented first before any testing?',
        options: [
          'Immediately sample the stain',
          'Photograph, scale, measure, sketch and describe context',
          'Wash the area and retest',
          'Collect the door frame',
        ],
        hint: 'Look for the option that preserves the evidential context before any physical change occurs.',
      },
      {
        id: 'ds-2',
        kind: 'choice',
        question: 'What is the first test category to apply to this stain?',
        options: [
          'DNA profiling (STR analysis)',
          'A presumptive blood screening test (e.g., Kastle-Meyer or luminol)',
          'Microscopic particle analysis',
          'Carbon dating',
        ],
        hint: 'Always start by establishing the category of the stain before moving to individualization.',
      },
      {
        id: 'ds-3',
        kind: 'choice',
        question: 'A positive Kastle-Meyer (pink) result means:',
        options: [
          'This is definitely human blood',
          'Blood may be present; confirmatory species-specific and profiling tests are required',
          'The suspect has been identified',
          'The stain contains no useful biological information',
        ],
        hint: 'Remember what "presumptive" really means — and what it never claims.',
      },
      {
        id: 'ds-4',
        kind: 'choice',
        question: 'The officer does not label the evidence bag before submission to the lab. What does this compromise?',
        options: [
          'Nothing important — the bag is just packaging',
          'The chain-of-custody record',
          'The DNA profile itself',
          'The presumptive test chemistry',
        ],
        hint: 'Think about what happens to the evidence at the laboratory when no one can prove where or when it came from.',
      },
      {
        id: 'ds-5',
        kind: 'choice',
        question: 'The stain is confirmed human (anti-human precipitin line). What next?',
        options: [
          'Submit to DNA profiling to compare with all persons present',
          'Submit a buccal reference from the complainant for comparison',
          'Stop — confirmation of human is enough',
          'Run particle analysis on the stain',
        ],
        hint: 'DNA profiling is powerful — but the validity of comparison requires a reference to compare.',
      },
      {
        id: 'ds-6',
        kind: 'choice',
        question: 'The STR profile from the stain matches the complainant. What can this evidence support?',
        options: [
          'The complainant cut their hand and that caused the stain',
          'Human blood associated with the complainant is present on the door frame',
          'The complainant committed an assault',
          'The stain proves self-defence',
        ],
        hint: 'Source-level matching is not the same as activity-level stories.',
      },
      {
        id: 'ds-7',
        kind: 'choice',
        question: 'What can this evidence NOT establish on its own?',
        options: [
          'That the person represented by the stain was present at the scene',
          'The exact time the stain was deposited',
          'That the stain resulted from a crime',
          'All of the above',
        ],
        hint: 'Be honest about the temporal and activity limitations of biological evidence.',
      },
    ],
    expectedConcepts: [
      'Documentation comes before collection',
      'Presumptive tests are not definitive for blood',
      'Species confirmation must precede individualization',
      'Chain of custody must be intact',
      'DNA shows source — not activity',
      'Limitations must always be stated',
    ],
    interpretationNote:
      'This case teaches how to think about evidence — not how to guess. The important thing is not what you decide at each step, but whether your reasoning respects what the science actually supports.',
    assessmentGuidance: [
      {
        label: 'Supported',
        tone: 'confidence',
        description: 'Your conclusion matched what the science supports.',
      },
      {
        label: 'Not supported',
        tone: 'challenge',
        description: 'Your conclusion went beyond what the evidence can show.',
      },
      {
        label: 'Requires additional evidence',
        tone: 'calibration',
        description: 'More information would change the strength of the conclusion.',
      },
      {
        label: 'Overstated',
        tone: 'caution',
        description: 'You asserted more than the data warrant — a common and forgivable error, but one worth learning from.',
      },
    ],
    learningObjectives: [
      'Understand why documentation precedes collection',
      'Distinguish between presumptive and confirmatory tests',
      'Know that ABO grouping does not individualize',
      'Appreciate why chain-of-custody integrity matters',
      'Interpret a DNA match as a source-level probability statement, not a verdict',
    ],
    keyScience: [
      {
        title: 'Presumptive ≠ Proof',
        body: 'Luminol and Kastle-Meyer detect heme-like chemistry, not specific human blood. Confirmatory species work is always required.',
      },
      {
        title: 'Source ≠ Activity',
        body: 'DNA matching establishes that the biological material likely came from that person. It does not say when, how or in what sequence the material was deposited.',
      },
      {
        title: 'Limits protect honesty',
        body: 'A conclusion that goes beyond the evidence weakens the entire forensic process. Stating limitations is not weakness — it is how science protects credibility.',
      },
    ],
  },
  {
    id: 'silent-poison',
    slug: 'silent-poison',
    title: 'The Silent Poison',
    subtitle: 'Toxicology — Screening',
    difficulty: 'Advanced',
    tag: 'ICD/26/291 · Toxicology',
    agency: 'State Forensic Science Laboratory — Chemistry & Toxicology Unit',
    caseRef: 'ICD/26/291',
    date: '02 Apr 2026',
    summary:
      'A person is found deceased after collapsing suddenly. Toxicology screening is required to establish whether poison contributed — but interpretation requires care.',
    brief:
      'A previously healthy 54-year-old is brought in dead on arrival. Police report a sudden collapse in the home. The treating clinician notes constricted pupils and asks for a toxicology screen.',
    scenario: [
      'Toxicology is requested from blood, urine and vitreous humour.',
      'An immunoassay screen is performed on urine.',
      'GC-MS confirmation targets are then selected based on the screen.',
    ],
    evidence: [
      { id: 'TOX/26-291-A', description: 'Urine sample (immunoassay screen)', type: 'Screening' },
      { id: 'TOX/26-291-B', description: 'Blood sample (quantitative analysis)', type: 'Quantitative' },
      { id: 'TOX/26-291-C', description: 'Vitreous humour', type: 'Reference' },
    ],
    decisions: [
      {
        id: 'tp-1',
        kind: 'choice',
        question: 'An immunoassay screen is best described as:',
        options: [
          'A confirmatory test that establishes precise identity',
          'A presumptive screen that flags possible drug classes',
          'A genetic test for inherited risk',
          'A DNA test',
        ],
        hint: 'Immunoassays are fast, broad, and designed to direct further work.',
      },
      {
        id: 'tp-2',
        kind: 'choice',
        question: 'Why is confirmation with GC-MS or LC-MS always required after a positive immunoassay?',
        options: [
          'Because immunoassays are definitive',
          'Because cross-reacting substances can give false positives',
          'Because immunoassays are never correct',
          'Because DNA profiling is the same',
        ],
        hint: 'Immunoassays rely on antibody recognition, which can be fooled.',
      },
      {
        id: 'tp-3',
        kind: 'choice',
        question: 'The concentration measured in blood is compared against what?',
        options: [
          'The fatal dose listed on a bottle',
          'Published therapeutic, toxic and lethal ranges, while noting individual variation',
          'The last meal eaten',
          'An arbitrary threshold',
        ],
        hint: 'Dose-response ranges give context, but interpretation is always individual.',
      },
      {
        id: 'tp-4',
        kind: 'choice',
        question: 'What makes interpretation in a deceased person especially difficult?',
        options: [
          'Only post-mortem redistribution and delays matter',
          'Metabolism, timing, concentration changes after death, and individual tolerance are uncertain',
          'Toxicology is always exact',
          'Vitreous humour is meaningless',
        ],
        hint: 'Death itself introduces uncertainty into the samples.',
      },
    ],
    expectedConcepts: [
      'Immunoassays are presumptive',
      'Confirmation is always required',
      'Dose-response must be interpreted with individual context',
      'Post-mortem redistribution complicates interpretation',
    ],
    interpretationNote:
      'Toxicology asks "could this have contributed?" — it rarely says "this definitely caused death" on its own. Context from pathology, history and pharmacology is essential.',
    assessmentGuidance: [
      { label: 'Supported', tone: 'confidence', description: 'Your reasoning matched the science.' },
      { label: 'Not supported', tone: 'challenge', description: 'You concluded more than the data allow.' },
      { label: 'Requires additional evidence', tone: 'calibration', description: 'Context is needed to strengthen the conclusion.' },
      { label: 'Overstated', tone: 'caution', description: 'The interpretation was more certain than warranted.' },
    ],
    learningObjectives: [
      'Distinguish screening from confirmation',
      'Understand toxicological range interpretation',
      'Appreciate post-mortem complexities',
    ],
    keyScience: [
      {
        title: 'Screening points the way',
        body: 'Immunoassays are fast tools to target which drug classes to test further. They cross-react and produce false positives; confirmation is non-negotiable.',
      },
      {
        title: 'Concentration in context',
        body: 'A number is not a verdict. Individual tolerance, therapeutic range, acute exposure and post-mortem changes all affect interpretation.',
      },
    ],
  },
  {
    id: 'broken-glass',
    slug: 'broken-glass',
    title: 'The Broken Window',
    subtitle: 'Trace Evidence — Glass',
    difficulty: 'Beginner',
    tag: 'ICD/26/133 · Physics',
    agency: 'State Forensic Science Laboratory — Trace & Physics Unit',
    caseRef: 'ICD/26/133',
    date: '28 Feb 2026',
    summary:
      'A break-in suspect has micro-glass on their jacket and shoes. The question: can the glass link them to the scene?',
    brief:
      'Police arrest a suspect 200 metres from a burgled premises. The suspect has green glass fragments (0.5–1.5 mm) on the left sleeve and right shoe. The broken window at the scene is a single-pane green float glass window.',
    scenario: [
      'Micro-scene reference glass is collected from the window frame.',
      'Trace glass from the suspect\u2019s jacket is recovered by vacuum.',
      'A refractive index comparison and elemental analysis are commissioned.',
    ],
    evidence: [
      { id: 'TRC/26-133-A', description: 'Trace glass (suspect clothing)', type: 'Trace' },
      { id: 'TRC/26-133-B', description: 'Known reference glass (window frame)', type: 'Reference' },
    ],
    decisions: [
      {
        id: 'bg-1',
        kind: 'choice',
        question: 'Refractive index (RI) comparison tests:',
        options: [
          'Establish which exact window the glass came from',
          'Test whether the two glasses could share a source by comparing a physical property',
          'Prove the suspect broke the window',
          'Measure the age of the glass',
        ],
        hint: 'RI comparison is a class-level property — informative but not individualizing.',
      },
      {
        id: 'bg-2',
        kind: 'choice',
        question: 'If RI and elemental chemistry are both consistent, what is the correct conclusion?',
        options: [
          'The suspect definitely broke the window',
          'The glass fragments are indistinguishable from reference, so a common source is possible — trace glass is also common background',
          'The fragments are excluded',
          'No further examination is required',
        ],
        hint: 'Common objects can share characteristics. The strength of the evidence must be stated carefully.',
      },
      {
        id: 'bg-3',
        kind: 'choice',
        question: 'What is a major limitation of glass evidence?',
        options: [
          'Glass is invisible to all instruments',
          'Green float glass is common and can cross-transfer',
          'Glass melts at body temperature',
          'Glass is individualized in every case',
        ],
        hint: 'Think about how common the glass is in the population and how easily it transfers.',
      },
    ],
    expectedConcepts: [
      'RI comparison supports possible common source',
      'Common glass limits exclusion strength',
      'Trace glass transfers easily — but absence is not disproof',
    ],
    interpretationNote:
      'Trace glass shows the suspect and the window are connected in some way — but it does not prove activity, timing or intent.',
    assessmentGuidance: [
      { label: 'Supported', tone: 'confidence', description: 'Your conclusion respected what comparison science supports.' },
      { label: 'Not supported', tone: 'challenge', description: 'You asserted individualization that comparison cannot support.' },
      { label: 'Requires additional evidence', tone: 'calibration', description: 'More scene data would strengthen the inference.' },
    ],
    learningObjectives: [
      'Understand what comparison physics can and cannot tell',
      'See the limits of common trace materials',
      'Learn to avoid overstated conclusions',
    ],
    keyScience: [
      {
        title: 'Class-level comparison',
        body: 'Refractive index and elemental composition narrow the field but rarely exclude every other source — green float glass is extremely common.',
      },
    ],
  },
]

export function getCaseBySlug(slug: string): CaseFile | undefined {
  return cases.find((c) => c.slug === slug)
}

export function getCaseById(id: string): CaseFile | undefined {
  return cases.find((c) => c.id === id)
}