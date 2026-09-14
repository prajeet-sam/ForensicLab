import type { Topic } from '../lib/types'

const topics: Topic[] = [
  // ═══════════════════ FOUNDATIONS ═══════════════════
  {
    id: 'introduction',
    title: 'Introduction to Forensic Science',
    category: 'principles',
    discipline: 'Foundations',
    icon: 'microscope',
    color: 'slate',
    definition:
      'The application of scientific principles and methods to matters of law — turning physical traces into interpretable findings.',
    simpleExplanation:
      'Forensic science answers questions about evidence: What is this? Where did it come from? How did it get here — and how strong is that conclusion?',
    corePrinciple:
      'Every contact can leave a trace, and every trace must be interpreted with honesty about its limits.',
    whyItMatters:
      'Evidence moves from crime scene to laboratory to courtroom. Each step must preserve the item and the meaning of the analysis, or the science is defeated before it begins.',
    process: [
      { title: 'Recognition', description: 'Finding that evidence exists — a stain, a mark, a file.' },
      { title: 'Documentation', description: 'Recording the scene and the evidence in detail before touching anything.' },
      { title: 'Collection & preservation', description: 'Recovering items in a way that prevents loss, contamination and alteration.' },
      { title: 'Laboratory examination', description: 'Applying validated methods under quality-controlled conditions.' },
      { title: 'Interpretation', description: 'Converting measurements into conclusions with explicitly stated uncertainty.' },
      { title: 'Reporting & court', description: 'Presenting what the science supports — and what it does not.' },
    ],
    applications: [
      'Classifying and identifying evidence types',
      'Comparing questioned vs known material',
      'Reconstructing event sequences and contact patterns',
      'Providing statistical strength for source questions',
    ],
    limitations: [
      'Results are probabilistic, not absolute certainties',
      'Presumptive tests are screening, not proof',
      'Interpretation depends on context, which must remain transparent',
      'A match to a person is not a verdict — guilt is decided by the trier of fact',
    ],
    example:
      'A reddish stain is found on carpet. Forensic science asks: is it blood? Is it human? Whose could it be? How did it get there? Each answer comes with a level of confidence, not a guarantee.',
    relatedTopics: ['locard-principle', 'fundamental-principles', 'evidence-lifecycle', 'laboratory'],
    quiz: [
      {
        id: 'intr-1',
        type: 'mcq',
        question: 'Which best describes the role of a presumptive test?',
        options: ['It confirms the identity of evidence beyond doubt', 'It is a rapid screening test indicating possible presence', 'It replaces confirmatory analysis', 'It determines the exact donor of a stain'],
        answer: 'It is a rapid screening test indicating possible presence',
        explanation: 'Presumptive tests flag that a substance may be present. They are screening tools — confirmation requires additional, more specific testing.',
      },
      {
        id: 'intr-2',
        type: 'tf',
        question: 'A DNA match between an exhibit and a suspect proves the suspect committed the crime.',
        answer: 'False',
        explanation: 'A match supports that the evidence could share a source with the suspect. It does not, by itself, establish guilt — activity, intent and context are separate questions.',
      },
      {
        id: 'intr-3',
        type: 'mcq',
        question: 'What is the primary role of the crime scene documentation step?',
        options: ['To preserve a permanent, verifiable record before collection', 'To clean the scene', 'To assign blame early', 'To decide the verdict'],
        answer: 'To preserve a permanent, verifiable record before collection',
        explanation: 'Documentation (video, photography, sketches) captures the scene in its original state so that later findings can be verifiably placed back into context.',
      },
    ],
  },
  {
    id: 'locard-principle',
    title: "Locard's Exchange Principle",
    category: 'principles',
    discipline: 'Foundations',
    icon: 'transfer',
    color: 'cyan',
    definition: 'Whenever two objects come into contact, material is transferred between them.',
    simpleExplanation:
      'A person interacting with a place or another person both carries something away and leaves something behind — hairs, fibers, soil, chemicals or digital traces.',
    corePrinciple:
      'Contact creates exchange — but exchange is not proof of who, when or how.',
    whyItMatters:
      'Locard frames the entire search strategy for trace evidence and explains why forensic examiners seek even invisible traces.',
    process: [
      { title: 'Contact', description: 'Two surfaces meet and material transfers both ways.' },
      { title: 'Persistence', description: 'Transferred traces survive burial in other material — or are lost.' },
      { title: 'Recovery', description: 'Examiners search for and collect the trace where it landed.' },
      { title: 'Interpretation', description: 'The trace is interpreted with care about commonness, timing and transfer dynamics.' },
    ],
    applications: [
      'Drives trace-evidence collection (fibers, hair, soil, glass)',
      'Explains why scene personnel contaminate',
      'Motivates contamination control throughout the process',
    ],
    limitations: [
      'Not every contact leaves a detectable trace',
      'Transfers can occur without involvement in the incident',
      'A trace proves contact occurred — never automatically who caused it',
      'Most traces decay, wash away, or are common in the environment',
    ],
    example:
      'A burglar\u2019s shirt catches fibers on a splintered door frame. The fibers transfer — but the burglar may equally have leaned against the door minutes earlier while watching the house.',
    relatedTopics: ['introduction', 'fundamental-principles', 'physical-evidence', 'evidence-lifecycle'],
    quiz: [
      {
        id: 'loc-1',
        type: 'mcq',
        question: 'A fiber found on a suspect matches fibers in a burgled room. What can be concluded?',
        options: [
          'The suspect committed the burglary',
          'Contact occurred, but timing and activity require more evidence',
          'The fiber is crushing',
          'Nothing about this can ever be interpreted',
        ],
        answer: 'Contact occurred, but timing and activity require more evidence',
        explanation: 'Locard predicts transfer on contact, but fibers are common and transfer easily. A match supports contact, not activity, timing, or guilt.',
      },
      {
        id: 'loc-2',
        type: 'tf',
        question: 'Locard\u2019s principle guarantees that every contact leaves a detectable trace.',
        answer: 'False',
        explanation: 'Transfer is likely but not guaranteed, and even transferred traces may be undetectable, destroyed, or removed before collection.',
      },
    ],
  },
  {
    id: 'fundamental-principles',
    title: 'Fundamental Forensic Principles',
    category: 'principles',
    discipline: 'Foundations',
    icon: 'scale',
    color: 'slate',
    definition:
      'The core ideas that govern how evidence is treated: identity, comparison, change, continuity, analysis and honest probability.',
    simpleExplanation:
      'Forensic work is built on a few rules — evidence changes over time, must stay traceable, is analyzed and interpreted, and conclusions are statements of probability, not certainty.',
    corePrinciple:
      'Separate the measurement from the story, and always state uncertainty.',
    whyItMatters:
      'Understanding the principles lets students see why protocols, quality control and cautious reporting exist — they protect the truth-finding function of science.',
    process: [
      { title: 'Identify', description: 'Establish what the evidence is using validated methods.' },
      { title: 'Compare', description: 'Questioned vs known material, condition-matched.' },
      { title: 'Protect', description: 'Maintain continuity, minimize change and contamination.' },
      { title: 'Interpret', description: 'Translate data into conclusions with quantified uncertainty.' },
      { title: 'Report', description: 'State findings, their basis and their limits.' },
    ],
    applications: [
      'Designing protocols that guard every stage of the evidence life-cycle',
      'Choosing statistical language that fits the real strength of results',
      'Keeping analysis and opinion logically separate in reports',
    ],
    limitations: [
      'Principle does not equal performance — errors still occur',
      'Statistics depend on honest population data',
      'Context can bias comparison — blind and sequential procedures exist to limit it',
    ],
    example:
      'Two paint chips are "visually indistinguishable" under the microscope — but the elemental comparison may only support a class-level conclusion. The principle of honest probability demands the report say exactly that.',
    relatedTopics: ['introduction', 'locard-principle', 'evidence-types', 'evidence-lifecycle'],
    quiz: [
      {
        id: 'fp-1',
        type: 'mcq',
        question: 'Why is analysis kept separate from interpretation in forensic reporting?',
        options: [
          'To make reports longer',
          'To prevent measurement facts from being overstated as story conclusions',
          'Because analysis is optional',
          'To hide uncertainty',
        ],
        answer: 'To prevent measurement facts from being overstated as story conclusions',
        explanation: 'Measuring that something is human blood (analysis) is different from concluding who deposited it (interpretation). Separating them protects honesty.',
      },
      {
        id: 'fp-2',
        type: 'tf',
        question: 'Calibration means checking an instrument\u2019s results against known reference standards.',
        answer: 'True',
        explanation: 'Calibration compares readings with certified reference material so measurements are traceable and reliable.',
      },
    ],
  },

  // ═══════════════════ FORENSIC BIOLOGY ═══════════════════
  {
    id: 'blood',
    title: 'Blood & Bloodstain Evidence',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'blood',
    color: 'crimson',
    definition:
      'The study of blood as evidence: its detection, its identification as human or animal, its grouping, and the information carried in its stains.',
    simpleExplanation:
      'Blood stains carry three kinds of information: is it blood?, whose could it be?, and (from the stain shape and position) how did it get there?',
    corePrinciple:
      'Always walk presumptive → confirmatory → individualizing: screening first, certainty later.',
    whyItMatters:
      'Blood is common, meaningful evidence because it is personal, delicate, and its positions record physical events around the moment it was shed.',
    process: [
      { title: 'Locate and document', description: 'Find stains by normal light then enhanced methods; photograph each with scale before any testing.' },
      { title: 'Presumptive screening', description: 'Luminol or Kastle-Meyer indicate whether blood may be present.' },
      { title: 'Species determination', description: 'Confirm human (or species) origin — usually by confirmatory/serological methods.' },
      { title: 'Individualization', description: 'DNA typing (STR profiling) turns the sample into a statistically powerful comparison.' },
      { title: 'Pattern interpretation', description: 'Size, shape and distribution of stains reconstruct events (with careful limits).' },
    ],
    applications: [
      'Locating hidden or cleaned stains (luminol)',
      'Narrowing possible donors by grouping',
      'Providing DNA for individualization',
      'Reconstructing movement, impact and sequence',
    ],
    limitations: [
      'Presumptive tests are not definitive for blood',
      'Stains degrade and become contaminated',
      'Grouping rarely identifies a single individual',
      'Pattern interpretation is not a precise "science" — its language must remain careful',
    ],
    example:
      'At a scene, a faint reddish-brown deposit on a wall gives a pink Kastle-Meyer result. That result is classed "presumptive for blood" — it still needs species confirmation and, later, profiling.',
    relatedTopics: ['presumptive-blood-tests', 'abo-blood-grouping', 'serology', 'dna-profiling'],
    quiz: [
      {
        id: 'blo-1',
        type: 'mcq',
        question: 'A luminol reaction is best described as:',
        options: [
          'A confirmatory test for blood',
          'A presumptive indicator that blood may be present',
          'An individualizing test',
          'A species determination test',
        ],
        answer: 'A presumptive indicator that blood may be present',
        explanation: 'Luminol is a sensitive screening tool; its chemistry is not specific enough to confirm blood or to identify any individual.',
      },
      {
        id: 'blo-2',
        type: 'mcq',
        question: 'Where does the information in bloodstain patterns most often come from?',
        options: [
          'The DNA sequence alone',
          'The size, shape and distribution of stains in relation to the scene',
          'The color of the drying stain',
          'The volume of blood collected',
        ],
        answer: 'The size, shape and distribution of stains in relation to the scene',
        explanation: 'Patterns record physical events — impact angles, drips, swipes — but their interpretation is contextual and must be stated with appropriate caution.',
      },
    ],
  },
  {
    id: 'abo-blood-grouping',
    title: 'ABO Blood Grouping',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'abo',
    color: 'crimson',
    definition:
      'Classification of blood into groups A, B, AB and O based on the A and B carbohydrate antigens present on red cells.',
    simpleExplanation:
      'Your red cells wear markers — A, B, both, or neither. Your plasma carries the opposite antibodies. That combination is your ABO group.',
    corePrinciple:
      'Antigen style on the cell + antibody style in the plasma define the group, and agglutination tests reveal it.',
    whyItMatters:
      'ABO grouping can exclude potential donors, support inclusion, and help direct DNA testing — but it almost never individualizes on its own.',
    process: [
      { title: 'Collect the sample', description: 'Fresh blood, dried stain extract, or known reference.' },
      { title: 'Forward typing', description: 'Mix red cells with Anti-A and Anti-B reagent — observe clumping.' },
      { title: 'Reverse typing', description: 'Mix plasma with known A and B cells — observe the reverse reaction.' },
      { title: 'Interpret', description: 'Match forward and reverse results to the ABO table.' },
    ],
    applications: [
      'Excluding potential donors',
      'Supporting inclusion when grouped together with other evidence',
      'Quality-checking newly transferred samples in the lab',
    ],
    limitations: [
      'ABO typing does not uniquely identify an individual',
      'Multiple people share each group (up to ~40% share group O)',
      'Dried, degraded or contaminated stains may give weak reactions',
    ],
    example:
      'Stain from a scene types as group A. The suspect is group B. On ABO grounds alone, the stain cannot have come from the suspect — a useful exclusion.',
    simulator: 'abo',
    relatedTopics: ['antigen-antibody', 'agglutination', 'serology', 'blood'],
    quiz: [
      {
        id: 'abo-1',
        type: 'mcq',
        question: 'Which blood group has both A and B antigens on the red cells?',
        options: ['A', 'B', 'AB', 'O'],
        answer: 'AB',
        explanation: 'Group AB cells carry both A and B antigens and have neither anti-A nor anti-B in plasma.',
      },
      {
        id: 'abo-2',
        type: 'mcq',
        question: 'A person of group A has which plasma antibody?',
        options: ['Anti-A', 'Anti-B', 'Both', 'Neither'],
        answer: 'Anti-B',
        explanation: 'Group A cells carry the A antigen, so plasma produces anti-B to avoid self-reaction.',
      },
      {
        id: 'abo-3',
        type: 'tf',
        question: 'ABO grouping can conclusively identify a single person as the donor of a bloodstain.',
        answer: 'False',
        explanation: 'ABO groups are shared by large numbers of people. Grouping may exclude or provide a probabilistic inclusion but does not individualize.',
      },
    ],
  },
  {
    id: 'antigen-antibody',
    title: 'Antigens and Antibodies',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'lock',
    color: 'crimson',
    definition:
      'Antigens are markers recognized by the immune system; antibodies are proteins that bind specifically to particular antigens.',
    simpleExplanation:
      'Think of antibodies as shaped keys and antigens as matching locks — a key only opens its own lock, which is why blood typing is so specific.',
    corePrinciple:
      'Specificity of binding is the engine behind serology: anti-A binds A antigens, not B.',
    whyItMatters:
      'The Specific-binding of antibodies to antigens is what makes tests like ABO grouping, species testing and immunodiffusion possible.',
    process: [
      { title: 'Bind', description: 'Antibody searches for its matching antigen and attaches.' },
      { title: 'Bridge', description: 'A single antibody can link two cells carrying the same antigen.' },
      { title: 'Cross-link', description: 'Many antibodies bridge many cells into a lattice.' },
      { title: 'Observe', description: 'The lattice becomes visible clumping — agglutination.' },
    ],
    applications: [
      'ABO grouping forward and reverse typing',
      'Species determination',
      'Immunodiffusion precipitin lines',
    ],
    limitations: [
      'Reactions can be weak in degraded samples',
      'Cross-reactions with similar antigens are possible',
      'Binding is specific to the structure tested — not a general detector',
    ],
    example:
      'Add anti-A reagent to group A cells: specific binding, bridging and clumping. Add the same reagent to group B cells: nothing happens.',
    simulator: 'bloodtyping',
    relatedTopics: ['abo-blood-grouping', 'agglutination', 'immunodiffusion'],
    quiz: [
      {
        id: 'aa-1',
        type: 'mcq',
        question: 'What are ABO antigens chemically?',
        options: ['Proteins', 'Carbohydrate (glycan) structures', 'Lipid bilayers', 'Nucleic acids'],
        answer: 'Carbohydrate (glycan) structures',
        explanation: 'ABO antigens are carbohydrate structures presented on the red cell surface — not proteins.',
      },
      {
        id: 'aa-2',
        type: 'tf',
        question: 'An antibody will bind any antigen it happens to meet.',
        answer: 'False',
        explanation: 'Antibody binding is specific. Anti-A binds A antigens; it does not bind B antigens.',
      },
    ],
  },
  {
    id: 'agglutination',
    title: 'Agglutination',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'lattice',
    color: 'crimson',
    definition:
      'Visible clumping of particulate material caused by antibodies cross-linking antigens on separate particles.',
    simpleExplanation:
      'Antibodies turn individual cells into clumps: each antibody bridges two cells, and many bridges build a visible cluster.',
    corePrinciple:
      'Clumping is the visible endpoint of specific antigen-antibody binding on particulate antigens.',
    whyItMatters:
      'Agglutination is the readout of ABO blood typing — the basis of the grouping tests that move blood evidence from "a stain" to "a group."',
    process: [
      { title: 'A cell', description: 'A red cell presents A antigens on its surface.' },
      { title: 'Antibody binds', description: 'Anti-A attaches to those antigens.' },
      { title: 'Cross-linking', description: 'Each antibody links its binding site to antigens on two cells.' },
      { title: 'Lattice forms', description: 'Networks grow until clumps are big enough to see.' },
    ],
    applications: [
      'ABO forward and reverse grouping',
      'Detecting naturally occurring isohemagglutinins',
      'Quality-checking reagent specificity',
    ],
    limitations: [
      'Not every clump is agglutination — rouleaux and contamination can mimic it',
      'Weak or degraded samples may fail to clump clearly',
      'Agglutination identifies a group, not a person',
    ],
    example:
      'Group A cells + Anti-A → clumping (agglutination). Group A cells + Anti-B → no clumping. The pattern of which reagent clumps tells you the group.',
    simulator: 'bloodtyping',
    relatedTopics: ['antigen-antibody', 'abo-blood-grouping', 'blood'],
    quiz: [
      {
        id: 'agg-1',
        type: 'mcq',
        question: 'Agglutination and precipitation are best described as:',
        options: [
          'The same phenomenon with two names',
          'Different phenomena — clumping of particles vs insolubilization of soluble complexes',
          'Both confirmatory for DNA',
          'Unrelated to immunity',
        ],
        answer: 'Different phenomena — clumping of particles vs insolubilization of soluble complexes',
        explanation: 'Agglutination involves particulate antigens and visible cell clumping; precipitation involves soluble antigen forming an insoluble complex.',
      },
      {
        id: 'agg-2',
        type: 'mcq',
        question: 'In ABO forward typing, agglutination with Anti-B reagent indicates:',
        options: ['The cells carry B antigen', 'The cells carry A antigen', 'The plasma has Anti-B', 'The sample is contaminated'],
        answer: 'The cells carry B antigen',
        explanation: 'Anti-B reagent clumps only cells carrying the B antigen. Agglutination here reports the cells\u2019 antigen type.',
      },
    ],
  },
  {
    id: 'precipitation',
    title: 'Precipitation',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'precip',
    color: 'crimson',
    definition:
      'Formation of an insoluble antigen-antibody complex when soluble antigen meets antibody in optimal proportions.',
    simpleExplanation:
      'Soluble markers and antibodies join into a visible cloud or line — like smoke meeting smoke — instead of cells clumping.',
    corePrinciple:
      'Precipitation needs the "just right" ratio of antigen and antibody; too much of either dissolves the visible product.',
    whyItMatters:
      'Precipitation is the chemistry that makes gel immunodiffusion and species testing work for biological stains.',
    process: [
      { title: 'Diffuse', description: 'Soluble antigen and antibody drift toward each other.' },
      { title: 'Meet', description: 'At the frontier, concentrations reach optimal ratio.' },
      { title: 'Complex', description: 'Cross-linked antigen-antibody lattice precipitates in the zone.' },
      { title: 'Line forms', description: 'A visible white precipitin line marks the position of the reaction.' },
    ],
    applications: [
      'Ouchterlony double immunodiffusion',
      'Species determination of bloodstains',
      'Detecting soluble microbial or protein targets',
    ],
    limitations: [
      'Requires adequate concentration and correct proportions',
      'Excess of one reactant can hide the reaction',
      'Reactions reveal similarity, not identity of a specific person',
    ],
    example:
      'Human serum is put in one well and anti-human serum in another of an agarose gel. The two fronts meet and a precipitin line forms — evidence the antigen matches the antibody\u2019s target.',
    simulator: 'immunodiffusion',
    relatedTopics: ['immunodiffusion', 'agglutination', 'serology'],
    quiz: [
      {
        id: 'pre-1',
        type: 'mcq',
        question: 'What is required for a precipitin line to form in gel immunodiffusion?',
        options: [
          'A detergent buffer only',
          'Optimal proportions of soluble antigen and antibody as they meet',
          'Red cells clumping together',
          'A DNA polymerase enzyme',
        ],
        answer: 'Optimal proportions of soluble antigen and antibody as they meet',
        explanation: 'The line appears where soluble antigen and antibody meet in the correct ratio so cross-linked complexes precipitate.',
      },
      {
        id: 'pre-2',
        type: 'tf',
        question: 'Precipitation and agglutination are the same underlying phenomenon with different names.',
        answer: 'False',
        explanation: 'They are different phenomena: particle clumping for agglutination vs insoluble complex formation from soluble reactants for precipitation.',
      },
    ],
  },
  {
    id: 'serology',
    title: 'Forensic Serology',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'serology',
    color: 'crimson',
    definition:
      'The branch of forensic biology that detects and characterizes biological fluids using antigen-antibody and enzymatic reactions.',
    simpleExplanation:
      'Serology decides "is this blood? sperm? saliva? — and is it human?" using the body\u2019s own immune chemistry.',
    corePrinciple:
      'Detect category first (presumptive), then confirm identity, then individualize — each tier has different strength.',
    whyItMatters:
      'A presumptive hit means little until species and source are addressed; serology supplies that scientific discipline and feeds the DNA pipeline.',
    process: [
      { title: 'Screen', description: 'Presumptive tests indicate possible blood/semen/saliva.' },
      { title: 'Confirm', description: 'Human-specific and species tests increase confidence.' },
      { title: 'Characterize', description: 'Grouping, ABO or enzyme markers provide exclusion power.' },
      { title: 'Individualize', description: 'DNA profiling takes over where serology leaves off.' },
    ],
    applications: [
      'Confirming body-fluid nature before DNA work',
      'Species determination (human vs animal)',
      'Prioritizing which stains to profile',
    ],
    limitations: [
      'Serological markers rarely individualize',
      'Mixtures and degradation complicate results',
      'Presumptive endpoints must be interpreted cautiously',
    ],
    example:
      'A suspicious stain gives a positive presumptive result, is confirmed as human blood of group B with anti-A plasma antibody, and is then submitted for STR profiling.',
    relatedTopics: ['presumptive-blood-tests', 'abo-blood-grouping', 'immunodiffusion', 'human-vs-animal'],
    quiz: [
      {
        id: 'ser-1',
        type: 'mcq',
        question: 'Why is species determination important before DNA profile requests?',
        options: [
          'Because human and animal DNA is always identical',
          'Because presumptive tests are not species-specific for humans',
          'Because animals cannot leave blood at scenes',
          'It is never important',
        ],
        answer: 'Because presumptive tests are not species-specific for humans',
        explanation: 'Presumptive tests detect blood-like activity. Confirming "human" prevents wasted analysis and mislabelled evidence.',
      },
      {
        id: 'ser-2',
        type: 'tf',
        question: 'In forensic serology, presumptive positive results are considered definitive proof the fluid is blood.',
        answer: 'False',
        explanation: 'Presumptive results are screening endpoints; confirmatory and species-specific work is required before firm conclusions.',
      },
    ],
  },
  {
    id: 'immunodiffusion',
    title: 'Double Immunodiffusion (Ouchterlony)',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'gel',
    color: 'crimson',
    definition:
      'A technique in which antigen and antibody diffuse toward each other through a gel and form a visible precipitin line where they react.',
    simpleExplanation:
      'Two fronts walk toward each other through jelly; where the right amounts meet, they build a visible white line.',
    corePrinciple:
      'Identity, non-identity or partial identity of two antigens can be read from how precipitin lines connect.',
    whyItMatters:
      'The line patterns let a scientist ask "is this antigen the same as that reference antigen?" — the classic tool in species and identity testing.',
    process: [
      { title: 'Cut wells', description: 'Wells are punched in agarose gel in a template pattern.' },
      { title: 'Load', description: 'Antigen goes in one well, antibody in the facing well.' },
      { title: 'Diffuse', description: 'Both fronts spread radially through the gel over hours.' },
      { title: 'React', description: 'At optimal proportions the two fronts form a precipitin line.' },
      { title: 'Read', description: 'Line shapes between adjacent wells reveal relationships.' },
    ],
    applications: [
      'Species confirmation of human bloodstains',
      'Detecting soluble antigens from a stain extract',
      'Teaching and quality verification of serology concepts',
    ],
    limitations: [
      'Slow (hours to days) and concentration-dependent',
      'Degraded samples give weak or absent lines',
      'Shows similarity of class, not identity of a person',
    ],
    example:
      'Anti-human serum in the center well; a questioned stain extract in one outer well and a known human control in another — identical line contiguity indicates a reaction of identity.',
    simulator: 'immunodiffusion',
    relatedTopics: ['precipitation', 'serology', 'antigen-antibody'],
    quiz: [
      {
        id: 'imm-1',
        type: 'mcq',
        question: 'In Ouchterlony testing, what does the formation of a precipitin line between a stain extract well and an anti-human well indicate?',
        options: [
          'The stain is definitely the suspect\u2019s blood',
          'The stain extract contains a soluble antigen recognized by anti-human antibodies',
          'The suspect has DNA',
          'The gel is contaminated',
        ],
        answer: 'The stain extract contains a soluble antigen recognized by anti-human antibodies',
        explanation: 'The line means the antibody reacted with an antigen matching its specificity — here, a human-type antigen. It does not identify the individual.',
      },
      {
        id: 'imm-2',
        type: 'tf',
        question: 'Double immunodiffusion requires red blood cells to be present in the sample.',
        answer: 'False',
        explanation: 'Immunodiffusion uses soluble antigens. Red cells are not required — this is why agglutination and precipitation are distinct techniques.',
      },
    ],
  },
  {
    id: 'presumptive-blood-tests',
    title: 'Presumptive Blood Testing',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'testtube',
    color: 'crimson',
    definition:
      'Screening tests (luminol, Kastle-Meyer) that indicate blood may be present by detecting the heme-related peroxidase-like activity.',
    simpleExplanation:
      'Fast chemical "flashlights" that point at possible blood — a glow or a pink color. They point; they do not prove.',
    corePrinciple:
      'Positive = "worth further testing," never "this is blood" — always confirm and, where useful, individualize.',
    whyItMatters:
      'Screens decide where to sample for confirmatory and DNA testing, and luminol can reveal stains invisible to the eye — but interpreting a screen requires knowing its limits.',
    process: [
      { title: 'Suspected stain', description: 'A discoloration or an invisible, suspected area.' },
      { title: 'Test', description: 'Apply luminol spray or Kastle-Meyer sequence.' },
      { title: 'Reaction', description: 'Heme activates the chemistry: chemiluminescence or pink color.' },
      { title: 'Interpret', description: 'Class the result as presumptive — then proceed to confirmation.' },
      { title: 'Limit', description: 'Record what the test cannot say: species, person, or finality.' },
    ],
    applications: [
      'Locating faint, cleaned or diluted stains (luminol)',
      'Quick triage of many stains to prioritize sampling',
      'Screening swabs before confirmatory species work',
    ],
    limitations: [
      'Both tests are presumptive, not definitive',
      'Some plant peroxidases, household chemicals and metals can give positives',
      'Luminol can slightly dilute the DNA available for later testing',
      'Negative results don\u2019t exclude all blood',
    ],
    example:
      'Luminol glows blue over a floor corner where no stain is visible. The swab is screened, confirmed as human blood, then profiled. The glow alone was never the proof — it was the reason to look.',
    simulator: 'presumptive',
    relatedTopics: ['blood', 'serology', 'evidence-lifecycle', 'human-vs-animal'],
    quiz: [
      {
        id: 'ps-1',
        type: 'mcq',
        question: 'A positive Kastle-Meyer (pink) result means:',
        options: [
          'Blood is unequivocally present',
          'The sample may contain blood and requires confirmation',
          'The sample is human',
          'The sample is from a specific individual',
        ],
        answer: 'The sample may contain blood and requires confirmation',
        explanation: 'Kastle-Meyer is a presumptive color test for the peroxidase-like activity of heme. It is not species-specific and cannot individualize.',
      },
      {
        id: 'ps-2',
        type: 'mcq',
        question: 'Luminol produces a blue chemiluminescence through which activity?',
        options: [
          'The pseudoperoxidase activity of heme',
          'The fluorescein content of the blood',
          'DNA polymerase',
          'The ABO antibodies',
        ],
        answer: 'The pseudoperoxidase activity of heme',
        explanation: 'Heme\u2019s peroxidase-like activity catalyzes luminol oxidation, producing the blue glow — which is why the test can flag things other than blood.',
      },
    ],
  },
  {
    id: 'human-vs-animal',
    title: 'Human vs Animal Blood',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'species',
    color: 'crimson',
    definition:
      'The scientific distinction between blood of human origin and blood of animal origin using species-specific tests.',
    simpleExplanation:
      'Presumptive tests say "blood-like"; species tests narrow it to "human" — vital because scenes are also messy with animal life.',
    corePrinciple:
      'Species determination uses antibodies or sequences that recognize human-only epitopes — never the presumptive screen.',
    whyItMatters:
      'A meat stain, a pet injury, or contaminated food can produce presumptive positives; mislabeling would derail the investigation.',
    process: [
      { title: 'Presumptive screen', description: 'Blood-like activity confirmed by screening.' },
      { title: 'Species test', description: 'Anti-human antibody in gel diffusion, or species-specific DNA targets.' },
      { title: 'Interpret', description: 'Human vs non-human result recorded with its limitations.' },
      { title: 'Decide pathway', description: 'Human samples proceed to profiling; non-human may still matter to reconstruction.' },
    ],
    applications: [
      'Confirming human origin of stains before DNA work',
      'Understanding animal involvement at a scene',
      'Redirecting resources away from non-human positives',
    ],
    limitations: [
      'Cross-reactions between closely related species possible',
      'Degraded samples may destroy the epitopes tested',
      'Species determination never individualizes',
    ],
    example:
      'A garden knife blade glows under luminol. The extract hits anti-human antiserum in the gel and a precipitin line forms — the stain is human blood, so DNA work can follow.',
    relatedTopics: ['immunodiffusion', 'serology', 'presumptive-blood-tests'],
    quiz: [
      {
        id: 'hv-1',
        type: 'mcq',
        question: 'Which test specifically distinguishes human from animal blood?',
        options: ['Luminol', 'Kastle-Meyer', 'Species-reactive antibody tests or DNA targets', 'A simple color match'],
        answer: 'Species-reactive antibody tests or DNA targets',
        explanation: 'Only human-specific reagents or DNA sequences can discriminate species. Luminol and Kastle-Meyer cannot.',
      },
      {
        id: 'hv-2',
        type: 'tf',
        question: 'A confirmed species result identifies the exact human donor.',
        answer: 'False',
        explanation: 'Species determination confirms the category "human." Individualization is a further, separate step (DNA profiling).',
      },
    ],
  },
  {
    id: 'dna-profiling',
    title: 'DNA Profiling',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'dna',
    color: 'cyan',
    definition:
      'Analysis of highly variable DNA markers (short tandem repeats, STRs) to compare biological evidence with reference samples.',
    simpleExplanation:
      'DNA profiling reads repeating stretches that differ sharply between people, then reports how strongly a sample matches or excludes a reference.',
    corePrinciple:
      'Measure variation at many sites, compare to references, and express the result as a probability — not a guarantee.',
    whyItMatters:
      'DNA is the most powerful family line of individualization in current evidence — powerful enough that its statistics and limiting conditions must be handled honestly.',
    process: [
      { title: 'Biological evidence', description: 'Blood, semen, saliva, hair roots, tissue or bone.' },
      { title: 'Extraction', description: 'Recover DNA from the cells.' },
      { title: 'Quantification & quality', description: 'Measure how much and how intact the DNA is.' },
      { title: 'Amplification', description: 'PCR targets specific STR loci, multiplying them millions of times.' },
      { title: 'Separation', description: 'Capillary electrophoresis sizes the fragments by length.' },
      { title: 'Profile', description: 'Each locus shows one or two allele peaks.' },
      { title: 'Comparison', description: 'Questioned vs reference profiles are compared.' },
      { title: 'Interpretation', description: 'Random-match probability and mixture handling are stated honestly.' },
    ],
    applications: [
      'Excluding suspects with confidence',
      'Providing strong inclusion support at the source level',
      'Comparing cold-case exhibits and unidentified remains',
    ],
    limitations: [
      'Mixtures and low-template samples are hard to interpret',
      'Degraded DNA may give partial profiles',
      'Interpretation is statistical — never absolute identity',
      'Just because a person\u2019s DNA is present does not mean they did anything',
    ],
    example:
      'A semen stain from an assault kit yields a 16-locus STR profile. A suspect\u2019s reference profile matches at every locus; the estimated random-match probability is under 1 in a billion. The report gives the number — and still reminds the reader what the number does not say.',
    relatedTopics: ['central-dogma', 'blood', 'serology', 'evidence-lifecycle'],
    quiz: [
      {
        id: 'dna-1',
        type: 'mcq',
        question: 'What does a random-match probability (e.g., 1 in a billion) express?',
        options: [
          'That the suspect is guilty of the crime',
          'How common the profile is expected to be among randomly chosen unrelated people',
          'That DNA profiling is unreliable',
          'The exact time of deposition',
        ],
        answer: 'How common the profile is expected to be among randomly chosen unrelated people',
        explanation: 'The statistic estimates profile rarity in a population. It supports source-level reasoning; it says nothing about activity, intent or guilt.',
      },
      {
        id: 'dna-2',
        type: 'mcq',
        question: 'Why would a cream contain DNA but a nail clippings sample give only a weak profile?',
        options: [
          'DNA quantity and quality vary with the sample',
          'Nails never contain DNA',
          'Cream destroys DNA',
          'PCR always fails with nails',
        ],
        answer: 'DNA quantity and quality vary with the sample',
        explanation: 'Extracts differ in quantity, purity and degradation; quantification and quality checks determine whether profiling will succeed.',
      },
      {
        id: 'dna-3',
        type: 'tf',
        question: 'A full STR profile match is mathematically equivalent to absolute proof of identity.',
        answer: 'False',
        explanation: 'A match is a probability statement. It may be extraordinarily strong, but interpreting the number, the database and the context is still required.',
      },
    ],
  },
  {
    id: 'central-dogma',
    title: 'The Central Dogma of Molecular Biology',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'rna',
    color: 'cyan',
    definition:
      'The directional flow of genetic information: DNA can be copied (replication), read into RNA (transcription), and translated to protein; RNA can also be reverse-transcribed in retrograde flows, but the classical flow is DNA → RNA → protein.',
    simpleExplanation:
      'Cells keep their instruction manual in DNA, make working copies in RNA, and read those copies to build proteins — the molecules that actually do the work.',
    corePrinciple:
      'Sequence information flows from DNA to RNA to protein, and every cell in a person carries the same DNA blueprint.',
    whyItMatters:
      'DNA profiling depends on this flow — the same sequence in a bloodstain and a reference swab is why a match means a shared source. It also explains why tissues differ despite identical DNA.',
    process: [
      { title: 'DNA', description: 'The stable, inherited store of genetic information.' },
      { title: 'Replication', description: 'DNA copies itself before cell division — DNA → DNA.' },
      { title: 'Transcription', description: 'A gene is copied into messenger RNA — DNA → RNA.' },
      { title: 'Translation', description: 'Ribosomes read the mRNA to assemble proteins — RNA → protein.' },
    ],
    applications: [
      'Explaining why blood, saliva and hair roots give the same profile',
      'Frame STR marker biology and PCR amplification',
      'Clarifying when DNA analysis is even possible',
    ],
    limitations: [
      'Nuclear DNA is the same in all nucleated cells but mitochondria differ',
      'RNA is labile — analyzing it is a separate forensic frontier',
      'The dogma describes flow, not ethical or legal significance',
    ],
    example:
      'PCR amplification copies targeted STR regions the same way replication does — DNA polymerase building complementary strands — which is why enough DNA can be made from a tiny stain.',
    relatedTopics: ['dna-profiling', 'blood', 'serology'],
    quiz: [
      {
        id: 'cd-1',
        type: 'mcq',
        question: 'The classical central dogma flow is:',
        options: [
          'Protein → RNA → DNA',
          'DNA → RNA → protein',
          'RNA → protein → DNA',
          'DNA → protein → RNA',
        ],
        answer: 'DNA → RNA → protein',
        explanation: 'Information is transcribed from DNA to RNA and translated from RNA to protein. Replication is an additional DNA → DNA copying step.',
      },
      {
        id: 'cd-2',
        type: 'tf',
        question: 'Transcription produces a messenger RNA copy of a gene from DNA.',
        answer: 'True',
        explanation: 'Transcription uses DNA as the template to build a complementary mRNA strand, which then carries the information to the ribosome for translation.',
      },
    ],
  },

  // ═══════════════════ CRIME SCENE & INVESTIGATION ═══════════════════
  {
    id: 'physical-evidence',
    title: 'Physical Evidence',
    category: 'laboratory',
    discipline: 'Evidence Foundation',
    icon: 'bag',
    color: 'slate',
    definition:
      'Any tangible material or object that plays a vital role in the matter giving rise to litigation — introduced in a trial to prove a fact in issue based on its demonstrable physical characteristics.',
    simpleExplanation:
      'Physical evidence is the real, touchable thing — a stain, a mark, a fragment — that the laboratory can examine and the court can be shown, unlike a witnesses memory.',
    corePrinciple:
      'Physical evidence does not describe everything by itself, but it can support or contradict the accounts of witnesses and suspects.',
    whyItMatters:
      'Evidence recovered from the scene is crucial to the reconstruction of events. It generates leads, confirms or contradicts witness versions, and helps the jury weigh the crime story.',
    process: [
      { title: 'Discovering', description: 'Locating possible evidence at the scene.' },
      { title: 'Recognizing', description: 'Deciding that an item has potential evidential value.' },
      { title: 'Examining', description: 'Initial scientific screening and characterization.' },
      { title: 'Collecting', description: 'Recovering the item so nothing is lost or contaminated.' },
      { title: 'Recording', description: 'Documenting identity, location and condition.' },
      { title: 'Identifying', description: 'Linking the item to a case and a source.' },
      { title: 'Packaging & storing', description: 'Protecting the item in transit and storage.' },
      { title: 'Exhibiting in court', description: 'Presenting the item with its documented history.' },
      { title: 'Disposing', description: 'Returning or destroying evidence when the case closes.' },
    ],
    applications: [
      'Supporting or contradicting eyewitness accounts',
      'Generating investigative leads',
      'Confirming a crime reconstruction for a jury',
      'Providing the substrate for every laboratory method',
    ],
    limitations: [
      'Evidence alone rarely tells the full sequence of events',
      'Its value depends on the number, type and potential of the items recovered',
      'Poor handling destroys its legal and scientific worth',
      'Presence of a source is not proof of activity',
    ],
    example:
      'Blood found on a knife handle can place the knife at the scene and tie it to a person — but it does not by itself say who held the knife, when, or with what intention.',
    relatedTopics: ['locard-principle', 'evidence-lifecycle', 'crime-scene-procedures', 'crime-scene-searching'],
    quiz: [
      {
        id: 'pe-1',
        type: 'mcq',
        question: 'Which best describes physical evidence?',
        options: ['A tangibly existing material or object used to prove a fact in issue', 'Only biological samples', 'A witnesses description of events', 'A lawyer\u2019s submission'],
        answer: 'A tangibly existing material or object used to prove a fact in issue',
        explanation: 'Physical evidence is demonstrable by its physical characteristics — a real object the court can be shown, examined and reasoned about.',
      },
      {
        id: 'pe-2',
        type: 'mcq',
        question: 'What is the correct sequence of processing steps for physical evidence?',
        options: ['Collect, then discover, then record', 'Discover, recognize, examine, collect, record, identify, package, exhibit, dispose', 'Package before display', 'Identify before discovering'],
        answer: 'Discover, recognize, examine, collect, record, identify, package, exhibit, dispose',
        explanation: 'The nine-step flow starts with discovery and recognition and ends with exhibition in court and disposal when the case closes.',
      },
    ],
  },
  {
    id: 'crime-scene-procedures',
    title: 'Crime-Scene Investigation Procedures',
    category: 'laboratory',
    discipline: 'Evidence Foundation',
    icon: 'eye',
    color: 'amber',
    definition:
      'The structured sequence of actions at a crime scene — from securing safety, to systematic searching, to an unbroken chain of custody and reconstruction.',
    simpleExplanation:
      'A checklist of steps the first responder and team follow so the scene is protected, evidence is found and documented, and nothing contaminates the case.',
    corePrinciple:
      'The scene is dynamic and ever changing — the quality of the first response decides whether the crime can be solved at all.',
    whyItMatters:
      'Contamination and missed evidence are irreversible. A scene that is not secured, photographed and searched properly can handicap every later laboratory result.',
    process: [
      { title: 'Maximize safety & secure the scene', description: 'First responders protect people and establish the perimeter.' },
      { title: 'Separate the witnesses', description: 'Keep witnesses apart so their accounts cannot contaminate each other.' },
      { title: 'Scan the scene', description: 'Identify primary and secondary scenes and their relationship.' },
      { title: 'See the scene', description: 'Observe carefully and make permanent photo records, using triangulation for outdoor objects.' },
      { title: 'Sketch the scene', description: 'Draw an accurate rough sketch using two fixed landmarks as reference points.' },
      { title: 'Search for evidence', description: 'Use a systematic geometric search pattern.' },
      { title: 'Secure & collect evidence', description: 'Gather fragile or contaminable items first; package individually.' },
      { title: 'Maintain chain of custody', description: 'Record every custodian from scene to courtroom.' },
      { title: 'Reconstruct', description: 'Form hypotheses about the events using evidence, tested openly.' },
    ],
    applications: [
      'Standardizing first-responder behaviour',
      'Preventing contamination and loss',
      'Protecting admissibility through chain of custody',
      'Building case narratives the court can follow',
    ],
    limitations: [
      'Staged scenes are especially hard to interpret',
      'Perimeters are porous to "official sightseers"',
      'Reconstruction is hypothesis, not certainty',
    ],
    example:
      'In a domestic disturbance call, the first officer checks for hazards, calls medical help, then tapes a broad perimeter before any evidence is touched — because an under-defined scene is worse than an over-defined one.',
    relatedTopics: ['physical-evidence', 'crime-scene-searching', 'criminal-investigation', 'evidence-lifecycle'],
    quiz: [
      {
        id: 'csp-1',
        type: 'mcq',
        question: 'What are the two primary tasks of the first-responding officer?',
        options: ['Arrest suspects and interview neighbours', 'Ensure safety/security and protect the crime scene', 'Collect all evidence immediately', 'Decide the verdict'],
        answer: 'Ensure safety/security and protect the crime scene',
        explanation: 'First responders first protect everyone in the area, then protect the scene by defining and controlling the perimeter.',
      },
      {
        id: 'csp-2',
        type: 'mcq',
        question: 'Why are witnesses separated from each other?',
        options: ['To speed up the investigation', 'To stop their memories contaminating one another', 'Because witnesses must not talk to police', 'To save time'],
        answer: 'To stop their memories contaminating one another',
        explanation: 'Studies show co-witnesses influence each other: an error or belief of one can be incorporated into anothers account.',
      },
      {
        id: 'csp-3',
        type: 'tf',
        question: 'It is better to over-define a crime scene perimeter than to under-define it.',
        answer: 'True',
        explanation: 'An over-defined area can be narrowed later, but a scene left too open allows contamination that can never be undone.',
      },
    ],
  },
  {
    id: 'crime-scene-searching',
    title: 'Searching Methods & Scene Documentation',
    category: 'laboratory',
    discipline: 'Evidence Foundation',
    icon: 'camera',
    color: 'amber',
    definition:
      'The systematic geometric patterns used to search a scene completely, paired with photographic and sketched documentation that records the scene before any change.',
    simpleExplanation:
      'Investigators walk the scene in patterns — spiral, grid, strip or zone — so no part is missed, while cameras and sketches freeze the scene as it was found.',
    corePrinciple:
      'The aim of every search method is that each part of the area is searched extremely well — thoroughness beats randomness.',
    whyItMatters:
      'Evidence is lost when a scene is searched by impulse. Patterns guarantee coverage, and documentation preserves the context that gives evidence its meaning.',
    process: [
      { title: 'Spiral search', description: 'Move in widening or narrowing circles from a central point.' },
      { title: 'Grid method', description: 'Search in one direction, then at right angles over the same ground.' },
      { title: 'Strip/linear search', description: 'Walk straight parallel lines; fits a single investigator.' },
      { title: 'Quadrant/zone pattern', description: 'Divide the scene into zones; fits large teams.' },
      { title: 'Seeing & photographing', description: 'Photograph area and close-ups from multiple angles, using triangulation.' },
      { title: 'Sketching', description: 'Make an accurate drawing referenced to two fixed landmarks.' },
    ],
    applications: [
      'Complete coverage of floors, rooms, vehicles and outdoor areas',
      'Selecting the pattern to the number of investigators available',
      'Permanent records for court presentation',
    ],
    limitations: [
      'Minute trace evidence still needs extra light and careful technique',
      'A sketch is only as good as the reference points it uses',
      'Search patterns reveal what is searched and how carefully',
    ],
    example:
      'A small scene with one officer is walked as a single linear strip; a warehouse is divided into labelled zones, each searched by a pair of investigators walking the grid.',
    relatedTopics: ['physical-evidence', 'crime-scene-procedures', 'locard-principle', 'evidence-lifecycle'],
    quiz: [
      {
        id: 'css-1',
        type: 'mcq',
        question: 'Which search pattern is most suited to a single investigator?',
        options: ['Quadrant/zone', 'Linear (strip) search', 'Grid by large teams', 'Multilevel containment'],
        answer: 'Linear (strip) search',
        explanation: 'A linear pattern works with one investigator; quadrant/zone patterns suit larger teams searching defined sectors.',
      },
      {
        id: 'css-2',
        type: 'mcq',
        question: 'Why use two fixed stationary landmarks when sketching a scene?',
        options: ['For decoration', 'So all objects/evidence can be measured against fixed references', 'Because sketches are optional anyway', 'To confuse the defense'],
        answer: 'So all objects/evidence can be measured against fixed references',
        explanation: 'Fixed landmarks let every object be located precisely, giving anyone who was not present an accurate mental picture of the scene.',
      },
    ],
  },
  {
    id: 'criminal-investigation',
    title: 'Introduction to Criminal Investigation',
    category: 'other',
    discipline: 'Investigation',
    icon: 'report',
    color: 'slate',
    definition:
      'The use of scientific methods and principles to collect various kinds of evidence with the goal of establishing the series of events surrounding a crime and eventually solving it.',
    simpleExplanation:
      'Investigators work backwards from a crime to find who did it, why, and how — never falsely implicating the innocent.',
    corePrinciple:
      'A perpetrator is likely to make an error and leave evidence behind — hair, fibers, fingerprints or a witness — that later drives the investigation.',
    whyItMatters:
      'Investigations protect victims, witnesses and suspects alike. A sound case file is what turns arrests into just prosecutions.',
    process: [
      { title: 'Reactive investigation', description: 'Respond to a crime already committed (murder, theft).' },
      { title: 'Proactive investigation', description: 'Act against ongoing or anticipated criminal activity (patrol, intelligence).' },
      { title: 'Reconstruction', description: 'Guide theories about how the crime was committed; keep them flexible against new data.' },
    ],
    applications: [
      'Establishing that a crime was committed',
      'Identifying the perpetrator',
      'Documenting and preserving all evidence',
      'Prosecuting the offender and recovering stolen property',
    ],
    limitations: [
      'The extent of investigation depends on crime nature and available resources',
      'Eyewitness memory can distort',
      'Guiding theories must be discarded when contradicted by evidence',
    ],
    example:
      'Inductive reasoning: studies show rapists are often known to the victim, so profiling infers the offender of an unsolved rape is likely known to the victim. Deductive reasoning instead applies general crime facts to draw conclusions about one specific offender.',
    relatedTopics: ['crime-scene-procedures', 'evidence-types', 'physical-evidence', 'chain-of-custody'],
    quiz: [
      {
        id: 'ci-1',
        type: 'mcq',
        question: 'Which describes the proactive approach to investigation?',
        options: ['Responding after a murder', 'Acting against ongoing or anticipated criminal activity', 'Interviewing victims', 'Serving a warrant'],
        answer: 'Acting against ongoing or anticipated criminal activity',
        explanation: 'Proactive investigation occurs in response to ongoing activity or before a crime is committed — patrol and intelligence based — so investigators control the process.',
      },
      {
        id: 'ci-2',
        type: 'mcq',
        question: 'Which reasoning goes from general principles to a specific case?',
        options: ['Inductive', 'Deductive', 'Intuition', 'Random'],
        answer: 'Deductive',
        explanation: 'Deductive reasoning moves general to specific; inductive reasoning infers a general principle from specific observations.',
      },
    ],
  },
  {
    id: 'evidence-types',
    title: 'Types & Forms of Evidence',
    category: 'other',
    discipline: 'Investigation',
    icon: 'court',
    color: 'slate',
    definition:
      'Evidence is classified by how it relates to the fact in issue — direct versus circumstantial — and by its form: testimonial, physical, documentary or demonstrative.',
    simpleExplanation:
      'Direct evidence proves the disputed fact with no intervening step; circumstantial evidence requires an inference. Forms describe whether it is spoken, real, written or recreated.',
    corePrinciple:
      'Whatever its type or form, evidence must be relevant and probative — able to prove or disprove something more probably than not.',
    whyItMatters:
      'Understanding the classification tells investigators what each piece can contribute, how it must be collected and how it will be presented and tested in court.',
    process: [
      { title: 'Direct evidence', description: 'Proves the disputed fact directly — a witness who saw the stabbing, a confession.' },
      { title: 'Circumstantial evidence', description: 'Requires inference — fingerprints on the knife connect the suspect indirectly to the crime.' },
      { title: 'Testimonial', description: 'Eyewitness and witness reports; common but memory-dependent.' },
      { title: 'Physical', description: 'Objective items with dimensions — fingerprints, blood stains, tyre marks.' },
      { title: 'Documentary', description: 'Written records — letters, notes, photographs.' },
      { title: 'Demonstrative', description: 'Recreates already-presented evidence — sketches, diagrams, models.' },
    ],
    applications: [
      'Weighting what each exhibit can prove',
      'Designing scientific collection and analysis',
      'Preparing court presentations',
    ],
    limitations: [
      'Direct evidence is not automatically stronger — eyewitnesses make errors',
      'Circumstantial chains are only as strong as the inference they demand',
      'All evidence must pass relevance and probative value tests',
    ],
    example:
      'A witness who says she saw the defendant stab the victim gives direct testimonial evidence. The knife with the suspects fingerprints found in the victims wound is circumstantial physical evidence linking him indirectly.',
    relatedTopics: ['criminal-investigation', 'physical-evidence', 'questioned-documents', 'chain-of-custody'],
    quiz: [
      {
        id: 'et-1',
        type: 'mcq',
        question: 'A confession is best described as:',
        options: ['Circumstantial evidence', 'Direct evidence', 'Demonstrative evidence', 'Trace evidence'],
        answer: 'Direct evidence',
        explanation: 'A confession proves the disputed fact directly — no intervening deductions are required.',
      },
      {
        id: 'et-2',
        type: 'mcq',
        question: 'A scale diagram used to explain a photographed scene is which form of evidence?',
        options: ['Testimonial', 'Physical', 'Documentary', 'Demonstrative'],
        answer: 'Demonstrative',
        explanation: 'Demonstrative evidence recreates or explains evidence already presented, such as sketches, diagrams and models.',
      },
    ],
  },
  {
    id: 'questioned-documents',
    title: 'Questioned Document Examination',
    category: 'document',
    discipline: 'Questioned Documents',
    icon: 'document',
    color: 'slate',
    definition:
      'The forensic examination of documents — handwriting, signatures, mechanical text and alterations — to determine origin, authenticity, age and forensic handling.',
    simpleExplanation:
      'A questioned document is anything bearing marks that convey meaning, from a ransom note to a forged cheque, whose author or authenticity is in dispute.',
    corePrinciple:
      'The examiner answers whether a questioned item originated from the same source as a known item, and what happened to the document over time.',
    whyItMatters:
      'Documents drive fraud, extortion, identity and contract disputes. A defensible handwriting comparison can establish authorship where witnesses cannot.',
    process: [
      { title: 'Analysis', description: 'Break the handwriting down into its features.' },
      { title: 'Comparison', description: 'Compare the questioned item against the known standard.' },
      { title: 'Evaluation', description: 'Judge the significance of similarities and differences.' },
      { title: 'Verification / peer review', description: 'Optional independent check of the opinion.' },
    ],
    applications: [
      'Handwriting, signatures, typewriters, printers and fax output',
      'Alterations, erasures, obliterations and indented writing',
      'Sequence determination and physical matching',
      'Deciphering obscured or erased content',
    ],
    limitations: [
      'Opinions rest on the quantity and quality of comparable writing',
      'Deliberate disguise and non-cooperation limit conclusions',
      'The true source may share marks without being the writer',
    ],
    example:
      'A cheque is suspected of alteration. The examiner uses a stereomicroscope and electrostatic detection device (EDD) to reveal indented impressions and the order of pen strokes, then compares the signature against known standards.',
    relatedTopics: ['physical-evidence', 'criminal-investigation', 'evidence-types'],
    quiz: [
      {
        id: 'qd-1',
        type: 'mcq',
        question: 'What are the three core stages of handwriting examination?',
        options: ['Analysis, comparison, evaluation', 'Copy, guess, decide', 'Read, memorize, report', 'Scan, print, sign'],
        answer: 'Analysis, comparison, evaluation',
        explanation: 'Handwriting examination proceeds from analysis, to comparison against known standards, to evaluation — optionally followed by verification or peer review.',
      },
      {
        id: 'qd-2',
        type: 'mcq',
        question: 'Which tool detects indented writing (what was pressed into the page underneath)?',
        options: ['Electrostatic detection device (EDD)', 'A ruler', 'A magnifying glass only', 'A thermometer'],
        answer: 'Electrostatic detection device (EDD)',
        explanation: 'EDD reveals indentation impressions left by pressure of earlier writing — a mainstay of questioned-document work along with VSC and stereomicroscopy.',
      },
    ],
  },
  {
    id: 'explosives-evidence',
    title: 'Explosives Evidence',
    category: 'chemistry',
    discipline: 'Explosives',
    icon: 'explosive',
    color: 'crimson',
    definition:
      'The study and recovery of explosive substances, residues and fragmentation at scenes of detonation to identify the explosive, its source and the intent behind the explosion.',
    simpleExplanation:
      'Explosives release huge stored energy suddenly as light, heat, sound and pressure; investigators recover residues and fragments to trace what was used and why.',
    corePrinciple:
      'An explosion is a rapid increase in volume and energy release with high temperature and gases — driven by self-oxidizing chemistry, not by external oxygen.',
    whyItMatters:
      'Explosion scenes are among the most dangerous and easily contaminated. Systematic recovery and secure handling decide whether residues can be identified at all.',
    process: [
      { title: 'Chemical decomposition', description: 'Slow breakdown of an explosive in storage over long periods.' },
      { title: 'Deflagration', description: 'Rapid flame-front propagation through the material — typical of low explosives.' },
      { title: 'Detonation', description: 'A shockwave traversing the material at thousands of metres per second — typical of high explosives.' },
    ],
    applications: [
      'Identifying RDX, TNT, TETN, ANFO, dynamite and homemade mixtures',
      'Recovering post-blast residues with wire-mesh screens and vacuum/soot swabs',
      'Detecting explosives before detonation during trafficking',
      'Reconstructing the device and the sequence of events',
    ],
    limitations: [
      'Residues disperse and degrade quickly after the blast',
      'Scene entry by unauthorized persons contaminates everything',
      'Characteristics must be weighed together — no single property identifies an explosive',
    ],
    example:
      'After a blast, investigators photograph the seat of the explosion, search far beyond the epicentre, sieve post-blast residue through wire mesh, and collect firearm-like trace soot — always clearing the scene of devices first and never handling ordnance personally.',
    relatedTopics: ['physical-evidence', 'firearms-ballistics-evidence', 'criminal-investigation'],
    quiz: [
      {
        id: 'ex-1',
        type: 'mcq',
        question: 'Detonation differs from deflagration because it is:',
        options: ['A slower decomposition in storage', 'Propagated by a shockwave at thousands of metres per second', 'A flame-front moving slowly', 'Not a chemical process'],
        answer: 'Propagated by a shockwave at thousands of metres per second',
        explanation: 'High explosives detonate via a shock front moving at thousands of metres per second; low explosives deflagrate via a slower flame front.',
      },
      {
        id: 'ex-2',
        type: 'mcq',
        question: 'Which is a legitimate use of explosives?',
        options: ['Blasting rock for mining operations', 'Bombing buildings', 'Terrorizing civilians', 'Illicit trafficking'],
        answer: 'Blasting rock for mining operations',
        explanation: 'Explosives have many legitimate uses — mining, construction, propulsion and fireworks — separate from their criminal misuse.',
      },
    ],
  },
  {
    id: 'firearms-ballistics-evidence',
    title: 'Firearms & Ballistics Evidence',
    category: 'physics',
    discipline: 'Ballistics',
    icon: 'ballistic',
    color: 'amber',
    definition:
      'The recovery and examination of firearms, ammunition and toolmarks left during firing to identify the weapon, its type and the marks that tie a bullet or cartridge case back to a particular firearm.',
    simpleExplanation:
      'A firearm launches a projectile; every firing leaves characteristic marks — rifling grooves, firing-pin impressions and ejector scratches — that a ballistics examiner can match.',
    corePrinciple:
      'The marks left on ammunition help determine which firearm was used — calibers, rifling patterns, and toolmarks are the fingerprint of a barrel and action.',
    whyItMatters:
      'Ballistics can connect a victim, a scene and a suspect through a single spent cartridge, and identify weapon types from even tiny fragments.',
    process: [
      { title: 'Firearms', description: 'Portable barrelled weapons launching projectiles by explosive force.' },
      { title: 'Ammunition', description: 'Propellant and projectile — cartridges, shells, wadding, pellets.' },
      { title: 'Rifling marks', description: 'Grooves cut into the barrel spin and mark the bullet.' },
      { title: 'Firing-pin & ejector marks', description: 'Impressions on spent cases unique to the action.' },
      { title: 'Wads & pellets', description: 'Shotgun wadding impressions indicate gauge, maker and shot size.' },
    ],
    applications: [
      'Matching bullets and cartridge cases to a suspected firearm',
      'Determining whether markings match through a comparison microscope',
      'Identifying weapon type, gauge and possible manufacturer',
      'Recovering embedded bullets with the surrounding material intact',
    ],
    limitations: [
      'Fragments may lack enough marks for individualization',
      'Recovering bullets by digging can destroy crucial markings — the surrounding material should be submitted embedded',
      'Determining the exact firearm used can be impossible from residue alone',
    ],
    example:
      'A bullets lodged in a door frame is submitted still embedded in the cut-out section of wood so the examiner can extract it without adding new marks — then its rifling grooves and firing-pin impression are compared against test-fired rounds.',
    relatedTopics: ['physical-evidence', 'explosives-evidence', 'questioned-documents'],
    quiz: [
      {
        id: 'fb-1',
        type: 'mcq',
        question: 'Why is a bullet better submitted embedded in the surrounding material?',
        options: ['It saves space', 'It prevents adding or destroying crucial markings', 'The lab cannot test loose bullets', 'It looks more professional'],
        answer: 'It prevents adding or destroying crucial markings',
        explanation: 'Cutting out the section and submitting it lets the examiner extract the bullet carefully without damaging the rifling and toolmarks used for matching.',
      },
      {
        id: 'fb-2',
        type: 'mcq',
        question: 'Cartridge cases are examined for:',
        options: ['Firing-pin impression, ejector marks and extractor marks', 'The taste of propellant', 'Their colour only', 'DNA from the shooter'],
        answer: 'Firing-pin impression, ejector marks and extractor marks',
        explanation: 'These toolmarks on the case are specific to the firearm actions components and provide the basis for associating the case with a weapon.',
      },
    ],
  },

  // ═══════════════════ BIOLOGICAL EVIDENCE ═══════════════════
  {
    id: 'biological-evidence-collection',
    title: 'Collection of Biological Evidence',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'glove',
    color: 'crimson',
    definition:
      'The rules and methods for recovering biological evidence — blood, semen, saliva, sweat and hair — without contamination, loss or deterioration.',
    simpleExplanation:
      'Biological samples are delicate: each stain is collected separately, dried, and packaged in paper so moisture cannot breed mold and destroy the evidence.',
    corePrinciple:
      'Small biological evidence is the most susceptible to contamination — new gloves, clean tools and separate packaging protect every stain.',
    whyItMatters:
      'A single 2 mm bloodstain can carry the identifying DNA of the case. Mishandling it — plastic bags, talk, dirty tweezers — destroys the chain of custody and the science.',
    process: [
      { title: 'Collect each stain separately', description: 'Never package two stains together.' },
      { title: 'Use clean, smooth tools', description: 'Rinse tweezers/scissors with distilled water and dry thoroughly before reuse.' },
      { title: 'Protect against contamination', description: 'New gloves for small stains; do not talk or cough over the evidence; consider a mask.' },
      { title: 'Package in paper', description: 'Paper bags or envelopes so moisture can escape; never air-tight plastic for wet items.' },
      { title: 'Take controls', description: 'Collect unstained substrate controls from the same object.' },
      { title: 'Air-dry before sealing', description: 'Damp stains, clothing and swabs dry fully before packaging.' },
    ],
    applications: [
      'Collecting blood, semen, saliva, sweat and hair',
      'Protecting small stains with swabs, cloth or gauze',
      'Cutting stains from removable fabrics with clean scissors',
    ],
    limitations: [
      'Wet biological material in sealed containers molds and degrades',
      'Swabbing dissolves and dilutes concentrated small stains',
      'Controls are essential — their absence weakens interpretation',
    ],
    example:
      'A 2 mm bloodstain on carpet: the expert cuts around it with clean scissors, takes a separate unstained control cutting, air-dries both, and stores each in its own paper envelope.',
    relatedTopics: ['physical-evidence', 'blood-confirmation-tests', 'semen-evidence', 'saliva-evidence', 'presumptive-blood-tests'],
    quiz: [
      {
        id: 'bec-1',
        type: 'mcq',
        question: 'Why are biological-evidence items stored in paper containers rather than airtight plastic?',
        options: ['Paper is cheaper', 'Moisture in airtight containers causes mold growth that destroys the evidence', 'Paper is stronger', 'Plastic reacts with DNA'],
        answer: 'Moisture in airtight containers causes mold growth that destroys the evidence',
        explanation: 'Trapped moisture encourages mildew and mold which degrade blood and other biological material — so blood-soaked items must be air-dried and stored in paper bags.',
      },
      {
        id: 'bec-2',
        type: 'mcq',
        question: 'Why collect an unstained control cutting from the substrate?',
        options: ['To double the sample size', 'To serve as a control for later testing', 'Because it is cleaner', 'To balance the weight'],
        answer: 'To serve as a control for later testing',
        explanation: 'The unstained substrate control is tested alongside the stain so background reactions of the material itself can be distinguished from the stain.',
      },
    ],
  },
  {
    id: 'semen-evidence',
    title: 'Semen Evidence & Its Tests',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'blood',
    color: 'crimson',
    definition:
      'The screening and confirmatory tests used to detect and identify seminal fluid on exhibits from sexual offences.',
    simpleExplanation:
      'Semen is first screened with fast tests — acid phosphatase, UV fluorescence, PSA — then confirmed by actually seeing sperm heads or detecting a semen-specific antigen.',
    corePrinciple:
      'Screening tests are highly presumptive; only sperm-cell identification or a specific seminal antigen confirm semen to court standard.',
    whyItMatters:
      'Sexual-offence cases turn on whether an exhibit contains semen — and on explaining exactly how presumptive each step really is.',
    process: [
      { title: 'Acid phosphatase (AP) test', description: 'AP from the prostate turns alpha-naphthyl phosphate + Brentamine Fast Blue dark purple in under a minute — presumptive.' },
      { title: 'Alternative light sources', description: 'Semen fluoresces blue to yellow under specialized light — presumptive, many substances also fluoresce.' },
      { title: 'Prostate specific antigen (PSA)', description: 'Detects PSA produced in high amounts by the prostate — caution urged when no sperm is present.' },
      { title: 'Christmas Tree stain', description: 'Picroindigocarmine stains tails green/blue; Nuclear Fast Red stains heads red/pink — confirms sperm visually.' },
      { title: 'RSID test for semen', description: 'Detects semenogelin, unique to human semen — confirmatory, robust even in degraded stains.' },
    ],
    applications: [
      'Screening sexual-offence exhibits quickly at the bench',
      'Confirming semen when sperm are damaged or absent',
      'Detecting semen on fabrics, upholstery and bedding',
    ],
    limitations: [
      'Vaginal secretions contain low AP — positives are not proof of semen',
      'Many natural and artificial molecules fluoresce like semen; some semen stains do not fluoresce',
      'PSA can appear in trace amounts in faeces, sweat, female urine and breast milk',
      'Sperm tails degrade first — analysts must distinguish sperm heads from other red-staining cells',
    ],
    example:
      'A stained bed sheet reacts purple in the acid-phosphatase spot test and fluoresces under light; the Christmas Tree stain then shows red sperm heads with green/blue tails — confirming semen.',
    relatedTopics: ['biological-evidence-collection', 'blood-confirmation-tests', 'saliva-evidence', 'presumptive-blood-tests'],
    quiz: [
      {
        id: 'sm-1',
        type: 'mcq',
        question: 'Why is the acid phosphatase (Walker/Brentamine) test considered highly presumptive?',
        options: ['It is expensive', 'Vaginal secretions and other fluids contain detectable levels of the enzyme', 'It destroys the sample', 'It requires sperm'],
        answer: 'Vaginal secretions and other fluids contain detectable levels of the enzyme',
        explanation: 'AP is present in high amounts in semen but also at detectable levels in vaginal secretions, so a positive is strongly presumptive of semen, not proof.',
      },
      {
        id: 'sm-2',
        type: 'mcq',
        question: 'Which test visually confirms sperm cells?',
        options: ['Phadebas', 'Christmas Tree stain', 'Luminol', 'HemaTrace'],
        answer: 'Christmas Tree stain',
        explanation: 'Picroindigocarmine stains the neck and tail green/blue and Nuclear Fast Red stains the head red — a distinctive two-colour confirmation of sperm.',
      },
    ],
  },
  {
    id: 'saliva-evidence',
    title: 'Saliva Evidence & Its Tests',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'testtube',
    color: 'crimson',
    definition:
      'The detection and confirmation of saliva on items such as cigarette butts, envelopes, chewing gum and bite marks, using enzymatic and molecular tests.',
    simpleExplanation:
      'Saliva is located by testing for alpha-amylase activity, then confirmed by detecting human-saliva alpha-amylase itself.',
    corePrinciple:
      'Location is presumptive (enzyme activity from any organism); confirmation needs an alpha-amylase specific to human saliva.',
    whyItMatters:
      'Saliva links a suspect to drink containers, stamps, bite sites and masks — and carries epithelial cells that can yield DNA.',
    process: [
      { title: 'Collection', description: 'If the object is portable, submit it intact; if not, swab with a moistened sterile cotton swab, air-dry, and seal in paper — take a negative control from an unstained area.' },
      { title: 'Phadebas test', description: 'Detects alpha-amylase enzymatic activity — presumptive, positive for amylase of any organism.' },
      { title: 'RSID test for human saliva', description: 'Detects the human-saliva alpha-amylase molecule itself — combining it with Phadebas is considered confirmatory.' },
    ],
    applications: [
      'Screening cigarette butts, gum, envelopes, bite marks and masks',
      'Confirming human saliva on exhibits',
      'Directing DNA extraction from saliva-bearing items',
    ],
    limitations: [
      'Amylase exists in four human variants — two salivary, two pancreatic',
      'Human alpha-amylase reacts with some other mammals (gorillas, rats) and fluids (semen, blood, breast milk)',
      'High reactivity with faeces and indirect saliva transfer can create false positives',
    ],
    example:
      'A licked postage stamp gives a positive Phadebas reaction; the RSID human-saliva strip then confirms the alpha-amylase is of human salivary origin.',
    relatedTopics: ['biological-evidence-collection', 'semen-evidence', 'blood-confirmation-tests'],
    quiz: [
      {
        id: 'sa-1',
        type: 'mcq',
        question: 'What does the Phadebas test detect?',
        options: ['Sperm heads', 'The enzymatic activity of alpha-amylase', 'Human hemoglobin', 'Prostate specific antigen'],
        answer: 'The enzymatic activity of alpha-amylase',
        explanation: 'Phadebas detects alpha-amylase activity wherever it comes from — presumptive for saliva because that enzyme is found in many organisms.',
      },
      {
        id: 'sa-2',
        type: 'tf',
        question: 'The RSID test for human saliva detects the alpha-amylase molecule specific to human saliva.',
        answer: 'True',
        explanation: 'RSID detects the human salivary alpha-amylase protein itself, and performing it alongside Phadebas is treated as a confirmatory combination.',
      },
    ],
  },
  {
    id: 'blood-confirmation-tests',
    title: 'Blood Screening & Confirmation Tests',
    category: 'biology',
    discipline: 'Forensic Biology',
    icon: 'blood',
    color: 'crimson',
    definition:
      'The battery of presumptive and confirmatory tests that establish whether a stain is blood, whether it is human, and prepare it for identification — from phenolphthalein and luminol to species and human-specific confirmation.',
    simpleExplanation:
      'Screening flags possible blood; confirmation — identifying human hemoglobin or human glycophorin A — turns a suspicion into a defensible finding.',
    corePrinciple:
      'Presumptive chemistry shows heme-like activity; only species-specific and confirmatory tests establish human blood.',
    whyItMatters:
      'Courts only accept "blood" once the presumptive finding is confirmed — and only accept "human blood" once the species question is closed.',
    process: [
      { title: 'Phenolphthalein (Kastle-Meyer)', description: 'Peroxidase activity of heme turns phenolphthalein pink — presumptive.' },
      { title: 'Luminol', description: 'Reacting with hematin, it glows blue under UV in darkness — presumptive, very sensitive.' },
      { title: 'Alternative light sources', description: 'Blood darkens rather than glows under certain wavelengths — a locating aid, not proof.' },
      { title: 'Takayama test', description: 'Forms salmon-pink hemochromogen crystals — confirmatory for blood without heating.' },
      { title: 'Ouchterlony double diffusion', description: 'Precipitin lines identify the species of origin.' },
      { title: 'RSID / HemaTrace', description: 'Detect human glycophorin A or human hemoglobin — human-blood confirmation.' },
    ],
    applications: [
      'Screening scenes rapidly with false-positive awareness',
      'Confirming blood identity with crystalline and immunochemical tests',
      'Determining human origin before individualization work',
    ],
    limitations: [
      'Presumptive positives arise from saliva, pus, rust, vegetable extracts and heavy-metal salts',
      'Luminol false-positives include copper alloys (brass, bronze) — locks and fixtures',
      'Takayama requires a relatively large sample; RSID/HemaTrace need strict timing and storage',
    ],
    example:
      'A rust-coloured smear turns pink with Kastle-Meyer and glows with luminol; the Takayama test then forms hemochromogen crystals, and a HemaTrace strip confirms human hemoglobin.',
    relatedTopics: ['presumptive-blood-tests', 'human-vs-animal', 'biological-evidence-collection', 'origin-of-species'],
    quiz: [
      {
        id: 'bc-1',
        type: 'mcq',
        question: 'Which test is confirmatory for the presence of blood?',
        options: ['Kastle-Meyer (phenolphthalein)', 'Luminol', 'Takayama hemochromogen test', 'Phadebas'],
        answer: 'Takayama hemochromogen test',
        explanation: 'Takayama produces salmon-pink hemochromogen crystals visible under the microscope — a confirmatory morphological result, unlike presumptive color/luminescence screens.',
      },
      {
        id: 'bc-2',
        type: 'mcq',
        question: 'ABAcard HemaTrace confirms blood by detecting:',
        options: ['Alpha-amylase', 'Human hemoglobin', 'Sperm heads', 'Semenogelin'],
        answer: 'Human hemoglobin',
        explanation: 'HemaTrace uses an antihuman-hemoglobin antibody — a positive pink band indicates human hemoglobin, confirming human blood.',
      },
    ],
  },

  // ═══════════════════ TRACE / NON-BIOLOGICAL EVIDENCE ═══════════════════
  {
    id: 'fiber-evidence',
    title: 'Fiber Evidence',
    category: 'physics',
    discipline: 'Trace Evidence',
    icon: 'bag',
    color: 'amber',
    definition:
      'The smallest unit of a textile material, recovered and compared as trace evidence to support or test person-to-person or person-to-place contact.',
    simpleExplanation:
      'Fibers transfer on contact and are collected with tweezers, tape or vacuum — then compared by colour, diameter, construction and chemistry.',
    corePrinciple:
      'The more matching fibers transferred, the more likely real contact occurred — but fibers alone never individualize an offender.',
    whyItMatters:
      'In person-to-person contact, cross-transfer of fibers can corroborate an allegation — or break a false one — when other evidence is scarce.',
    process: [
      { title: 'Recovery', description: 'Tweezers, tape lift or vacuum from clothing, drapery, carpets, furniture.' },
      { title: 'Classify', description: 'Determine natural, manufactured or mixed fiber.' },
      { title: 'Compare color & diameter', description: 'First-pass screening under equal illumination; dyes further separated by chromatography.' },
      { title: 'Stereomicroscopy', description: 'Record crimp, length, luster, cross section, damage and adhering debris.' },
      { title: 'Comparison microscopy', description: 'Side-by-side point-by-point comparison — the best discrimination technique.' },
    ],
    applications: [
      'Supporting claims of contact between victim and suspect',
      'Narrowing source clothing or environments',
      'Detecting rare plant/animal/man-made fibers with higher significance',
    ],
    limitations: [
      'Fibers are class evidence — not unique like fingerprints or DNA',
      'Mass production (about half of world fabric in 1995 was cotton) reduces significance',
      'Transferred fibers are lost quickly from active clothing — timing matters',
    ],
    example:
      'Ten orange acrylic fibers matching the suspects pullover are found on the victims jacket — a large, unusual match count far more probative than a single generic fiber.',
    relatedTopics: ['physical-evidence', 'soil-evidence', 'paint-evidence', 'glass-fracture-analysis', 'toolmark-evidence'],
    quiz: [
      {
        id: 'fb2-1',
        type: 'mcq',
        question: 'Why does the number of matching fibers matter?',
        options: ['It changes the story', 'The greater the number, the more likely actual contact occurred', 'More fibers weigh more', 'It is irrelevant'],
        answer: 'The greater the number, the more likely actual contact occurred',
        explanation: 'More transferred matching fibers support that real contact happened — a single generic fiber proves very little.',
      },
      {
        id: 'fb2-2',
        type: 'tf',
        question: 'Fiber evidence can individualize an offender the way fingerprints or DNA can.',
        answer: 'False',
        explanation: 'Fibers are class evidence. They corroborate contact but cannot pinpoint an offender definitively by themselves.',
      },
    ],
  },
  {
    id: 'glass-fracture-analysis',
    title: 'Glass & Fracture Analysis',
    category: 'physics',
    discipline: 'Trace Evidence',
    icon: 'glass',
    color: 'amber',
    definition:
      'The examination of glass fragments and fractures to associate fragments with a source, determine the direction of force, and reconstruct the sequence of impacts.',
    simpleExplanation:
      'Glass is an amorphous solid; how it cracks — radial and concentric lines, rib marks and the 3R rule — tells examiners where force came from and whether glass shares a source.',
    corePrinciple:
      'Fracture direction and sequence are readable from rib/stress marks, while association is tested by physical and optical properties.',
    whyItMatters:
      'Glass places a person at a window or a bullet at a scene, and the 3R rule reveals the side of entry from which the force was applied.',
    process: [
      { title: 'Glass formation', description: 'Fusion of sand (SiO2), soda and lime forms an amorphous 3D network, soft over a temperature range.' },
      { title: 'Common types', description: 'Borosilicate, colored (metal oxides), lead (higher RI), float, laminated, and tempered safety glass.' },
      { title: 'Fracture mechanics', description: 'Radial cracks form first from the unloaded side; concentric cracks follow from the loaded side.' },
      { title: '3R rule', description: 'Radial cracks give Rib marks at Right angles on the Reverse side of the force.' },
      { title: 'Association tests', description: 'Density (gradient column), refractive index by immersion, and elemental/fluorescence analysis.' },
    ],
    applications: [
      'Determining direction and force of impact on windows',
      'Sequencing multiple impacts (earlier cracks stop later ones)',
      'Associating slivers with a broken source via RI and density',
      'Identifying projectile entry vs exit (exit hole is wider)',
    ],
    limitations: [
      'Tempered glass dices without ridges; very small panes cannot bow',
      'Heat or explosion breaks produce no point of impact',
      'RI/density association is class-level — common float glass cannot individualize',
    ],
    example:
      'A bullet hole: the exit side is wider than the entry; radial rib marks at right angles show the reverse side received the force — reading both tells the examiner which direction the shot came from.',
    relatedTopics: ['physical-evidence', 'fiber-evidence', 'soil-evidence', 'toolmark-evidence'],
    quiz: [
      {
        id: 'gl-1',
        type: 'mcq',
        question: 'The 3R rule states that radial cracks give rib marks that make right angles on the:',
        options: ['Same side as the force', 'Reverse side from where the force was applied', 'Edge of the frame', 'Both sides always'],
        answer: 'Reverse side from where the force was applied',
        explanation: 'Radial cracks form on the side opposite the force, and their rib stress marks meet at right angles on that reverse (unloaded) side.',
      },
      {
        id: 'gl-2',
        type: 'mcq',
        question: 'How can the sequence of impacts on a pane be determined?',
        options: ['By colour', 'Crack propagation is stopped by earlier cracks', 'By listening', 'You cannot tell'],
        answer: 'Crack propagation is stopped by earlier cracks',
        explanation: 'Because crack propagation is halted by cracks that already exist, the pattern reveals which impact came first and which later.',
      },
    ],
  },
  {
    id: 'toolmark-evidence',
    title: 'Tool Mark Evidence',
    category: 'physics',
    discipline: 'Trace Evidence',
    icon: 'toolmark',
    color: 'amber',
    definition:
      'Any impression, cut, scratch, gouge or abrasion caused by a tool contacting another object, examined to associate the mark with the tool that made it.',
    simpleExplanation:
      'Tools leave striation marks — ridges and valleys from machining and wear — that can be compared against test marks to match a pry bar to a window lock.',
    corePrinciple:
      'Machining creates unique microscopic irregularities, and wear makes each tool more unique — no two tools are identical.',
    whyItMatters:
      'Forced-entry cases often hinge on a crowbar mark; matching striations can definitively associate a suspect tool with the crime scene.',
    process: [
      { title: 'Class characteristics', description: 'Size and shape of the tool — narrow the type but not the individual.' },
      { title: 'Individual characteristics', description: 'Random nicks and breaks from wear that can individualize the tool.' },
      { title: 'Recovery & casting', description: 'Submit the whole object if possible; photograph to scale and cast with liquid silicone or dental stone.' },
      { title: 'Test marks', description: 'Apply the suspect tool at various angles/pressures to soft lead to reproduce striations.' },
      { title: 'Comparison microscopy', description: 'Compare evidence mark against test marks for sufficient matching striations.' },
    ],
    applications: [
      'Associating burglary tools with forced-entry marks',
      'Positive comparison when a sufficient quantity of striations match',
      'Preserving marks by casting where the object cannot be removed',
    ],
    limitations: [
      'Marks rarely reveal significant individual characters unless random nicks and breaks exist',
      'Photography and casting lose fine detail — reducing the chance of individualization',
      'Duplicating the scene mark in the laboratory is difficult',
    ],
    example:
      'A screwdriver mark on a window sash is cast in dental stone; the seized screwdriver is scraped on a lead brick at several angles, and the comparison microscope shows matching striation lines.',
    relatedTopics: ['firearms-ballistics-evidence', 'physical-evidence', 'glass-fracture-analysis'],
    quiz: [
      {
        id: 'tm-1',
        type: 'mcq',
        question: 'Which characteristic can individualize a tool to a mark?',
        options: ['Class size and shape', 'Random nicks and breaks acquired through wear', 'The colour of the handle', 'The brand stamped on it'],
        answer: 'Random nicks and breaks acquired through wear',
        explanation: 'Class characteristics (size, shape) narrow the type; only individual characteristics — random nicks and breaks from use — can match a single tool.',
      },
      {
        id: 'tm-2',
        type: 'mcq',
        question: 'What material is commonly used to make test marks?',
        options: ['Glass', 'Soft lead', 'Cardboard', 'Plastic foam'],
        answer: 'Soft lead',
        explanation: 'The suspect tool is applied to soft lead at various angles and pressures to reproduce the striation pattern of the evidence mark for comparison.',
      },
    ],
  },
  {
    id: 'soil-evidence',
    title: 'Soil Evidence',
    category: 'physics',
    discipline: 'Trace Evidence',
    icon: 'soil',
    color: 'amber',
    definition:
      'The forensic comparison of soil — sediment, mineral and organic matter — transported on clothing, shoes, tools or vehicles to test whether samples share a place of origin.',
    simpleExplanation:
      'Soil is like a fingerprint of a place: every soil has unique properties, so clay embedded in a sneaker can be traced back to a specific location.',
    corePrinciple:
      'Soil is class evidence — it cannot be individualized to a single location, but its unique properties can strongly associate samples with a source area.',
    whyItMatters:
      'Soil on a suspect links them to a specific place — often resolving whether a person was where they deny being.',
    process: [
      { title: 'Sediment', description: 'Original weathered and transported solid particles — the mineral foundation.' },
      { title: 'Color', description: 'Reveals history and contents — lime (white/gray), iron (red/brown/yellow), organic matter (black).' },
      { title: 'Structure', description: 'Grain vs clumped peds tells how particles are cemented.' },
      { title: 'Collection', description: 'Vacuum indoors/in vehicles; teaspoon into a vial outside; wrap for tools; regular intervals with fresh spoons from bodies.' },
      { title: 'Density gradient tube', description: 'Bands of suspended soil reveal a profile of densities.' },
    ],
    applications: [
      'Associating footwear, tires and clothing with locations',
      'Determining whether questioned and known dirt samples match',
      'Recovering biological evidence embedded within soil',
    ],
    limitations: [
      'Soils within a few metres differ — and are easily transported',
      'No universal classification system exists for soil',
      'Results are class-level associations, not unique origins',
    ],
    example:
      'Gray clay packed into the grooves of a suspects sneaker matches, by colour, mineral content and density bands, the clay beside a lake where a victim was found.',
    relatedTopics: ['physical-evidence', 'fiber-evidence', 'paint-evidence', 'glass-fracture-analysis'],
    quiz: [
      {
        id: 'so-1',
        type: 'mcq',
        question: 'Why is soil considered class evidence?',
        options: ['Because it can prove guilt', 'Because it cannot be individualized to a particular location', 'Because it is invisible', 'Because it is always the same'],
        answer: 'Because it cannot be individualized to a particular location',
        explanation: 'Soil is a class characteristic — strongly associative but never uniquely identifying a single spot, and it transfers easily between places.',
      },
      {
        id: 'so-2',
        type: 'mcq',
        question: 'What does the density gradient tube test produce?',
        options: ['A melted metal plug', 'Separation bands revealing the soils density profile', 'A colour photograph', 'A DNA profile'],
        answer: 'Separation bands revealing the soils density profile',
        explanation: 'Soil suspended in liquids of different densities settles into bands — a profile that helps associate or distinguish questioned and known samples.',
      },
    ],
  },
  {
    id: 'paint-evidence',
    title: 'Paint Evidence',
    category: 'physics',
    discipline: 'Trace Evidence',
    icon: 'paint',
    color: 'amber',
    definition:
      'The comparison of paint specimens — common in hit-and-run and burglary — to determine whether chips share a common origin, often via layer structure and chemistry.',
    simpleExplanation:
      'Paint is layers: each coat — primer, colour, clearcoat — stacks in a sequence that, if matched, strongly indicates a common source.',
    corePrinciple:
      'Layer structure is the most distinctive forensic feature — matching the number and sequence of coloured layers makes a common origin probable.',
    whyItMatters:
      'Paint links a stolen or fleeing vehicle to an object or person, and can even reveal the make and model from a single small chip.',
    process: [
      { title: 'Composition', description: 'Pigments (colour and hiding quality) plus a binder (usually a polymer).' },
      { title: 'Automotive layers', description: 'Electrocoat primer → primer surfacer → basecoat → clearcoat.' },
      { title: 'Microscopy first', description: 'The microscope remains the most important locating and comparison instrument.' },
      { title: 'Pyrolysis GC', description: 'Decomposes chips as small as 20 micrograms; the pyrogram fingerprints the binder polymer.' },
      { title: 'IR spectrophotometry', description: 'Binder absorbs infrared in a spectrum characteristic of the specimen.' },
      { title: 'Elemental analysis', description: 'Emission spectroscopy, neutron activation or X-ray methods identify pigment elements.' },
    ],
    applications: [
      'Matching automotive paints in hit-and-run cases',
      'Determining vehicle make, model and colour',
      'Linking burglary tool transfer and repaint layers',
    ],
    limitations: [
      'Common colours and mass production reduce significance',
      'Layer matching requires intact, stratified chips',
      'Visual colour assessment is subjective',
    ],
    example:
      'A chip of ocean-blue paint with four distinct layers from a broken car headlamp matches a suspect vehicle by layer sequence, binder pyrogram and pigment elements.',
    relatedTopics: ['physical-evidence', 'fiber-evidence', 'soil-evidence', 'toolmark-evidence'],
    quiz: [
      {
        id: 'pa-1',
        type: 'mcq',
        question: 'Which feature gives paint its most distinctive forensic value?',
        options: ['The price of the can', 'The number and sequence of coloured layers', 'The smoothness', 'The odour'],
        answer: 'The number and sequence of coloured layers',
        explanation: 'When paint specimens have coloured layers matching in number and sequence, a common origin is probable — layering is the key comparison feature.',
      },
      {
        id: 'pa-2',
        type: 'mcq',
        question: 'What is the role of the binder in paint?',
        options: ['To add colour', 'To provide the support medium for pigment and additives', 'To make it dry faster', 'To protect the surface from fingerprints'],
        answer: 'To provide the support medium for pigment and additives',
        explanation: 'The binder — usually a polymer — is the vehicle that carries the pigment; its chemistry is what pyrolysis GC and IR spectrophotometry fingerprint.',
      },
    ],
  },

  // ═══════════════════ SEROLOGY & SPECIES ═══════════════════
  {
    id: 'origin-of-species',
    title: 'Determination of Origin of Species',
    category: 'biology',
    discipline: 'Forensic Serology',
    icon: 'species',
    color: 'cyan',
    definition:
      'The serological identification of which species a biological fluid or tissue comes from, using species-specific antibodies that bind the proteins and antigens in the sample.',
    simpleExplanation:
      'Before DNA, serology identified whether a stain was human or, if not, which animal — dog, cat, cattle, fowl, goat, rat or rabbit — by watching for a precipitin reaction.',
    corePrinciple:
      'Specific antigens bind specific antibodies — a white ring or precipitin arc appears only when the sample matches the antiserum of the same species.',
    whyItMatters:
      'Species determination decides whether a stain is even relevant to a human case and which confirmatory pipeline — human vs animal — to run next.',
    process: [
      { title: 'Extraction', description: 'Extract proteins/antigens in 0.85% normal saline, or 5% ammonia for old stains, fibers and calcified tissues.' },
      { title: 'Calcified/keratinized tissue', description: 'Macerate bone or nail to powder, extract overnight in 5% ammonia, use the supernatant.' },
      { title: 'Precipitin tube method', description: 'Layer extract under antiserum; a white ring at the interface in 30 minutes signals the species.' },
      { title: 'Double diffusion', description: 'Wells of extract and antisera in 1% agarose; a precipitin arc forms between matching pair.' },
      { title: 'Cross-over electrophoresis', description: 'Negatively charged antigen migrates toward the anode from the cathodal well, meeting antibody; a white precipitate line confirms the reaction.' },
      { title: 'Staining', description: 'Amido black (or Coomassie) deepens faint precipitin bands blue/black after washing and drying.' },
    ],
    applications: [
      'Determining the species of origin of blood, semen, fluids and tissues',
      'Testing old, fiber-borne and calcified stains',
      'Confirming human origin before blood grouping and DNA work',
    ],
    limitations: [
      'Old stains lose soluble protein, needing ammonia or longer extraction',
      'Double diffusion can take overnight (up to 72 hours for some reactions)',
      'Interpretation requires expertise — controls (unstained substrate) are essential',
    ],
    example:
      'A dried stain extract is placed in the central well of an agarose gel; anti-human serum produces a precipitin arc while anti-dog and anti-fowl wells stay clear — the stain is human.',
    relatedTopics: ['human-vs-animal', 'blood-confirmation-tests', 'blood-grouping-dried-stains', 'immunodiffusion'],
    quiz: [
      {
        id: 'os-1',
        type: 'mcq',
        question: 'Why is 5% ammonia solution preferred over saline for old or calcified stains?',
        options: ['It is cheaper', 'It extracts antigen better from old, fiber-borne and calcified material', 'It destroys the antigens', 'It is harmless to skin'],
        answer: 'It extracts antigen better from old, fiber-borne and calcified material',
        explanation: 'Ammonia is a better extractant for old bloodstains, stains on fibers and calcified tissues like bone and nail, which need harsher extraction.',
      },
      {
        id: 'os-2',
        type: 'mcq',
        question: 'In cross-over electrophoresis, where is the antigen placed?',
        options: ['At the anodic well', 'In the cathodal well', 'In the middle of the gel', 'In the buffer tank'],
        answer: 'In the cathodal well',
        explanation: 'The antigen (extract) carries a negative charge and sits near the cathode, migrating toward the anode to meet the positively charged antibody — forming a precipitate line.',
      },
    ],
  },
  {
    id: 'blood-grouping-dried-stains',
    title: 'Blood Grouping from Dried Stains',
    category: 'biology',
    discipline: 'Forensic Serology',
    icon: 'abo',
    color: 'cyan',
    definition:
      'The determination of ABO (and Rh, MN) groups from dried bloodstains using agglutination methods that detect either the antibodies in the stain or the antigens on the stained red cells.',
    simpleExplanation:
      'A dried stain can be typed by what is in it — the stains own anti-A/anti-B antibodies (Lattes), or the A/B/H antigens bound (absorption-elution, mixed agglutination).',
    corePrinciple:
      'Agglutination appears only where an antibody meets its matching antigen — the pattern of A, B and H reactions spells the blood group.',
    whyItMatters:
      'Even when no cells are intact, dried stains may still be grouped — a classic step before the DNA era and still a valuable screening hand in serology.',
    process: [
      { title: 'ABO principles', description: 'A cells carry A antigen and anti-B; B carry B and anti-A; AB carry both, no antibodies; O carry neither, both antibodies.' },
      { title: 'Lattes test', description: 'Detects the antibodies in the stain: extract + A cells and + B cells; the agglutination pattern gives the group.' },
      { title: 'Absorption-elution', description: 'Stain threads absorb anti-A, anti-B and anti-H lectin; after washing and elution at 56 °C, indicator cells indicate which were bound.' },
      { title: 'Howard-Martin & ammonia methods', description: 'Variants for cellulose-acetate sheets and for very old or insoluble stains using ammonia extraction.' },
      { title: 'Mixed agglutination', description: 'Indicator cells stick to antibody remaining on stained fibres — read macroscopically and microscopically.' },
      { title: 'Rh & MN typing', description: 'Cavity-slide agglutination with anti-C/c/D/E/e and anti-M/anti-N sera.' },
    ],
    applications: [
      'Grouping fresh and degraded bloodstains',
      'Absorption-elution for stains on fabrics, threads and old material',
      'Extending serology to MN and Rh systems alongside ABO',
    ],
    limitations: [
      'Lattes is less sensitive — antibodies are less stable than antigens — so it suits fresh stains',
      'ABO inclusion is not individualizing; most people share a group',
      'Washing and cell quality are critical — false positives are possible with Type B and soiled/denim substrates',
    ],
    example:
      'A thread from a stain is split into A, B and H tubes, dipped in anti-A, anti-B and anti-H lectin overnight, washed in ice-cold saline, eluted for 20 minutes at 56 °C, then read with indicator cells: positive A and H only spells group A.',
    relatedTopics: ['abo-blood-grouping', 'origin-of-species', 'agglutination', 'human-vs-animal', 'serology'],
    quiz: [
      {
        id: 'bg-1',
        type: 'mcq',
        question: 'The Lattes test identifies the blood group by detecting:',
        options: ['The antigens on red cells', 'The antibodies present in the bloodstain', 'The DNA sequence', 'The hemoglobin crystals'],
        answer: 'The antibodies present in the bloodstain',
        explanation: 'Lattes is based on the stains own antibodies — anti-A/anti-B in the extract — which agglutinate added indicator A and B cells.',
      },
      {
        id: 'bg-2',
        type: 'mcq',
        question: 'Which pattern in absorption-elution indicates blood group O?',
        options: ['Positive A with positive B', 'Negative A, negative B, positive H', 'Positive B only', 'No reaction at all'],
        answer: 'Negative A, negative B, positive H',
        explanation: 'Group O cells carry neither A nor B but have the H precursor — so only the H reaction is positive.',
      },
      {
        id: 'bg-3',
        type: 'mcq',
        question: 'Why is the Lattes test better suited to fresh stains?',
        options: ['It is faster than DNA', 'Antibodies are less stable than antigens and degrade in old stains', 'It needs no lab', 'It detects RNA'],
        answer: 'Antibodies are less stable than antigens and degrade in old stains',
        explanation: 'Because Lattes relies on the antibody content of the stain, and antibodies break down before antigens, it works best when the stain is relatively fresh.',
      },
    ],
  },
{
    id: 'fingerprints-evidence',
    title: 'Fingerprints as Evidence',
    category: 'other',
    discipline: 'Pattern & Impressions',
    icon: 'fingerprint',
    color: 'slate',
    definition:
      'Friction-ridge skin impressions left on touched surfaces, examined for ridge patterns and minutiae to associate a person with a surface.',
    simpleExplanation:
      'The ridged skin of the fingers and palms deposits a print that can be developed, lifted, photographed and compared.',
    corePrinciple:
      'Friction ridge detail is considered sufficiently unique and permanent that a sufficient quantity of matching minutiae can individualize a print to a source.',
    whyItMatters:
      'Fingerprints are among the most common physical evidence at scenes. They can be developed on glass, paper, metal and skin, and can place a suspect at the scene or on an object.',
    process: [
      { title: 'Locate', description: 'Scan the scene for touched items under good lighting.' },
      { title: 'Develop', description: 'Apply powder, chemicals (ninhydrin, cyanoacrylate) or alternate light sources.' },
      { title: 'Preserve', description: 'Photograph, lift with tape, or remove the item whole.' },
      { title: 'Compare', description: 'Match ridge patterns and minutiae against known prints (AFIS).' },
      { title: 'Report', description: 'State the level of association honestly for court.' },
    ],
    applications: [
      'Identifying suspects and victims',
      'Associating a person with a specific surface or item',
      'Comparing against searched databases (AFIS)',
      'Supporting or challenging alibis',
    ],
    limitations: [
      'A print proves touch, not the activity that left it',
      'Many prints are partial, distorted or too low quality for comparison',
      'Latent prints can be deposited indirectly (secondary transfer)',
      'Quality scoring (e.g., NFIQ) decides whether a print is even usable',
    ],
    example:
      'A latent palm print on a window sill is developed with powder, lifted, and matched to the suspect on enough ridge features for an identification — but it does not by itself explain how or when the hand contacted the sill.',
    relatedTopics: ['physical-evidence', 'crime-scene-procedures', 'evidence-types'],
    quiz: [
      {
        id: 'fpe-1',
        type: 'mcq',
        question: 'Which type of fingerprint is invisible until developed?',
        options: ['Patent', 'Latent', 'Plastic', 'Exemplar'],
        answer: 'Latent',
        explanation: 'Latent prints are deposited by natural skin secretions and must be developed with powders, chemicals or light before they can be photographed and compared.',
      },
      {
        id: 'fpe-2',
        type: 'mcq',
        question: 'Fingerprint comparison relies mainly on:',
        options: ['Skin colour', 'Ridge patterns and minutiae', 'Finger length', 'Nail shape'],
        answer: 'Ridge patterns and minutiae',
        explanation: 'Examiners compare ridge characteristics such as endings and bifurcations, together with overall pattern type.',
      },
    ],
  },
  {
    id: 'impression-evidence',
    title: 'Tiremarks, Footprints & Impressions',
    category: 'physics',
    discipline: 'Impression Evidence',
    icon: 'photo',
    color: 'amber',
    definition:
      'Indented or deposited impressions left by tyres, footwear, tools or other objects, preserved by photography and casting for comparison.',
    simpleExplanation:
      'A tyre or shoe that contacts mud, snow, blood or paint can leave a printable impression that shows pattern and size.',
    corePrinciple:
      'Impression evidence transfers size, shape, tread or sole pattern, and sometimes individualizing wear damage, which can associate a tyre or shoe with a scene.',
    whyItMatters:
      'Tiremarks and footprints are frequently left at outdoor scenes and on surfaces that absorb moisture. They can indicate the type of vehicle or shoe, the direction of travel, and places a suspect or victim stood or walked.',
    process: [
      { title: 'Photograph', description: 'Capture the impression to scale before any disturbance.' },
      { title: 'Measure', description: 'Record wheelbase, track width or sole length and width.' },
      { title: 'Cast', description: 'Preserve 3D impressions with dental stone or casting material.' },
      { title: 'Lift', description: 'Recover 2D residues such as dust or blood prints.' },
      { title: 'Compare', description: 'Match pattern, size and individual damage to known exemplars.' },
    ],
    applications: [
      'Linking a vehicle or shoe to a scene',
      'Establishing direction of travel by skid or gait marks',
      'Reconstructing accident and burglary events',
      'Estimating vehicle type from track and tread measurements',
    ],
    limitations: [
      'Impressions are easily distorted by movement or the surface itself',
      'Treads and soles wear, changing the print over time',
      'A matching class pattern does not individualize to one tyre or shoe',
      'Poor casting or photography destroys useful detail',
    ],
    example:
      'Footprints in mud at a burglary entry point match the sole pattern of a seized boot, but a definitive association requires matching individual wear nicks and cuts, not just the class pattern.',
    relatedTopics: ['physical-evidence', 'crime-scene-procedures', 'crime-scene-searching', 'evidence-types'],
    quiz: [
      {
        id: 'imp-1',
        type: 'mcq',
        question: 'Which is the best first action for a three-dimensional impression found in soil?',
        options: ['Lift it with tape', 'Photograph it to scale', 'Vacuum it', 'Re-position it'],
        answer: 'Photograph it to scale',
        explanation: 'Photography captures the impression in place before casting or lifting could disturb or alter it.',
      },
      {
        id: 'imp-2',
        type: 'mcq',
        question: 'Tiremark evidence is usually classified as:',
        options: ['Individualizing evidence', 'Class evidence', 'Testimonial evidence', 'Documentary evidence'],
        answer: 'Class evidence',
        explanation: 'Most tiremarks show size and tread pattern shared by many tyres; only rare individual damage detail approaches individualization.',
      },
    ],
  },
{
    id: 'handwriting-examination',
    title: 'Handwriting Examination',
    category: 'document',
    discipline: 'Questioned Documents',
    icon: 'document',
    color: 'slate',
    definition:
      'A comparison of handwriting on a questioned document with known standards, examining letter forms, spacing, pressure and overall style to assess common authorship.',
    simpleExplanation:
      'A document examiner compares the questioned writing against verified samples to see if the same person probably wrote both.',
    corePrinciple:
      'Handwriting is a learned motor skill that produces unconscious individual variations in letter form, spacing, slant and baseline alignment.',
    whyItMatters:
      'Handwriting evidence is relevant in forged cheques, anonymous letters, altered contracts, suicide notes and will disputes. A comparison can support or exclude common authorship.',
    process: [
      { title: 'Request standards', description: 'Collect known writing exemplars from the subject.' },
      { title: 'Examine the questioned document', description: 'Assess ink, paper, signs of alteration, and writing order.' },
      { title: 'Compare', description: 'Align and compare letter forms, slant, spacing and connectives.' },
      { title: 'Evaluate', description: 'Decide whether differences are natural variation or different writers.' },
      { title: 'Verify', description: 'Ideally a second examiner reviews and validates the conclusion.' },
    ],
    applications: [
      'Assessing whether a signature is genuine or forged',
      'Linking an anonymous letter to a suspect',
      'Detecting alterations and additions on documents',
      'Evaluating disguised handwriting attempts',
    ],
    limitations: [
      'Determined disguise can mimic features of another person',
      'A skilled forger can reproduce general style but not all unconscious details',
      'Poor quality copies degrade comparison quality',
      'The conclusion is probabilistic, not absolutely certain',
    ],
    example:
      'A will signature is compared against fifteen years of cheque signatures; many natural variations exist, but key connective strokes are consistently different, suggesting a second writer.',
    relatedTopics: ['questioned-documents', 'evidence-types', 'crime-scene-procedures'],
    quiz: [
      {
        id: 'hw-1',
        type: 'mcq',
        question: 'Handwriting analysis primarily relies on:',
        options: ['Ink colour alone', 'Unconscious variations in letter form and spacing', 'Paper type only', 'The content of the message'],
        answer: 'Unconscious variations in letter form and spacing',
        explanation: 'Every person develops subtle, habitual letter shapes, spacing patterns and slant that are difficult to disguise fully.',
      },
      {
        id: 'hw-2',
        type: 'mcq',
        question: 'What is the most important safeguard against error in handwriting comparison?',
        options: ['Using a microscope', 'Having a second examiner verify the result', 'Using fresh paper', 'Comparing only printed text'],
        answer: 'Having a second examiner verify the result',
        explanation: 'Independent verification by a second examiner reduces the risk of subjective bias or misinterpretation.',
      },
    ],
  },
  {
    id: 'hair-evidence',
    title: 'Hair as Physical Evidence',
    category: 'biology',
    discipline: 'Trace & Morphology',
    icon: 'anthropology',
    color: 'crimson',
    definition:
      'Human and animal hairs recovered at a scene, examined for medulla, cortex and cuticle characteristics and compared microscopically with known standards.',
    simpleExplanation:
      'Hair looks distinctive under a microscope: its inner structure, scale pattern and colour can link it to a body region or a species — and if the root is present, DNA can link it to a person.',
    corePrinciple:
      'Hair morphology varies between species and individuals, and the presence or absence of a follicular tag determines whether DNA profiling is possible.',
    whyItMatters:
      'Hairs are found on clothing, furniture, vehicles and at scenes involving assault, sexual offences or hit-and-run. They provide investigative leads and can connect a victim to a suspect.',
    process: [
      { title: 'Collect', description: 'Recover hair by tweezers or tape lift without breaking it.' },
      { title: 'Examine', description: 'Use a comparison microscope to assess root, shaft and tip.' },
      { title: 'Classify', description: 'Determine human vs animal, body region, and natural vs synthetic.' },
      { title: 'Compare', description: 'Compare against known exemplars from the suspect or victim.' },
      { title: 'DNA if possible', description: 'Follicular root tags can yield a nuclear DNA profile.' },
    ],
    applications: [
      'Linking a suspect or victim to a scene or vehicle',
      'Identifying the body region a hair came from',
      'Distinguishing human from animal hair',
      'Recovering DNA from root sheath material',
    ],
    limitations: [
      'Without a root, hair can only be compared morphologically, not individualized by DNA',
      'Microscopy provides class characteristics, not a definitive individual match',
      'Hair transfers easily between surfaces and people',
      'Animal hair matching requires specialist reference collections',
    ],
    example:
      'A dark head hair found on a victim\'s coat is microscopically consistent with the suspect\'s head hair and carries a follicular tag from which an STR profile matching the suspect is obtained.',
    relatedTopics: ['biological-evidence-collection', 'dna-profiling', 'physical-evidence'],
    quiz: [
      {
        id: 'hair-1',
        type: 'mcq',
        question: 'What determines whether DNA can be recovered from a hair?',
        options: ['Whether the hair was washed', 'The presence of a follicular root tag', 'The colour of the hair', 'Whether it fell out naturally'],
        answer: 'The presence of a follicular root tag',
        explanation: 'Root sheath cells attached to the hair carry nuclear DNA; shed or cut shafts carry only degraded mitochondrial DNA.',
      },
      {
        id: 'hair-2',
        type: 'mcq',
        question: 'Under a comparison microscope, a forensic hair examiner can usually determine:',
        options: ['The exact person it came from', 'Species, body region and general class characteristics', 'The time it was deposited', 'The person\'s blood group'],
        answer: 'Species, body region and general class characteristics',
        explanation: 'Hair morphology reveals species, whether it is head, body or facial hair, colour, and treatment — but it is class evidence, not individualizing without DNA.',
      },
    ],
  },
{
    id: 'sweat-evidence',
    title: 'Sweat as Forensic Evidence',
    category: 'biology',
    discipline: 'Body Fluids',
    icon: 'blood',
    color: 'crimson',
    definition:
      'A watery body fluid secreted by sweat glands, recovered from clothing, surfaces and objects; useful for DNA profiling and enzyme or drug marker analysis.',
    simpleExplanation:
      'Sweat is over 99% water with dissolved salts and trace proteins, and it can carry enough epithelial cells to yield a DNA profile.',
    corePrinciple:
      'Sweat is produced by nearly two to four million glands across the body. Emotional stress produces a distinct localised pattern compared with temperature-induced sweating.',
    whyItMatters:
      'Sweat stains can link a suspect to clothing, gloves, steering wheels or handles. DNA extracted from epithelial cells in sweat can contribute to a profile, and drug or metabolite markers may reveal ingestion.',
    process: [
      { title: 'Locate', description: 'Identify damp or dried sweat stains on clothing or objects.' },
      { title: 'Swab or cut', description: 'Collect a portion of the stained area for analysis.' },
      { title: 'Screen', description: 'Conduct DNA or enzyme extraction as appropriate.' },
      { title: 'Profile', description: 'Obtain DNA if enough cellular material is present.' },
    ],
    applications: [
      'Linking a suspect or victim to gloves, tools, clothing or steering wheels',
      'Recovering partial DNA profiles where blood or saliva is absent',
      'Detecting certain drugs or metabolites excreted through sweat',
      'Supporting or contradicting alibis about physical exertion',
    ],
    limitations: [
      'Sweat stains are often very small and easily contaminated',
      'DNA yields from sweat are lower and more variable than from blood',
      'Environmental exposure degrades enzyme and protein markers quickly',
      'Presence of sweat does not prove it came from the case activity',
    ],
    example:
      'Sweat on the inside of a glove found at a burglary scene yields enough DNA to partially profile a contributor — but it only places that person inside the glove, not at the scene.',
    relatedTopics: ['biological-evidence-collection', 'dna-profiling', 'human-vs-animal'],
    quiz: [
      {
        id: 'swt-1',
        type: 'mcq',
        question: 'Sweat stains are useful in forensic science primarily because:',
        options: ['They are always visible', 'They may contain enough epithelial cells for DNA profiling', 'They always contain blood', 'They never degrade'],
        answer: 'They may contain enough epithelial cells for DNA profiling',
        explanation: 'Sweat itself is mostly water, but the skin cells it carries can yield nuclear or mitochondrial DNA.',
      },
      {
        id: 'swt-2',
        type: 'mcq',
        question: 'What is a key limitation of sweat as evidence?',
        options: ['It is unique to each person', 'DNA yields are lower and more variable than blood', 'It cannot be collected from fabric', 'It proves criminal activity'],
        answer: 'DNA yields are lower and more variable than blood',
        explanation: 'Sweat carries fewer cells than blood, making successful DNA profiling less reliable.',
      },
    ],
  },
  {
    id: 'mn-rh-blood-grouping',
    title: 'MN and Rh Blood-Group Systems',
    category: 'biology',
    discipline: 'Serology',
    icon: 'abo',
    color: 'crimson',
    definition:
      'The MN (M and N antigens on glycophorin A) and Rh (D antigen) blood-group systems, used alongside ABO in paternity testing and forensic stain analysis.',
    simpleExplanation:
      'Beyond ABO, two other common blood-group systems — MN and Rh — help narrow the source of a bloodstain and are especially useful in parentage disputes.',
    corePrinciple:
      'The MN and Rh systems are genetically independent of ABO and of each other; combining all three systems greatly increases discrimination between groups.',
    whyItMatters:
      'ABO alone has only four common phenotypes; adding MN and Rh multiplies the number of distinguishable groups, making grouping more informative when DNA profiling is unavailable or the stain is degraded.',
    process: [
      { title: 'Extract', description: 'Prepare a cell suspension from the stain or fresh sample.' },
      { title: 'Test MN', description: 'Apply anti-M and anti-N sera and observe agglutination.' },
      { title: 'Test Rh', description: 'Apply anti-D serum and observe agglutination.' },
      { title: 'Combine', description: 'Record the combined ABO + MN + Rh phenotype.' },
    ],
    applications: [
      'Narrowing the source population for a bloodstain in older cases',
      'Supporting or excluding paternity when legal questions arise',
      'Providing supplementary grouping when DNA analysis fails',
      'Building more informative phenotypic profiles in population studies',
    ],
    limitations: [
      'Grouping is class evidence and never individualizes to one person',
      'MN and Rh typing from dried stains is less reliable than from fresh blood',
      'Anti-M and anti-N sera can give variable results with old or degraded material',
      'Population frequency data are required to calculate the significance of a match',
    ],
    example:
      'A dried bloodstain is typed as A, M, Rh-positive. That combination is present in roughly 15% of a reference population — more discriminating than ABO alone, but far from individualizing.',
    relatedTopics: ['abo-blood-grouping', 'blood-grouping-dried-stains', 'serology', 'human-vs-animal'],
    quiz: [
      {
        id: 'mnr-1',
        type: 'mcq',
        question: 'The MN blood-group system is determined by antigens on which molecule?',
        options: ['Hemoglobin', 'Glycophorin A', 'Albumin', 'Immunoglobulin'],
        answer: 'Glycophorin A',
        explanation: 'The M and N antigens are carried on glycophorin A, a major sialoglycoprotein of the red-cell membrane.',
      },
      {
        id: 'mnr-2',
        type: 'mcq',
        question: 'Why is combining ABO, MN and Rh grouping more useful than ABO alone?',
        options: ['It is faster', 'It increases the number of distinguishable phenotypes', 'It gives a DNA profile', 'It proves individual identity'],
        answer: 'It increases the number of distinguishable phenotypes',
        explanation: 'Each system multiplies the possible phenotype combinations, making it less likely that two unrelated people share the same combined type.',
      },
    ],
  },
{
    id: 'building-materials-evidence',
    title: 'Building Materials as Evidence',
    category: 'physics',
    discipline: 'Trace Evidence',
    icon: 'glass',
    color: 'amber',
    definition:
      'Construction materials such as cement, plaster, brick, paint and insulation recovered at scenes of burglary, arson or demolition, compared by physical and chemical methods.',
    simpleExplanation:
      'Dust and fragments from walls, floors and ceilings can link a suspect to a break-in or tie rubble to a specific structure.',
    corePrinciple:
      'Building materials vary in composition, density and colour between manufacturers and batches; when a suspect carries material from a building, that trace can place them at the site.',
    whyItMatters:
      'Cement, mortar and plaster dust are common in break-in and arson cases. Even very small fragments can be compared microscopically and chemically to the material at a specific location.',
    process: [
      { title: 'Collect', description: 'Swab, scrape or vacuum fragments from the suspect or scene.' },
      { title: 'Classify', description: 'Identify the material type: cement, plaster, brick, insulation.' },
      { title: 'Compare', description: 'Match colour, texture, density and refractive index with known samples.' },
      { title: 'Chemically analyse', description: 'Use FTIR, XRF or SEM-EDX to compare composition.' },
    ],
    applications: [
      'Linking a suspect to a specific building or construction site',
      'Supporting or contradicting alibis about location',
      'Identifying accelerant residues in arson rubble',
      'Associating rubble or dust with a particular demolition',
    ],
    limitations: [
      'Many buildings share similar materials within a geographic area',
      'Material degrades and contaminates easily',
      'Class-level comparison is usual; individualization is rare',
      'Environmental exposure alters colour and chemical profile',
    ],
    example:
      'White plaster dust on a suspect\'s shoes matches the composition and density of plaster from a forced entry point at a construction site, placing them at that scene — but it does not prove they broke in.',
    relatedTopics: ['physical-evidence', 'soil-evidence', 'paint-evidence', 'crime-scene-procedures'],
    quiz: [
      {
        id: 'bm-1',
        type: 'mcq',
        question: 'Building materials are usually classified as:',
        options: ['Individualizing evidence', 'Class evidence', 'Testimonial evidence', 'Digital evidence'],
        answer: 'Class evidence',
        explanation: 'Building materials are typically class evidence: they share composition within a source but are not unique to one structure.',
      },
      {
        id: 'bm-2',
        type: 'mcq',
        question: 'Which analytical technique is most useful for comparing the chemical composition of cement or plaster?',
        options: ['Gas chromatography', 'FTIR spectroscopy', 'Polymerase chain reaction', 'Blood typing'],
        answer: 'FTIR spectroscopy',
        explanation: 'Fourier-transform infrared spectroscopy reveals the molecular fingerprint of binders, polymers and mineral components in construction materials.',
      },
    ],
  },
  {
    id: 'digital-media-authentication',
    title: 'Digital Media Authentication',
    category: 'other',
    discipline: 'Digital Forensics',
    icon: 'digital',
    color: 'cyan',
    definition:
      'Forensic methods for determining whether a digital image or video has been manipulated, including error-level analysis, metadata consistency checks, compression-artifact analysis and sensor-noise (PRNU) fingerprinting.',
    simpleExplanation:
      'When a photo or video is offered as evidence, forensic examiners run a series of checks to see whether it has been digitally altered.',
    corePrinciple:
      'No single method proves a fake; multiple independent indicators — ELA, EXIF metadata, compression signatures, PRNU — must be evaluated together, and the conclusion must be framed as a probability rather than an absolute.',
    whyItMatters:
      'Courts increasingly face digitally altered photographs and video. A transparent, multi-indicator authentication tool helps triage media evidence before it reaches the courtroom.',
    process: [
      { title: 'Acquire', description: 'Obtain the original file with full metadata and chain of custody.' },
      { title: 'Metadata check', description: 'Compare EXIF data, timestamps and device signatures for consistency.' },
      { title: 'ELA', description: 'Re-compress the image and compare error levels to reveal spliced regions.' },
      { title: 'Artifact analysis', description: 'Check compression discontinuities, quantisation tables and frame-to-frame consistency.' },
      { title: 'Report', description: 'List each indicator, state what it can and cannot show, and state limitations.' },
    ],
    applications: [
      'Screening surveillance, bystander and social-media images for manipulation',
      'Providing structured triage reports for investigators and courts',
      'Flagging deepfake or face-swap indicators in video evidence',
      'Generating explainable, indicator-level output rather than opaque verdicts',
    ],
    limitations: [
      'Manipulation techniques evolve faster than detection tools',
      'No single indicator is sufficient on its own',
      'Strong compression or re-encoding can produce false positives',
      'The tool is a screening aid, not a replacement for expert judgment',
    ],
    example:
      'A bystander video submitted in court shows an image splice detected by ELA and confirmed by EXIF inconsistencies — the tool provides the examiner with specific flagged regions for manual verification rather than a single fake verdict.',
    relatedTopics: ['questioned-documents', 'digital-forensics-timeline', 'evidence-types', 'physical-evidence'],
    quiz: [
      {
        id: 'dma-1',
        type: 'mcq',
        question: 'Error-level analysis (ELA) works by:',
        options: [
          'Comparing file size against known images',
          'Re-compressing the image and examining residual differences',
          'Running facial recognition',
          'Checking printer serial numbers',
        ],
        answer: 'Re-compressing the image and examining residual differences',
        explanation: 'ELA re-saves the image at a fixed JPEG quality and examines the error residuals; spliced regions often show different error levels from the original.',
      },
      {
        id: 'dma-2',
        type: 'mcq',
        question: 'Why must a digital media authentication tool list multiple independent indicators rather than one verdict?',
        options: [
          'Because courts do not allow expert testimony',
          'Because no single indicator is sufficient and independent checks reduce error',
          'Because AI always gives false positives',
          'Because metadata is always unreliable',
        ],
        answer: 'Because no single indicator is sufficient and independent checks reduce error',
        explanation: 'Combining ELA, metadata, compression and PRNU analysis provides converging evidence; no single test is conclusive on its own.',
      },
    ],
  },
{
    id: 'digital-forensics-timeline',
    title: 'Digital Forensics Timeline Reconstruction',
    category: 'other',
    discipline: 'Digital Forensics',
    icon: 'clock',
    color: 'cyan',
    definition:
      'The forensic process of ingesting metadata from multiple seized devices and constructing a single, correlated event timeline, while flagging clock drift, timezone issues and timestamp manipulation.',
    simpleExplanation:
      'An examiner takes files, logs and timestamps from phones, laptops and other devices and builds one unified timeline to see what happened when.',
    corePrinciple:
      'Cross-device correlation relies on normalising timestamps to a common timezone and format; inconsistencies may reveal spoofing, clock manipulation or genuine investigative leads.',
    whyItMatters:
      'Most criminal and cyber investigations involve multiple devices. Manual cross-referencing is slow and error-prone; a structured timeline workflow improves both speed and reliability.',
    process: [
      { title: 'Seize and preserve', description: 'Obtain devices under proper authority and preserve their state.' },
      { title: 'Export metadata', description: 'Extract EXIF, call logs, app usage and filesystem timestamps.' },
      { title: 'Normalise', description: 'Convert all timestamps to a common timezone and format.' },
      { title: 'Correlate', description: 'Align events from different sources onto a single timeline.' },
      { title: 'Flag', description: 'Identify clock drift, gaps, manipulations and suspicious inconsistencies.' },
    ],
    applications: [
      'Reconstructing the sequence of events across phones, laptops and IoT devices',
      'Detecting timestamp spoofing or clock manipulation',
      'Supporting or challenging suspect alibis',
      'Generating structured reports for court presentation',
    ],
    limitations: [
      'Timestamps can be spoofed or manipulated on many devices',
      'Incomplete data from seized devices yields incomplete timelines',
      'Clock drift between devices creates apparent gaps that may not be real',
      'Timezone handling errors can produce false inconsistencies',
    ],
    example:
      'Phone location logs and laptop file-access timestamps are correlated; the timeline reveals a 40-minute window where the two devices report contradictory locations — a lead the examiner investigates further.',
    relatedTopics: ['digital-media-authentication', 'physical-evidence', 'chain-of-custody', 'evidence-types'],
    quiz: [
      {
        id: 'dft-1',
        type: 'mcq',
        question: 'Why must timestamps from different devices be normalised before correlation?',
        options: [
          'Because every device shows a different date',
          'Because devices may use different timezones, clock accuracy and formats',
          'Because metadata is encrypted',
          'Because court rules require it',
        ],
        answer: 'Because devices may use different timezones, clock accuracy and formats',
        explanation: 'Normalising to a common timezone and format prevents apparent gaps or overlaps caused by clock settings rather than real events.',
      },
      {
        id: 'dft-2',
        type: 'mcq',
        question: 'What does a flagged clock-drift inconsistency indicate?',
        options: [
          'That the examiner made an error',
          'That one or more device clocks differ significantly from the others',
          'That the case is solved',
          'That the files are corrupted',
        ],
        answer: 'That one or more device clocks differ significantly from the others',
        explanation: 'Clock drift means the internal time of one device has run ahead or behind another; it may be innocent or may indicate manipulation — it requires further examination.',
      },
    ],
  },
  {
    id: 'ai-decision-support',
    title: 'AI in Forensic Science as Decision Support',
    category: 'other',
    discipline: 'Forensic Technology',
    icon: 'scale',
    color: 'cyan',
    definition:
      'The principle that AI and software tools in forensic contexts act as decision-support aids for qualified experts, never as autonomous decision-makers; every output must be explainable and accompanied by stated limitations.',
    simpleExplanation:
      'Software can help an examiner process data and flag things to look at, but it cannot replace expert judgment or tell a court who is guilty.',
    corePrinciple:
      'AI outputs are probabilities, not certainties; every tool must be framed as supporting, not replacing, human forensic expertise, and must be accompanied by measured precision and recall data.',
    whyItMatters:
      'As AI tools enter forensic labs, there is a risk that results are presented to courts without the honesty checks that scientific evidence requires. Ethical framing prevents misuse and overclaiming.',
    process: [
      { title: 'Train with care', description: 'Use only ethically sourced, representative datasets.' },
      { title: 'Validate', description: 'Measure precision, recall and failure modes on independent test sets.' },
      { title: 'Report honestly', description: 'State what the model can and cannot do, with quantitative evidence.' },
      { title: 'Human review', description: 'Every output must be reviewed by a qualified examiner before use.' },
    ],
    applications: [
      'Flagging potential items of interest for examiner review',
      'Automating repetitive, high-volume screening tasks',
      'Improving consistency and reducing examiner fatigue',
      'Generating structured, reproducible reports for court',
    ],
    limitations: [
      'Models trained on narrow datasets may fail on unseen manipulation types',
      'Bias in training data can produce unequal performance across demographics',
      'An opaque AI verdict is not admissible or scientifically defensible',
      'AI does not understand legal or forensic context; only humans do',
    ],
    example:
      'A deepfake-screening tool flags a video region; the examiner reviews the flagged frames using their own expertise and writes a report stating the tool was used as a triage aid, not as proof of tampering.',
    relatedTopics: ['digital-media-authentication', 'digital-forensics-timeline', 'evidence-types', 'quality-control'],
    quiz: [
      {
        id: 'aiml-1',
        type: 'mcq',
        question: 'In forensic science, an AI tool is best described as:',
        options: [
          'A replacement for the forensic examiner',
          'A decision-support aid for a qualified expert',
          'An autonomous decision-maker',
          'A substitute for chain of custody',
        ],
        answer: 'A decision-support aid for a qualified expert',
        explanation: 'AI can flag patterns and assist with high-volume screening, but only a qualified expert can interpret, contextualize and stand behind the result.',
      },
      {
        id: 'aiml-2',
        type: 'mcq',
        question: 'Why must AI tools in forensics report measured precision and recall rather than just "accuracy"?',
        options: [
          'Because courts do not understand accuracy',
          'Because precision and recall separately quantify false positives and false negatives, which have very different consequences',
          'Because accuracy is always 100%',
          'Because lawyers prefer complex numbers',
        ],
        answer: 'Because precision and recall separately quantify false positives and false negatives, which have very different consequences',
        explanation: 'A false positive can wrongly incriminate someone; a false negative can let the guilty go free. Stating both honestly is essential for scientific credibility.',
      },
    ],
  },
  {
    id: 'forensic-documentation',
    title: 'Documentation and Photography of Evidence',
    category: 'principles',
    discipline: 'Foundations',
    icon: 'document',
    color: 'slate',
    definition:
      'The systematic, contemporaneous record of a crime scene and its evidence through written notes, sketches, measurements, photographs and video, so that the scene and the position of evidence can be accurately reconstructed long after the scene has been altered.',
    simpleExplanation:
      'Recording everything about a scene, where evidence lies and what it looks like, so that people who were never there can understand it exactly.',
    corePrinciple:
      'Documentation must be complete, accurate and contemporaneous; if it was not recorded at the scene, it effectively did not happen for the record.',
    whyItMatters:
      'A scene is searched, dismantled and changed, and evidence is moved. The documentation is the only reliable reconstruction, and poor or selective recording makes the evidence difficult to rely on in court.',
    process: [
      { title: 'Freeze and assess', description: 'Secure the scene and decide the safest order of recording.' },
      { title: 'Overview photography', description: 'Shoot wide establishing shots from all access routes.' },
      { title: 'Record notes', description: 'Write bound-notebook observations while present, with time entries.' },
      { title: 'Sketch and measure', description: 'Draw a two-dimensional scale sketch with precise measurements.' },
      { title: 'Detail photography', description: 'Capture close-ups with a scale bar and maintain a photo log.' },
      { title: 'Verify', description: 'Cross-check the written record against the scene before release.' },
    ],
    applications: [
      'Reconstructing the scene as it was first encountered',
      'Charting the position of evidence for court exhibits',
      'Correlating witness accounts with a point of origin',
      'Prioritising later search and collection decisions',
    ],
    limitations: [
      'Photographs can distort size without a scale reference',
      'The record is only as reliable as the observer who made it',
      'Selective or edited documentation destroys objectivity',
    ],
    example:
      'An investigator photographs a room, sketches it to scale and logs each item before anything is moved, so that weeks later a court can understand the scene without being present.',
    relatedTopics: ['crime-scene-procedures', 'crime-scene-searching', 'evidence-lifecycle', 'digital-media-authentication'],
    quiz: [
      {
        id: 'fdoc-1',
        type: 'mcq',
        question: 'Why must scene documentation be contemporaneous?',
        options: [
          'Because it reflects notes taken after laboratory analysis',
          'Because it records what is observed at the time the scene still exists',
          'Because it is the fastest method available',
          'Because other investigators prefer a later summary',
        ],
        answer: 'Because it records what is observed at the time the scene still exists',
        explanation: 'Notes made while the scene is intact are trustworthy; an altered or cleared scene cannot be re-observed reliably later.',
      },
      {
        id: 'fdoc-2',
        type: 'mcq',
        question: 'What is the purpose of a scale bar in evidence photography?',
        options: [
          'To make photographs appear more professional',
          'To allow the true size of the object to be determined from the image',
          'To conceal background detail from the record',
          'To satisfy camera manufacturer recommendations',
        ],
        answer: 'To allow the true size of the object to be determined from the image',
        explanation: 'Without a scale reference the absolute size of an item cannot be measured, which weakens its presentation as a court exhibit.',
      },
    ],
  },
  {
    id: 'chain-of-custody',
    title: 'Chain of Custody',
    category: 'principles',
    discipline: 'Evidence Foundation',
    icon: 'chain',
    color: 'slate',
    definition:
      'The documented, unbroken route of an item of evidence from the moment it is collected to the moment it is presented in court, recording every seizure, transfer, storage and analysis step with names, times and purposes.',
    simpleExplanation:
      'An official signature-and-paper trail that proves the evidence being produced in court is the same evidence found at the scene and that nobody tampered with it.',
    corePrinciple:
      'A single break in the chain, such as a missing signature or an unrecorded hand-over, lets the defence argue the evidence may have been changed or substituted.',
    whyItMatters:
      'Without an intact chain of custody the evidence is treated as unauthenticated and may be kept out of court entirely, whatever its probative value.',
    process: [
      { title: 'Record at seizure', description: 'Note item, location, time and collector at the scene.' },
      { title: 'Package and seal', description: 'Seal with evidence tape and label with a unique item identifier.' },
      { title: 'Log every transfer', description: 'Document giver, receiver, date, time and purpose at each hand-over.' },
      { title: 'Store securely', description: 'Keep items in access-controlled, logged storage.' },
      { title: 'Transport under record', description: 'Maintain signed custody during any movement.' },
      { title: 'Authenticate in court', description: 'Every custodian may be called to verify the documented history.' },
    ],
    applications: [
      'Authenticating evidence for admissibility in court',
      'Detecting or preventing tampering, loss and substitution',
      'Supporting forensic laboratory intake procedures',
      'Maintaining accountability across multiple agencies',
    ],
    limitations: [
      'A chain is only as strong as its record keeping',
      'Multiple transfers increase the risk of error or omission',
      'Digital evidence adds layers such as hashes and forensic images',
    ],
    example:
      'Every time a sealed bag moves, from the scene to the van, to the property room and to the laboratory, the transfer is signed; a single missing signature is a potential defence point.',
    relatedTopics: ['evidence-lifecycle', 'physical-evidence', 'crime-scene-procedures', 'laboratory'],
    quiz: [
      {
        id: 'cust-1',
        type: 'mcq',
        question: 'Why does a break in the chain of custody undermine evidence?',
        options: [
          'It always destroys the scientific value of the item',
          'It allows the defence to argue the item may have been changed or substituted',
          'It only affects non-biological evidence',
          'It prevents laboratory analysis immediately',
        ],
        answer: 'It allows the defence to argue the item may have been changed or substituted',
        explanation: 'Continuity is the foundation of authenticity; a gap means the item cannot be shown to be the same item seized at the scene.',
      },
      {
        id: 'cust-2',
        type: 'mcq',
        question: 'What must be recorded at every transfer of an item of evidence?',
        options: [
          'Only the names of the transferring officer and laboratory',
          'Who handed the item over, who received it, the date, time and purpose',
          'The estimated market value of the item',
          'The number of photographs taken at the scene',
        ],
        answer: 'Who handed the item over, who received it, the date, time and purpose',
        explanation: 'Each link in the chain must show the item moved from a known custodian to the next custodian for a stated purpose.',
      },
    ],
  },
  {
    id: 'evidence-lifecycle',
    title: 'Life Cycle of Evidence',
    category: 'principles',
    discipline: 'Evidence Foundation',
    icon: 'eye',
    color: 'slate',
    definition:
      'The five-stage continuum of physical evidence, recognition, preservation, documentation, collection, and forwarding for analysis, with quality control applied throughout from the scene to the courtroom.',
    simpleExplanation:
      'A standard sequence, spot it, protect it, record it, pick it up and send it to the lab, that keeps evidence valid from scene to courtroom.',
    corePrinciple:
      'Evidence is only as strong as its weakest handling stage; each stage must be completed properly before the next stage can be valid.',
    whyItMatters:
      'The series of techniques ensures that the item brought to court is the same item that existed at the scene, free of contamination and undesired change.',
    process: [
      { title: 'Recognition', description: 'Identify potential items of evidence and their significance.' },
      { title: 'Preservation', description: 'Protect items from contamination, loss, marking and change.' },
      { title: 'Documentation', description: 'Record what was found, where, and how it was handled.' },
      { title: 'Collection', description: 'Package and label items using techniques suited to each type.' },
      { title: 'Forwarding and analysis', description: 'Transport under chain of custody for laboratory examination.' },
      { title: 'Quality control throughout', description: 'Apply checks and standards at every stage of the process.' },
    ],
    applications: [
      'Guiding investigators through a standard evidence workflow',
      'Preventing contamination and premature handling',
      'Structuring laboratory submissions from receipt to result',
      'Helping courts assess how evidence was managed before trial',
    ],
    limitations: [
      'The model simplifies the complexity of multi-item scenes',
      'Each evidence type has specific preservation requirements',
      'It does not replace written standard operating procedures',
    ],
    example:
      'A stained shirt is recognised as evidence, air-dried, photographed, bagged in paper, transported sealed and logged, each stage in the correct order so its biological content can later be relied upon.',
    relatedTopics: ['physical-evidence', 'crime-scene-searching', 'forensic-documentation', 'chain-of-custody'],
    quiz: [
      {
        id: 'elc-1',
        type: 'mcq',
        question: 'What is the correct order of the five stages of the evidence lifecycle?',
        options: [
          'Collection, documentation, preservation, recognition, forwarding',
          'Recognition, preservation, documentation, collection, forwarding',
          'Preservation, recognition, forwarding, collection, documentation',
          'Documentation, recognition, collection, preservation, forwarding',
        ],
        answer: 'Recognition, preservation, documentation, collection, forwarding',
        explanation: 'Evidence is first recognised, then protected, then recorded, then collected and finally forwarded for analysis.',
      },
      {
        id: 'elc-2',
        type: 'mcq',
        question: 'Why is preservation placed before documentation in the lifecycle?',
        options: [
          'Because it is cheaper to preserve than to record',
          'Because an item must be secured and protected before it can be safely described and handled',
          'Because documentation always fails at the scene',
          'Because preservation removes the need for collection',
        ],
        answer: 'Because an item must be secured and protected before it can be safely described and handled',
        explanation: 'Protecting the item first prevents contamination and change, so that the later documentation records the item as it truly existed.',
      },
    ],
  },
  {
    id: 'laboratory',
    title: 'Role of the Forensic Laboratory',
    category: 'laboratory',
    discipline: 'Evidence Foundation',
    icon: 'microscope',
    color: 'slate',
    definition:
      'The facility and workflow where evidence is received under custody, examined using validated methods, interpreted against standards and controls, and reported back to the requesting agency in a legally defensible form.',
    simpleExplanation:
      'The laboratory is where evidence goes after the scene, it is logged in, tested, interpreted and returned as a signed expert result with a report.',
    corePrinciple:
      'A laboratory result is legally useful only when validated methods were used, controls behaved as expected, the chain was unbroken and the report states the strength and limits of its conclusions.',
    whyItMatters:
      'The testimony delivered in court is a product of laboratory processes; the quality of those processes determines whether the result withstands scrutiny.',
    process: [
      { title: 'Receipt', description: 'Validate the submission, seals and chain-of-custody paperwork.' },
      { title: 'Examination', description: 'Test and compare items using validated procedures.' },
      { title: 'Interpretation', description: 'Weigh results against standards, controls and case context.' },
      { title: 'Reporting', description: 'Produce a clear, balanced, signed written report.' },
      { title: 'Quality review', description: 'Verify the work through peer and quality-assurance checks.' },
    ],
    applications: [
      'Confirming and characterising evidence types',
      'Identifying or excluding suspects and sources',
      'Supporting linked investigations across multiple matters',
      'Providing court-ready documentation and expert testimony',
    ],
    limitations: [
      'Results are only as reliable as the sample that was submitted',
      'Conclusions remain probabilistic and context-dependent',
      'Backlogs and resource constraints can delay analysis',
    ],
    example:
      'A swab is received at the forensic science laboratory, logged, subsampled and grouped, the results are checked against known controls, and a signed report returns to the investigating officer with a clear strength of conclusion.',
    relatedTopics: ['evidence-lifecycle', 'quality-control', 'physical-evidence', 'chain-of-custody'],
    quiz: [
      {
        id: 'fsl-1',
        type: 'mcq',
        question: 'Which step must a laboratory complete before starting the examination of a received item?',
        options: [
          'Advertising the results to the public',
          'Validating the submission, seals and chain-of-custody paperwork',
          'Returning the item to the scene',
          'Discarding unused reference standards',
        ],
        answer: 'Validating the submission, seals and chain-of-custody paperwork',
        explanation: 'The laboratory must confirm the item is properly submitted and its custody is intact before it is accepted for analysis.',
      },
      {
        id: 'fsl-2',
        type: 'mcq',
        question: 'Why is peer review part of laboratory practice?',
        options: [
          'To speed up every examination',
          'To give each result an independent second check before it leaves the lab',
          'To replace the need for calibration',
          'To reduce the cost of reagents',
        ],
        answer: 'To give each result an independent second check before it leaves the lab',
        explanation: 'An independent check reduces the chance that an error or bias reaches the final report and the courtroom.',
      },
    ],
  },
  {
    id: 'quality-control',
    title: 'Quality Assurance in the Forensic Laboratory',
    category: 'laboratory',
    discipline: 'Evidence Foundation',
    icon: 'scale',
    color: 'cyan',
    definition:
      'The system of valid methods, calibration, standards, controls, proficiency testing, peer review and accreditation that ensures laboratory results are reliable, reproducible and defensible in court.',
    simpleExplanation:
      'Checklists and checks, such as calibrating an instrument and running a known standard, that ensure a laboratory answer is the correct answer every time.',
    corePrinciple:
      'A laboratory must demonstrate its competence objectively through calibrated equipment, controlled experiments, tested staff and an accredited quality system.',
    whyItMatters:
      'Courts only trust results produced by processes that have been shown to work; a calibration drift or a failed control can invalidate an entire batch of evidence results.',
    process: [
      { title: 'Calibrate', description: 'Verify instruments against certified standards on a scheduled basis.' },
      { title: 'Run controls', description: 'Include known positive and negative controls in every batch.' },
      { title: 'Proficiency test', description: 'Assess staff regularly against blind, known samples.' },
      { title: 'Peer review', description: 'Have a second qualified examiner verify the conclusions.' },
      { title: 'Audit and improve', description: 'Investigate deviations and apply corrective actions.' },
    ],
    applications: [
      'Verifying instrument accuracy using certified calibration standards',
      'Catching contamination before it reaches final conclusions',
      'Demonstrating competence to courts and accrediting bodies',
      'Standardising methods across analysts and laboratories',
    ],
    limitations: [
      'Controls validate a batch but cannot prove every single sample',
      'Proficiency schemes cover typical cases, not every scenario',
      'Quality systems add cost and time to routine analysis',
    ],
    example:
      'An analyst runs a known blood standard and a negative control alongside the case samples; both must behave exactly as expected before the case results are accepted.',
    relatedTopics: ['laboratory', 'evidence-lifecycle', 'forensic-chemistry', 'chain-of-custody'],
    quiz: [
      {
        id: 'qc-1',
        type: 'mcq',
        question: 'Why are known positive and negative controls included with case samples?',
        options: [
          'To make the batch look busy',
          'To verify that the test system is behaving correctly for that run',
          'To reduce the number of case samples needed',
          'To replace the need for calibration',
        ],
        answer: 'To verify that the test system is behaving correctly for that run',
        explanation: 'If the known controls give the expected results, the case results from the same batch are considered trustworthy; if not, the batch is rejected.',
      },
      {
        id: 'qc-2',
        type: 'mcq',
        question: 'What is the purpose of proficiency testing for laboratory staff?',
        options: [
          'To assess each analyst against blind, known samples on a regular basis',
          'To publish the identity of every analyst',
          'To replace instrument calibration permanently',
          'To reduce the need for peer review',
        ],
        answer: 'To assess each analyst against blind, known samples on a regular basis',
        explanation: 'Regular proficiency tests demonstrate that analysts can produce correct results on samples whose true value is known, supporting the credibility of their casework.',
      },
    ],
  },
  {
    id: 'forensic-chemistry',
    title: 'Forensic Chemistry',
    category: 'chemistry',
    discipline: 'Forensic Chemistry',
    icon: 'chemistry',
    color: 'cyan',
    definition:
      'The branch of forensic science that applies chemical analysis to physical evidence, covering drugs and narcotics, toxicology, explosives residues, gunshot residue, flammables and the screening and confirmatory testing of unknown substances.',
    simpleExplanation:
      'Forensic chemistry uses tests and instruments to find out what an unknown substance is made of, such as whether a white powder is a drug or whether a mark contains gunshot residue.',
    corePrinciple:
      'Screening tests narrow possibilities but must be confirmed by instrument-based methods such as chromatography and mass spectrometry before an identity is reported to a court.',
    whyItMatters:
      'Perhaps the highest-volume forensic demand is chemical identification, from drug seizures to fire debris; unreliable or overclaimed results carry serious legal consequences.',
    process: [
      { title: 'Screen', description: 'Preliminary colour and spot tests to narrow the possibilities.' },
      { title: 'Separate', description: 'Chromatography separates the components of a mixture.' },
      { title: 'Identify', description: 'Mass spectrometry or spectroscopy confirms molecular identity.' },
      { title: 'Quantify', description: 'Measure the amount of the substance where required by law.' },
      { title: 'Report', description: 'Document the finding with appropriate strength of conclusion.' },
    ],
    applications: [
      'Identifying and quantifying seized drugs and narcotics',
      'Detecting explosives and flammable residues in fire debris',
      'Testing for gunshot residue on hands and surfaces',
      'Supporting toxicological analysis of poisons and metabolites',
    ],
    limitations: [
      'Screening tests alone are not confirmatory',
      'Trace amounts may sit below the detection limit of a method',
      'Contamination during collection can lead to false positives',
    ],
    example:
      'A white powder gives a presumptive colour reaction for an opiate; gas chromatography-mass spectrometry is then used to confirm the identity before the result is reported to the court.',
    relatedTopics: ['laboratory', 'quality-control', 'physical-evidence', 'explosives-evidence'],
    quiz: [
      {
        id: 'chem-1',
        type: 'mcq',
        question: 'Why is a presumptive colour test not enough to report a drug identity?',
        options: [
          'Because colour tests are always wrong',
          'Because several substances can give the same colour reaction',
          'Because courts do not accept colour',
          'Because colour tests are too slow',
        ],
        answer: 'Because several substances can give the same colour reaction',
        explanation: 'Screening tests are presumptive; an instrument-based confirmation such as GC-MS is required before an identity can be reported reliably.',
      },
      {
        id: 'chem-2',
        type: 'mcq',
        question: 'Which laboratory technique is commonly used to separate the components of a mixture before identification?',
        options: [
          'Chromatography',
          'Colour comparison by eye',
          'Weighing the entire sample',
          'Charging the sample to a court',
        ],
        answer: 'Chromatography',
        explanation: 'Chromatography separates mixtures into their components, which can then be identified individually by mass spectrometry or similar detection.',
      },
    ],
  },
]

export default topics