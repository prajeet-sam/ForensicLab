import { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Navbar, MobileBottomNav, Footer, MorePanel } from './components/shell'
import { SearchOverlay } from './components/SearchOverlay'
import { ParticleField } from './components/ParticleField'
import { ErrorBoundary } from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import TopicPage from './pages/TopicPage'
import ExplorePage, { DisciplinePage } from './pages/ExplorePage'
import PrinciplesPage from './pages/PrinciplesPage'
import LaboratoryPage from './pages/LaboratoryPage'
import SimulatorsPage from './pages/SimulatorsPage'
import SimulatorDetailPage from './pages/SimulatorDetailPage'
import CasesPage from './pages/CasesPage'
import CasePage from './pages/CasePage'
import QuizzesPage from './pages/QuizzesPage'
import ExamPage from './pages/ExamPage'
import GlossaryPage, { GlossaryTermPage } from './pages/GlossaryPage'
import ModuleLibraryPage, { ModuleDetailPage } from './pages/ModuleLibraryPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleField />
      <ScrollToTop />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main className="flex-1 pb-20 lg:pb-0">
        <ErrorBoundary>
          <Outlet />
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