import posthog from 'posthog-js'
import { getCurrentUtmData } from './utm'

const posthogToken = import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

export function initPostHog() {
  if (!posthogToken || !posthogHost) {
    console.warn('PostHog is not configured. Missing env vars.')
    return
  }

  posthog.init(posthogToken, {
    api_host: posthogHost,
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    loaded: (ph) => {
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
}

export { posthog }