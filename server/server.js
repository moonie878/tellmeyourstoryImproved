const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
const Groq = require('groq-sdk')
const crypto = require('crypto')
const multer = require('multer')
const { Resend } = require('resend')
require('dotenv').config()

const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } })

const PORT         = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL
const LULU_API_URL = 'https://api.lulu.com'

// ─── Env checks ───────────────────────────────────────────────────────────────
if (!process.env.STRIPE_SECRET_KEY)        throw new Error('Missing STRIPE_SECRET_KEY')
if (!process.env.SUPABASE_URL)             throw new Error('Missing SUPABASE_URL')
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
if (!FRONTEND_URL)                         throw new Error('Missing FRONTEND_URL')
if (!process.env.TURNSTILE_SECRET_KEY)     throw new Error('Missing TURNSTILE_SECRET_KEY')

// ─── Clients ──────────────────────────────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend  = new Resend(process.env.RESEND_API_KEY)
// ─── PostHog (server-side) ────────────────────────────────────────────────────
// Records purchases from the Stripe webhook, so a payment is counted even if
// the customer closes the tab before returning to the site.
// Env on Render:
//   POSTHOG_API_KEY — same project token as VITE_PUBLIC_POSTHOG_TOKEN
//   POSTHOG_HOST    — same host as VITE_PUBLIC_POSTHOG_HOST (e.g. https://eu.i.posthog.com)
// If either is missing, tracking is skipped silently.
const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const POSTHOG_HOST    = (process.env.POSTHOG_HOST || '').replace(/\/+$/, '')

/** Stable UUID from a string, so Stripe webhook retries don't double-count. */
function uuidFrom(value) {
  const h = crypto.createHash('sha256').update(value).digest('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`
}

async function trackServerEvent({ event, distinctId, properties = {}, uuid, timestamp }) {
  if (!POSTHOG_API_KEY || !POSTHOG_HOST || !distinctId) return
  try {
    const res = await fetch(`${POSTHOG_HOST}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        event,
        distinct_id: distinctId,
        uuid,
        timestamp,
        properties: { ...properties, $lib: 'tmys-server' },
      }),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) console.error('PostHog capture failed:', res.status)
  } catch (err) {
    console.error('PostHog capture error:', err.message)
  }
}

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function addToResendContacts(email, firstName = '') {
  try {
    const response = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        unsubscribed: false,
      }),
    })
    const data = await response.json()
    console.log('Added to Resend contacts:', email, data)
  } catch (err) {
    console.log('Resend contact note:', err.message)
  }
}

// ─── Gift products config ─────────────────────────────────────────────────────
const GIFT_PRODUCTS = {
  'single-story': {
    label:      "Dad's Story — Keepsake Book",
    description: 'PDF keepsake export for one story',
    accessType:  'story',
    variant:     'text_only',
    storyType:   'dad',
    amount:      399,
  },
  'single-story-images': {
    label:      "Dad's Story — Story + Photos",
    description: 'PDF keepsake with photos for one story',
    accessType:  'export',
    variant:     'with_images',
    storyType:   'dad',
    amount:      799,
  },
  'all-stories': {
    label:      'All Stories — Keepsake Book',
    description: 'PDF keepsake export for all story types',
    accessType:  'story',
    variant:     'all',
    storyType:   'all',
    amount:      1199,
  },
  'premium': {
    label:      'Premium Keepsake',
    description: 'Photos, premium layouts, all story types',
    accessType:  'export',
    variant:     'premium',
    storyType:   'all',
    amount:      1799,
  },
}

// ─── Middleware ───────────────────────────────────────────────────────────────
app.set('trust proxy', 1)
app.use(cors({
  origin: [
    'https://tellmeyourstory.uk',
    'https://www.tellmeyourstory.uk',
    'https://improvedtell.vercel.app',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.status(200).json({ ok: true }))

// ─── Stripe webhook ───────────────────────────────────────────────────────────
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature']
    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('Webhook signature failed:', err.message)
      return res.sendStatus(400)
    }

    if (event.type === 'checkout.session.completed') {
      const session     = event.data.object
      const userId      = session.metadata?.userId
      const storyType   = session.metadata?.storyType || null
      const purchaseType = session.metadata?.purchaseType || 'single_story'

      console.log('Payment completed, purchaseType:', purchaseType, 'userId:', userId)

      // ── Analytics: one purchase_completed event for every kind of payment ──
      // distinct_id = Supabase user id, the same id the site passes to
      // posthog.identify(), so this lands on the same person as their funnel.
      // Gifts and tribute videos can be bought logged out → fall back to email.
      const buyerEmailForTracking =
        session.customer_details?.email || session.metadata?.buyerEmail || null
      const kind =
        session.metadata?.product === 'tribute-video' ? 'tribute_video' : purchaseType

      await trackServerEvent({
        event: 'purchase_completed',
        distinctId: userId || buyerEmailForTracking,
        uuid: uuidFrom(`stripe:${session.id}`),
        timestamp: new Date(event.created * 1000).toISOString(),
        properties: {
          purchase_type:    kind,
          story_type:       storyType,
          amount_gbp:       (session.amount_total || 0) / 100,
          discount_gbp:     (session.total_details?.amount_discount || 0) / 100,
          currency:         session.currency,
          promo_used:       (session.total_details?.amount_discount || 0) > 0,
          gift_product:     session.metadata?.productKey || undefined,
          stripe_session_id: session.id,
          logged_in:        Boolean(userId),
        },
      })

      // ── Gift purchase ──────────────────────────────────────────────────────
      if (purchaseType === 'gift') {
        const {
          productKey, buyerEmail, recipientEmail, recipientName,
          giftMessage, accessType, variant, storyType: giftStoryType,
        } = session.metadata

        const { data: giftRecord, error: giftError } = await supabaseAdmin
          .from('gift_purchases')
          .insert({
            stripe_session_id: session.id,
            product_key:       productKey,
            buyer_email:       buyerEmail,
            recipient_email:   recipientEmail,
            recipient_name:    recipientName,
            gift_message:      giftMessage,
            access_type:       accessType,
            variant,
            story_type:        giftStoryType,
          })
          .select('token')
          .single()

        if (giftError) {
          console.error('Gift record creation error:', giftError)
        } else {
          const redemptionUrl = `${FRONTEND_URL}/gift/redeem/${giftRecord.token}`
          try {
            await resend.emails.send({
              from:    'Tell Me Your Story <gifts@tellmeyourstory.uk>',
              to:      buyerEmail,
              subject: `🎁 Your gift for ${recipientName} is ready`,
              html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                  <h1 style="font-size: 28px; color: #1C1917;">Your gift is ready 🎁</h1>
                  <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                    You've gifted <strong>${recipientName}</strong> access to Tell Me Your Story.
                    Share the link below whenever you're ready.
                  </p>
                  <div style="background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
                    <p style="font-size: 12px; color: #9C7C5C; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Gift link</p>
                    <a href="${redemptionUrl}" style="font-size: 14px; color: #7C5C3B; word-break: break-all;">${redemptionUrl}</a>
                  </div>
                  ${giftMessage ? `
                  <div style="border-left: 3px solid #7C5C3B; padding: 12px 20px; margin: 24px 0; background: #FAF7F4; border-radius: 0 12px 12px 0;">
                    <p style="font-size: 14px; color: #3C3530; font-style: italic;">"${giftMessage}"</p>
                  </div>` : ''}
                  <p style="font-size: 13px; color: #8C847E; line-height: 1.6;">
                    ${recipientName} simply opens the link, creates a free account, and their access is unlocked automatically.
                  </p>
                  <p style="font-size: 12px; color: #A8A29E; margin-top: 32px;">
                    Tell Me Your Story · <a href="https://tellmeyourstory.uk" style="color: #7C5C3B;">tellmeyourstory.uk</a>
                  </p>
                </div>
              `,
            })
            console.log('Gift email sent to:', buyerEmail)
            await addToResendContacts(buyerEmail)  // ← add this
          } catch (emailErr) {
            console.error('Gift email error:', emailErr.message)
          }
        }
      }

      // ── Regular user purchase ──────────────────────────────────────────────
      else if (userId) {
        let accessRows = []

        if (purchaseType === 'single_text') {
          accessRows = [
            { user_id: userId, access_type: 'story',  story_type: storyType },
            { user_id: userId, access_type: 'export', variant: 'text_only' },
          ]
        } else if (purchaseType === 'single_images') {
          accessRows = [
            { user_id: userId, access_type: 'story',  story_type: storyType },
            { user_id: userId, access_type: 'export', variant: 'with_images' },
          ]
        } else if (purchaseType === 'all_text') {
          accessRows = [
            { user_id: userId, access_type: 'story',  story_type: 'all' },
            { user_id: userId, access_type: 'export', variant: 'text_only' },
          ]
        } else if (purchaseType === 'all_images') {
          accessRows = [
            { user_id: userId, access_type: 'story',  story_type: 'all' },
            { user_id: userId, access_type: 'export', variant: 'with_images' },
            { user_id: userId, access_type: 'print',  variant: 'premium' },
          ]
        }

        // Add to Resend contacts
  const { data: { user: purchaseUser } } = await supabaseAdmin.auth.admin.getUserById(userId)
  if (purchaseUser?.email) {
    await addToResendContacts(purchaseUser.email)
  }

        if (accessRows.length > 0) {
          const { error } = await supabaseAdmin
            .from('user_access')
            .upsert(accessRows, { onConflict: 'user_id,access_type,story_type,variant' })

          if (error) console.error('Supabase access error:', error.message)
          else console.log('Access granted for user:', userId)
        }
      }

      // ── Tribute video ──────────────────────────────────────────────────────
      if (session.metadata?.product === 'tribute-video') {
        console.log('Tribute video payment for:', session.metadata?.subject_name)
      }
    }

    res.json({ received: true })
  }
)

