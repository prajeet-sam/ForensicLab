import type { GlossaryTerm } from '../lib/types'

export const glossary: GlossaryTerm[] = [
  {
    term: 'Agglutination',
    definition: 'Visible clumping of particulate material (such as red blood cells) caused by an antigen-antibody reaction.',
    simpleExplanation: 'When antibodies bind to antigens on particles and link particles together, the particles lump into visible clumps.',
    scientificDetail:
      'Antibodies are bivalent or multivalent; they cross-link multiple antigen-bearing particles into a lattice. For ABO grouping this is the visible endpoint of when serum antibodies meet mismatched RBC antigens.',
    relatedTopics: ['agglutination', 'abo-blood-grouping', 'antigen-antibody'],
  },
  {
    term: 'Antibody',
    definition: 'A protein (immunoglobulin) produced by the immune system that binds specifically to an antigen.',
    simpleExplanation: 'A shaped protein that locks onto one particular foreign marker to flag it for removal.',
    scientificDetail:
      'In the ABO system, "natural" (isohemagglutinin) antibodies anti-A and anti-B are present in plasma without prior exposure. IgM and IgG classes predominate. They can be used to type blood in vitro.',
    relatedTopics: ['antigen-antibody', 'abo-blood-grouping', 'agglutination'],
  },
  {
    term: 'Antigen',
    definition: 'Any molecule or structure recognized by antibodies or immune receptors, often a marker on a cell surface.',
    simpleExplanation: 'A kind of tag on cells; ABO antigens are carbohydrate structures on red blood cells.',
    scientificDetail:
      'ABO antigens are carbohydrate (glycan) structures attached to glycolipids/glycoproteins on the RBC surface. A-type is N-acetylgalactosamine, B-type is galactose, both built on an H-precursor. Type O has neither modification.',
    relatedTopics: ['antigen-antibody', 'abo-blood-grouping'],
  },
  {
    term: 'ABO blood grouping',
    definition: 'Classification of blood by the presence of A and/or B antigens on red cells and the corresponding antibodies in plasma.',
    simpleExplanation: 'A system of four groups — A, B, AB and O — based on which antigens the red cells carry.',
    scientificDetail:
      'Phenotypes: A (A antigen, anti-B), B (B antigen, anti-A), AB (both antigens, neither antibody), O (neither antigen, both antibodies). Genotypes: A = IAIA or IAi; B = IBIB or IBi; AB = IAIB; O = ii. ABO grouping is informative but rarely individualizing.',
    relatedTopics: ['abo-blood-grouping', 'agglutination', 'antigen-antibody', 'serology'],
  },
  {
    term: 'DNA profiling',
    definition: 'Analysis of genetic markers (commonly short tandem repeats) to compare biological evidence with reference samples.',
    simpleExplanation: 'Reading particular repeating sections of DNA so a sample can be matched or excluded against a known person.',
    scientificDetail:
      'STR loci are highly polymorphic; when many loci are typed, a full profile is extraordinarily — though not absolutely — discriminating. Frequencies are estimated from population databases and reported as matching probabilities.',
    relatedTopics: ['dna-profiling', 'central-dogma', 'serology'],
  },
  {
    term: "Locard's Exchange Principle",
    definition: 'Whenever two objects come into contact there is a transfer of material between them.',
    simpleExplanation: 'An offender always takes something away from and leaves something at a scene — though not always enough to detect.',
    scientificDetail:
      'Transfer applies to physical and digital traces. The principle motivates trace searching but does not guarantee a detectable trace; detection depends on sensitivity, time, and conditions of transfer.',
    relatedTopics: ['locard-principle', 'fundamental-principles'],
  },
  {
    term: 'Chain of custody',
    definition: 'The documented, unbroken record of every transfer of evidence from scene to court.',
    simpleExplanation: 'A paper trail showing exactly who handled an item, when, why, and in what condition.',
    scientificDetail:
      'Each transfer requires handler identification, date/time, reason, condition of the item and authorization/signature. Gaps weaken the item\u2019s admissibility and its scientific defensibility.',
    relatedTopics: ['chain-of-custody', 'evidence-lifecycle', 'laboratory'],
  },
  {
    term: 'Presumptive test',
    definition: 'A rapid screening test that indicates a substance or blood may be present but does not, on its own, confirm it.',
    simpleExplanation: 'A first-pass test that flags "possible blood." A positive result is not proof.',
    scientificDetail:
      'Luminol and Kastle-Meyer detect the pseudoperoxidase activity of heme. Other substances (some plant peroxidases, household chemicals, certain metals) can produce positives, so confirmation with a human-specific and species confirmatory approach is required.',
    relatedTopics: ['presumptive-blood-tests', 'serology', 'forensic-chemistry'],
  },
  {
    term: 'Calibration',
    definition: 'Comparison of an instrument\u2019s readings with known reference standards or certified reference materials under defined conditions.',
    simpleExplanation: 'Checking that the meters say the truth by measuring something we already know exactly.',
    scientificDetail:
      'Calibration establishes traceability of results to national standards and is a requirement of ISO/IEC 17025 laboratories. It is not a one-time event; periodic recalibration verifies ongoing reliability.',
    relatedTopics: ['quality-control', 'laboratory'],
  },
  {
    term: 'FSL',
    definition: 'Forensic Science Laboratory — a facility where evidence is scientifically examined and interpreted.',
    simpleExplanation: 'The laboratory where evidence like blood, drugs and documents is actually analyzed.',
    scientificDetail:
      'FSLs typically run multiple divisions (biology/serology, chemistry, toxicology, physics, documents, ballistics, digital). Results must derive from validated methods, controlled reagents and quality systems.',
    relatedTopics: ['laboratory', 'quality-control'],
  },
  {
    term: 'NABL',
    definition: 'National Accreditation Board for Testing and Calibration Laboratories.',
    simpleExplanation: 'An accreditation body that checks a laboratory\u2019s quality systems against international standards (ISO/IEC 17025).',
    scientificDetail:
      'Accreditation assesses management and technical competence — methods, equipment calibration, proficiency testing, staff qualification and traceability. Accreditation is a quality-process certification; it does not guarantee any single result is correct.',
    relatedTopics: ['quality-control', 'laboratory'],
  },
  {
    term: 'GSR',
    definition: 'Gunshot residue — particles of primer components deposited near a firearm discharge.',
    simpleExplanation: 'Tiny burnt particles (often lead, barium, antimony) that can be found on hands or clothing after firing.',
    scientificDetail:
      'GSR is collected by tape-lift or swab and analyzed by SEM-EDX; characteristic three-element particles are strong indicators of a discharge event. But GSR is easily removed, can transfer by contact with contaminated items, and its absence proves nothing definitive.',
    relatedTopics: ['firearms-ballistics-evidence', 'forensic-chemistry'],
  },
  {
    term: 'RBC',
    definition: 'Red blood cell (erythrocyte) — the blood cell that carries ABO antigens.',
    simpleExplanation: 'The cell whose surface markers decide your ABO blood group.',
    scientificDetail:
      'RBCs display A and/or B carbohydrate antigens; these determinants are the basis for agglutination-based grouping tests. RBC lifetime ~120 days; surface glycan structure is genetically controlled.',
    relatedTopics: ['abo-blood-grouping', 'antigen-antibody', 'blood'],
  },
  {
    term: 'Serology',
    definition: 'The study of serum/plasma components and antigen-antibody reactions, applied forensically to body-fluid evidence.',
    simpleExplanation: 'Using blood-serum reactions to identify and characterize biological stains.',
    scientificDetail:
      'Forensic serology covers presumptive and species testing of stains, grouping (e.g., ABO in some contexts) and has largely been supplemented by DNA typing for individualization. The serological principles remain essential for what stains the DNA can be obtained from.',
    relatedTopics: ['serology', 'presumptive-blood-tests', 'immunodiffusion'],
  },
  {
    term: 'Precipitation',
    definition: 'Formation of an insoluble immune complex (lattice) when soluble antigen meets antibody in optimal proportion.',
    simpleExplanation: 'Soluble markers and antibodies joining into a visible cloud or line, unlike the clumping of whole cells.',
    scientificDetail:
      'Precipitation requires an optimal antigen:antibody ratio. In gel (Ouchterlony) diffusion, a visible precipitin line appears where the two fronts meet. This is distinct from agglutination, which involves particulate antigens.',
    relatedTopics: ['precipitation', 'immunodiffusion', 'antigen-antibody'],
  },
  {
    term: 'Agglutination vs Precipitation',
    definition: 'Agglutination is clumping of particulate antigens; precipitation is insolubilization of soluble antigen-antibody complexes.',
    simpleExplanation: 'Particles clump (agglutination); dissolved chemicals form a cloud or line (precipitation).',
    scientificDetail:
      'Both result from cross-linking but differ in physical endpoint and in the antigen form (particulate vs soluble). Forensic the ABO tissue grouping uses agglutination; gel immunodiffusion uses precipitation.',
    relatedTopics: ['agglutination', 'precipitation', 'immunodiffusion'],
  },
  {
    term: 'Luminol',
    definition: 'A presumptive reagent that produces blue chemiluminescence in the presence of blood.',
    simpleExplanation: 'Spray-it-on and watch it glow blue where blood may be — but other things can glow too.',
    scientificDetail:
      'Heme\u2019s pseudoperoxidase activity catalyzes luminol oxidation in alkaline peroxide to an excited intermediate emitting blue light. Extremely sensitive (traces and dilute stains) and can reveal cleaned or faint patterns, but it is presumptive and does not confirm blood.',
    relatedTopics: ['presumptive-blood-tests', 'serology', 'blood'],
  },
  {
    term: 'Kastle-Meyer',
    definition: 'A presumptive color test for blood based on phenolphthalein oxidation.',
    simpleExplanation: 'Apply a drop and hydrogen peroxide; a pink color suggests blood may be present.',
    scientificDetail:
      'Reduced (colorless) phenolphthalein is oxidized to the pink form by peroxide in the presence of heme pseudoperoxidase. Quick and sensitive, but positive results also occur with some plant peroxidases; it is not species-specific and not confirmatory.',
    relatedTopics: ['presumptive-blood-tests', 'serology', 'blood'],
  },
  {
    term: 'Immunodiffusion',
    definition: 'A technique where antigen and antibody diffuse through a gel and form a visible precipitin line when they react.',
    simpleExplanation: 'Two substances walk toward each other in jelly and build a visible barrier where they meet.',
    scientificDetail:
      'In Ouchterlony double diffusion, antigen and antibody placed in separate wells diffuse radially. Where concentrations are in optimal proportion, a precipitin line forms. Patterns of identity, non-identity and partial identity reveal relationships — used for species testing in forensic serology.',
    relatedTopics: ['immunodiffusion', 'precipitation', 'serology'],
  },
  {
    term: 'Agarose gel',
    definition: 'The porous carbohydrate gel used as the diffusion medium in immunodiffusion and as the matrix in some electrophoretic separations.',
    simpleExplanation: 'The clear "jelly" that lets molecules drift through at different speeds.',
    scientificDetail:
      'Agarose forms a hydration-stable network with large pores; large immune complexes cannot diffuse far, so precipitin lines form where the antigen and antibody fronts meet in the gel.',
    relatedTopics: ['immunodiffusion', 'precipitation', 'dna-profiling'],
  },
  {
    term: 'Central Dogma',
    definition: 'The directional flow of genetic information: DNA → RNA → protein, plus DNA replication.',
    simpleExplanation: 'DNA is copied to RNA, which is read to make protein — the cell\u2019s instruction flow.',
    scientificDetail:
      'Replication (DNA→DNA), transcription (DNA→RNA) and translation (RNA→protein). Understanding the flow explains how DNA typing works, why RNA profiling is being explored, and why cells differ despite identical nuclear DNA.',
    relatedTopics: ['central-dogma', 'dna-profiling'],
  },
  {
    term: 'STR',
    definition: 'Short tandem repeat — a repeated 2-6 base-pair sequence used as a highly variable DNA marker.',
    simpleExplanation: 'Short repeated DNA stretches that differ greatly between people, making them ideal for identification.',
    scientificDetail:
      'STR loci vary in repeat number among individuals. Multiplex amplification of ~15-20 loci yields extraordinarily informative profiles; allele frequencies are population-dependent and used to compute match probabilities.',
    relatedTopics: ['dna-profiling', 'central-dogma'],
  },
  {
    term: 'Quality control',
    definition: 'Day-to-day procedures verifying that reagents, instruments and methods perform correctly during analysis.',
    simpleExplanation: 'Running checks alongside every batch so a bad day in the lab can never silently ruin results.',
    scientificDetail:
      'Includes blanks, controls, known references, calibration checks, and participation in proficiency schemes. Distinct from quality assurance, the broader system of policies ensuring ongoing competence.',
    relatedTopics: ['quality-control', 'laboratory'],
  },
  {
    term: 'Physical evidence',
    definition: 'Any tangible material or object that plays a role in the matter giving rise to litigation and is introduced at trial to prove a fact in issue through its demonstrable physical characteristics.',
    simpleExplanation: 'The actual stuff — stains, fibers, glass, documents — that is collected at a scene and examined in the lab.',
    scientificDetail:
      'Processing follows a cycle: discover, recognize, examine, collect, record, identify, package/transport/store, exhibit in court, and finally dispose of when the case closes. Physical evidence rarely tells a complete story alone but corroborates or contradicts witness accounts and helps reconstruct events.',
    relatedTopics: ['physical-evidence', 'evidence-types', 'crime-scene-procedures'],
  },
  {
    term: 'Questioned document',
    definition: 'Any material that may contain a message for which the authenticity, origin or authorship is in dispute.',
    simpleExplanation: 'A note, cheque, contract or even graffiti whose writer, date or genuineness is questioned.',
    scientificDetail:
      'A document examiner may examine handwriting and signatures, typewriters, printers, photocopiers, cheque writers, rubber stamps, ink, pencil, paper, alterations (additions, erasures, obliterations), indented writing and sequence of strokes. Tools include the stereomicroscope, electrostatic detection device (EDD), video spectral comparator and Raman spectrophotometer.',
    relatedTopics: ['questioned-documents', 'evidence-types'],
  },
  {
    term: 'Class characteristics vs individual characteristics',
    definition: 'Class characteristics are features shared by a group of items (make, model, dimensions); individual characteristics are random, unique imperfections that permit an examiner to associate a mark with a single source.',
    simpleExplanation: 'Class = "a screwdriver like this"; individual = "this screwdriver."',
    scientificDetail:
      'Tool marks normally reveal class characteristics (size and shape of the tool) but rarely individualizing ones. Individuality comes from random striations, nicks and breaks acquired through machining, wear and damage; it is these microscopic irregularities that let two tools be told apart.',
    relatedTopics: ['toolmark-evidence', 'glass-fracture-analysis', 'evidence-types'],
  },
  {
    term: 'Striation marks',
    definition: 'A series of parallel ridges and valleys impressed or cut into a surface when a harder tool edge is scraped against it.',
    simpleExplanation: 'The "rake marks" a blade leaves when it scrapes; like a fingerprint for the edge that made them.',
    scientificDetail:
      'Machining and later wear give every tool edge a unique microtopography. Test marks are made by applying the suspect tool at various angles and pressures to a soft metal (commonly lead); the evidence mark and test marks are compared through a comparison microscope.',
    relatedTopics: ['toolmark-evidence', 'firearms-ballistics-evidence'],
  },
  {
    term: '3R rule',
    definition: 'Radial cracks produce rib marks that form Right angles on the Reverse side from the force.',
    simpleExplanation: 'Reading the little stress lines on a broken window tells you which side was hit.',
    scientificDetail:
      'Radial cracks form first, propagating outward opposite the force; concentric cracks follow on the load side. Rib (stress) marks on radial crack edges are right-angled on the side away from the impact. Exceptions: tempered glass, tightly framed windows, and heat/explosion breaks.',
    relatedTopics: ['glass-fracture-analysis'],
  },
  {
    term: 'Becke line',
    definition: 'A bright line seen at the boundary of two media of different refractive index when viewed under a microscope; it moves toward the medium of higher refractive index as focus is raised.',
    simpleExplanation: 'A thin bright fringe that slides toward the denser medium, used to gauge a glass fragment\u2019s refractive index.',
    scientificDetail:
      'A glass fragment is immersed in oils of known refractive index; when the Becke line disappears at the match point, RI(oil) = RI(glass) and contrast between liquid and particle is minimal. Refractive index and density are key associations for glass evidence.',
    relatedTopics: ['glass-fracture-analysis'],
  },
  {
    term: 'Density gradient tube',
    definition: 'A column of immiscible or miscible liquids of graded densities used to separate and characterize particles such as soil samples by their density.',
    simpleExplanation: 'A layered liquid column that makes soil (or glass) settle into bands so samples can be compared.',
    scientificDetail:
      'Two liquids with different densities are layered in a tube to form a gradient. Added soil particles suspend at the level matching their own density; the pattern of bands reveals a profile for comparison of questioned and known samples.',
    relatedTopics: ['soil-evidence', 'glass-fracture-analysis'],
  },
  {
    term: 'Pyrogram',
    definition: 'The recorded chromatographic output of pyrolysis-gas chromatography, reflecting the decomposition products of a polymer.',
    simpleExplanation: 'The "barcode" of peaks a paint chip gives off when burned and its fragments are separated.',
    scientificDetail:
      'Paint chips as small as 20 micrograms are decomposed by heat into gas products that are separated by gas chromatography. The resulting peak pattern (pyrogram) is sufficiently detailed to reflect the chemical make-up of the binder and distinguish one paint formulation from another.',
    relatedTopics: ['paint-evidence', 'evidence-types'],
  },
  {
    term: 'Acid phosphatase (AP) test',
    definition: 'A presumptive test for semen that detects the prostatic enzyme acid phosphatase, which reacts with alpha-naphthyl acid phosphate and Brentamine Fast Blue to produce a dark purple colour.',
    simpleExplanation: 'A quick purple development that suggests semen may be present.',
    scientificDetail:
      'Also called the Walker test or Brentamine spot test. Highly presumptive: vaginal secretions and other body fluids contain detectable AP, and results depend on stain age and storage. Confirmation requires finding sperm or a seminal-specific marker.',
    relatedTopics: ['semen-evidence', 'biological-evidence-collection'],
  },
  {
    term: 'Semenogelin',
    definition: 'A seminal vesicle-specific antigen used as a confirmatory marker for human semen in immunochromatographic (RSID) testing.',
    simpleExplanation: 'A protein only found in human semen; finding it confirms the stain is semen from a human.',
    scientificDetail:
      'Unlike PSA or acid phosphatase, semenogelin shows no cross-reactivity with other body fluids or with semen from other mammals, and it survives even unfavourable storage. Detection indicates human seminal fluid even when sperm are absent or degraded.',
    relatedTopics: ['semen-evidence', 'biological-evidence-collection'],
  },
  {
    term: 'Christmas Tree stain',
    definition: 'A histological stain for confirming the presence of sperm: Picroindigocarmine stains the neck and tail green-blue while Nuclear Fast Red (Kernechtrot) stains the head red with a pink tip.',
    simpleExplanation: 'A two-dye stain that colours sperm so they can be identified microscopically.',
    scientificDetail:
      'Sperm deteriorate quickly after ejaculation, and tails break down first, so analysts must distinguish heads from other red-staining cells. Confirmatory when coupled with physically finding spermatozoa.',
    relatedTopics: ['semen-evidence', 'biological-evidence-collection'],
  },
  {
    term: 'Phadebas test',
    definition: 'A presumptive test for saliva that detects the enzymatic activity of alpha-amylase.',
    simpleExplanation: 'Turns a drop of the stain blue if amylase (an enzyme rich in saliva) is active.',
    scientificDetail:
      'Saliva is ~99.5% water with electrolytes, glycoproteins, epithelial cells and enzymes including amylase. Alpha-amylase exists in other organisms (four human variants: two salivary, two pancreatic), so a positive Phadebas is presumptive only.',
    relatedTopics: ['saliva-evidence', 'biological-evidence-collection'],
  },
  {
    term: 'RSID (Rapid Stain Identification) test',
    definition: 'An immunochromatographic strip test that detects a specific antigen rather than enzyme activity; versions exist for semen (semenogelin), saliva (human alpha-amylase) and blood (human Glycophorin A).',
    simpleExplanation: 'A pregnancy-style strip that looks directly for a distinct human protein, not just enzyme activity.',
    scientificDetail:
      'The RSID blood test uses two antibodies against Glycophorin A of the red-cell membrane; saliva RSID detects the alpha-amylase molecule itself and is treated as confirmatory when combined with Phadebas. Although highly specific, cross-reactions occur with other mammals and some body fluids, so proper controls and timing (e.g., read exactly at 10 minutes) matter.',
    relatedTopics: ['semen-evidence', 'saliva-evidence', 'blood-confirmation-tests'],
  },
  {
    term: 'Takayama test',
    definition: 'A confirmatory micro-crystal test for blood in which hemochromogen crystals form salmon-pink rhomboids when a stain fragment is treated with Takayama reagent.',
    simpleExplanation: 'Turns a bloodstain fragment into identifiable pink crystals under the microscope.',
    scientificDetail:
      'Requires no heating, works on older samples, and needs a relatively large sample (~0.1 mg hemoglobin). Confirms haemoglobin as the source of a presumptive positive.',
    relatedTopics: ['blood-confirmation-tests', 'presumptive-blood-tests'],
  },
  {
    term: 'HemaTrace',
    definition: 'An ABAcard immunochromatographic strip for confirming human blood by detecting human hemoglobin with an antihuman hemoglobin antibody.',
    simpleExplanation: 'A strip test: a pink band in the test window means human hemoglobin is present.',
    scientificDetail:
      'A sample applied to the strip forms a mobile antibody-antigen complex only if human hemoglobin is present; the complex migrates to a window and shows a pink dye band. Used after presumptive tests to confirm human origin.',
    relatedTopics: ['blood-confirmation-tests', 'human-vs-animal'],
  },
  {
    term: 'Ouchterlony test',
    definition: 'A gel immunodiffusion technique used to determine the species of origin of a bloodstain by observing precipitin lines between the stain extract and species-specific antisera.',
    simpleExplanation: 'Stain extract and "anti-human" antibodies meet in agar; a line only forms if they recognise each other.',
    scientificDetail:
      'Antigen from the unknown stain and antibodies from human and animal sources diffuse from separate wells; a precipitin line forms where an immune complex matches, indicating species. Controls from unstained substrate are essential; reaction may take hours to 72 hours.',
    relatedTopics: ['origin-of-species', 'immunodiffusion', 'serology'],
  },
  {
    term: 'Precipitin tube method',
    definition: 'An early species-origin test in which a drop of bloodstain extract is layered with species-specific antiserum; a white ring at the interface indicates a positive reaction.',
    simpleExplanation: 'Layering stain extract over anti-human serum; a white ring means human blood.',
    scientificDetail:
      'Extracted stain protein is placed in a tube and antiserum of a given species (human, fowl, dog, cow, goat) is layered along the wall. After ~30 minutes the antigen-antibody lattice forms a visible white ring at the interface, indicating the reacting species.',
    relatedTopics: ['origin-of-species', 'precipitation', 'serology'],
  },
  {
    term: 'Cross-over electrophoresis',
    definition: 'An electrophoresis variant for species origin testing in which antigen is placed in the cathodic well and antibody in the anodic well; under current they migrate toward each other and precipitate if specific.',
    simpleExplanation: 'Sending antigen and antibody toward each other electrically so a precipitin line forms faster than simple diffusion.',
    scientificDetail:
      'Acid antigens (e.g., stain extract) carry a negative charge and move toward the anode; antibodies (IgG globulins) in antisera are positively charged and move toward the cathode. A fine white precipitin line forms between opposite wells within ~20 minutes at 150 V; slides are often stained with amido black.',
    relatedTopics: ['origin-of-species', 'precipitation', 'immunodiffusion'],
  },
  {
    term: 'Lattes test',
    definition: 'An ABO grouping method for bloodstains based on identifying the antibodies present in the stain rather than the antigens on the cells.',
    simpleExplanation: 'Finding which antibodies are in the dried stain and then inferring the blood group.',
    scientificDetail:
      'A stain extract is mixed with known A and B indicator cells; agglutination of A cells indicates anti-A (group B), agglutination of B cells indicates anti-B (group A), both indicates O, and neither indicates AB. Useful for identifying mixtures of stains, but less sensitive because antibodies are less stable than antigens, so it suits fresher, larger stains.',
    relatedTopics: ['blood-grouping-dried-stains', 'abo-blood-grouping', 'agglutination'],
  },
  {
    term: 'Absorption-elution technique',
    definition: 'An ABO grouping method for dried stains in which antibodies are absorbed onto the stain, unbound antibody is washed away, and bound antibody is eluted and detected with indicator red cells.',
    simpleExplanation: 'Soak the stain in anti-A/anti-B, wash, heat to release the antibody, and test it on known cells.',
    scientificDetail:
      'Anti-A serum, anti-B serum and anti-H lectin are absorbed onto stain threads overnight at 4\u00b0C, washed with ice-cold saline, then eluted at 56\u00b0C for ~20 minutes. 0.2% A, B and O indicator cells reveal the group by agglutination. Anti-H lectin is prepared from Ulex europaeus seeds. The Howard-Martin and ammonia variants adapt the method to different substrates and old stains.',
    relatedTopics: ['blood-grouping-dried-stains', 'abo-blood-grouping', 'agglutination'],
  },
  {
    term: 'Electrostatic detection device (EDD)',
    definition: 'An instrument that visualizes indented (impressed) writing and other latent impressions in paper by charging the sheet and dusting with toner, which is attracted to the raised charge pattern of the indentations.',
    simpleExplanation: 'Reveals the ghost impressions of a previous page pressed into a notepad.',
    scientificDetail:
      'Commonly known by the brand ESDA. The paper is covered with a film, charged, then toner particles adhere where charge differences mark indented areas, making previously invisible writing readable. A standard tool in questioned-document examination.',
    relatedTopics: ['questioned-documents'],
  },
  {
    term: 'Reactive vs proactive investigation',
    definition: 'Reactive investigation responds to an already reported crime, working backward from the scene; proactive investigation initiates action against anticipated or ongoing offending.',
    simpleExplanation: 'Reacting to a crime that already happened versus actively working to catch crime before or as it happens.',
    scientificDetail:
      'Most investigations are reactive (victim/complainant-driven, oriented to production of physical evidence). Proactive styles use surveillance, informants and undercover or sting operations and begin before the incident occurs. Good investigators blend sensing, technical skill, people skills, interviewing and reasoning ability.',
    relatedTopics: ['criminal-investigation', 'crime-scene-procedures'],
  },
  {
    term: 'Round-robin / sequential evidence control',
    definition: 'The practice of limiting each handle of transferred evidence to documented, sequential transfers that preserve the chain of custody.',
    simpleExplanation: 'Evidence passes from hand to hand one step at a time, logged at every stage.',
    scientificDetail:
      'Every transfer requires the handler\u2019s identity, date/time, reason, the item\u2019s condition and an authorization/signature. Gaps in this record weaken admissibility and defensibility of the scientific result.',
    relatedTopics: ['chain-of-custody', 'evidence-lifecycle', 'evidence-types'],
  },
{
    term: 'Minutiae',
    definition: 'The fine ridge characteristics of friction-ridge skin — ridge endings, bifurcations, enclosures and dots — used to compare fingerprints.',
    simpleExplanation: 'The small features of a fingerprint that can show two prints came from the same finger.',
    scientificDetail:
      'Examiners combine the overall pattern type (loop, whorl, arch) with the number, type and spatial relationship of minutiae. A sufficient correspondence of minutiae can individualize a print to a source, though the required quantity is debated.',
    relatedTopics: ['fingerprints-evidence', 'evidence-types'],
  },
  {
    term: 'Latent fingerprint',
    definition: 'An invisible or barely visible fingerprint deposited through natural skin secretions and developed by powders, chemicals or alternate light sources.',
    simpleExplanation: 'A print you cannot see until it is dusted, fumed or lit with the right wavelength of light.',
    scientificDetail:
      'Latent prints are the most common type found at scenes. Development techniques include fingerprint powders, ninhydrin (amino-acid reagent), cyanoacrylate/superglue fuming and alternate light sources. After development the print is photographed and often lifted.',
    relatedTopics: ['fingerprints-evidence', 'crime-scene-procedures'],
  },
  {
    term: 'Patent and plastic prints',
    definition: 'Visible fingerprints: patent prints are already visible because the finger was contaminated with blood, paint or other material; plastic prints are impressed into soft surfaces such as putty, wax or clay.',
    simpleExplanation: 'A print you can literally see, either because the finger was dirty or because it pressed into something soft.',
    scientificDetail:
      'Patent prints transfer coloured material from the ridge surface. Plastic prints leave a three-dimensional impression. Both are photographed in situ before any lifting is attempted.',
    relatedTopics: ['fingerprints-evidence', 'crime-scene-procedures'],
  },
  {
    term: 'Ninhydrin',
    definition: 'A chemical reagent that reacts with amino acids in fingerprint residue to produce a purple product, used to develop latent prints on porous surfaces such as paper.',
    simpleExplanation: 'Spray it on paper and old fingerprints slowly turn purple.',
    scientificDetail:
      'Ninhydrin reacts with the amino acids in eccrine residue to form Ruhemann\u2019s purple. It is standard for porous substrates; development may take several hours in controlled humidity.',
    relatedTopics: ['fingerprints-evidence', 'questioned-documents'],
  },
  {
    term: 'Cyanoacrylate fuming',
    definition: 'A latent-print development method in which cyanoacrylate (superglue) vapour polymerises on fingerprint residues, producing white ridges that can be photographed, dyed or powdered.',
    simpleExplanation: 'Superglue fumes stick to fingerprints and turn them white so they can be seen on plastic and metal.',
    scientificDetail:
      'Also called superglue fuming. The vapour polymerises preferentially on the eccrine residue of the ridge lines. Commonly combined with fluorescent dyes and alternate light sources for non-porous surfaces.',
    relatedTopics: ['fingerprints-evidence', 'crime-scene-procedures'],
  },
  {
    term: 'AFIS',
    definition: 'Automated Fingerprint Identification System — a computerised database that searches and ranks fingerprint candidates by ridge and minutiae characteristics.',
    simpleExplanation: 'A huge searchable library of fingerprints; the computer suggests candidates, but an examiner confirms the match.',
    scientificDetail:
      'AFIS encodes ridge endings, bifurcations and other features into a searchable representation. It returns ranked candidate lists; the final identification is always made by a human examiner. It is a search aid, not an automatic identification engine.',
    relatedTopics: ['fingerprints-evidence', 'ai-decision-support'],
  },
  {
    term: 'Impression evidence',
    definition: 'Indented or deposited impressions left by tyres, footwear, tools, gloves or hands, preserved by photography and casting and compared with known sources.',
    simpleExplanation: 'The marks things make when they press into or touch a surface — tyre tracks, shoe prints, tool scrapes.',
    scientificDetail:
      'Three-dimensional impressions are photographed to scale and cast, commonly with dental stone; two-dimensional residues are lifted. Comparisons use size, shape, tread or sole pattern, and any individualising damage such as wear nicks.',
    relatedTopics: ['impression-evidence', 'toolmark-evidence', 'crime-scene-procedures'],
  },
  {
    term: 'Comparison microscope',
    definition: 'An optical instrument that joins two compound microscopes with an optical bridge so two samples can be viewed side by side in one field of view.',
    simpleExplanation: 'Two microscopes sharing an eyepiece so a hair, bullet or tool mark can be compared directly against a known sample.',
    scientificDetail:
      'Essential for tool-mark and striation comparison, firearms examination, hair and fibre comparison, and soil analysis. The two objects are aligned under identical magnification and illumination.',
    relatedTopics: ['toolmark-evidence', 'hair-evidence', 'impression-evidence'],
  },
  {
    term: 'Error level analysis (ELA)',
    definition: 'A digital-image authenticity check that re-saves an image at a fixed quality and examines residual error levels to reveal regions that have been spliced or re-encoded.',
    simpleExplanation: 'Re-saving a photo and looking at where the "quality loss" differs, because edited areas have been compressed differently.',
    scientificDetail:
      'An unmodified JPEG region of a given original quality produces a fairly uniform error level across the image; a spliced region shows a visibly different error level. ELA is a screening indicator, one of several, never a proof of tampering on its own.',
    relatedTopics: ['digital-media-authentication', 'digital-forensics-timeline'],
  },
  {
    term: 'PRNU',
    definition: 'Photo Response Non-Uniformity — the pattern of sensor-pixel noise unique to a camera\u2019s imaging sensor, used like a "sensor fingerprint" to link an image to a specific device.',
    simpleExplanation: 'Every camera sensor leaves its own faint noise pattern in photos, like a digital fingerprint of the device.',
    scientificDetail:
      'PRNU arises from tiny manufacturing variations in pixel sensitivity. By extracting the pattern from a camera\u2019s images and testing the pattern in a questioned photo, an examiner can assess whether the photo was taken by that device — and can sometimes reveal regions that have been altered, because their noise pattern breaks.',
    relatedTopics: ['digital-media-authentication', 'digital-forensics-timeline'],
  },
{
    term: 'EXIF metadata',
    definition: 'Exchangeable Image File Format — the metadata embedded in image files recording camera settings, date and time, GPS and device information.',
    simpleExplanation: 'The invisible data baked into a photo that records when, where and on what device it was taken.',
    scientificDetail:
      'EXIF headers show camera make/model, lens, exposure settings, creation time and sometimes GPS coordinates. In digital forensics, consistency between EXIF data and a device\u2019s codec signature can reveal editing or misdated files. EXIF can be edited, so it is one indicator among several.',
    relatedTopics: ['digital-media-authentication', 'digital-forensics-timeline'],
  },
  {
    term: 'Hash chain',
    definition: 'A sequence of records in which each entry contains the cryptographic hash of the previous entry, so any attempt to alter a past record breaks the chain.',
    simpleExplanation: 'Each record is locked to the one before it — if anyone edits an old record, the whole chain stops validating.',
    scientificDetail:
      'When a new record is added it includes the hash of the previous record\u2019s contents. Verifying a chain recomputes and compares every link; a mismatch reveals exactly where tampering occurred. Used in digital evidence custody systems as a simple, permissioned alternative to a public blockchain.',
    relatedTopics: ['chain-of-custody', 'digital-forensics-timeline', 'ai-decision-support'],
  },
  {
    term: 'SWGDE',
    definition: 'Scientific Working Group on Digital Evidence — a body producing consensus best-practice documents for digital and multimedia evidence handling and analysis.',
    simpleExplanation: 'The standards body whose guidance describes how digital evidence should be collected, preserved and interpreted.',
    scientificDetail:
      'SWGDE (and SWGIT for imaging) documents cover acquisition, validation, accuracy of timestamps, and reporting in digital forensics. Following such guidance supports the reliability and admissibility of digital evidence.',
    relatedTopics: ['digital-forensics-timeline', 'digital-media-authentication', 'chain-of-custody'],
  },
  {
    term: 'Digital forensics',
    definition: 'The collection, preservation, analysis and presentation of data from computers, phones and other digital devices in a way suitable for court.',
    simpleExplanation: 'Finding and carefully extracting evidence that lives on digital devices, keeping it intact and provably unchanged.',
    scientificDetail:
      'Digital forensics covers file systems, metadata, network logs, cloud and IoT data. Core principles: acquire without altering the source (write-protection, hashing), document chain of custody, use validated tools, and state limitations such as timestamp spoofing honestly.',
    relatedTopics: ['digital-forensics-timeline', 'digital-media-authentication', 'evidence-types'],
  },
  {
    term: 'Postmortem interval (PMI)',
    definition: 'The estimated time elapsed since death, approximated from body temperature, rigor mortis, decomposition stage and entomological succession.',
    simpleExplanation: 'A range estimate of how long someone has been dead, built from several biological clocks that tick at different speeds.',
    scientificDetail:
      'PMI estimation combines algor mortis (body cooling), livor mortis, rigor mortis, decomposition staging and insect succession. It is inherently imprecise, environment-dependent, and must be reported as a range with heavy caveats.',
    relatedTopics: ['criminal-investigation', 'ai-decision-support'],
  },
  {
    term: 'Algor mortis',
    definition: 'The cooling of the body after death toward ambient temperature, used as one clock for estimating time of death.',
    simpleExplanation: 'After death the body temperature drops to match its surroundings, and by how fast it has cooled you estimate how long ago.',
    scientificDetail:
      'Cooling rate depends on body size, clothing, ambient temperature, airflow and immersion. Because many variables affect the rate, algor mortis yields only a rough range for PMI and is used alongside other indicators.',
    relatedTopics: ['criminal-investigation', 'ai-decision-support'],
  },
  {
    term: 'Daubert standard',
    definition: 'The US evidentiary standard (Daubert v. Merrell Dow) that a court may admit expert scientific testimony only after assessing relevance and reliability: testability, error rate, peer review, and general acceptance.',
    simpleExplanation: 'The legal test that asks whether the science behind an expert\u2019s opinion is genuinely reliable before a jury hears it.',
    scientificDetail:
      'Under Daubert the judge is the gatekeeper. Courts weigh whether the method has been tested, has a known error rate, was subjected to peer review, and is generally accepted. A forensic tool whose limitations are undocumented risks exclusion. The Frye standard is the older "general acceptance" test it largely replaced.',
    relatedTopics: ['evidence-types', 'ai-decision-support', 'digital-media-authentication'],
  },
  {
    term: 'NFIQ',
    definition: 'NIST Fingerprint Image Quality — a score (NFIQ 1\u20135) rating how usable a fingerprint image is for automated matching, based on ridge clarity and feature fidelity.',
    simpleExplanation: 'A quality grade that says whether a fingerprint image is good enough to bother searching.',
    scientificDetail:
      'NFIQ estimates the probability that a latent print will be matched correctly by an automated system. It is a quality-scoring aid for triage and workflow decisions, explicitly not an identification or matching decision itself.',
    relatedTopics: ['fingerprints-evidence', 'ai-decision-support'],
  },
  {
    term: 'Photogrammetry',
    definition: 'Measuring and reconstructing objects or scenes from overlapping photographs, producing scaled measurements and three-dimensional models.',
    simpleExplanation: 'Taking many overlapping photos and letting software stitch them into a measurable 3D scene.',
    scientificDetail:
      'Software such as structure-from-motion pipelines (e.g., COLMAP, Meshroom) triangulates common features across photos to reconstruct geometry. In crime-scene reconstruction it provides measurable 3D models with evidence markers, subject to accuracy requirements of the documentation standard.',
    relatedTopics: ['crime-scene-procedures', 'crime-scene-searching'],
  },
  {
    term: 'Skid mark',
    definition: 'The mark left by a locked or sliding tyre on a road surface, used in accident reconstruction to estimate speed from braking distance.',
    simpleExplanation: 'The dark rubber line a screeching tyre leaves; its length is part of the math that estimates speed.',
    scientificDetail:
      'With a known coefficient of friction, the length of skid marks before a collision feeds into kinetic-energy equations to estimate vehicle speed. The estimate depends on surface, tyres, weight and driver reaction, and should be reported with uncertainty.',
    relatedTopics: ['impression-evidence', 'crime-scene-procedures'],
  },
]

export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.term.toLowerCase() === term.toLowerCase())
}

export const glossaryLetters = glossary
  .map((t) => t.term[0].toUpperCase())
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort()

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.trim().toLowerCase()
  if (!q) return glossary
  return glossary.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.simpleExplanation.toLowerCase().includes(q)
  )
}