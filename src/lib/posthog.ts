import posthog from 'posthog-js'

const posthogToken = import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

export function initPostHog() {
  if (!posthogToken || !posthogHost) {
    console.warn('PostHog is not configured. Missing env vars.')
    return
  }

  posthog.init(posthogToken, {
    api_host: posthogHost,

    // Good defaults for a product like yours
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,

    // Helps while testing
    loaded: (ph) => {
      if (import.meta.env.DEV) {
        ph.debug()
      }
    },
  })
}

export { posthog }