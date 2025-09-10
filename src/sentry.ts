import * as Sentry from "@sentry/react";

// Initialize Sentry
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.10,
    environment: import.meta.env.MODE,
    beforeSend(event) {
      // Filter out development errors if needed
      if (import.meta.env.DEV) {
        console.log("Sentry event:", event);
      }
      return event;
    },
  });
} else {
  console.warn("Sentry DSN not found. Error reporting disabled.");
}

// Helper function to report errors with context
export const reportError = (error: Error, context?: Record<string, any>) => {
  if (SENTRY_DSN) {
    Sentry.withScope((scope) => {
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          scope.setContext(key, value);
        });
      }
      Sentry.captureException(error);
    });
  } else {
    console.error("Error (Sentry disabled):", error, context);
  }
};

// Manual testing helper
if (typeof window !== "undefined") {
  (window as any).__reportSentry = (msg: string) => {
    reportError(new Error(msg), { source: "manual-test" });
  };
}

export default Sentry;
