type SentryModule = typeof import('@sentry/react')

let sentryPromise: Promise<SentryModule | null> | null = null

function loadSentry(): Promise<SentryModule | null> {
  if (!sentryPromise) {
    const env = import.meta.env as Record<string, string | undefined>
    const dsn = env.VITE_SENTRY_DSN
    sentryPromise = dsn
      ? import('@sentry/react')
          .then((Sentry) => {
            Sentry.init({
              dsn,
              tracesSampleRate: 0.1,
              integrations:
                typeof Sentry.browserTracingIntegration === 'function'
                  ? [Sentry.browserTracingIntegration()]
                  : [],
            })
            return Sentry
          })
          .catch((err) => {
            console.warn('[sentry] init failed, continuing without telemetry', err)
            return null
          })
      : Promise.resolve(null)
  }
  return sentryPromise
}

export async function captureError(error: unknown, extra?: unknown): Promise<void> {
  try {
    const Sentry = await loadSentry()
    if (!Sentry) return
    if (extra !== undefined) {
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