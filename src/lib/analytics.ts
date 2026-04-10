import { posthog } from './posthog'

type AnalyticsEvent =
  | 'preview_opened'
  | 'upgrade_clicked'
  | 'story_completed'
  | 'export_started'
  | 'export_success'
  | 'customiser_opened'
  | 'design_saved'
  | 'export_blocked'
  | 'editor_top_buttons'
  | 'midway_banner'
  | 'completion_card'
  | 'premium_preview'
  | 'export_gate'
  | 'home_pricing'
  | 'cover_banner'
  | 'story_started'
  | 'example_story_clicked'

type AnalyticsValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>
  | Array<unknown>

type TrackProperties = Record<string, AnalyticsValue>

export function track(event: AnalyticsEvent, data?: TrackProperties) {
  const payload = data || {}

  // Dev log (keep this — super useful)
  if (import.meta.env.DEV) {
    console.log('[Analytics]', event, payload)
  }

  try {
    posthog.capture(event, payload)
  } catch (err) {
    console.error('PostHog capture failed:', err)
  }
}