// ─── JSON middleware (after webhook raw handler) ───────────────────────────────
app.use(express.json())

app.post('/register-contact', async (req, res) => {
  try {
    const { email, firstName } = req.body
    if (!email) return res.status(400).json({ error: 'Email required' })

    await addToResendContacts(email, firstName || '')

    // Only send welcome email to genuinely new users (created in last 2 mins)
    // This prevents Google OAuth re-logins from triggering repeat emails
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
    const user = users?.find(u => u.email === email)
    const isNewUser = user && (Date.now() - new Date(user.created_at).getTime() < 120_000)

    if (isNewUser) {
      try {
        await resend.emails.send({
          from:    'Mark at Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
          to:      email,
          subject: 'Welcome to Tell Me Your Story 💛',
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 26px; color: #1C1917;">Welcome${firstName ? `, ${firstName}` : ''} 💛</h1>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                I'm really glad you're here.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                This is a simple way to capture a life story, one question at a time. You can type your answers, or record your voice if that feels more natural — there's no right way to do it, and no rush.
              </p>
              <div style="background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0;">
                <p style="font-size: 12px; color: #9C7C5C; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.1em;">A few things that might help</p>
                <p style="font-size: 14px; color: #3C3530; line-height: 1.8; margin: 0;">
                  · Everything autosaves as you go, so you can dip in and out whenever you have time.<br>
                  · You can add photos alongside any answer.<br>
                  · If you record your voice, we'll include a QR code in any printed book so family can scan it and actually hear the voice behind the words.<br>
                  · Try 5 questions free — upgrade any time from £3.99 to unlock the full set and export your keepsake.
                </p>
              </div>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                If you ever get stuck on a question, our writing assistant can offer gentle prompts to help you think it through — it won't write it for you, just nudge you in the right direction.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                If you have any questions at all, just reply to this email — I read every message myself.
              </p>
              <p style="font-size: 14px; color: #3C3530; margin-top: 28px;">
                Warm wishes,<br>
                Mark<br>
                Founder, Tell Me Your Story
              </p>
              <p style="font-size: 12px; color: #A8A29E; margin-top: 32px;">
                Tell Me Your Story · <a href="https://tellmeyourstory.uk" style="color: #7C5C3B;">tellmeyourstory.uk</a>
              </p>
            </div>
          `,
        })
        console.log('Welcome email sent to:', email)
      } catch (emailErr) {
        console.error('Welcome email error:', emailErr.message)
      }
    } else {
      console.log('Skipping welcome email (returning user):', email)
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Register contact error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── Unsubscribe ──────────────────────────────────────────────────────────────

function unsubscribeToken(email) {
  return crypto
    .createHmac('sha256', process.env.UNSUBSCRIBE_SECRET || 'change-me')
    .update(email.toLowerCase())
    .digest('hex')
    .slice(0, 32)
}

function unsubscribeUrl(email) {
  const e = encodeURIComponent(email.toLowerCase())
  return `${process.env.SERVER_URL || 'https://tellmeyourstoryimproved.onrender.com'}/unsubscribe?e=${e}&t=${unsubscribeToken(email)}`
}

app.get('/unsubscribe', async (req, res) => {
  const { e: email, t: token } = req.query

  const page = (heading, body) => `
    <!DOCTYPE html><html><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${heading}</title></head>
    <body style="font-family:Georgia,serif;background:#F5F0E8;margin:0;padding:60px 20px;">
      <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:20px;padding:40px;text-align:center;">
        <h1 style="font-size:22px;color:#1C1917;margin:0 0 14px;">${heading}</h1>
        <p style="font-size:15px;color:#5C534E;line-height:1.7;margin:0;">${body}</p>
        <a href="https://tellmeyourstory.uk" style="display:inline-block;margin-top:28px;background:#7C5C3B;color:#fff;padding:12px 28px;border-radius:100px;font-size:14px;text-decoration:none;">Back to Tell Me Your Story</a>
      </div>
    </body></html>`

  if (!email || !token || token !== unsubscribeToken(String(email))) {
    return res.status(400).send(page('Link not valid', 'That unsubscribe link looks incomplete. Reply to any of my emails and I\'ll remove you manually.'))
  }

  try {
    await fetch(`https://api.resend.com/contacts/${encodeURIComponent(String(email))}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unsubscribed: true }),
    })

    console.log('Unsubscribed:', email)
    res.send(page('You\'re unsubscribed', 'You won\'t hear from me again. If it was a mistake, just sign up again on the site.'))
  } catch (err) {
    console.error('Unsubscribe error:', err.message)
    res.status(500).send(page('Something went wrong', 'Reply to any of my emails and I\'ll remove you manually.'))
  }
})

// ─── Lead magnet: 50 questions PDF ────────────────────────────────────────────
app.post('/subscribe-questions', async (req, res) => {
  try {
    const { email, source } = req.body
    if (!email) return res.status(400).json({ error: 'Email required' })

    const trimmed = String(email).trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    // Add to Resend contacts (idempotent — safe to call for existing contacts)
    await addToResendContacts(trimmed, '')

    // Record the signup so we can see which page converts
    try {
      await supabaseAdmin.from('lead_magnet_signups').insert({
        email: trimmed,
        source: source || 'unknown',
      })
    } catch (dbErr) {
      // Non-critical — don't fail the request over analytics
      console.log('Lead magnet log note:', dbErr.message)
    }

    // Send the PDF
    await resend.emails.send({
      from: 'Mark at Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
      to: trimmed,
      subject: 'Your 50 questions are here',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; color: #1C1917; margin: 0 0 20px;">Your 50 questions</h1>

          <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
            Here they are — 50 questions to ask a parent or grandparent about their life.
          </p>

          <div style="background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
            <a href="https://tellmeyourstory.uk/downloads/50-questions.pdf"
               style="display: inline-block; background: #7C5C3B; color: white; padding: 13px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">
              Download the PDF
            </a>
            <p style="font-size: 12px; color: #8C847E; margin: 12px 0 0;">Print it, or keep it on your phone</p>
          </div>

          <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
            One suggestion: don't try to do all fifty. Pick one, ask it over a cup of tea, and see where it goes. The good stuff is almost always in the follow-up rather than the answer itself.
          </p>

          <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
            I'll send you a few more useful things over the next couple of weeks. If that's not what you want, unsubscribe at the bottom and no hard feelings.
          </p>

          <p style="font-size: 14px; color: #3C3530; margin-top: 28px;">
            Mark<br>
            <span style="color: #8C847E; font-size: 13px;">Founder, Tell Me Your Story</span>
          </p>

          <hr style="border: none; border-top: 1px solid #E8DDD0; margin: 32px 0 16px;">

          <p style="font-size: 11px; color: #A8A29E; line-height: 1.6;">
  You're getting this because you asked for the questions PDF at tellmeyourstory.uk.
  <a href="${unsubscribeUrl(trimmed)}" style="color: #9C7C5C;">Unsubscribe</a> ·
  <a href="https://tellmeyourstory.uk/privacy" style="color: #9C7C5C;">Privacy</a>
</p>
        </div>
      `,
      headers: {
  'List-Unsubscribe': `<${unsubscribeUrl(trimmed)}>`,
  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
},
    })

    console.log('Lead magnet sent to:', trimmed, '| source:', source)
    res.json({ success: true })
  } catch (err) {
    console.error('Subscribe questions error:', err.message)
    res.status(500).json({ error: 'Could not send. Please try again.' })
  }
})

// ─── Nurture: gate emails (cron) ──────────────────────────────────────────────
// Two emails to free users who answered 5+ questions but haven't paid:
//   gate_nudge    — 1–3 days after signup: shows one of their own answers back to them
//   gate_nudge_2  — 5–8 days after signup: short reminder that everything is saved
// Skips anyone who paid, opted out at signup, or unsubscribed.
// Call daily: GET /cron/nurture-gate-email?key=CRON_SECRET

const GATE_EMAILS = [
  { type: 'gate_nudge',   minHours: 24,  maxHours: 72 },
  { type: 'gate_nudge_2', minHours: 120, maxHours: 192 },
]

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function excerpt(text, max = 240) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

/** All auth users, paging through (listUsers returns at most 1000 at a time). */
async function listAllUsers() {
  const all = []
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 })
    if (error) throw error
    all.push(...data.users)
    if (data.users.length < 1000) break
  }
  return all
}

/** True if this address unsubscribed via any of our emails (stored on the Resend contact). */
async function isUnsubscribed(email) {
  try {
    const r = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    })
    if (!r.ok) return false
    const contact = await r.json()
    return contact?.unsubscribed === true || contact?.data?.unsubscribed === true
  } catch {
    return false
  }
}

function gateEmailFooter(email) {
  return `
    <hr style="border: none; border-top: 1px solid #E8DDD0; margin: 32px 0 16px;">
    <p style="font-size: 11px; color: #A8A29E; line-height: 1.6;">
      You're getting this because you started a story at tellmeyourstory.uk.
      <a href="${unsubscribeUrl(email)}" style="color: #9C7C5C;">Unsubscribe</a> ·
      <a href="https://tellmeyourstory.uk/privacy" style="color: #9C7C5C;">Privacy</a>
    </p>`
}

function gateEmailOne({ firstName, total, question, answerExcerpt, storyUrl, email }) {
  const quote = answerExcerpt
    ? `
      <div style="border-left: 3px solid #C4A882; padding: 4px 0 4px 18px; margin: 24px 0;">
        <p style="font-size: 13px; color: #9C7C5C; margin: 0 0 8px; font-style: italic;">${escapeHtml(question)}</p>
        <p style="font-size: 16px; color: #3C3530; line-height: 1.7; margin: 0;">“${escapeHtml(answerExcerpt)}”</p>
      </div>`
    : ''

  return {
    subject: `Your story is taking shape — ${total} questions answered`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; color: #1C1917;">Your story is taking shape${firstName ? `, ${escapeHtml(firstName)}` : ''}</h1>
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
          You've answered ${total} questions so far — memories that weren't written down anywhere before. Here's one of them:
        </p>
        ${quote}
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
          Everything is saved. There are 100+ more questions across every chapter of a life — childhood, family, work, love, and the lessons learned along the way.
        </p>
        <div style="background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
          <a href="${storyUrl}" style="display: inline-block; background: #7C5C3B; color: white; padding: 12px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">Carry on with the story</a>
          <p style="font-size: 13px; color: #8C847E; margin: 12px 0 0;">Unlock every question from £3.99 — a one-time payment</p>
        </div>
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
          If anything's holding you back, just reply — I read every message.
        </p>
        <p style="font-size: 14px; color: #3C3530; margin-top: 28px;">
          Warm wishes,<br>Mark<br>
          <span style="color: #8C847E; font-size: 13px;">Founder, Tell Me Your Story</span>
        </p>
        ${gateEmailFooter(email)}
      </div>`,
  }
}

function gateEmailTwo({ firstName, total, storyUrl, email }) {
  return {
    subject: 'Your answers are still saved',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">Hi${firstName ? ` ${escapeHtml(firstName)}` : ''},</p>
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
          Just a quick note — the ${total} answers you wrote are safe, exactly where you left them.
        </p>
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
          When you're ready, you can unlock the rest of the questions from £3.99. It's a one-time payment — no subscription, and no deadline to finish.
          Every voice answer gets its own QR code in the printed book, so the family can hear it years from now.
        </p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="${storyUrl}" style="display: inline-block; background: #7C5C3B; color: white; padding: 12px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">Open your story</a>
        </div>
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
          And if it's not for you, that's completely fine — reply and tell me why. It genuinely helps.
        </p>
        <p style="font-size: 14px; color: #3C3530; margin-top: 28px;">
          Mark<br><span style="color: #8C847E; font-size: 13px;">Founder, Tell Me Your Story</span>
        </p>
        ${gateEmailFooter(email)}
      </div>`,
  }
}

app.get('/cron/nurture-gate-email', async (req, res) => {
  // Protect with a secret so only your cron service can call it
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const dryRun = req.query.dry === '1' // ?dry=1 → report who WOULD be emailed, send nothing
  const report = []

  try {
    const now = Date.now()
    const oldest = Math.max(...GATE_EMAILS.map((g) => g.maxHours))
    const users = (await listAllUsers()).filter((u) => {
      const ageHours = (now - new Date(u.created_at).getTime()) / 3_600_000
      return u.email && ageHours >= 24 && ageHours <= oldest
    })

    let sentCount = 0

    for (const user of users) {
      const ageHours = (now - new Date(user.created_at).getTime()) / 3_600_000
      const due = GATE_EMAILS.find((g) => ageHours >= g.minHours && ageHours <= g.maxHours)
      if (!due) continue

      // Opted out of emails at signup
      if (user.user_metadata?.email_opt_in === false) continue

      // Already sent this one?
      const { data: alreadySent } = await supabaseAdmin
        .from('nurture_emails')
        .select('id')
        .eq('user_id', user.id)
        .eq('email_type', due.type)
        .maybeSingle()
      if (alreadySent) continue

      // Paid already?
      const { count: accessCount } = await supabaseAdmin
        .from('user_access')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      if ((accessCount || 0) > 0) continue

      // Their answers (story_answers is keyed by project, not user)
      const { data: projects } = await supabaseAdmin
        .from('story_projects')
        .select('id')
        .eq('user_id', user.id)
      const projectIds = (projects || []).map((p) => p.id)
      if (!projectIds.length) continue

      const { data: answerRows } = await supabaseAdmin
        .from('story_answers')
        .select('project_id, section_id, answer')
        .in('project_id', projectIds)
      const answered = (answerRows || []).filter((a) => a.answer && a.answer.trim())
      if (answered.length < 5) continue

      if (await isUnsubscribed(user.email)) continue

      // Their longest answer makes the best preview
      const best = answered.reduce((a, b) => (b.answer.length > a.answer.length ? b : a))
      const { data: section } = await supabaseAdmin
        .from('story_sections')
        .select('question')
        .eq('id', best.section_id)
        .maybeSingle()

      const firstName =
        user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name?.split(' ')[0] || ''
      const details = {
        firstName,
        total: answered.length,
        question: section?.question || '',
        answerExcerpt: excerpt(best.answer),
        storyUrl: `https://tellmeyourstory.uk/story/${best.project_id}`,
        email: user.email,
      }
      const message = due.type === 'gate_nudge' ? gateEmailOne(details) : gateEmailTwo(details)

      report.push({ email: user.email, type: due.type, answers: answered.length })
      if (dryRun) continue

      try {
        await resend.emails.send({
          from: 'Mark at Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
          to: user.email,
          subject: message.subject,
          html: message.html,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl(user.email)}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        })

        await supabaseAdmin.from('nurture_emails').insert({ user_id: user.id, email_type: due.type })

        console.log(`${due.type} sent to:`, user.email)
        sentCount++
      } catch (emailErr) {
        console.error('Gate email error:', user.email, emailErr.message)
      }
    }

    res.json({ sent: sentCount, checked: users.length, dryRun, ...(dryRun ? { wouldSend: report } : {}) })
  } catch (err) {
    console.error('Nurture cron error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── Nurture: Trustpilot review request (cron) ───────────────────────────────
// Asks engaged users (10+ answered questions, account at least 7 days old) for an
// honest review, once. Skips anyone who opted out at signup or unsubscribed.
// Call daily: GET /cron/trustpilot-ask?key=CRON_SECRET   (add &dry=1 to preview)
const REVIEW_MIN_ANSWERS = 10
const REVIEW_MIN_ACCOUNT_DAYS = 7

app.get('/cron/trustpilot-ask', async (req, res) => {
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const dryRun = req.query.dry === '1'
  const report = []

  try {
    // story_answers has no user_id — count non-empty answers per story,
    // then map each story to its owner.
    // Supabase returns at most 1,000 rows per request, so page through
    const answerRows = []
    for (let from = 0; ; from += 1000) {
      const { data, error: answersErr } = await supabaseAdmin
        .from('story_answers')
        .select('project_id, answer')
        .not('answer', 'is', null)
        .range(from, from + 999)
      if (answersErr) throw answersErr
      answerRows.push(...(data || []))
      if (!data || data.length < 1000) break
    }

    const answersPerProject = {}
    for (const row of answerRows || []) {
      if (row.answer && row.answer.trim()) {
        answersPerProject[row.project_id] = (answersPerProject[row.project_id] || 0) + 1
      }
    }

    const projectIds = Object.keys(answersPerProject)
    if (!projectIds.length) return res.json({ sent: 0, message: 'No answers yet' })

    const answersPerUser = {}
    for (let i = 0; i < projectIds.length; i += 200) {
      const { data: projects } = await supabaseAdmin
        .from('story_projects')
        .select('id, user_id')
        .in('id', projectIds.slice(i, i + 200))
      for (const p of projects || []) {
        if (!p.user_id) continue
        answersPerUser[p.user_id] = (answersPerUser[p.user_id] || 0) + (answersPerProject[p.id] || 0)
      }
    }

    const qualifiedUserIds = Object.entries(answersPerUser)
      .filter(([, count]) => count >= REVIEW_MIN_ANSWERS)
      .map(([userId]) => userId)

    let sentCount = 0

    for (const userId of qualifiedUserIds) {
      const { data: alreadySent } = await supabaseAdmin
        .from('nurture_emails')
        .select('id')
        .eq('user_id', userId)
        .eq('email_type', 'trustpilot_ask')
        .maybeSingle()
      if (alreadySent) continue

      const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(userId)
      if (!user?.email) continue

      const ageDays = (Date.now() - new Date(user.created_at).getTime()) / 86_400_000
      if (ageDays < REVIEW_MIN_ACCOUNT_DAYS) continue
      if (user.user_metadata?.email_opt_in === false) continue
      if (await isUnsubscribed(user.email)) continue

      report.push({ email: user.email, answers: answersPerUser[userId] })
      if (dryRun) continue

      const firstName = user.user_metadata?.full_name?.split(' ')[0]
        || user.user_metadata?.name?.split(' ')[0]
        || ''

      try {
        await resend.emails.send({
          from: 'Mark at Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
          to: user.email,
          subject: 'Could I ask a small favour?',
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; color: #1C1917;">Hi${firstName ? ` ${escapeHtml(firstName)}` : ''}</h1>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                It's Mark from Tell Me Your Story. You've answered ${answersPerUser[userId]} questions so far — thank you for trusting me with those memories.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                I'm building this on my own, and honest reviews make a huge difference to a small business. They help other families decide whether it's right for them.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                Would you share your honest experience on Trustpilot — whatever it has been? Even a sentence or two helps.
              </p>
              <div style="background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
                <a href="https://uk.trustpilot.com/evaluate/tellmeyourstory.uk" style="display: inline-block; background: #7C5C3B; color: white; padding: 12px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">Write a review on Trustpilot</a>
                <p style="font-size: 12px; color: #8C847E; margin-top: 10px;">Takes about a minute</p>
              </div>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                And if there's anything I could do better, just reply to this email. I read every message myself.
              </p>
              <p style="font-size: 14px; color: #3C3530; margin-top: 28px;">
                Warm wishes,<br>Mark<br>
                <span style="color: #8C847E; font-size: 13px;">Founder, Tell Me Your Story</span>
              </p>
              ${gateEmailFooter(user.email)}
            </div>
          `,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl(user.email)}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        })

        await supabaseAdmin
          .from('nurture_emails')
          .insert({ user_id: userId, email_type: 'trustpilot_ask' })

        console.log('Trustpilot ask sent to:', user.email)
        sentCount++
      } catch (emailErr) {
        console.error('Trustpilot ask error:', user.email, emailErr.message)
      }
    }

    res.json({ sent: sentCount, checked: qualifiedUserIds.length, dryRun, ...(dryRun ? { wouldSend: report } : {}) })
  } catch (err) {
    console.error('Trustpilot cron error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── Nurture: milestone emails (cron) ────────────────────────────────────────
// When a story reaches 10, 25 or 40 answered questions, email the owner once:
// "you've got enough for a book — preview it". Skips stories that already have
// a print order, people who opted out at signup, and anyone unsubscribed.
// Only the highest milestone reached is sent (no catch-up spam).
// Call daily: GET /cron/milestone-emails?key=CRON_SECRET   (add &dry=1 to preview)

const MILESTONES = [40, 25, 10]           // highest first
const MILESTONE_PRINT_FROM = '£21.99'     // keep in sync with PRINTED_BOOK_FROM_PRICE
const CHRISTMAS_PRINT_CUTOFF = new Date('2026-12-03T23:59:59Z') // keep in sync with lib/christmas.ts
const CHRISTMAS_SEASON_START = new Date('2026-10-01T00:00:00Z')

function milestoneEmail({ firstName, total, milestone, storyTitle, storyUrl, email }) {
  const title = escapeHtml(storyTitle || 'your story')
  const hi = `Hi${firstName ? ` ${escapeHtml(firstName)}` : ''},`

  const christmasLine =
    new Date() >= CHRISTMAS_SEASON_START && new Date() <= CHRISTMAS_PRINT_CUTOFF
      ? `<p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
           Thinking of it for Christmas? Order the printed book by <strong>3 December</strong> to be sure it arrives in time.
         </p>`
      : ''

  const copy = {
    10: {
      subject: `${total} stories written — enough for a first book`,
      heading: `${total} stories in “${title}”`,
      body: `That's already enough for a small book. Have a look at how it reads on the page — it's a lovely moment, seeing the answers set out like a real book.`,
      button: 'Preview your book',
    },
    25: {
      subject: `“${storyTitle || 'Your story'}” is turning into a real book`,
      heading: `${total} stories — this is a real book now`,
      body: `With ${total} answers, “${title}” has the shape of a proper keepsake. Preview it, and when you're happy you can order a printed copy from ${MILESTONE_PRINT_FROM}, including UK delivery. Every voice answer gets its own QR code in the book.`,
      button: 'Preview your book',
    },
    40: {
      subject: `Your book is ready to print`,
      heading: `${total} stories — ready to hold`,
      body: `“${title}” now has ${total} answers. That's a book the family will keep. Preview it one more time, then order a printed copy from ${MILESTONE_PRINT_FROM}, including UK delivery — or keep adding stories, there's no deadline.`,
      button: 'Preview and print',
    },
  }[milestone]

  return {
    subject: copy.subject,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">${hi}</p>
        <h1 style="font-size: 24px; color: #1C1917; line-height: 1.3;">${copy.heading}</h1>
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">${copy.body}</p>
        ${christmasLine}
        <div style="margin: 28px 0; text-align: center;">
          <a href="${storyUrl}" style="display: inline-block; background: #7C5C3B; color: white; padding: 12px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">${copy.button}</a>
        </div>
        <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
          If there's anything you'd like the book to do that it doesn't, just reply — I read every message.
        </p>
        <p style="font-size: 14px; color: #3C3530; margin-top: 28px;">
          Mark<br><span style="color: #8C847E; font-size: 13px;">Founder, Tell Me Your Story</span>
        </p>
        ${gateEmailFooter(email)}
      </div>`,
  }
}

app.get('/cron/milestone-emails', async (req, res) => {
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const dryRun = req.query.dry === '1'
  const report = []

  try {
    // Count non-empty answers per story (paged — Supabase returns 1,000 rows max)
    const answersPerProject = {}
    for (let from = 0; ; from += 1000) {
      const { data, error } = await supabaseAdmin
        .from('story_answers')
        .select('project_id, answer')
        .not('answer', 'is', null)
        .range(from, from + 999)
      if (error) throw error
      for (const row of data || []) {
        if (row.answer && row.answer.trim()) {
          answersPerProject[row.project_id] = (answersPerProject[row.project_id] || 0) + 1
        }
      }
      if (!data || data.length < 1000) break
    }

    const candidates = Object.entries(answersPerProject).filter(([, n]) => n >= MILESTONES[MILESTONES.length - 1])
    let sentCount = 0
    const userCache = {}

    for (const [projectId, total] of candidates) {
      const milestone = MILESTONES.find((m) => total >= m)

      const { data: project } = await supabaseAdmin
        .from('story_projects')
        .select('id, user_id, title')
        .eq('id', projectId)
        .maybeSingle()
      if (!project?.user_id) continue

      // Already had this milestone (or a higher one) for this story?
      const types = MILESTONES.filter((m) => m >= milestone).map((m) => `milestone_${m}:${projectId}`)
      const { data: sent } = await supabaseAdmin
        .from('nurture_emails')
        .select('email_type')
        .eq('user_id', project.user_id)
        .in('email_type', types)
      if (sent && sent.length) continue

      // Already ordered a printed copy of this story?
      const { count: printCount } = await supabaseAdmin
        .from('print_orders')
        .select('*', { count: 'exact', head: true })
        .eq('story_id', projectId)
      if ((printCount || 0) > 0) continue

      if (!userCache[project.user_id]) {
        const { data } = await supabaseAdmin.auth.admin.getUserById(project.user_id)
        userCache[project.user_id] = data?.user || null
      }
      const user = userCache[project.user_id]
      if (!user?.email) continue
      if (user.user_metadata?.email_opt_in === false) continue
      if (await isUnsubscribed(user.email)) continue

      const firstName = user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name?.split(' ')[0] || ''
      const message = milestoneEmail({
        firstName,
        total,
        milestone,
        storyTitle: project.title,
        storyUrl: `https://tellmeyourstory.uk/story/${projectId}`,
        email: user.email,
      })

      report.push({ email: user.email, story: project.title, answers: total, milestone })
      if (dryRun) continue

      try {
        await resend.emails.send({
          from: 'Mark at Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
          to: user.email,
          subject: message.subject,
          html: message.html,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl(user.email)}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        })

        // Record this milestone and any lower ones, so they're never sent later
        // One insert per row, so an existing lower milestone can't block the new one
        for (const m of MILESTONES.filter((x) => x <= milestone)) {
          const { error: logErr } = await supabaseAdmin
            .from('nurture_emails')
            .insert({ user_id: project.user_id, email_type: `milestone_${m}:${projectId}` })
          if (logErr && m === milestone) console.error('Milestone log error:', logErr.message)
        }

        console.log(`milestone_${milestone} sent to:`, user.email, '| story:', projectId)
        sentCount++
      } catch (emailErr) {
        console.error('Milestone email error:', user.email, emailErr.message)
      }
    }

    res.json({ sent: sentCount, checked: candidates.length, dryRun, ...(dryRun ? { wouldSend: report } : {}) })
  } catch (err) {
    console.error('Milestone cron error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── Storyteller links ("Send Mum her questions") ────────────────────────────
// The storyteller answers from /tell/:token with no account. Every read and
// write for them goes through these endpoints using the secret token, with the
// service role — the browser never gets direct database access.

const STORYTELLER_FREE_LIMIT = 5
const SITE_URL = 'https://tellmeyourstory.uk'

async function getStorytellerLink(token) {
  if (!token || typeof token !== 'string' || token.length < 20) return null
  const { data } = await supabaseAdmin
    .from('storyteller_links')
    .select('*')
    .eq('token', token)
    .maybeSingle()
  return data || null
}

/** Same rule as the editor: story access for this type (or "all") AND export access. */
async function ownerHasPaidAccess(userId, storyType) {
  const { data } = await supabaseAdmin.from('user_access').select('*').eq('user_id', userId)
  const rows = data || []
  const all = rows.some((r) => r.access_type === 'story' && r.story_type === 'all')
  const story = all || rows.some((r) => r.access_type === 'story' && r.story_type === storyType)
  const exp = rows.some((r) => r.access_type === 'export' && (r.variant === 'text_only' || r.variant === 'with_images'))
  return story && exp
}

async function storytellerContext(link) {
  const [{ data: project }, { data: sections }, { data: answers }] = await Promise.all([
    supabaseAdmin.from('story_projects').select('id, user_id, title, story_type').eq('id', link.project_id).maybeSingle(),
    supabaseAdmin.from('story_sections').select('id, chapter, question, order_index').eq('project_id', link.project_id).order('order_index', { ascending: true }),
    supabaseAdmin.from('story_answers').select('section_id, answer').eq('project_id', link.project_id),
  ])
  const answerBySection = {}
  for (const a of answers || []) if (a.answer && a.answer.trim()) answerBySection[a.section_id] = a.answer
  const answeredCount = Object.keys(answerBySection).length
  const paid = project ? await ownerHasPaidAccess(project.user_id, project.story_type) : false
  return { project, sections: sections || [], answerBySection, answeredCount, paid }
}

function storytellerLimitReached(ctx, sectionId) {
  if (ctx.paid) return false
  if (sectionId && ctx.answerBySection[sectionId]) return false // editing an existing answer is fine
  return ctx.answeredCount >= STORYTELLER_FREE_LIMIT
}

// Tell the owner when their storyteller answers — at most once every 3 hours
async function notifyOwnerOfAnswer(link, ctx, sectionId, answer) {
  try {
    const last = link.last_owner_notified_at ? new Date(link.last_owner_notified_at).getTime() : 0
    if (Date.now() - last < 3 * 60 * 60 * 1000) return

    const { data } = await supabaseAdmin.auth.admin.getUserById(ctx.project.user_id)
    const owner = data?.user
    if (!owner?.email) return

    const section = ctx.sections.find((s) => s.id === sectionId)
    const who = escapeHtml(link.storyteller_name)
    await resend.emails.send({
      from: 'Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
      to: owner.email,
      subject: `${link.storyteller_name} just answered a question`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 22px; color: #1C1917;">${who} just answered a question</h1>
          <div style="border-left: 3px solid #C4A882; padding: 4px 0 4px 18px; margin: 24px 0;">
            <p style="font-size: 13px; color: #86664A; margin: 0 0 8px; font-style: italic;">${escapeHtml(section?.question || '')}</p>
            <p style="font-size: 16px; color: #3C3530; line-height: 1.7; margin: 0;">“${escapeHtml(excerpt(answer, 280))}”</p>
          </div>
          <div style="margin: 28px 0; text-align: center;">
            <a href="${SITE_URL}/story/${ctx.project.id}" style="display: inline-block; background: #7C5C3B; color: white; padding: 12px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">Read it in “${escapeHtml(ctx.project.title || 'your story')}”</a>
          </div>
          <p style="font-size: 12px; color: #8C847E;">You're getting this because you invited ${who} to answer questions in your story.</p>
        </div>`,
    })
    await supabaseAdmin.from('storyteller_links').update({ last_owner_notified_at: new Date().toISOString() }).eq('id', link.id)
  } catch (err) {
    console.error('Owner notify error:', err.message)
  }
}

// Load the storyteller page
app.get('/storyteller/:token', async (req, res) => {
  try {
    const link = await getStorytellerLink(req.params.token)
    if (!link) return res.status(404).json({ error: 'Link not found' })

    const ctx = await storytellerContext(link)
    if (!ctx.project) return res.status(404).json({ error: 'Story not found' })

    res.json({
      storytellerName: link.storyteller_name,
      fromName: link.from_name,
      storyTitle: ctx.project.title,
      paused: link.paused,
      hasEmail: !!link.storyteller_email,
      answeredCount: ctx.answeredCount,
      limitReached: storytellerLimitReached(ctx),
      freeLimit: ctx.paid ? null : STORYTELLER_FREE_LIMIT,
      questions: ctx.sections.map((s) => ({
        id: s.id,
        chapter: s.chapter,
        question: s.question,
        answer: ctx.answerBySection[s.id] || '',
      })),
    })
  } catch (err) {
    console.error('Storyteller load error:', err.message)
    res.status(500).json({ error: 'Could not load the questions' })
  }
})

// Save a typed (or transcribed) answer
app.post('/storyteller/:token/answer', async (req, res) => {
  try {
    const link = await getStorytellerLink(req.params.token)
    if (!link) return res.status(404).json({ error: 'Link not found' })

    const { sectionId, answer } = req.body || {}
    const text = typeof answer === 'string' ? answer.trim().slice(0, 20000) : ''
    if (!sectionId || !text) return res.status(400).json({ error: 'Please write or record an answer first' })

    const ctx = await storytellerContext(link)
    if (!ctx.sections.some((s) => s.id === sectionId)) return res.status(400).json({ error: 'Unknown question' })
    if (storytellerLimitReached(ctx, sectionId)) return res.status(402).json({ error: 'limit', limitReached: true })

    const { error } = await supabaseAdmin
      .from('story_answers')
      .upsert({ project_id: link.project_id, section_id: sectionId, answer: text, updated_at: new Date().toISOString() }, { onConflict: 'project_id,section_id' })
    if (error) throw error

    const wasNew = !ctx.answerBySection[sectionId]
    const answeredCount = ctx.answeredCount + (wasNew ? 1 : 0)
    ctx.answerBySection[sectionId] = text

    notifyOwnerOfAnswer(link, ctx, sectionId, text) // don't make the storyteller wait for it

    res.json({
      ok: true,
      answeredCount,
      limitReached: !ctx.paid && answeredCount >= STORYTELLER_FREE_LIMIT,
    })
  } catch (err) {
    console.error('Storyteller answer error:', err.message)
    res.status(500).json({ error: "Sorry — your answer couldn't be saved. Please try again." })
  }
})

// Save a voice recording (the page transcribes via /transcribe first)
app.post('/storyteller/:token/recording', upload.single('audio'), async (req, res) => {
  try {
    const link = await getStorytellerLink(req.params.token)
    if (!link) return res.status(404).json({ error: 'Link not found' })
    if (!req.file) return res.status(400).json({ error: 'No recording received' })

    const { sectionId, transcript = '', durationSeconds = '0' } = req.body || {}
    const ctx = await storytellerContext(link)
    if (!ctx.sections.some((s) => s.id === sectionId)) return res.status(400).json({ error: 'Unknown question' })
    if (storytellerLimitReached(ctx, sectionId)) return res.status(402).json({ error: 'limit', limitReached: true })

    const type = req.file.mimetype || 'audio/mp4'
    const ext = type.includes('webm') ? 'webm' : type.includes('ogg') ? 'ogg' : 'mp4'
    const path = `${link.project_id}/${sectionId}-${Date.now()}.${ext}`

    const { error: upErr } = await supabaseAdmin.storage
      .from('voice-recordings')
      .upload(path, req.file.buffer, { contentType: type, upsert: true })
    if (upErr) throw upErr

    const { data: { publicUrl } } = supabaseAdmin.storage.from('voice-recordings').getPublicUrl(path)

    const { data: rec, error: dbErr } = await supabaseAdmin
      .from('voice_recordings')
      .upsert({
        section_id: sectionId,
        project_id: link.project_id,
        audio_url: publicUrl,
        transcript: String(transcript).slice(0, 20000),
        duration_seconds: Math.max(1, parseInt(durationSeconds, 10) || 1),
      }, { onConflict: 'section_id,project_id' })
      .select()
      .single()
    if (dbErr) throw dbErr

    res.json({ ok: true, recordingId: rec.id })
  } catch (err) {
    console.error('Storyteller recording error:', err.message)
    res.status(500).json({ error: "Sorry — your recording couldn't be saved. Please try again." })
  }
})

// Storyteller turns weekly emails off (link in every email)
app.post('/storyteller/:token/stop-emails', async (req, res) => {
  const link = await getStorytellerLink(req.params.token)
  if (!link) return res.status(404).json({ error: 'Link not found' })
  await supabaseAdmin.from('storyteller_links').update({ paused: true }).eq('id', link.id)
  res.json({ ok: true })
})

function storytellerPromptEmail(link, ctx, section, isInvite) {
  const url = `${SITE_URL}/tell/${link.token}?q=${encodeURIComponent(section.id)}`
  const stopUrl = `${SITE_URL}/tell/${link.token}?stop=1`
  const name = escapeHtml(link.storyteller_name)
  const from = escapeHtml(link.from_name)
  const intro = isInvite
    ? `<p style="font-size: 16px; color: #5C534E; line-height: 1.7;">${from} would love to hear your stories, and has set up a little book of questions for you. There's nothing to download and no password — just tap the button, then talk or type your answer.</p>`
    : `<p style="font-size: 16px; color: #5C534E; line-height: 1.7;">Here's this week's question from ${from}. Take as long as you like — there's no right or wrong answer.</p>`

  return {
    subject: isInvite ? `${link.from_name} has a question for you` : `This week's question from ${link.from_name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <p style="font-size: 16px; color: #5C534E; line-height: 1.7;">Hello ${name},</p>
        ${intro}
        <div style="background: #F5F0E8; border-radius: 16px; padding: 28px 24px; margin: 28px 0; text-align: center;">
          <p style="font-size: 13px; color: #86664A; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 12px;">${escapeHtml(section.chapter || 'Your story')}</p>
          <p style="font-size: 22px; color: #1C1917; line-height: 1.4; margin: 0 0 24px;">${escapeHtml(section.question)}</p>
          <a href="${url}" style="display: inline-block; background: #7C5C3B; color: white; padding: 14px 34px; border-radius: 100px; font-size: 16px; text-decoration: none; font-weight: 600;">Answer this question</a>
          <p style="font-size: 13px; color: #8C847E; margin: 14px 0 0;">You can speak your answer out loud — we'll type it up.</p>
        </div>
        <p style="font-size: 12px; color: #8C847E; line-height: 1.6;">
          ${from} asked Tell Me Your Story to send you these questions.
          <a href="${stopUrl}" style="color: #86664A;">Stop these emails</a>
        </p>
      </div>`,
  }
}

function nextUnanswered(ctx) {
  return ctx.sections.find((s) => !ctx.answerBySection[s.id]) || null
}

// Owner sends the invite email now (from the dashboard)
app.post('/storyteller-links/:id/invite', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!accessToken) return res.status(401).json({ error: 'Please sign in' })
    const { data: authData } = await supabaseAdmin.auth.getUser(accessToken)
    const userId = authData?.user?.id
    if (!userId) return res.status(401).json({ error: 'Please sign in' })

    const { data: link } = await supabaseAdmin.from('storyteller_links').select('*').eq('id', req.params.id).maybeSingle()
    if (!link) return res.status(404).json({ error: 'Link not found' })

    const ctx = await storytellerContext(link)
    if (!ctx.project || ctx.project.user_id !== userId) return res.status(403).json({ error: 'Not your story' })
    if (!link.storyteller_email) return res.status(400).json({ error: 'Add their email address first' })

    // Guard against repeated clicks
    if (link.last_prompted_at && Date.now() - new Date(link.last_prompted_at).getTime() < 10 * 60 * 1000) {
      return res.status(429).json({ error: 'We sent it a moment ago — give it a few minutes to arrive.' })
    }

    const section = nextUnanswered(ctx) || ctx.sections[0]
    if (!section) return res.status(400).json({ error: 'This story has no questions yet' })

    const message = storytellerPromptEmail(link, ctx, section, true)
    await resend.emails.send({
      from: `${link.from_name} via Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>`,
      to: link.storyteller_email,
      replyTo: authData.user.email,
      subject: message.subject,
      html: message.html,
    })
    await supabaseAdmin.from('storyteller_links').update({ last_prompted_at: new Date().toISOString(), paused: false }).eq('id', link.id)
    res.json({ ok: true })
  } catch (err) {
    console.error('Storyteller invite error:', err.message)
    res.status(500).json({ error: "Couldn't send the email. Please try again." })
  }
})

// Weekly question emails. Call daily: GET /cron/storyteller-prompts?key=CRON_SECRET (&dry=1 to preview)
app.get('/cron/storyteller-prompts', async (req, res) => {
  if (req.query.key !== process.env.CRON_SECRET) return res.status(401).json({ error: 'Unauthorized' })
  const dryRun = req.query.dry === '1'
  const report = []

  try {
    // Today's weekday in the UK (0 = Sunday)
    const ukDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
      new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'Europe/London' }).format(new Date()),
    )

    const { data: links, error } = await supabaseAdmin
      .from('storyteller_links')
      .select('*')
      .eq('prompt_day', ukDay)
      .eq('paused', false)
      .not('storyteller_email', 'is', null)
    if (error) throw error

    let sent = 0
    for (const link of links || []) {
      if (link.last_prompted_at && Date.now() - new Date(link.last_prompted_at).getTime() < 6 * 24 * 60 * 60 * 1000) continue

      const ctx = await storytellerContext(link)
      if (!ctx.project) continue
      if (storytellerLimitReached(ctx)) continue // owner needs to unlock more first
      const section = nextUnanswered(ctx)
      if (!section) continue // every question answered

      report.push({ to: link.storyteller_email, story: ctx.project.title, question: section.question })
      if (dryRun) continue

      try {
        const message = storytellerPromptEmail(link, ctx, section, false)
        await resend.emails.send({
          from: `${link.from_name} via Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>`,
          to: link.storyteller_email,
          subject: message.subject,
          html: message.html,
        })
        await supabaseAdmin.from('storyteller_links').update({ last_prompted_at: new Date().toISOString() }).eq('id', link.id)
        sent++
      } catch (emailErr) {
        console.error('Storyteller prompt error:', link.storyteller_email, emailErr.message)
      }
    }

    res.json({ sent, checked: (links || []).length, dryRun, ...(dryRun ? { wouldSend: report } : {}) })
  } catch (err) {
    console.error('Storyteller cron error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── Transcribe ───────────────────────────────────────────────────────────────
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No audio file provided' })
    if (!process.env.GROQ_API_KEY) return res.status(500).json({ error: 'Transcription not configured' })

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    const ext  = req.file.mimetype.includes('webm') ? 'webm'
      : req.file.mimetype.includes('ogg')  ? 'ogg'
      : req.file.mimetype.includes('mp4')  ? 'mp4' : 'webm'

    const file = new File([req.file.buffer], `recording.${ext}`, { type: req.file.mimetype })
    const transcription = await groq.audio.transcriptions.create({
      file, model: 'whisper-large-v3-turbo', language: 'en', response_format: 'json',
    })

    res.json({ transcript: transcription.text || '' })
  } catch (err) {
    console.error('Transcribe error:', err.message)
    res.status(500).json({ error: 'Transcription failed' })
  }
})

// ─── Writing assist ───────────────────────────────────────────────────────────
app.post('/writing-assist', async (req, res) => {
  try {
    const { question, answer, mode } = req.body

    if (!question) return res.status(400).json({ error: 'Question is required' })
    if (mode !== 'start' && (!answer || answer.trim().length < 5)) {
      return res.status(400).json({ error: 'Answer is required for expand mode' })
    }
    if (!process.env.GROQ_API_KEY) return res.status(500).json({ error: 'Writing assist not configured' })

    const prompt = mode === 'start'
      ? `You are a gentle, warm writing coach helping someone write their life story.
They are answering this question in their keepsake book: "${question}"
They haven't written anything yet. Give them 3 short, specific prompts to help them get started — but NOT to write it for them.
Rules: Each prompt is a gentle question or memory jogger, 1 sentence max. Keep the tone warm and personal. Do NOT write their answer for them. Return ONLY a JSON array of 3 strings, no other text.`
      : `You are a gentle, warm writing coach helping someone write their life story.
The person is answering this question: "${question}"
Their answer so far: "${answer}"
Give them 3 short, specific prompts to help them add more in their own words. Reference something specific from their answer. Do NOT rewrite it for them.
Rules: Each prompt is a gentle question or suggestion, 1 sentence max. Warm and personal tone. Return ONLY a JSON array of 3 strings, no other text.`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: 'openai/gpt-oss-20b', messages: [{ role: 'user', content: prompt }], temperature: 0.7, max_tokens: 300 }),
    })

    if (!response.ok) {
      console.error('Groq error:', await response.text())
      return res.status(500).json({ error: 'Writing assist failed' })
    }

    const data     = await response.json()
    const raw      = data.choices?.[0]?.message?.content || '[]'
    const cleaned  = raw.replace(/```json|```/g, '').trim()
    const suggestions = JSON.parse(cleaned)

    if (!Array.isArray(suggestions)) return res.status(500).json({ error: 'Unexpected response format' })
    res.json({ suggestions })
  } catch (err) {
    console.error('Writing assist error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── Turnstile ────────────────────────────────────────────────────────────────
app.post('/verify-turnstile', async (req, res) => {
  try {
    const { token } = req.body
    if (!token) return res.status(400).json({ success: false, error: 'Missing token' })

    const result = await verifyTurnstileToken(token, req.ip)
    if (!result.success) {
      return res.status(400).json({ success: false, error: 'Turnstile verification failed', details: result['error-codes'] || [] })
    }
    res.json({ success: true })
  } catch (error) {
    console.error('Turnstile error:', error)
    res.status(500).json({ success: false, error: 'Verification failed' })
  }
})

// ─── Checkout sessions ────────────────────────────────────────────────────────
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, storyType, projectId, purchaseType } = req.body
    if (!priceId || !userId || !projectId) return res.status(400).json({ error: 'Missing required checkout data' })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      allow_promotion_codes: true,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${FRONTEND_URL}/story/${projectId}?payment=success`,
      cancel_url:  `${FRONTEND_URL}/story/${projectId}?payment=cancelled`,
      metadata: { userId, storyType: storyType || '', projectId: projectId || '', purchaseType: purchaseType || '' },
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Checkout session error:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

app.post('/create-print-checkout', async (req, res) => {
  try {
    const { userId, storyId, storyTitle, quantity = 1, amount, podId, binding, includesPhotoBook, } = req.body
    console.log('Print checkout received:', { podId, binding, amount })
    if (!userId || !storyId) return res.status(400).json({ error: 'Missing required fields' })

    // amount is in pence from the frontend (binding cost + shipping * 100)
    // Fall back to softcover price if not provided
    const bookAmount     = amount || 2998  // £29.98 default (£24.99 + £4.99)
    const selectedPodId  = podId || '0600X0900.FC.STD.PB.060UW444.MXX'
    const selectedBinding = binding || 'Softcover'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: bookAmount,
            product_data: {
              name: `${storyTitle || 'Keepsake Book'} — ${selectedBinding}`,
              description: 'Professionally printed and bound · UK shipping included',
            },
          },
          quantity,
        },
      ],
      success_url: `${FRONTEND_URL}/dashboard?print=success&story=${storyId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${FRONTEND_URL}/dashboard?print=cancelled`,
      metadata: {
        userId,
        storyId,
        purchaseType: 'printed_book',
        quantity:     String(quantity),
        podId:        selectedPodId,
        binding:      selectedBinding,
        amount:       String(bookAmount),
        includesPhotoBook: String(includesPhotoBook || false),  // ← add this
      },
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Print checkout error:', err)
    res.status(500).json({ error: 'Failed to create checkout' })
  }
})



app.post('/verify-tribute-payment', async (req, res) => {
  try {
    const { sessionId } = req.body
    if (!sessionId) return res.status(400).json({ verified: false, error: 'Missing session ID' })

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status === 'paid' && session.metadata?.product === 'tribute-video') {
      return res.json({ verified: true })
    }
    res.json({ verified: false })
  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({ verified: false, error: 'Verification failed' })
  }
})

app.get('/stripe-session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId)
    res.json({ metadata: session.metadata })
  } catch (err) {
    console.error('Session fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch session' })
  }
})

// ─── Gift endpoints ───────────────────────────────────────────────────────────
// ─── Gift campaign discounts ──────────────────────────────────────────────────
// Discounts are decided HERE, never by the browser. (Previously the page sent a
// discount percentage and the server trusted it, so anyone could edit the
// request and buy a gift for a few pence.)
// A campaign only applies between its start and end dates — update each year.
const GIFT_CAMPAIGNS = {
  'christmas':   { percent: 20, start: '2026-09-01', end: '2026-12-31' },
  'mothers-day': { percent: 25, start: '2027-02-01', end: '2027-03-31' },
  'fathers-day': { percent: 25, start: '2027-05-15', end: '2027-06-30' },
}

function activeCampaignPercent(key) {
  const c = key && GIFT_CAMPAIGNS[String(key)]
  if (!c) return 0
  const now = new Date()
  const start = new Date(`${c.start}T00:00:00Z`)
  const end = new Date(`${c.end}T23:59:59Z`)
  return now >= start && now <= end ? c.percent : 0
}

// The gift page asks this to display the discount; it can't set it.
app.get('/gift-campaign/:key', (req, res) => {
  res.json({ percent: activeCampaignPercent(req.params.key) })
})

app.post('/create-gift-checkout', async (req, res) => {
  try {
    const { productKey, buyerEmail, recipientEmail, recipientName, giftMessage, campaign } = req.body

    if (!productKey || !GIFT_PRODUCTS[productKey]) return res.status(400).json({ error: 'Invalid product' })

    const product         = GIFT_PRODUCTS[productKey]
    const discountPercent = activeCampaignPercent(campaign)
    const unitAmount      = discountPercent
      ? Math.round(product.amount * (1 - discountPercent / 100))
      : product.amount

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      customer_email: buyerEmail || undefined,
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name:        `🎁 Gift: ${product.label}`,
            description: `A gift for ${recipientName || 'your loved one'} — ${product.description}`,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      success_url: `${FRONTEND_URL}/gift?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${FRONTEND_URL}/gift?cancelled=true`,
      metadata: {
        purchaseType:    'gift',
        productKey,
        buyerEmail:      buyerEmail || '',
        recipientEmail:  recipientEmail || '',
        recipientName:   recipientName || '',
        giftMessage:     giftMessage || '',
        accessType:      product.accessType,
        variant:         product.variant,
        storyType:       product.storyType,
        discountPercent: String(discountPercent),
        campaign:        discountPercent ? String(campaign) : '',
      },
    })

        // After gift record is created
await addToResendContacts(buyerEmail)
    res.json({ url: session.url })

  } catch (err) {
    console.error('Gift checkout error:', err)
    res.status(500).json({ error: 'Failed to create gift checkout' })
  }
})

app.get('/gift/:token', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('gift_purchases')
      .select('*')
      .eq('token', req.params.token)
      .maybeSingle()

    if (error || !data) return res.status(404).json({ error: 'Gift not found' })
    if (data.redeemed_at) return res.status(400).json({ error: 'Gift already redeemed' })

    res.json({ valid: true, productKey: data.product_key, recipientName: data.recipient_name, giftMessage: data.gift_message, buyerEmail: data.buyer_email })
  } catch (err) {
    console.error('Gift validation error:', err)
    res.status(500).json({ error: 'Validation failed' })
  }
})

app.post('/redeem-gift', async (req, res) => {
  try {
    const { token } = req.body

    // Who is redeeming comes from their login token, not from the request body
    // (previously any userId could be sent, and access granted to that account).
    const authHeader = req.headers.authorization || ''
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!token || !accessToken) return res.status(400).json({ error: 'Please sign in to redeem your gift' })

    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(accessToken)
    if (authError || !authData?.user) return res.status(401).json({ error: 'Please sign in to redeem your gift' })
    const userId = authData.user.id

    // Claim the gift in one step, so two clicks can't redeem it twice
    const { data: gift, error: giftError } = await supabaseAdmin
      .from('gift_purchases')
      .update({ redeemed_by: userId, redeemed_at: new Date().toISOString() })
      .eq('token', token)
      .is('redeemed_at', null)
      .select('*')
      .maybeSingle()

    if (giftError) return res.status(500).json({ error: 'Redemption failed' })
    if (!gift) {
      const { data: existing } = await supabaseAdmin.from('gift_purchases').select('id').eq('token', token).maybeSingle()
      return existing
        ? res.status(400).json({ error: 'Gift already redeemed' })
        : res.status(404).json({ error: 'Gift not found' })
    }

    const accessRows = [
  { user_id: userId, access_type: 'story',  story_type: gift.story_type, variant: gift.story_type },
  { user_id: userId, access_type: 'export', story_type: gift.story_type, variant: gift.variant },
]

    const { error: accessError } = await supabaseAdmin
      .from('user_access')
      .upsert(accessRows, { onConflict: 'user_id,access_type,story_type,variant' })

    if (accessError) {
      console.error('Access grant error:', accessError)
      // Release the claim so they can try again
      await supabaseAdmin
        .from('gift_purchases')
        .update({ redeemed_by: null, redeemed_at: null })
        .eq('token', token)
      return res.status(500).json({ error: 'Failed to grant access' })
    }

      // After successful redemption
await addToResendContacts(gift.recipient_email, gift.recipient_name)

    res.json({ success: true, storyType: gift.story_type })
  } catch (err) {
    console.error('Gift redemption error:', err)
    res.status(500).json({ error: 'Redemption failed' })
  }
})

// ─── Lulu endpoints ───────────────────────────────────────────────────────────
app.post('/lulu-shipping-cost', async (req, res) => {
  try {
    const token    = await getLuluAccessToken()
    const response = await fetch(`${LULU_API_URL}/print-job-cost-calculations/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
    const text = await response.text()
    res.status(response.status).json(JSON.parse(text))
  } catch (err) {
    console.error('Lulu shipping cost error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-shipping-options', async (req, res) => {
  try {
    const token    = await getLuluAccessToken()
    const response = await fetch(`${LULU_API_URL}/shipping-options/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
    const text = await response.text()
    res.status(response.status).json(JSON.parse(text))
  } catch (err) {
    console.error('Shipping options error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-print-job', async (req, res) => {
  try {
    const token = await getLuluAccessToken()
    const body  = req.body
    const transformedBody = {
      contact_email:    body.contact_email,
      external_id:      body.external_id,
      production_delay: body.production_delay || 120,
      shipping_address: body.shipping_address,
      shipping_level:   body.shipping_level,
      line_items: body.line_items.map((item) => ({
        title:    item.title,
        quantity: item.quantity,
        printable_normalization: {
          cover:    { source_url: item.cover.source_url },
          interior: { source_url: item.interior.source_url },
          pod_package_id: item.pod_package_id,
        },
      })),
    }

    const response = await fetch(`${LULU_API_URL}/print-jobs/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(transformedBody),
    })
    const text = await response.text()
    const data = JSON.parse(text)
    if (!response.ok) console.error('Lulu print job rejected:', JSON.stringify(data))
    else console.log('Lulu print job created:', data.id)
    res.status(response.status).json(data)
  } catch (err) {
    console.error('Lulu print job error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.get('/lulu-print-job-status/:id', async (req, res) => {
  try {
    const token    = await getLuluAccessToken()
    const response = await fetch(`${LULU_API_URL}/print-jobs/${req.params.id}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const data = await response.json()
    res.status(response.status).json({
      status:                  data.status?.name || 'UNKNOWN',
      tracking_id:             data.tracking_id,
      tracking_url:            data.tracking_url,
      estimated_shipping_date: data.estimated_shipping_date,
    })
  } catch (err) {
    console.error('Lulu status error:', err.message)
    res.status(500).json({ error: 'Failed to get print job status' })
  }
})

app.post('/lulu-print-job-cancel/:id', async (req, res) => {
  try {
    const token    = await getLuluAccessToken()
    const response = await fetch(`${LULU_API_URL}/print-jobs/${req.params.id}/`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` },
    })
    res.status(response.status).json({ cancelled: response.ok })
  } catch (err) {
    console.error('Lulu cancel error:', err.message)
    res.status(500).json({ error: 'Failed to cancel print job' })
  }
})

app.post('/lulu-cover-dimensions', async (req, res) => {
  try {
    const token    = await getLuluAccessToken()
    const response = await fetch(`${LULU_API_URL}/cover-dimensions/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pod_package_id:      req.body.pod_package_id || '0600X0900.FC.STD.PB.060UW444.MXX',
        interior_page_count: req.body.interior_page_count || 28,
        unit:                'mm',
      }),
    })
    const text = await response.text()
    res.status(response.status).send(text)
  } catch (err) {
    console.error('Cover dimensions error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-validate-interior', async (req, res) => {
  try {
    const token          = await getLuluAccessToken()
    const submitResponse = await fetch(`${LULU_API_URL}/validate-interior/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_url: req.body.source_url }),
    })
    const submitText = await submitResponse.text()
    if (!submitResponse.ok) return res.status(submitResponse.status).send(submitText)

    const { id } = JSON.parse(submitText)
    await new Promise(resolve => setTimeout(resolve, 8000))

    const resultResponse = await fetch(`${LULU_API_URL}/validate-interior/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    res.status(resultResponse.status).send(await resultResponse.text())
  } catch (err) {
    console.error('Validation error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-validate-cover', async (req, res) => {
  try {
    const token          = await getLuluAccessToken()
    const { source_url, interior_page_count = 36 } = req.body
    const submitResponse = await fetch(`${LULU_API_URL}/validate-cover/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_url, pod_package_id: '0600X0900.FC.STD.PB.060UW444.MXX', interior_page_count }),
    })
    const submitText = await submitResponse.text()
    if (!submitResponse.ok) return res.status(submitResponse.status).send(submitText)

    const { id } = JSON.parse(submitText)
    await new Promise(resolve => setTimeout(resolve, 15000))

    const resultResponse = await fetch(`${LULU_API_URL}/validate-cover/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    res.status(resultResponse.status).send(await resultResponse.text())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Error handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Express error:', err.message)
  res.status(500).json({ error: err.message })
})

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function verifyTurnstileToken(token, remoteIp) {
  const formData = new URLSearchParams()
  formData.append('secret', process.env.TURNSTILE_SECRET_KEY)
  formData.append('response', token)
  if (remoteIp) formData.append('remoteip', remoteIp)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  })
  return response.json()
}

async function getLuluAccessToken() {
  const response = await fetch('https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'client_credentials',
      client_id:     process.env.LULU_CLIENT_KEY,
      client_secret: process.env.LULU_CLIENT_SECRET,
    }).toString(),
  })

  const text = await response.text()
  if (!response.ok) throw new Error(`Lulu auth failed: ${response.status} ${text.slice(0, 200)}`)
  return JSON.parse(text).access_token
}