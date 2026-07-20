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
  | 'question_answered'
  | 'first_question_answered'
  | 'example_story_clicked'
  | 'login_completed'
  | 'signup_completed'
  // Tribute video
  | 'tribute_step_reached'
  | 'tribute_preview_started'
  | 'tribute_purchase_clicked'
  | 'tribute_payment_opened'
  | 'tribute_payment_success'
  | 'tribute_payment_verification_failed'
  | 'tribute_payment_error'
  | 'tribute_tier4_download'
   | 'print_book_ordered'
   | 'upgrade_gate_shown'
   |'story_auto_created'
   |'checkout_from_register'


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