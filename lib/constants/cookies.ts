const _1hour = 3600
const _14Days = 86400 * 14
const _180Days = 86400 * 180

export const Cookies: Record<string, { name: string; maxAge: number }> = {
  Session: {
    name: "SESSION",
    maxAge: _14Days,
  },
  TrackingConsent: {
    name: "TRACKING_CONSENT",
    maxAge: _180Days,
  },
  Locale: {
    name: "NEXT_LOCALE",
    maxAge: _180Days,
  },
  CSRFToken: {
    name: "CSRF_TOKEN",
    maxAge: _1hour,
  },
}
