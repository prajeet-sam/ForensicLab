export interface ModuleNoteSection {
  title: string
  content: string[]
}

export interface ModuleNote {
  id: string
  slug: string
  title: string
  subtitle: string
  icon: string
  category: 'biology' | 'chemistry' | 'physics' | 'other' | 'document' | 'laboratory'
  description: string
  sourceFile: string
  relatedTopics?: string[]
  sections: ModuleNoteSection[]
}

export const moduleNotes: ModuleNote[] = [
  {
    id: 'mod-csi',
    slug: 'crime-scene-investigation',
    title: 'Crime Scene Investigation & Management',
    subtitle: 'Physical evidence, searching methods and scene documentation',
    icon: 'fingerprint',
    category: 'laboratory',
    description:
      'What physical evidence is, how it is processed, and the range of evidence types — blood, semen, saliva, documents, explosives, ballistics, fingerprints, fibers, paint, soil and more — recovered at a crime scene.',
    sourceFile: 'Crime Scene Investigation & Management (PDF)',
    relatedTopics: [
      'physical-evidence',
      'crime-scene-procedures',
      'crime-scene-searching',
      'locard-principle',
    ],
    sections: [
      {
        title: 'Learning outcomes',
        content: [
          'At the completion of this module you should be able to explain the role of physical evidence in forensic science, describe the processing cycle for physical evidence, and identify common types of physical evidence encountered at crime scenes.',
        ],
      },
      {
        title: 'What is physical evidence?',
        content: [
          'Physical evidence is any tangible material or object that plays a vital role in the matter giving rise to litigation. It is introduced in a trial to prove a fact in issue based on its demonstrable physical characteristics.',
          'The role of physical evidence in forensic investigation varies with many factors: how much evidence is recovered and how potential it is. Evidence recovered from the crime spot is crucial in reconstruction of events.',
          'Physical evidence alone does not describe everything that happened, but it can support or contradict accounts given by witnesses and/or suspects. The information obtained can also generate leads and confirm reconstruction of a crime for a jury.',
        ],
      },
      {
        title: 'Processing physical evidence — the cycle',
        content: [
          'The processing of physical evidence follows a well-defined cycle:',
          '1. Discovering physical evidence.',
          '2. Recognizing its evidentiary significance.',
          '3. Examining the evidence (photography, casting, preliminary analysis).',
          '4. Collecting the evidence (swabbing, scraping, lifting, removing the substrate if needed).',
          '5. Recording the scene (sketches, notes, photographs, video, evidence inventory).',
          '6. Identifying the evidence (labelling, barcode assignment, chain of custody entry).',
          '7. Packaging, conveying and storing (appropriate containers, temperature control, sealing).',
          '8. Exhibiting the evidence in court.',
          '9. Disposing of the evidence when the case is closed.',
        ],
      },
      {
        title: 'Types of physical evidence',
        content: [
          'Blood — Examined for confirmatory tests (Ouchterlony, Takayama, HemaTrace), ABO grouping, DNA profiling, and stain pattern analysis.',
          'Semen — Identified via acid phosphatase test, PSA, Christmas Tree stain and RSID for semen (semenogelin).',
          'Saliva — Detected by Phadebas test for alpha-amylase activity, and RSID for human saliva.',
          'Questioned documents — Handwriting analysis, signature comparison, examination of typewriters, printers and copiers, ink/pencil analysis, detection of alterations (additions, erasures, obliterations), indentation detection (EDD) and sequence determination.',
          'Explosives — Residues examined by spot tests and high-tech forensic tools to identify material, source and intention.',
          'Ballistics (firearms and ammunition) — Tool-mark and striation analysis, comparison microscopy, GSR collection, cartridge case and bullet comparison.',
          'Fingerprints — Latent, patent and plastic prints; development by powder, chemicals (ninhydrin, cyanoacrylate), alternative light sources.',
          'Tiremarks and footprints — Impression evidence requiring casting, measurement, and comparison with known tyres or footwear.',
          'Fibers — Natural (cotton, wool, silk) and synthetic (polyester, nylon, acrylic); comparison by microscopy, microspectrophotometry, FTIR.',
          'Paint — Automotive, architectural or industrial paint chips; layer structure analysis, pyrolysis-GC, FTIR, and microscopy.',
          'Building materials — Cement, plaster, glass fragments; density, refractive index and chemical analysis.',
        ],
      },
      {
        title: 'Search methods',
        content: [
          'Crime-scene searching methods include the grid (spiral), line/zone, strip, and point-to-point searches. The choice depends on scene size, terrain, evidence type and resources. Each method must be documented, and all evidence found must be photographed in situ before collection.',
        ],
      },
    ],
  },
  {
    id: 'mod-procedures',
    slug: 'crime-scene-procedures',
    title: 'Crime Scene Procedures',
    subtitle: 'The nine-step processing sequence for a crime scene',
    icon: 'chain',
    category: 'laboratory',
    description:
      'The systematic nine-step procedure for processing a crime scene — from securing the perimeter through reconstruction, with the importance of documentation and separation of witnesses at every stage.',
    sourceFile: 'Criminal Investigation (PDF)',
    relatedTopics: [
      'crime-scene-procedures',
      'chain-of-custody',
      'evidence-types',
      'physical-evidence',
    ],
    sections: [
      {
        title: 'Objectives',
        content: [
          'This module describes the nine-step procedure that a first responder or crime-scene investigator follows. Each step has a scientific rationale: preserve evidence integrity, maintain the chain of custody, and support honest reconstruction.',
        ],
      },
      {
        title: 'Step 1 — Secure and isolate the scene',
        content: [
          'Establish an outer perimeter (large enough to contain all potential evidence) and an inner perimeter around the focus of investigation. Control access: only essential, trained personnel may enter. Every person who enters must be logged.',
        ],
      },
      {
        title: 'Step 2 — Separate witnesses',
        content: [
          'Witnesses are separated before they can discuss what they saw. This prevents cross-contamination of accounts and preserves the independence of each statement. Separation applies equally to victims, suspects, bystanders and first responders.',
        ],
      },
      {
        title: 'Step 3 — Scan and survey',
        content: [
          'Conduct a careful walk-through of the scene. Photograph and video the entire area before anything is touched. Note obvious signs of entry/exit, points of disturbance, and any hazards (chemical, biological, structural).',
        ],
      },
      {
        title: 'Step 4 — See — observe with attention',
        content: [
          'Look for trace evidence that casual observation would miss: hair, fibres, glass fragments, tool marks, impressions, blood patterns, fired projectiles, documents, electronic devices. This is where training and an understanding of Locard\u2019s principle matter most.',
        ],
      },
      {
        title: 'Step 5 — Sketch',
        content: [
          'Create a preliminary sketch of the scene before collection. Include measurements, reference points, positions of evidence and relationships between objects. An accurate sketch is essential for reconstruction and court presentation.',
        ],
      },
      {
        title: 'Step 6 — Search',
        content: [
          'Apply a systematic search pattern (grid, line, zone or spiral) appropriate to the scene. Document every item found and its exact position (three-dimensional: x, y, z) before collection.',
        ],
      },
      {
        title: 'Step 7 — Collect',
        content: [
          'Collect evidence using appropriate technique for each type: tweezers for fibres, swabs for blood/saliva, tape lifts for hair/trace, cast for impressions, packaging chosen for the material (paper for biological, rigid for fragile, anti-static for drugs).',
        ],
      },
      {
        title: 'Step 8 — Maintain chain of custody',
        content: [
          'Every transfer of evidence — from scene to vehicle, vehicle to lab, technician to technician — must be recorded: handler identity, date/time, purpose, condition of item and authorisation signature. A gap weakens admissibility.',
        ],
      },
      {
        title: 'Step 9 — Reconstruct',
        content: [
          'Once collection is complete, reconstruct what happened using physical evidence, witness statements and scene documentation. Reconstruction is the final step in the investigation before interpretation and reporting.',
        ],
      },
    ],
  },
  {
    id: 'mod-searching',
    slug: 'crime-scene-searching',
    title: 'Crime Scene Searching Methods',
    subtitle: 'Grid, line, zone and spiral — choosing the right method',
    icon: 'microscope',
    category: 'laboratory',
    description:
      'How crime scene search patterns are selected and applied, and how documentation of positions and surroundings ensures evidence integrity from scene to court.',
    sourceFile: 'Criminal Investigation (PDF)',
    relatedTopics: [
      'crime-scene-searching',
      'crime-scene-procedures',
      'physical-evidence',
      'locard-principle',
    ],
    sections: [
      {
        title: 'Why the search method matters',
        content: [
          'A systematic search ensures that evidence is neither missed nor destroyed. The method chosen must suit the scene: indoor vs outdoor, large vs small, the expected type of evidence and available resources. Every item found is photographed in place and its position recorded before collection.',
        ],
      },
      {
        title: 'The grid (spiral) search',
        content: [
          'The investigator covers the scene in overlapping parallel lines at right angles, forming a grid. This is the most thorough method and is suited to large outdoor scenes. Two complete passes at right angles reduce the chance of missing small items.',
        ],
      },
      {
        title: 'Line (strip) search',
        content: [
          'Investigators line up shoulder-to-shoulder and walk slowly across the scene in parallel lines. Effective for large, flat areas (fields, car parks) with visible or expected trace evidence.',
        ],
      },
      {
        title: 'Zone search',
        content: [
          'The scene is divided into quadrants or zones, each searched independently. Useful for large indoor scenes with multiple rooms. Teams work in assigned zones and coordinate at zone boundaries.',
        ],
      },
      {
        title: 'Point-to-point (hasty) search',
        content: [
          'A quick, targeted search between specific points of interest. Used as a preliminary sweep before a more thorough method, or in time-critical situations.',
        ],
      },
      {
        title: 'Documentation requirements',
        content: [
          'Photography: wide-angle overview, mid-range context, close-up with scale before collection.',
          'Sketches: rough sketch at the scene, final (scaled) sketch later. Include measurements, reference points, compass bearing.',
          'Notes: weather, lighting, access points, names of persons present, condition of items, times of collection.',
          'Evidence log: sequential numbering, description, location, collector, date/time.',
        ],
      },
    ],
  },
  {
    id: 'mod-criminal-investigation',
    slug: 'criminal-investigation',
    title: 'Criminal Investigation',
    subtitle: 'Reactive and proactive modes, team skills, and evidence types',
    icon: 'case',
    category: 'other',
    description:
      'How criminal investigations are initiated (reactive vs proactive), the composition and skills of a CSI team, and the distinction between physical, documentary and testimonial evidence.',
    sourceFile: 'Criminal Investigation (PDF)',
    relatedTopics: ['criminal-investigation', 'crime-scene-procedures', 'evidence-types'],
    sections: [
      {
        title: 'What is criminal investigation?',
        content: [
          'Criminal investigation is the set of processes and techniques used by police and forensic professionals to find out what happened during a crime, who was involved, and to gather evidence suitable for court.',
          'The objectives are: prevent crime, apprehend offenders, recover property, identify victims, present evidence in court, and support the prevention of future crime.',
        ],
      },
      {
        title: 'Reactive vs proactive investigation',
        content: [
          'Reactive investigation starts after a crime has been reported or discovered. The investigator works backward from the scene: securing it, identifying witnesses, collecting physical evidence and reconstructing events.',
          'Proactive investigation initiates action against anticipated or ongoing offending before an incident has occurred or been reported. Methods include surveillance, informants, undercover operations and sting operations.',
          'Effective investigators blend both styles, using sensing, technical skill, people skill, interviewing ability and reasoning.',
        ],
      },
      {
        title: 'The CSI team',
        content: [
          'A crime-scene investigation team typically includes the first responder, crime-scene technicians, a lead crime-scene investigator, forensic scientists (biology, chemistry, physics, documents, digital), photographers, and an evidence custodian.',
          'Roles must be clearly assigned: who documents, who collects, who transports, who maintains the evidence log. Duplication of effort and contamination must be avoided.',
        ],
      },
      {
        title: 'Types of evidence',
        content: [
          'Physical evidence — tangible items: biological stains, fibres, glass, paint, soil, tool marks, weapons, documents, electronic devices.',
          'Documentary evidence — records, CCTV, digital logs, emails, financial transactions.',
          'Testimonial (testimonial/oral) evidence — statements by witnesses, victims, suspects, and expert witnesses.',
          'Digital evidence — data stored or transmitted electronically: mobile phones, computers, cloud storage, social media.',
        ],
      },
      {
        title: 'Scientific reasoning in investigation',
        content: [
          'Every conclusion must be grounded in evidence, not assumption. The scientific method — hypothesis, test, observation, conclusion — applies throughout the investigation. Interpretation must state what the evidence supports and what it does not.',
        ],
      },
    ],
  },
  {
    id: 'mod-evidence-types',
    slug: 'evidence-types',
    title: 'Types of Physical Evidence',
    subtitle: 'Class characteristics, individual characteristics and what they can and cannot show',
    icon: 'warning',
    category: 'laboratory',
    description:
      'The classification of physical evidence into class and individual characteristics, the distinction between direct and circumstantial evidence, and why no single piece of evidence can prove guilt on its own.',
    sourceFile: 'Criminal Investigation (PDF)',
    relatedTopics: ['evidence-types', 'physical-evidence', 'crime-scene-procedures'],
    sections: [
      {
        title: 'Class vs individual characteristics',
        content: [
          'Class characteristics are features shared by a group of items: the same manufacturer, the same batch, the same model. Glass fragments with the same refractive index and density come from the same class of glass.',
          'Individual characteristics are features unique to a single item: a particular tool\u2019s random striations, a particular firearm\u2019s rifling pattern, a DNA profile. These permit an examiner to say that a mark was made by one specific object.',
          'Most forensic evidence is class evidence. Individualizing evidence exists but is rarer than popularly believed.',
        ],
      },
      {
        title: 'Direct vs circumstantial evidence',
        content: [
          'Direct evidence proves a fact without inference: a witness seeing a suspect at the scene.',
          'Circumstantial (indirect) evidence requires an inference: a fingerprint on the weapon, fibres matching the suspect\u2019s clothing, blood group consistent with the suspect.',
          'Both are admissible; neither is inherently weaker. A strong circumstantial case can be more reliable than unreliable eyewitness testimony.',
        ],
      },
      {
        title: 'What physical evidence can show',
        content: [
          'It can place a person or object at a scene (transfer evidence). It can corroborate or contradict a witness\u2019s account. It can link suspect to victim or scene to suspect.',
          'It cannot by itself prove guilt. Every item must be interpreted in context, with attention to alternative explanations, secondary transfer, contamination, and the limits of the analytical method used.',
        ],
      },
      {
        title: 'Limitations of forensic evidence',
        content: [
          'Contamination at scene or lab can compromise results. Secondary transfer (e.g., fibres passing via a car seat) can create misleading associations. Class evidence does not individualize.',
          'The value of evidence depends on: how much was recovered, how it was handled, the quality of the analysis, and the honesty of interpretation. No single test produces absolute proof.',
        ],
      },
    ],
  },
  {
    id: 'mod-bio-collection',
    slug: 'biological-evidence-collection',
    title: 'Collection of Biological Evidence',
    subtitle: 'Blood, semen, saliva, sweat, hair — rules, tests and interpretation',
    icon: 'blood',
    category: 'biology',
    description:
      'The 23 collection rules for biological evidence, with detailed examination of sweat, semen (acid phosphatase, PSA, Christmas Tree, RSID), saliva (Phadebas, RSID) and blood (Ouchterlony, luminol, Takayama, HemaTrace).',
    sourceFile: 'Collection of Biological Evidences (PDF)',
    relatedTopics: [
      'biological-evidence-collection',
      'semen-evidence',
      'saliva-evidence',
      'blood-confirmation-tests',
      'presumptive-blood-tests',
    ],
    sections: [
      {
        title: 'Goals of biological evidence collection',
        content: [
          'Biological evidence must be collected to avoid contamination, preserve DNA, and maintain the integrity of any confirmatory or grouping tests. Each stain should be collected and packaged separately.',
          'Use smooth, clean tweezers; rinse tools with distilled water between samples. Do not talk or cough over evidence. Small stains (2 mm or less) are the most susceptible to contamination — change gloves, consider a mask.',
          'Always package in paper bags or envelopes, never plastic, to prevent moisture buildup and mould growth. Damp or bloody items require brown paper bags or butcher paper.',
        ],
      },
      {
        title: 'Sweat',
        content: [
          'Sweat is a watery fluid secreted by simple tubular glands (2–4 million across the body). Composition: ~99.5% water with 0.2–1% solutes — sodium, potassium, lactate, urea, ammonia.',
          'Sweat is stimulated by temperature, exercise, hormones, and emotional stress (emotional sweating is localised to palms, soles, armpits and forehead). The principal function is thermoregulation via evaporative cooling.',
          'Forensic significance: DNA can be recovered from sweat; enzyme and protein profiles may assist in linking a stain to a specific person.',
        ],
      },
      {
        title: 'Semen — presumptive and confirmatory tests',
        content: [
          'Acid phosphatase (AP) test / Walker test / Brentamine spot test: The male prostate secretes high AP into semen. In the presence of alpha-naphthyl acid phosphate and Brentamine Fast Blue, AP produces a dark purple colour in less than one minute. Highly presumptive — vaginal secretions and other fluids contain detectable AP.',
          'Alternative light sources: semen fluoresces (blue to yellow) due to flavin and choline-conjugated proteins. Highly presumptive — many molecules fluoresce similarly.',
          'Prostate specific antigen (PSA): Detects a prostate-specific protein. Very small amounts are also found in faecal material, sweat, female urine and breast milk. Use with caution; confirm with sperm identification.',
          'Christmas Tree stain (confirmatory): Picroindigocarmine stains the neck and tail green-blue; Nuclear Fast Red (Kernechtrot) stains the head red with a pink tip. Positive visual identification of spermatozoa. Sperm tails deteriorate first; trained observation is essential.',
          'RSID for semen (confirmatory): Detects semenogelin, a seminal vesicle-specific antigen unique to human semen. No cross-reactivity with other body fluids or other mammalian semen. Survives unfavourable storage conditions.',
        ],
      },
      {
        title: 'Saliva — presumptive and confirmatory tests',
        content: [
          'Phadebas test (presumptive): Detects enzymatic activity of alpha-amylase, which is present in saliva at high levels. Four human variants exist (two salivary, two pancreatic); the enzyme also occurs in other organisms, so this test is presumptive only.',
          'RSID for human saliva (confirmatory when combined with Phadebas): Detects the alpha-amylase molecule itself, specifically from human saliva. Cross-reactions occur with gorilla and rat amylases and with other body fluids (semen, blood, vaginal discharge, sweat, breast milk, faeces). Proper timing and swabbing technique are critical.',
        ],
      },
      {
        title: 'Blood — species identification and confirmatory tests',
        content: [
          'Species of origin — Ouchterlony test: Bloodstain extract is placed in a well in agar gel; antibodies from human and animal sources are placed in adjacent wells. If the antigen and antibody are from the same species, a precipitin line forms in the gel. Controls from unstained substrate are required; the reaction may take hours to 72 hours.',
          'Presumptive tests — Kastle-Meyer (phenolphthalein): A peroxidase reaction produces a pink colour with hydrogen peroxide. False positives occur with saliva, pus, vegetable extracts and rust.',
          'Luminol: Blue chemiluminescence with UV light from reaction with hematin (formed as blood ages). Extremely sensitive — reveals cleaned or dilute stains — but does not confirm blood (false positives with copper salts/brass).',
          'Confirmatory — Takayama test: Hemochromogen crystals form salmon-pink rhomboids. Requires ~0.1 mg hemoglobin and is suitable for old samples.',
          'Confirmatory — RSID for human blood: Detects Glycophorin A (a red-cell membrane protein) using two specialised antibodies on a strip. Read exactly 10 minutes after sample application.',
          'Confirmatory — ABAcard HemaTrace: Detects human hemoglobin via antihuman hemoglobin antibody on a strip; a pink dye band in the test window indicates a positive result.',
        ],
      },
    ],
  },
  {
    id: 'mod-non-bio-collection',
    slug: 'non-biological-evidence',
    title: 'Non-Biological Evidence',
    subtitle: 'Fiber, glass, tool marks, soil and paint',
    icon: 'glass',
    category: 'physics',
    description:
      'How fibre, glass (3R rule, Becke line, density gradient), tool marks (striations, casting), soil (density, composition) and paint (layer structure, pyrolysis-GC, FTIR) are collected, compared and interpreted.',
    sourceFile: 'Collection of Non-Biological Evidences (PDF)',
    relatedTopics: [
      'fiber-evidence',
      'glass-fracture-analysis',
      'toolmark-evidence',
      'soil-evidence',
      'paint-evidence',
    ],
    sections: [
      {
        title: 'Fiber evidence',
        content: [
          'A fiber is the smallest unit of textile material with a length many times greater than its diameter. Fibers are natural (plant: cotton, flax, hemp; animal: wool, cashmere, alpaca) or man-made (rayon, polyester, nylon, acrylic, acetate).',
          'Fibers are collected with tweezers, tape lifts or vacuum. Microscopic examination (compound, phase-contrast, scanning electron microscope) and spectrophotometry (FTIR, microspectrophotometry) are used to compare questioned and known fibres.',
          'Fiber evidence is class evidence: it cannot individualize to one garment. The greater the number of matching fibers, the more significant the association — but it can never alone prove contact.',
          'Cross-transfer of fibers occurs in person-to-person contact. The world produces ~80 billion pounds of fabric per year; the variety of fiber type, color, construction and finish makes exact duplication unlikely, but not impossible.',
        ],
      },
      {
        title: 'Glass evidence — fracture analysis',
        content: [
          'Glass is a uniform amorphous solid with no specific melting point — it softens over a temperature range, which produces characteristic fracture patterns.',
          'Composition: fused sand (SiO\u2082), soda (Na\u2082CO\u2083), lime (CaO). Types: borosilicate (pyrex), lead glass (high RI), flat glass (float process), laminated glass (windshields), tempered safety glass (car side windows, designed to dice).',
          'Radial cracks form first on the side opposite the force. Concentric cracks follow on the same side as the force. The 3R rule: Radial cracks produce rib marks that form Right angles on the Reverse side from the force.',
          'Exceptions: tempered glass dices without ridges; tightly framed windows; heat or explosion breaks (no point of impact).',
          'Glass comparison depends on: refractive index (Becke line method), density (density gradient column), and physical fit (matching fracture edges — the most powerful comparison).',
        ],
      },
      {
        title: 'Glass evidence — refractive index and the Becke line',
        content: [
          'A glass fragment is placed in oils of known refractive index and viewed under a microscope. The Becke line is a bright line at the boundary between the glass and the oil.',
          'As focus is raised, the Becke line moves toward the medium of higher refractive index. When it disappears at the match point, RI(oil) = RI(glass) and minimum contrast is observed.',
          'This is combined with density measurement (density gradient column: two liquids of different densities layered in a tube; particles suspend at the level matching their own density) for a stronger association.',
        ],
      },
      {
        title: 'Tool marks',
        content: [
          'A tool mark is any impression, cut, scratch, gouge or abrasion caused by a tool contacting a softer surface. Common in burglary scenes (forced entry with screwdrivers, crowbars, chisels).',
          'Class characteristics (size, shape, cross-section) identify the type of tool. Individual characteristics are random striations — ridges and valleys — from the machining process, wear and damage. Every tool has a unique microtopography.',
          'Test marks are made by applying the suspect tool at various angles and pressures to a soft metal (commonly lead). Evidence and test marks are compared through a comparison microscope.',
          'When removal is impractical, the mark is photographed to scale and cast with liquid silicone or dental stone — the most satisfactory materials for reproducing fine detail.',
        ],
      },
      {
        title: 'Soil evidence',
        content: [
          'Soil is a mixture of organic (humus — decayed plant and animal material) and inorganic (minerals — sand, silt, clay) material. Soil is class evidence and cannot be individualized to a particular location, but soils differ within a few metres horizontally and vertically.',
          'Properties for comparison: colour (indicates iron, organic content, moisture), structure (single grain, granular, blocky, platy, prismatic — determined by peds/clumps cemented by CaCO\u2083 or similar agents), mineral composition, and density.',
          'The density gradient tube method separates soil particles by density; the resulting banding pattern reveals a profile for comparison.',
          'Soil can also contain biological evidence (saliva, semen, blood) which should be submitted to the laboratory if found.',
        ],
      },
      {
        title: 'Paint evidence',
        content: [
          'Paint is composed of pigments (colour and hiding quality) and a binder (usually a polymer) with additives. Automotive paint has four layers: electrocoat primer, primer surfacer, basecoat (colour), and clearcoat.',
          'Colour is the most distinctive forensic characteristic. Layer structure (number and sequence of coloured layers matching between questioned and known samples) strongly suggests common origin.',
          'Chemical analysis: pyrolysis gas chromatography decomposes paint chips (as small as 20 \u03bcg) by heat into gas products; the resulting pyrogram (chromatogram pattern) is specific to the polymer binder.',
          'Infrared spectrophotometry (FTIR) provides an absorption spectrum that is highly characteristic of the binder. Microscopy remains the most important instrument for locating and comparing paint specimens.',
        ],
      },
    ],
  },
  {
    id: 'mod-origin-species',
    slug: 'forensic-serology-origin-of-species',
    title: 'Origin of Species & Blood Grouping from Dried Stains',
    subtitle: 'Precipitin tests, Lattes, absorption-elution, MN/Rh, anti-H lectin',
    icon: 'species',
    category: 'biology',
    description:
      'Methods for determining the species of origin of biological stains (precipitin tube, double diffusion, cross-over electrophoresis, staining with amido black) and ABO, MN and Rh grouping from dried bloodstains (Lattes test, absorption-elution, anti-H lectin, ammonium method).',
    sourceFile: 'Forensic Serology — Origin of Species (PDF)',
    relatedTopics: [
      'origin-of-species',
      'blood-grouping-dried-stains',
      'immunodiffusion',
      'precipitation',
      'abo-blood-grouping',
    ],
    sections: [
      {
        title: 'Objectives',
        content: [
          'This module covers the determination of the species of origin of biological fluids (blood, semen, saliva) using immunological methods, and the ABO, MN and Rh grouping of dried bloodstains when only an older or degraded stain is available.',
        ],
      },
      {
        title: 'Species origin — extract preparation',
        content: [
          'A small piece of bloodstained fabric or tissue is extracted with normal saline (for fresh stains) or with 5% ammonia solution (for old or insoluble stains). The supernatant after centrifugation is used as the antigen source.',
        ],
      },
      {
        title: 'Species origin — precipitin tube method',
        content: [
          'A drop of the extract is placed in a precipitin tube; a drop of species-specific antiserum (anti-human, anti-fowl, anti-dog, anti-cow, anti-goat) is layered along the wall of the tube. After ~30 minutes at room temperature, a white ring at the interface of the two solutions indicates a positive species match.',
        ],
      },
      {
        title: 'Species origin — double diffusion in gel',
        content: [
          'A 1% agarose gel in normal saline is prepared on a petri dish or glass slide. Wells are punched in a hexagonal pattern (central well for the extract, peripheral wells for species antisera). The plate is sealed with dilute agar and incubated overnight in a moist chamber.',
          'A visible precipitin arc forms between the central and peripheral wells only when the extract antigen matches the antiserum species. This is the standard Ouchterlony double-diffusion technique.',
        ],
      },
      {
        title: 'Species origin — cross-over electrophoresis',
        content: [
          'The extract (antigen) carries a negative charge and migrates toward the anode; the antiserum (antibody, in the globulin fraction) carries a positive charge and migrates toward the cathode. Under an electric field (150 V, 20 minutes), the two fronts meet and form a precipitin line between paired wells.',
          'The slide is washed in saline overnight, rinsed in distilled water, dried, then stained with amido black (or Coomassie Brilliant Blue) to visualise the precipitin bands. Cross-over electrophoresis is faster than passive diffusion and requires less antiserum.',
        ],
      },
      {
        title: 'ABO grouping of dried stains — Lattes test',
        content: [
          'The Lattes test detects the antibodies present in a bloodstain extract (not the antigens on the cells). The extract is mixed with known 2% A and B indicator cell suspensions on a cavity tile:',
          'Agglutination of B cells only (anti-B present) \u2192 group A.',
          'Agglutination of A cells only (anti-A present) \u2192 group B.',
          'Agglutination of neither cell \u2192 group AB.',
          'Agglutination of both cells (anti-A and anti-B present) \u2192 group O.',
          'This method is particularly useful for identifying mixtures of stains but is less sensitive than antigen-based methods because antibodies are less stable than antigens in dried stains.',
        ],
      },
      {
        title: 'ABO grouping of dried stains — absorption-elution',
        content: [
          'The fabric bearing the stain is soaked overnight at 4\u00b0C in anti-A serum, anti-B serum and anti-H lectin (prepared from Ulex europaeus seeds — minimum titre of 32). Unbound antibody is washed away with ice-cold saline.',
          'The fabric is incubated at 56\u00b0C for 20 minutes to elute the bound antibody. Fresh 0.2% A, B and O indicator cells are added and incubated; agglutination patterns reveal the group:',
          'A cells agglutinate: A or AB; B cells agglutinate: B or AB; neither agglutinates: AB; both agglutinate: O. The anti-H lectin result distinguishes O (H antigen strong) from AB (H antigen weak).',
          'Variants: the Howard-Martin method uses a cellulose acetate sheet; the ammonia method uses 5% ammonia extraction for very old stains and substrates not suited to thread-based absorption-elution.',
        ],
      },
      {
        title: 'Anti-H lectin — preparation and use',
        content: [
          'Ulex europaeus seeds (2 g) are soaked overnight in 10 mL normal saline, macerated, agitated for one hour, centrifuged, and the supernatant used as anti-H lectin. The lectin must be checked against group O cells and titrated to a minimum titre of 32.',
          'Anti-H lectin agglutinates H antigen, which is strongest in group O cells and weakest in group AB cells. The pattern of anti-H agglutination across A, B and O cells helps confirm the ABO group.',
        ],
      },
      {
        title: 'MN and Rh typing from dried stains',
        content: [
          'MN typing uses anti-M and anti-N sera with indicator cells; the pattern of agglutination reveals the MN phenotype (M, N, or MN).',
          'Rh typing (particularly the D antigen) uses anti-D serum. Rh status is important in paternity cases and in some criminal investigations where blood mixing is suspected.',
          'Both MN and Rh typing from dried stains are less reliable than from fresh blood and require careful controls and experienced interpretation.',
        ],
      },
      {
        title: 'Staining for visualisation',
        content: [
          'After cross-over electrophoresis or double diffusion, precipitin bands can be made visible by staining with amido black (naphthalene black 10B in methanol/acetic acid/water) or Coomassie Brilliant Blue R-250. The background is destained until only the specific precipitin bands remain visible.',
          'Staining improves sensitivity and makes faint lines permanent for photographic documentation.',
        ],
      },
    ],
  },
  {
    id: 'mod-forensic-tech',
    slug: 'forensic-technology',
    title: 'Forensic Science x Technology',
    subtitle: '12 concepts for a collaborative forensic + software project',
    icon: 'digital',
    category: 'other',
    description:
      'A joint brainstorm of twelve forensic-technology project concepts — from blockchain-backed chain of custody to explainable deepfake detection — built on ground rules that treat AI strictly as decision support for qualified experts.',
    sourceFile: 'Forensic Science x Technology Showcase (PDF)',
    relatedTopics: [
      'digital-media-authentication',
      'digital-forensics-timeline',
      'ai-decision-support',
      'chain-of-custody',
    ],
    sections: [
      {
        title: 'Ground rules applied throughout',
        content: [
          'No claims that AI can "detect criminals," identify a person from weak evidence, or conclusively determine guilt.',
          'Every concept treats AI/software as decision-support, not a decision-maker — this is both scientifically honest and legally realistic; real forensic labs work this way.',
          'Every concept requires real forensic-science judgment, not just labelling data for someone else\u2019s algorithm.',
        ],
      },
      {
        title: 'The twelve concepts at a glance',
        content: [
          '1. CustodyChain — a blockchain-backed, tamper-evident chain-of-custody ledger tracking evidence from collection to courtroom.',
          '2. TimelineForge — cross-device digital evidence triage that auto-builds a unified investigative timeline from device metadata.',
          '3. VeriFrame — digital media authentication tool that screens images/video for manipulation and outputs an explainable, confidence-scored authenticity report.',
          '4. Blood Spatter Geometry Assistant — computes area of origin and impact angle from bloodstain photographs using trigonometric BPA formulas, with AR overlay for scene visualisation.',
          '5. Latent Print Quality & Ridge-Clarity Scoring — scores fingerprint image quality (NFIQ-style) to decide whether a print is worth full comparison; explicitly not an identification tool.',
          '6. PMI Estimation Assistant — estimates time-since-death ranges from environmental sensor data and decomposition-stage classification, with heavy caveats.',
          '7. 3D Crime Scene Photogrammetry — turns scene photos into a navigable, tagged 3D reconstruction via photogrammetry pipelines.',
          '8. Toxicology Report Correlation — cross-references toxicity results against drug-interaction and lethality databases, framed strictly as a reference aid for a toxicologist.',
          '9. SecureLab — cybersecurity-first access control and audit system for a forensic lab\u2019s evidence database.',
          '10. Trace Evidence Similarity Assistant — image-similarity comparison for microscope images of fibres, hair and glass; a comparison aid, not a match tool.',
          '11. Interview Behavioral-Cue Annotation — timestamped annotation of interview video informed by cognitive-interview frameworks; explicitly not a lie detector.',
          '12. Digital Evidence Metadata Verifier — a questioned-document analog on the digital domain: analyzes PDFs and Office files for metadata inconsistencies.',
        ],
      },
      {
        title: 'Ranking and the top three',
        content: [
          'Each concept was scored 0\u201310 on forensic depth, technical complexity, innovation, usefulness, competition potential, demo potential, research potential, scalability and portfolio value.',
          'The top three: VeriFrame (8.6), CustodyChain (8.1), TimelineForge (7.9). They were chosen because they are buildable end-to-end by two students in one semester, do not require sensitive real-world data, and give the forensic and technical partners roughly equal ownership.',
        ],
      },
      {
        title: 'VeriFrame — forensic digital media authentication',
        content: [
          'VeriFrame runs uploaded images or video through a battery of checks: error-level analysis (ELA), metadata/EXIF consistency, compression-artifact analysis, and optionally a CNN classifier for face-swap deepfake indicators trained on public datasets.',
          'The tool returns a multi-indicator report — which checks passed, which raised flags, and what each flag means — not a single black-box "real/fake" verdict. A human examiner always makes the final call; VeriFrame is a triage and documentation aid.',
          'Research angle: measuring how reliably classical checks (ELA, metadata, compression) flag manipulation compared with ML-only detection, reported as precision/recall/F1 on a labelled test set.',
          'Ethical/legal considerations: use only self-created or licensed datasets; document bias across skin tones; no surveillance or non-consensual media; address Daubert/Frye admissibility explicitly.',
        ],
      },
      {
        title: 'CustodyChain — tamper-evident custody tracking',
        content: [
          'Every piece of evidence gets a unique record at collection; every handling event appends a cryptographically linked entry. Altering a past record breaks the hash chain and is immediately visible.',
          'Design is grounded in real chain-of-custody standards (NIST forensic guidelines, ISO/IEC 17025) and includes realistic evidence types and handling requirements — biological evidence needs refrigeration logging, digital evidence needs hash verification.',
          'Research question: does a hash-chained system measurably reduce undetected record tampering compared with traditional logbook/spreadsheet systems? Hash-chaining prevents undetected tampering, not tampering itself.',
          'Demo: log evidence live, generate a QR tag, walk it through transfers, produce a verified audit report, then attempt a tamper edit and watch the system flag the break instantly.',
        ],
      },
      {
        title: 'TimelineForge — cross-device timeline reconstruction',
        content: [
          'Investigators cross-reference timestamps across phones, laptops and other devices largely by hand. TimelineForge ingests exported metadata, parses timestamps, call logs, app activity and file events, and auto-assembles one correlated timeline.',
          'It normalises timezones and formats, then flags inconsistencies such as clock drift or signs of timestamp manipulation — producing lead-generation input that the examiner investigates further.',
          'Reliability caveats are documented explicitly: timestamps can be spoofed, clock drift can create apparent gaps that are not real, and output is an efficiency tool, not proof of anything on its own.',
          'Scope: two synthetic device types for an MVP (phone + laptop), one inconsistency-detection type, and exportable timeline reports.',
        ],
      },
      {
        title: 'Why the "decision support not decision-maker" framing matters',
        content: [
          'The single biggest credibility risk in forensic-AI projects is overclaiming. A report that says "AI detects fake videos" will not survive scrutiny; outputs must be framed as indicators that a human reviewer evaluates.',
          'Models trained on narrow student-scale datasets will misclassify things — the defensible response is to report real precision/recall figures and discuss failure modes honestly.',
          'Classical, explainable techniques (ELA, metadata consistency, PRNU) should be the star; the ML piece is a supporting indicator.',
          'Rigorous limitations sections, citation of real literature (SWGDE, NIST), and a serious "how would this fare under Daubert/Frye" section are what turn a demo into credible forensic science.',
        ],
      },
    ],
  },
]

export function getModuleBySlug(slug: string): ModuleNote | undefined {
  return moduleNotes.find((m) => m.slug === slug)
}

export function getAllModules(): ModuleNote[] {
  return moduleNotes
}

export function getModulesByCategory(category: ModuleNote['category']): ModuleNote[] {
  return moduleNotes.filter((m) => m.category === category)
}
