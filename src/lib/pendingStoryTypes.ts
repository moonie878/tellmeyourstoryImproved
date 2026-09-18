import { STORY_TYPES } from '../data/storyTypes'

/**
 * Carries the story type a visitor picked on the homepage
 * ("Whose story?" buttons) through signup to their first story.
 *
 *   /register?type=mum → /dashboard?type=mum → new "Mum's Story" opens
 *
 * localStorage is the backup for when the query string gets lost
 * (e.g. confirming the email, then logging in via /login).
 */
const KEY = 'tmys-pending-story-type'

export function isValidStoryType(value: unknown): value is string {
  return typeof value === 'string' && STORY_TYPES.some((s) => s.id === value)
}

export function savePendingStoryType(type: string | undefined) {
  try {
    if (type) localStorage.setItem(KEY, type)
    else localStorage.removeItem(KEY)
  } catch {
    // storage unavailable — query string still works
  }
}

/** Reads and clears the saved type. Returns null if missing or invalid. */
export function takePendingStoryType(): string | null {
  try {
    const value = localStorage.getItem(KEY)
    localStorage.removeItem(KEY)
    return isValidStoryType(value) ? value : null
  } catch {
    return null
  }
}