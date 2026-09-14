import type { ReactNode } from 'react'

type IconName =
  | 'blood'
  | 'dna'
  | 'chemistry'
  | 'toxic'
  | 'narcotics'
  | 'explosive'
  | 'glass'
  | 'paint'
  | 'soil'
  | 'toolmark'
  | 'audio'
  | 'ballistic'
  | 'digital'
  | 'fingerprint'
  | 'document'
  | 'photo'
  | 'anthropology'
  | 'odontology'
  | 'serology'
  | 'microscope'
  | 'scale'
  | 'chain'
  | 'clock'
  | 'abo'
  | 'lock'
  | 'lattice'
  | 'gel'
  | 'testtube'
  | 'species'
  | 'rna'
  | 'precip'
  | 'transfer'
  | 'camera'
  | 'glove'
  | 'bag'
  | 'eye'
  | 'check'
  | 'report'
  | 'court'
  | 'search'
  | 'menu'
  | 'close'
  | 'shield'
  | 'home'
  | 'learn'
  | 'case'
  | 'lab'
  | 'glossary'
  | 'arrow-right'
  | 'play'
  | 'pause'
  | 'reset'
  | 'speed'
  | 'lightbulb'
  | 'warning'
  | 'info'
  | 'principles'
  | 'quiz'

