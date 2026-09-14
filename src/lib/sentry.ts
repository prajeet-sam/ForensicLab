type SentryGlobal = {
  init(options: Record<string, unknown>): void
  captureException(error: unknown): void
  withScope?(fn: (scope: { setExtra(key: string, value: unknown): void }) => void): void
}

const SENTRY_CDN_BUNDLE = 'https://browser.sentry-cdn.com/7.114.0/bundle.min.js'

let scriptPromise: Promise<SentryGlobal | null> | null = null

function loadSentry(): Promise<SentryGlobal | null> {
  if (scriptPromise) return scriptPromise

  const dsn = (import.meta.env as Record<string, string | undefined>).VITE_SENTRY_DSN
  if (!dsn) {
    scriptPromise = Promise.resolve(null)
    return scriptPromise
  }

  scriptPromise = new Promise<SentryGlobal>((resolve, reject) => {
    const win = window as unknown as { Sentry?: SentryGlobal }
    if (win.Sentry) {
      return resolve(win.Sentry)
    }
    const script = document.createElement('script')
    script.src = SENTRY_CDN_BUNDLE
    script.async = true
    script.onload = () => {
      if (!win.Sentry) {
        reject(new Error('Sentry loaded from CDN but global not available'))
        return
      }
      win.Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
      })
      resolve(win.Sentry)
    }
    script.onerror = () => reject(new Error('Failed to load Sentry from CDN'))
    document.head.appendChild(script)
  }).catch((err) => {
    console.warn('[sentry] load failed, continuing without telemetry', err)
    return null
  })

  return scriptPromise
}

export async function captureError(error: unknown, extra?: unknown): Promise<void> {
  try {
    const Sentry = await loadSentry()
    if (!Sentry) return
    if (extra !== undefined && typeof Sentry.withScope === 'function') {
      Sentry.withScope((scope) => {
        scope.setExtra('detail', extra)
        Sentry.captureException(error)
      })
    } else {
      Sentry.captureException(error)
    }
  } catch {
    // telemetry must never crash the app
  }
}