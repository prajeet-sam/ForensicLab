import { Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'
import { EmptyState } from '../components/ui'

export default function NotFoundPage() {
  useSEO({
    title: 'Page not found',
  })

  return (
    <div className="page-container">
      <EmptyState
        icon="question"
        title="Exhibit not found"
        description="This page doesn't exist or has been moved. Evidence is only useful when it's in the right place — let's get you back on track."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">Go home</Link>
            <Link to="/learn" className="btn-secondary">Browse learning</Link>
            <Link to="/glossary" className="btn-secondary">Open glossary</Link>
          </div>
        }
      />
    </div>
  )
}