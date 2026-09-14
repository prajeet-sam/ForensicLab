import type { Principle } from '../lib/types'

export const principles: Principle[] = [
  {
    id: 'locard',
    title: "Locard's Exchange Principle",
    definition:
      'When two objects come into contact, material is transferred between them — traces are exchanged between person, object and environment.',
    metaphor:
      'Two surfaces brushing together trade flecks of one another — soil, fibers, hair, blood. The scene, the victim and the suspect each leave part of themselves on the other.',
    example:
      'Fibers from a carpet transfer to the soles of shoes; a suspect\u2019s hair falls onto furniture; soil from a field clings to a vehicle.',
    application:
      'Drives the searching, collection and testing of trace evidence at scenes and on persons.',
    limitation:
      'Transfer does not prove who was present or when, and many traces are common, invisible or lost. Some contacts leave nothing detectable. Presence of a trace never, by itself, establishes that a crime occurred or who committed it.',
    visual: 'locard',
  },
  {
    id: 'individuality',
    title: 'Principle of Individuality',
    definition:
      'Every person and many objects are capable of possessing distinctive characteristics that, in principle, allow evidence to be individualized.',
    metaphor:
      'A key, a signature pattern of wear on a tool blade, the ridge detail of a fingertip — each bears features that are effectively unique.',
    example:
      'Minutiae in a latent fingerprint, the striations on a fired bullet, or the tool pattern in a pry mark.',
    application:
      'Underpins comparison work in fingerprints, toolmarks, firearms and DNA.',
    limitation:
      'Individualization is a conclusion about the evidence quality and context — not a mathematical certainty. Partial, degraded or common evidence may only support class-level conclusions, and no two-comparison method is error-free.',
    visual: 'individuality',
  },
  {
    id: 'progressive',
    title: 'Progressive Change',
    definition:
      'Evidence changes over time; the state of an item at examination is the result of alteration since transfer.',
    metaphor:
      'A stain dries, a drop spatters, a body changes and an electronic file is overwritten. Every hour moves the evidence further from its original state.',
    example:
      'Wet bloodstains dry and change color; decomposition alters biological material; deleted files are overwritten by normal use.',
    application:
      'Drives rapid collection, correct packaging, and the need to interpret degradation.',
    limitation:
      'Change can obscure what happened and can look like other kinds of alteration. Timing of change is often uncertain.',
    visual: 'progressive',
  },
  {
    id: 'comparison',
    title: 'Principle of Comparison',
    definition:
      'Unknown (questioned) evidence is compared with known (reference) material under identical conditions to assess whether they could share a common source.',
    metaphor:
      'Ask whether a questioned paint chip could have come from a known vehicle by examining the two side by side under the same conditions.',
    example:
      'Questioned glass vs known window glass; questioned soil vs reference soil; questioned bullet vs test-fired bullet.',
    application:
      'The core logic of every comparison discipline — documents, fingerprints, firearms, toolmarks, paints.',
    limitation:
      'Comparison establishes exclusion or inclusion at some level of significance, but class overlap and examiner bias affect the outcome. A match does not equal guilt.',
    visual: 'comparison',
  },
  {
    id: 'analysis',
    title: 'Analysis vs Interpretation',
    definition:
      'Forensic work separates measurement (analysis) from explanation (interpretation). Analyst and inference must be kept logically distinct.',
    metaphor:
      'The balance reads a weight; the meaning of the weight — for the story of the scene — is another step entirely.',
    example:
      'Confirming a stain is human blood (analysis) is different from concluding who left it and how (interpretation).',
    application:
      'Frames laboratory protocols, reporting language and expert testimony.',
    limitation:
      'Overreaching from measurement to story is the single most common source of overstated opinions. Interpretation always carries uncertainty.',
    visual: 'analysis',
  },
  {
    id: 'probability',
    title: 'Probability & Statistical Strength',
    definition:
      'Forensic results are statements of likelihood or degree of support, not logical certainties, and must be expressed quantitatively when possible.',
    metaphor:
      'A random man in the population has a one-in-a-billion chance of matching this profile — that is strength, not proof.',
    example:
      'DNA profile frequencies, expected random-match rates, error-rate and validation data.',
    application:
      'Guides how results are quantified, reported and compared across disciplines.',
    limitation:
      'Small databases, dependent markers, subpopulation effects, and examiner fallibility weaken naive statistics. Numbers must never be presented as certainty.',
    visual: 'probability',
  },
  {
    id: 'circumstantial',
    title: 'Circumstantial Evidence & Reconstructive Value',
    definition:
      'Individual forensic findings are usually part of a wider circumstantial picture; their probative value depends on context.',
    metaphor:
      'A stain, a fiber and a message each contribute a strand of a rope — the rope is only as strong as its weakest strands and the context that holds them.',
    example:
      'A presumptive blood indication, later confirmed, plus a DNA match and a time-line from digital evidence, together build a reconstruction.',
    application:
      'Frames holistic case interpretation rather than single-evidence headlines.',
    limitation:
      'Multiple weak strands can overbuild a plausible but wrong story. Context is essential but must not become confirmation bias.',
    visual: 'circumstantial',
  },
]

export function getPrinciple(id: string): Principle | undefined {
  return principles.find((p) => p.id === id)
}

export const fundamentalForensicPrinciples = [
  {
    title: 'Identity and comparison',
    body: 'Evidence is identified (what is it?) and compared (could it share a source?). Both steps have scope to err, and scope is reported honestly.',
  },
  {
    title: 'Continuity and integrity',
    body: 'Evidence must be traceable from scene to court, unaltered and accounted for at every transfer. Without this, even perfect analysis loses meaning.',
  },
  {
    title: 'Guard against contamination',
    body: 'The examiner is a source of contamination. Every contact can add or remove material, so protective measures protect the interpretation, not just the sample.',
  },
  {
    title: 'Question everything, including the request',
    body: 'Evidence should be examined with an open mind. The investigator states their question; the analyst answers what the science actually supports.',
  },
  {
    title: 'Fit within a valid life-cycle',
    body: 'Recognition → documentation → collection → packaging → transport → storage → examination → interpretation → reporting. Weakness at any stage weakens the whole chain.',
  },
]