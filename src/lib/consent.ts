/**
 * Cookie consent — single source of truth.
 *
 * Same localStorage key and shape as before, so choices people have
 * already made are kept.
 */

export interface CookieConsent {
  necessary: true
  analytics: boolean
  savedAt: string
}

const KEY = 'cookie-consent'

/** Fired on window when the user opens "Cookie settings" (e.g. from the footer). */
export const OPEN_COOKIE_SETTINGS_EVENT = 'tmys:open-cookie-settings'

export function getConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return typeof parsed?.analytics === 'boolean' ? (parsed as CookieConsent) : null
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    savedAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(consent))
  } catch {
    // storage unavailable — choice applies for this visit only
  }
  return consent
}

/** Re-open the banner so people can change their mind. Call from a footer link. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
}