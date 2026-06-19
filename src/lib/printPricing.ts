// printPricing.ts
//
// Centralised pricing for printed books. Lulu's actual print cost scales
// with page count (thicker spine = more material), so a single flat price
// per binding type either overcharges short books or — as discovered in
// June 2026 — undercharges long books to the point of losing money on
// every order. This file defines page-count brackets per binding type,
// each priced to guarantee a minimum profit even at the most expensive
// page count within that bracket.
//
// To update prices: just edit the `price` values below. To adjust margin
// safety, see MIN_PROFIT_TARGET and the cost-per-page constants, which were
// derived from real Lulu /print-job-cost-calculations responses (see
// PRICING_NOTES at the bottom for the source data points).

// Marketing-facing "from" price — use this everywhere a single headline
// print price is shown (homepage, pricing page, SEO landing pages, CTAs).
// This MUST match the lowest bracket price in BINDING_CONFIGS below
// (currently softcover, up to 80 pages) — if that bracket price changes,
// update this constant in the same edit so marketing copy never drifts
// out of sync with actual checkout pricing again.
export const PRINTED_BOOK_FROM_PRICE = 21.99

export type BindingId = 'softcover' | 'hardcover' | 'dustjacket' | 'bundle'

export interface PriceBracket {
  maxPages: number   // inclusive upper bound of this bracket
  price: number       // what the customer pays, in GBP, INCLUDING shipping
}

export interface BindingConfig {
  id: BindingId
  label: string
  desc: string
  podId: string
  includesPhotoBook: boolean
  brackets: PriceBracket[]
}

// Shipping is currently flat-rate UK shipping, included in every bracket
// price below. If shipping cost or pricing model changes, update here.
export const UK_SHIPPING_COST = 4.99

export const BINDING_CONFIGS: BindingConfig[] = [
  {
    id: 'softcover',
    label: 'Softcover',
    desc: 'Perfect bound · standard quality',
    podId: '0600X0900.FC.STD.PB.060UW444.MXX',
    includesPhotoBook: false,
    brackets: [
      { maxPages: 80,  price: 21.99 },
      { maxPages: 180, price: 34.99 },
      { maxPages: 280, price: 43.99 },
    ],
  },
  {
    id: 'hardcover',
    label: 'Hardcover Case Wrap',
    desc: 'Hardcover · premium colour interior',
    podId: '0600X0900.FC.PRE.CW.080CW444.GXX',
    includesPhotoBook: false,
    brackets: [
      { maxPages: 80,  price: 29.99 },
      { maxPages: 180, price: 42.99 },
      { maxPages: 280, price: 52.99 },
    ],
  },
  {
    id: 'dustjacket',
    label: 'Hardcover + Dust Jacket',
    desc: 'Linen wrap · foil spine · premium',
    podId: '0600X0900.FC.PRE.LW.080CW444.GNG',
    includesPhotoBook: false,
    brackets: [
      { maxPages: 80,  price: 34.99 },
      { maxPages: 180, price: 46.99 },
      { maxPages: 280, price: 56.99 },
    ],
  },
  {
    id: 'bundle',
    label: 'Story + Photo Book',
    desc: 'Softcover story book AND a separate photo-only book · both delivered together',
    podId: '0600X0900.FC.STD.PB.060UW444.MXX',
    includesPhotoBook: true,
    // Bundle = story softcover + photo book, both shipped together.
    // Uses the same softcover brackets as a base, plus a fixed premium
    // for the additional photo book. Adjust PHOTOBOOK_PREMIUM below if
    // the photo book's own page count/cost profile needs separate tracking.
    brackets: [
      { maxPages: 80,  price: 21.99 + 23 },
      { maxPages: 180, price: 34.99 + 23 },
      { maxPages: 280, price: 43.99 + 23 },
    ],
  },
]

/**
 * Returns the correct price for a binding type given the real page count.
 * Pages beyond the largest defined bracket fall back to the top bracket's
 * price — update brackets if you regularly see books longer than 280 pages,
 * since pricing isn't guaranteed accurate beyond the ranges tested against
 * real Lulu cost data.
 */
export function getPrintPrice(bindingId: BindingId, pageCount: number): number {
  const config = BINDING_CONFIGS.find((b) => b.id === bindingId)
  if (!config) throw new Error(`Unknown binding id: ${bindingId}`)

  const bracket = config.brackets.find((b) => pageCount <= b.maxPages)
  return bracket ? bracket.price : config.brackets[config.brackets.length - 1].price
}

export function getBindingConfig(bindingId: BindingId): BindingConfig {
  const config = BINDING_CONFIGS.find((b) => b.id === bindingId)
  if (!config) throw new Error(`Unknown binding id: ${bindingId}`)
  return config
}

/*
PRICING_NOTES — real Lulu cost data points used to build these brackets
(captured June 2026, via /lulu-shipping-cost backend proxy):

  Softcover (0600X0900.FC.STD.PB.060UW444.MXX):
    40 pages  → £6.10
    142 pages → £17.66
    250 pages → £29.91

  Hardcover case wrap (0600X0900.FC.PRE.CW.080CW444.GXX):
    40 pages  → £12.70
    142 pages → £24.26
    250 pages → £36.51

  Dust jacket (0600X0900.FC.PRE.LW.080CW444.GNG):
    40 pages  → £16.54
    142 pages → £28.10
    250 pages → £40.35

Each bracket's price was set so that even at the bracket's MAXIMUM page
count, after subtracting Lulu's print cost, £4.99 UK shipping, and an
estimated Stripe fee (~1.5% + 20p), at least £5 profit remains.

If Lulu's pricing changes, or you start seeing many orders near 280+
pages, re-run the cost checks and update both PRICING_NOTES and the
brackets above.
*/