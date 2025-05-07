export const Cookies: Record<string, { name: string; maxAge: number }> = {
  Session: {
    name: "SESSION",
    maxAge: 86400 * 7,
  },
  TrackingConsent: {
    name: "TRACKING_CONSENT",
    maxAge: 86400 * 180,
  },
  LocaleCookie: {
    name: "NEXT_LOCALE",
    maxAge: 86400 * 180,
  },
}
