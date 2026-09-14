import { useState } from 'react'
import { useEffect } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Navbar, MobileBottomNav, Footer, MorePanel } from './components/shell'
import { ParticleField } from './components/ParticleField'
import { ErrorBoundary } from './components/ErrorBoundary'

const SearchOverlay = lazy(() => import('./components/SearchOverlay').then((m) => ({ default: m.SearchOverlay })))
const HomePage = lazy(() => import('./pages/HomePage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const TopicPage = lazy(() => import('./pages/TopicPage'))
const ExplorePage = lazy(() => import('./pages/ExplorePage'))
const DisciplinePage = lazy(() => import('./pages/ExplorePage').then((m) => ({ default: m.DisciplinePage })))
const PrinciplesPage = lazy(() => import('./pages/PrinciplesPage'))
const LaboratoryPage = lazy(() => import('./pages/LaboratoryPage'))
const SimulatorsPage = lazy(() => import('./pages/SimulatorsPage'))
const SimulatorDetailPage = lazy(() => import('./pages/SimulatorDetailPage'))
const CasesPage = lazy(() => import('./pages/CasesPage'))
const CasePage = lazy(() => import('./pages/CasePage'))
const QuizzesPage = lazy(() => import('./pages/QuizzesPage'))
const ExamPage = lazy(() => import('./pages/ExamPage'))
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'))
const GlossaryTermPage = lazy(() => import('./pages/GlossaryPage').then((m) => ({ default: m.GlossaryTermPage })))
const ModuleLibraryPage = lazy(() => import('./pages/ModuleLibraryPage'))
const ModuleDetailPage = lazy(() => import('./pages/ModuleLibraryPage').then((m) => ({ default: m.ModuleDetailPage })))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass-panel flex items-center gap-3 px-6 py-4">
        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
        <span className="text-sm text-gray-400">Loading…</span>
      </div>
    </div>
  )
}

function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleField />
      <ScrollToTop />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      {searchOpen && (
        <Suspense fallback={null}>
          <SearchOverlay open onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}
      <main className="flex-1 pb-20 lg:pb-0">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <MobileBottomNav onOpenSearch={() => setSearchOpen(true)} />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:topicId" element={<TopicPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:disciplineId" element={<DisciplinePage />} />
          <Route path="/principles" element={<PrinciplesPage />} />
          <Route path="/laboratory" element={<LaboratoryPage />} />
          <Route path="/simulators" element={<SimulatorsPage />} />
          <Route path="/simulators/:simulatorId" element={<SimulatorDetailPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:caseSlug" element={<CasePage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/glossary/:term" element={<GlossaryTermPage />} />
          <Route path="/modules" element={<ModuleLibraryPage />} />
          <Route path="/modules/:slug" element={<ModuleDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/more" element={<MorePanel />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}