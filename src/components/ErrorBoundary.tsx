import { Component, type ErrorInfo, type ReactNode } from 'react'
import { captureError } from '../lib/sentry'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AppError]', error, info.componentStack)
    void captureError(error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson-400">
            Something went wrong
          </p>
          <h1 className="text-2xl font-bold text-white">This part of the app hit an unexpected error.</h1>
          <p className="max-w-md text-sm text-gray-400">
            Reload the page to try again. If it keeps happening, let us know what you were doing.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-2">
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}