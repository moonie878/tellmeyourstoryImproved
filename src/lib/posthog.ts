import posthog from 'posthog-js'
import { getCurrentUtmData } from './utm'
import { getConsent } from './consent'

const posthogToken = import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

/**
 * Consent model
 * ─────────────
 * Accepted  → full analytics, PostHog cookies + localStorage.
 * Rejected  → PostHog is never loaded (or is switched off if it was running).
 * No choice yet:
 *   TRACK_BEFORE_CONSENT = true  → anonymous, cookieless tracking (memory only —
 *                                  nothing stored on the device). Keeps landing /
 *                                  UTM data for visitors who ignore the banner.
 *   TRACK_BEFORE_CONSENT = false → nothing loads until they click "Accept".
 *
 * Pick the one that matches your Cookies Policy wording. If unsure, set false —
 * it's the strictest option.
 */
const TRACK_BEFORE_CONSENT = true

let initialised = false

function init(persistent: boolean) {
  posthog.init(posthogToken, {
    api_host: posthogHost,
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    persistence: persistent ? 'localStorage+cookie' : 'memory',
    loaded: (ph) => {
      // Someone who rejected earlier and has now accepted: clear the old opt-out.
      if (persistent && ph.has_opted_out_capturing()) ph.opt_in_capturing()

      const utmData = getCurrentUtmData()

      if (utmData) {
        ph.register(utmData)
        ph.people.set({
          first_utm_source: utmData.utm_source,
          first_utm_medium: utmData.utm_medium,
          first_utm_campaign: utmData.utm_campaign,
          first_utm_content: utmData.utm_content,
          first_utm_term: utmData.utm_term,
        })
      }

      if (import.meta.env.DEV) {
        ph.debug()
      }
    },
  })
  initialised = true
}

/** Called once from main.ts on page load. */
export function initPostHog() {
  if (!posthogToken || !posthogHost) {
    console.warn('PostHog is not configured. Missing env vars.')
    return
  }

  const consent = getConsent()

  if (consent?.analytics) {
    init(true)
  } else if (!consent && TRACK_BEFORE_CONSENT) {
    init(false)
  }
  // Rejected, or no choice with strict mode → don't load PostHog at all.
}

/** Called by the cookie banner whenever the user makes or changes a choice. */
export function applyAnalyticsConsent(analytics: boolean) {
  if (!posthogToken || !posthogHost) return

  if (analytics) {
    if (!initialised) {
      init(true)
    } else {
      posthog.set_config({ persistence: 'localStorage+cookie' })
      posthog.opt_in_capturing()
    }
    return
  }

  if (initialised) {
    posthog.opt_out_capturing()
    posthog.set_config({ persistence: 'memory' })
  }
}

export { posthog }