/**
 * christmas.ts — shared Christmas season constants
 *
 * Lulu takes roughly 10–14 days to print and deliver within the UK,
 * so 10 December is the safe last order date for printed books.
 * Digital keepsakes have no deadline.
 *
 * Update CHRISTMAS_YEAR each season — everything else follows from it.
 */

export const CHRISTMAS_YEAR = 2026

export const PRINT_CUTOFF = new Date(`${CHRISTMAS_YEAR}-12-10T23:59:59`)
export const PRINT_CUTOFF_LABEL = '10 December'

/** Season runs from 15 September to the print cutoff */
export const SEASON_START = new Date(`${CHRISTMAS_YEAR}-09-15T00:00:00`)

/** True only during the run-up — use this to show or hide the banner */
export function isChristmasSeason(): boolean {
  const now = new Date()
  return now >= SEASON_START && now <= PRINT_CUTOFF
}

/** Whole days left to order a printed book. Zero once the cutoff passes. */
export function daysUntilCutoff(): number {
  const ms = PRINT_CUTOFF.getTime() - Date.now()
  return ms <= 0 ? 0 : Math.ceil(ms / 86_400_000)
}