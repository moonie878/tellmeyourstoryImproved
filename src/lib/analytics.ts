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
 

export function track(event: AnalyticsEvent, data?: Record<string, any>) {
  console.log('[Analytics]', event, data || {})

  // future: send to PostHog / API / Supabase
}