/**
 * christmas.ts — shared Christmas season constants
 *
 * Lulu takes roughly 10–14 days to print and deliver within the UK, so
 * 10 December is the safe last order date for printed books. Digital
 * keepsakes have no deadline at all.
 *
 * Update CHRISTMAS_YEAR each season — everything else derives from it.
 */

export const CHRISTMAS_YEAR = 2026

/** Last safe order date for printed books */
export const PRINT_CUTOFF = new Date(`${CHRISTMAS_YEAR}-12-10T23:59:59`)
export const PRINT_CUTOFF_LABEL = '10 December'

/** Banner starts showing 1 October */
export const SEASON_START = new Date(`${CHRISTMAS_YEAR}-08-01T00:00:00`)

/** Digital gifts keep selling right up to the day */
export const CHRISTMAS_DAY = new Date(`${CHRISTMAS_YEAR}-12-25T23:59:59`)

/** True from 1 October to Christmas Day */
export function isChristmasSeason(): boolean {
  const now = new Date()
  return now >= SEASON_START && now <= CHRISTMAS_DAY
}

/** True while printed books can still arrive in time */
export function canStillOrderPrint(): boolean {
  return new Date() <= PRINT_CUTOFF
}

/** Whole days left to order a printed book. Zero once the cutoff passes. */
export function daysUntilPrintCutoff(): number {
  const ms = PRINT_CUTOFF.getTime() - Date.now()
  return ms <= 0 ? 0 : Math.ceil(ms / 86_400_000)
}

/** Whole days left until Christmas Day. Zero afterwards. */
export function daysUntilChristmas(): number {
  const ms = CHRISTMAS_DAY.getTime() - Date.now()
  return ms <= 0 ? 0 : Math.ceil(ms / 86_400_000)
}

/**
 * Which message the banner should show.
 *
 *  'early'    — Oct to late Nov: gentle nudge, plenty of time
 *  'countdown'— final 14 days before print cutoff: urgency
 *  'digital'  — after print cutoff, before Christmas: digital only
 *  'off'      — outside the season entirely
 */
export type ChristmasPhase = 'early' | 'countdown' | 'digital' | 'off'

export function christmasPhase(): ChristmasPhase {
  if (!isChristmasSeason()) return 'off'
  if (!canStillOrderPrint()) return 'digital'
  if (daysUntilPrintCutoff() <= 14) return 'countdown'
  return 'early'
}