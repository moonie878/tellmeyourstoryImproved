import { posthog } from './posthog'
import { getCurrentUtmData } from './utm'

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
  | 'login_completed'
  | 'signup_completed'

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
  const utmData = getCurrentUtmData()

  const payload = {
    ...(data || {}),
    ...(utmData || {}),
  }

  console.log('[Analytics]', event, payload)
  posthog.capture(event, payload)
}