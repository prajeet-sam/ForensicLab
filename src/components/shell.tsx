import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon } from './Icon'
import { SearchOverlay } from './SearchOverlay'
import { getProgress } from '../lib/progress'

const desktopLinks = [
  { to: '/explore', label: 'Explore', icon: 'glossary' },
  { to: '/learn', label: 'Learn', icon: 'learn' },
  { to: '/simulators', label: 'Simulators', icon: 'testtube' },
  { to: '/cases', label: 'Case Files', icon: 'case' },
  { to: '/laboratory', label: 'Laboratory', icon: 'lab' },
  { to: '/modules', label: 'Module Library', icon: 'document' },
  { to: '/glossary', label: 'Glossary', icon: 'glossary' },
] as const

const moreLinks = [
  { to: '/exam', label: 'Exam Center', icon: 'check' as const },
  { to: '/explore', label: 'Explore Disciplines', icon: 'glossary' as const },
  { to: '/modules', label: 'Module Library', icon: 'document' as const },
  { to: '/principles', label: 'Scientific Principles', icon: 'principles' as const },
  { to: '/laboratory', label: 'Virtual Laboratory', icon: 'lab' as const },
  { to: '/quizzes', label: 'Quizzes', icon: 'quiz' as const },
  { to: '/glossary', label: 'Glossary', icon: 'glossary' as const },
  { to: '/about', label: 'About & Methodology', icon: 'info' as const },
]

