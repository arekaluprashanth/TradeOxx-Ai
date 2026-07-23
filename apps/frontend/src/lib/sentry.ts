// Mock wrapper for Sentry error tracking
// Used to capture unhandled exceptions and performance bottlenecks in production

export const initErrorTracking = () => {
  if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.debug('[Sentry Mock] Initialization skipped in development mode.');
    return;
  }

  // Future: Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, tracesSampleRate: 1.0 })
};

export const captureError = (error: Error, context?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Sentry Mock] Captured Error:', error, context);
    return;
  }

  // Future: Sentry.captureException(error, { extra: context })
};
