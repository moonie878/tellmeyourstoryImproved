/**
 * christmas.ts — shared Christmas season constants
 *
 * Lulu takes roughly 10–14 days to print, and Royal Mail 2nd Class slows
 * down in December, so 3 December is the safe last order date for printed
 * books. Digital keepsakes have no deadline at all.
 *
 * Each season: update CHRISTMAS_YEAR. Change PRINT_CUTOFF_DAY or
 * SEASON_START_MONTH here only — every label and page reads from this file.
 */

export const CHRISTMAS_YEAR = 2026

/** Day in December after which printed books may not arrive in time */
const PRINT_CUTOFF_DAY = 3

/** Month the banner starts showing (1 = Jan … 10 = Oct) */
const SEASON_START_MONTH = 10

const pad = (n: number) => String(n).padStart(2, '0')

/** Last safe order date for printed books (end of that day, UK time on the visitor's clock) */
export const PRINT_CUTOFF = new Date(`${CHRISTMAS_YEAR}-12-${pad(PRINT_CUTOFF_DAY)}T23:59:59`)

/** e.g. "3 December" */
export const PRINT_CUTOFF_LABEL = `${PRINT_CUTOFF_DAY} December`

/** e.g. "3 Dec" — for tight spaces like the mobile banner */
export const PRINT_CUTOFF_SHORT_LABEL = `${PRINT_CUTOFF_DAY} Dec`

/** Banner starts showing on the 1st of SEASON_START_MONTH */
export const SEASON_START = new Date(`${CHRISTMAS_YEAR}-${pad(SEASON_START_MONTH)}-01T00:00:00`)

/** Digital gifts keep selling right up to the day */
export const CHRISTMAS_DAY = new Date(`${CHRISTMAS_YEAR}-12-25T23:59:59`)

/** True from SEASON_START to Christmas Day */
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
 *  'early'     — season start until 14 days before the print cutoff
 *  'countdown' — final 14 days before the print cutoff: urgency
 *  'digital'   — after the print cutoff, before Christmas: digital only
 *  'off'       — outside the season entirely
 */
export type ChristmasPhase = 'early' | 'countdown' | 'digital' | 'off'

export function christmasPhase(): ChristmasPhase {
  if (!isChristmasSeason()) return 'off'
  if (!canStillOrderPrint()) return 'digital'
  if (daysUntilPrintCutoff() <= 14) return 'countdown'
  return 'early'
}