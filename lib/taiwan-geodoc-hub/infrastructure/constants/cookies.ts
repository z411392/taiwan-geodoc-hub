const _180Days = 86400 * 180

const TrackingConsent = {
    name: "TRACKING_CONSENT",
    maxAge: _180Days,
}

const Locale = {
    name: "NEXT_LOCALE",
    maxAge: _180Days,
}

export { TrackingConsent, Locale }
