/*
 * purchases.js — recording sales, and the admin summary endpoint.
 *
 * Kept out of server.js because that file is already 2,774 lines. Wiring it in
 * is three lines, listed at the bottom of this comment.
 *
 * Why this exists: every completed checkout was being handled for its SIDE
 * EFFECTS (grant access, send the gift email) but never written down as a
 * sale. Tribute videos had it worst — a £19.99 payment was a console.log and
 * nothing more, so there was no way to find the buyer or re-issue their video.
 *
 * In server.js:
 *
 *   1. near the top, with the other requires:
 *        const { recordPurchase, mountPurchaseAdmin } = require('./purchases')
 *
 *   2. inside the webhook, in the `checkout.session.completed` branch —
 *      put it FIRST, before the gift / access / tribute handling, so the sale
 *      is recorded even if something downstream throws:
 *        await recordPurchase({ session, event, supabaseAdmin })
 *
 *   3. after `app.use(express.json())`:
 *        mountPurchaseAdmin(app, { supabaseAdmin })
 *
 * New env var on Render:
 *   ADMIN_USER_IDS — comma-separated Supabase user ids allowed to see the page.
 *   Find yours in Supabase → Authentication → Users.
 */

/** Which of our products this checkout was for. */
function classifyProduct(session) {
  const m = session.metadata || {}
  if (m.product === 'tribute-video') return 'tribute_video'
  if (m.purchaseType === 'gift')     return 'gift'
  if (m.purchaseType)                return m.purchaseType
  return 'other'
}

/** Orders from these addresses are ours, not sales. */
const TEST_EMAILS = (process.env.TEST_EMAILS || 'mark.b.griffiths@hotmail.com')
  .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)

function isTestOrder(session, amount) {
  const email = (session.customer_details?.email || session.metadata?.buyerEmail || '').toLowerCase()
  return amount === 0 || TEST_EMAILS.includes(email)
}
/**
 * Writes one row per completed checkout.
 *
 * Never throws: a failure to record a sale must not stop the customer getting
 * what they paid for, and must not make Stripe retry a webhook that otherwise
 * succeeded. It logs loudly instead.
 */
async function recordPurchase({ session, event, supabaseAdmin }) {
  try {
    const m = session.metadata || {}
    const amount   = session.amount_total || 0
    const discount = session.total_details?.amount_discount || 0

    const row = {
      paid_at: new Date((event?.created ?? Math.floor(Date.now() / 1000)) * 1000).toISOString(),
      stripe_session_id: session.id,
      stripe_payment_intent:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id || null,

      user_id: m.userId || null,
      email: session.customer_details?.email || m.buyerEmail || null,

      product:       classifyProduct(session),
      purchase_type: m.purchaseType || null,
      story_type:    m.storyType || null,
      variant:       m.variant || null,
      product_key:   m.productKey || null,
      subject_name:  m.subject_name || null,

      amount_minor:   amount,
      discount_minor: discount,
      currency:       session.currency || 'gbp',

      // £0 means we were testing, not selling.
      is_test: isTestOrder(session, amount),

      status: 'paid',
      raw: m,
    }

    // onConflict on the unique session id makes Stripe's retries harmless.
    const { error } = await supabaseAdmin
      .from('purchases')
      .upsert(row, { onConflict: 'stripe_session_id' })

    if (error) console.error('[purchases] insert failed:', error.message, session.id)
    else console.log('[purchases] recorded', row.product, `£${(amount / 100).toFixed(2)}`, session.id)
  } catch (err) {
    console.error('[purchases] record error:', err.message)
  }
}