export function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const progress = getProgress()

  return (
    <header className="sticky top-0 z-40 bg-navy-950/85 backdrop-blur-md border-b border-navy-700/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2.5 mr-2 shrink-0 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 border border-cyan-500/40 group-hover:border-cyan-400 transition-colors">
            <Icon name="microscope" className="w-4.5 h-4.5 text-cyan-400" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-crimson-500 border-2 border-navy-950" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-bold leading-tight tracking-tight text-white">ForensicLab</span>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-cyan-500/80">
              Scene → Court
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 mx-auto" aria-label="Primary">
          {desktopLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/principles"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Principles
          </NavLink>
        </nav>

        <div className="ml-auto lg:ml-0 flex items-center gap-2">
          {progress.completedTopics.length > 0 && (
            <span
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-cyan-400 bg-navy-800 border border-navy-600/50 rounded-full"
              title="Topics completed"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {progress.completedTopics.length} completed
            </span>
          )}
          <button
            onClick={onOpenSearch}
            className="btn-ghost !px-2.5 !py-1.5 flex items-center gap-2 text-gray-300"
            aria-label="Search the platform"
          >
            <Icon name="search" className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Search</span>
            <kbd className="hidden md:inline text-[10px] font-mono text-gray-500 border border-navy-600 rounded px-1.5 py-0.5">
              /
            </kbd>
          </button>
          <button
            className="lg:hidden btn-ghost !px-2 !py-1.5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-navy-700/60 bg-navy-900/95 animate-fade-in" aria-label="Mobile dropdown">
          <div className="px-4 py-3 space-y-1">
            {[
              ...desktopLinks,
              { to: '/principles', label: 'Scientific Principles', icon: 'principles' as const },
              { to: '/quizzes', label: 'Quizzes', icon: 'quiz' as const },
              { to: '/exam', label: 'Exam Center', icon: 'check' as const },
              { to: '/about', label: 'About', icon: 'info' as const },
            ].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => navLinkClass(isActive, true)}
              >
                <Icon name={l.icon} className="w-4 h-4 opacity-70" />
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export function MobileBottomNav({ onOpenSearch }: { onOpenSearch: () => void }) {
  const location = useLocation()
  const isMoreActive = ['/explore', '/principles', '/laboratory', '/quizzes', '/glossary', '/modules', '/about', '/more'].some(
    (p) => location.pathname.startsWith(p)
  )
  const isActive = (to: string) => {
    if (to === '/more') return isMoreActive
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-navy-950/95 backdrop-blur-md border-t border-navy-700/60 pb-safe"
      aria-label="Mobile primary navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-6">
        <NavLink
          to="/"
          aria-label="Navigate to Home"
          className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
            isActive('/') ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Icon name="home" className="w-5 h-5" />
          Home
        </NavLink>
        <NavLink
          to="/learn"
          aria-label="Navigate to Learn"
          className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
            isActive('/learn') ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Icon name="learn" className="w-5 h-5" />
          Learn
        </NavLink>
        <NavLink
          to="/simulators"
          aria-label="Navigate to Simulate"
          className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
            isActive('/simulators') ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Icon name="testtube" className="w-5 h-5" />
          Simulate
        </NavLink>
        <NavLink
          to="/cases"
          aria-label="Navigate to Cases"
          className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
            isActive('/cases') ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Icon name="case" className="w-5 h-5" />
          Cases
        </NavLink>
        <NavLink
          to="/more"
          aria-label="More options"
          className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
            isActive('/more') ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Icon name="menu" className="w-5 h-5" />
          More
        </NavLink>
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Search"
        >
          <Icon name="search" className="w-5 h-5" />
          Search
        </button>
      </div>
    </nav>
  )
}

export function MorePanel() {
  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold tracking-tight mb-2">More</h1>
      <p className="text-gray-300 mb-8 max-w-3xl">Everything else in the platform, in one place.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {moreLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="flex items-center gap-3 glass-panel p-4 hover:border-cyan-500/40 transition-all duration-200 group"
          >
            <span className="h-9 w-9 rounded-lg bg-cyan-600/15 flex items-center justify-center shrink-0">
              <Icon name={l.icon} className="w-4.5 h-4.5 text-cyan-400" />
            </span>
            <span className="text-sm font-medium text-gray-200 group-hover:text-white">{l.label}</span>
            <Icon name="arrow-right" className="w-4 h-4 ml-auto text-gray-500 group-hover:text-cyan-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-navy-700/60 bg-navy-950 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="microscope" className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white">ForensicLab</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              An interactive forensic-science learning platform teaching how evidence moves from crime scene
              to laboratory to courtroom — with honest attention to what science can and cannot show.
            </p>
          </div>
          <FooterCol
            title="Learn"
            links={[
              { to: '/learn/introduction', label: 'Introduction to Forensic Science' },
              { to: '/learn/abo-blood-grouping', label: 'ABO Blood Grouping' },
              { to: '/learn/dna-profiling', label: 'DNA Profiling' },
              { to: '/principles', label: 'Scientific Principles' },
            ]}
          />
          <FooterCol
            title="Experience"
            links={[
              { to: '/simulators', label: 'Simulators' },
              { to: '/cases', label: 'Case Files' },
              { to: '/laboratory', label: 'Virtual Laboratory' },
              { to: '/quizzes', label: 'Quizzes' },
              { to: '/exam', label: 'Exam Center' },
            ]}
          />
          <FooterCol
            title="Reference"
            links={[
              { to: '/modules', label: 'Module Library' },
              { to: '/explore', label: 'Explore Disciplines' },
              { to: '/glossary', label: 'Glossary' },
              { to: '/about', label: 'About & Methodology' },
            ]}
          />
        </div>
        <div className="mt-10 pt-6 border-t border-navy-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            Educational simulation. All cases are fictional. Content is designed to teach scientific reasoning,
            not to provide legal or investigative advice.
          </p>
          <p className="text-xs text-gray-600 font-mono">FSCLP v1.0 · Scene → Court</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-gray-400 hover:text-cyan-300 transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function navLinkClass(active: boolean, mobile = false): string {
  const base = mobile
    ? 'flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium'
    : 'px-3 py-1.5 rounded-md text-sm font-medium transition-colors'
  return `${base} ${active ? 'text-cyan-400 bg-cyan-600/10' : 'text-gray-300 hover:text-white hover:bg-navy-800'}`
}