const paths: Record<IconName, ReactNode> = {
  blood: (
    <>
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8c-2.5 2.5-2.5 5 0 7.5S14.5 10.5 12 8z" fill="currentColor" opacity="0.7" />
    </>
  ),
  dna: (
    <>
      <path d="M6 18c1.5-4 4.5-10 12-12M18 6c-1.5 4-4.5 10-12 12M7 7c1 2 1.8 4 2.5 5M17 17c-1-2-1.8-4-2.5-5M9 9h6M8 13h8" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </>
  ),
  chemistry: (
    <>
      <path d="M9 3h6M10 3v6l-4 9a2 2 0 001.7 3h8.6a2 2 0 001.7-3l-4-9V3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 15h9" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </>
  ),
  toxic: (
    <>
      <path d="M12 3l6 3v6c0 4-2.5 7.5-6 9-3.5-1.5-6-5-6-9V6l6-3z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="1.6" fill="currentColor" />
      <path d="M12 13.5v3M9.5 15l1 1M14.5 15l-1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  narcotics: (
    <>
      <path d="M5 8h14v9H5z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M9 8V5a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  explosive: (
    <>
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5L19 19M19 5l-2.5 2.5M7.5 16.5L5 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </>
  ),
  glass: (
    <>
      <path d="M6 3h12l-1.5 10a3 3 0 01-2.97 2.6h-3.06A3 3 0 017.5 13L6 3z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <path d="M8 4l1 6M11 4l1 7M14 4l1 6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </>
  ),
  paint: (
    <>
      <rect x="4" y="9" width="16" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="7" y="12" width="10" height="6" rx="0.5" fill="currentColor" opacity="0.3" />
      <path d="M7 9h10" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  soil: (
    <>
      <path d="M5 8h14l-1.5 11h-11L5 8z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M7 12h10M6 16h12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="9" cy="10.5" r="0.6" fill="currentColor" />
      <circle cx="13" cy="14.5" r="0.6" fill="currentColor" />
    </>
  ),
  toolmark: (
    <>
      <path d="M4 18L9 13l-1-6 6 1 5-5 4 4-5 5 1 6-6-1-5 5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M17 4l3 3" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  audio: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 10v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 7v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19 11v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  ballistic: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 4v-2M12 20v2M4 12H2M20 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  digital: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="8" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 17h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M12 3c-4 0-7 3-7 7v4c0 2.8 1.6 5.2 4 6.4M12 3c4 0 7 3 7 7v1M12 6c-2.8 0-5 2.2-5 5v3M12 6c2.8 0 5 2.2 5 5M12 10c-1.7 0-3 1.3-3 3v2M12 10c1.7 0 3 1.3 3 3M12 14c-1 0-1.8.8-1.8 1.8V21M12 14c1 0 1.8.8 1.8 1.8V21" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l4 4v14H7V3z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M10 12h5M10 15h5M10 9h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  photo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      <rect x="14" y="2.5" width="2.5" height="2" rx="0.4" fill="currentColor" opacity="0.7" />
    </>
  ),
  anthropology: (
    <>
      <path d="M9 3h6v3h-6z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M8 6l1 6a4 4 0 006 0l1-6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M12 12v5M9 21l1.5-3h3L15 21" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  odontology: (
    <>
      <path d="M5 6C8 4 16 4 19 6l-1 4h-4l-1 5-1-5H6L5 6z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M8 7v2M12 7v2M16 7v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </>
  ),
  serology: (
    <>
      <circle cx="12" cy="6" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 9v8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 14c2 2 3 3 3 5M9 12.5c1 1 1.5 1.6 1.5 2.7M17 14c-2 2-3 3-3 5M15 12.5c-1 1-1.5 1.6-1.5 2.7" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </>
  ),
  microscope: (
    <>
      <path d="M5 10a2 2 0 012-2h4a2 2 0 012 2v1H5v-1zM7 10v8M11 10v8" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M7 18l-3 3M11 18l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="12" r="1" fill="currentColor" opacity="0.6" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18M8 21h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 8h14l-1.5 4h-11L5 8z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M8 12a4 4 0 008 0" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </>
  ),
  chain: (
    <>
      <circle cx="6" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.2 10.5l5.6-1M9.2 13.5l5.6 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  abo: (
    <>
      <circle cx="8" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 10l-2-6M10 10l-1-6M16 6V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
    </>
  ),
  lattice: (
    <>
      <circle cx="6" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="18" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 8l8 8M6 10v4M10 6h4M18 12v4M14 18h4M12 10v4M8 14l4 4M16 6l4 4" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </>
  ),
  gel: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="7" cy="9" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="15" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 9v4c0 2 10 2 10-1" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.6" />
      <path d="M10 11.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  testtube: (
    <>
      <path d="M9 3h6M10 3v7l-4.5 8A2 2 0 007.3 21h9.4a2 2 0 001.8-3L14 10V3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15h10" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
    </>
  ),
  species: (
    <>
      <path d="M3 5h18l-2 12H5L3 5z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M6 9h.01M10 9h.01M14 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M6 13h12" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
    </>
  ),
  rna: (
    <>
      <path d="M4 8h16M8 5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0M8 11c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0M6 8a2 2 0 012 2c0 1 .8 1.6 1.6 1.6M10 10.4a2 2 0 004 0 2 2 0 012-2 2 2 0 014 0" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </>
  ),
  precip: (
    <>
      <circle cx="6" cy="6" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="18" cy="18" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 8l8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    </>
  ),
  transfer: (
    <>
      <path d="M4 9h16M4 9l3-3M4 9l3 3M20 15H4M20 15l-3-3M20 15l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 6l1.5-2.5h5L16 6" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="13" r="0.8" fill="currentColor" />
    </>
  ),
  glove: (
    <>
      <path d="M7 11V5.5a1.8 1.8 0 013.6 0V10M10.6 11V4.5a1.8 1.8 0 013.6 0V10M14.2 11V5a1.8 1.8 0 013.6 0v8.5c0 4-2.7 6.5-6.5 6.5-3.2 0-5.3-2-5.3-5V11" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </>
  ),
  eye: (
    <>
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  check: (
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  report: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  court: (
    <>
      <path d="M12 4v16M9 20h6M4 8h16l-8-4-8 4z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15a5 5 0 0010 0" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  close: <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7v10H4V11z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
    </>
  ),
  learn: (
    <>
      <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M4 9h16" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 13h8M8 16h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  case: (
    <>
      <path d="M6 3h12l2 4-2 14H6L4 7l2-4z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 11h6M12 11v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  lab: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 8h16" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="5.5" r="0.8" fill="currentColor" />
      <circle cx="12" cy="5.5" r="0.8" fill="currentColor" />
      <circle cx="16" cy="5.5" r="0.8" fill="currentColor" />
      <path d="M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  glossary: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 3.5v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  play: <path d="M7 4.5v15l13-7.5L7 4.5z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />,
  pause: <path d="M7 5h3.4v14H7zM13.6 5H17v14h-3.4z" fill="currentColor" />,
  reset: (
    <path d="M4 7v5h5M5.5 9.5A8 8 0 1112 20a8 8 0 01-6.8-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  speed: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 12l4-3M8 12h8M12 14.5a2.5 2.5 0 100-5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.8.6 1.5 1.4 1.5 2.6h4c0-1.2.7-2 1.5-2.6A6 6 0 0012 3z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3L2.5 20h19L12 3z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M12 9v5M12 17v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 11v5M12 7.5v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  principles: (
    <>
      <path d="M12 22s7-4 7-10V5l-7-3-7 3v7c0 6 7 10 7 10z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M6 9h12M8.5 15h7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <path d="M10 6l2 2 2-2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  quiz: (
    <>
      <path d="M6 5h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-4 4v-4a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <path d="M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
}

export function Icon({
  name,
  className = 'w-5 h-5',
  label,
}: {
  name: keyof typeof paths
  className?: string
  label?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {paths[name]}
    </svg>
  )
}