/** Reads ADMIN_USER_IDS fresh each call so adding an id doesn't need a deploy. */
function adminIds() {
  return (process.env.ADMIN_USER_IDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Same Bearer-token pattern the storyteller routes use, plus an allow-list.
 * Being signed in is not enough — you have to be on the list.
 */
async function requireAdmin(req, res, supabaseAdmin) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) { res.status(401).json({ error: 'Please sign in' }); return null }

  const { data } = await supabaseAdmin.auth.getUser(token)
  const userId = data?.user?.id
  if (!userId) { res.status(401).json({ error: 'Please sign in' }); return null }

  const allowed = adminIds()
  if (allowed.length === 0) {
    console.error('[purchases] ADMIN_USER_IDS is not set — refusing access')
    res.status(403).json({ error: 'Not available' })
    return null
  }
  if (!allowed.includes(userId)) {
    // Deliberately the same message a signed-out user gets: don't advertise
    // that an admin page exists here.
    res.status(403).json({ error: 'Not available' })
    return null
  }
  return userId
}

function money(minor) {
  return Math.round(minor) / 100
}

function mountPurchaseAdmin(app, { supabaseAdmin }) {
  app.get('/admin/purchases', async (req, res) => {
    const admin = await requireAdmin(req, res, supabaseAdmin)
    if (!admin) return

    try {
      const includeTests = req.query.includeTests === '1'

      // Volumes here are small (tens to low thousands). Pulling the rows and
      // rolling them up in JS avoids an RPC for a GROUP BY. If this ever gets
      // past ~5,000 rows, move the aggregation into Postgres.
      let query = supabaseAdmin
        .from('purchases')
        .select('paid_at, product, amount_minor, discount_minor, currency, is_test, status, email, subject_name, story_type, variant, stripe_session_id')
        .eq('status', 'paid')
        .order('paid_at', { ascending: false })
        .limit(5000)

      if (!includeTests) query = query.eq('is_test', false)

      const { data: rows, error } = await query
      if (error) throw new Error(error.message)

      const all = rows || []
      const now = Date.now()
      const since = (days) => now - days * 864e5

      const sum = (list) => list.reduce((t, r) => t + (r.amount_minor || 0), 0)
      const window = (days) => {
        const list = all.filter((r) => new Date(r.paid_at).getTime() >= since(days))
        return { orders: list.length, gross: money(sum(list)) }
      }

      const byMonth = new Map()
      const byProduct = new Map()
      for (const r of all) {
        const key = r.paid_at.slice(0, 7) // YYYY-MM
        const m = byMonth.get(key) || { month: key, orders: 0, gross_minor: 0 }
        m.orders += 1
        m.gross_minor += r.amount_minor || 0
        byMonth.set(key, m)

        const p = byProduct.get(r.product) || { product: r.product, orders: 0, gross_minor: 0 }
        p.orders += 1
        p.gross_minor += r.amount_minor || 0
        byProduct.set(r.product, p)
      }

      // Shown separately so you can see how many of your own tests are in there.
      const { count: testCount } = await supabaseAdmin
        .from('purchases')
        .select('id', { count: 'exact', head: true })
        .eq('is_test', true)

      res.json({
        allTime: { orders: all.length, gross: money(sum(all)) },
        last30:  window(30),
        last7:   window(7),
        byMonth: [...byMonth.values()]
          .sort((a, b) => b.month.localeCompare(a.month))
          .slice(0, 12)
          .map((m) => ({ month: m.month, orders: m.orders, gross: money(m.gross_minor) })),
        byProduct: [...byProduct.values()]
          .sort((a, b) => b.gross_minor - a.gross_minor)
          .map((p) => ({ product: p.product, orders: p.orders, gross: money(p.gross_minor) })),
        recent: all.slice(0, 50).map((r) => ({
          paid_at: r.paid_at,
          product: r.product,
          amount: money(r.amount_minor),
          discount: money(r.discount_minor || 0),
          email: r.email,
          detail: r.subject_name || r.story_type || r.variant || null,
          session: r.stripe_session_id,
        })),
        testOrders: testCount || 0,
        includeTests,
      })
    } catch (err) {
      console.error('[purchases] summary error:', err.message)
      res.status(500).json({ error: 'Could not load purchases' })
    }
  })
}

module.exports = { recordPurchase, mountPurchaseAdmin }
