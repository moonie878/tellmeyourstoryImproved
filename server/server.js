const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
const Groq = require('groq-sdk')
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

// ─── Nurture: gate email (cron) ───────────────────────────────────────────────
app.get('/cron/nurture-gate-email', async (req, res) => {
  // Protect with a secret so only your cron service can call it
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Find users created 24-72 hours ago
    const now = new Date()
    const ago24 = new Date(now - 24 * 60 * 60 * 1000).toISOString()
    const ago72 = new Date(now - 72 * 60 * 60 * 1000).toISOString()

    // Get all users created in that window
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
    const recentUsers = users.filter(u => {
      const created = new Date(u.created_at)
      return created >= new Date(ago72) && created <= new Date(ago24)
    })

    if (recentUsers.length === 0) {
      return res.json({ sent: 0, message: 'No users in window' })
    }

    let sentCount = 0

    for (const user of recentUsers) {
      // Check they have 5+ answers (hit the gate)
      const { count: answerCount } = await supabaseAdmin
        .from('story_answers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      if (answerCount < 5) continue

      // Check they're still free (no paid access)
      const { count: accessCount } = await supabaseAdmin
        .from('user_access')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      if (accessCount > 0) continue

      // Check we haven't already sent this email
      const { data: alreadySent } = await supabaseAdmin
        .from('nurture_emails')
        .select('id')
        .eq('user_id', user.id)
        .eq('email_type', 'gate_nudge')
        .maybeSingle()

      if (alreadySent) continue

      // Get their story content for the preview line
      const { data: answers } = await supabaseAdmin
        .from('story_answers')
        .select('id')
        .eq('user_id', user.id)

      const totalAnswers = answers?.length || 0
      const firstName = user.user_metadata?.full_name?.split(' ')[0]
        || user.user_metadata?.name?.split(' ')[0]
        || ''

      // Send the nudge
      try {
        await resend.emails.send({
          from:    'Mark at Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
          to:      user.email,
          subject: `Your story is waiting — ${totalAnswers} pages written so far`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 26px; color: #1C1917;">Your story is taking shape${firstName ? `, ${firstName}` : ''} 💛</h1>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                You've already answered ${totalAnswers} questions — that's ${totalAnswers} pages of memories that didn't exist before you started.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                I know life gets busy, but those answers are safely saved and waiting for you. There are 100+ questions covering every chapter of a life — childhood, family, career, lessons, and the stories only you can tell.
              </p>
              <div style="background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
                <p style="font-size: 12px; color: #9C7C5C; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Pick up where you left off</p>
                <a href="https://tellmeyourstory.uk/dashboard" style="display: inline-block; background: #7C5C3B; color: white; padding: 12px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">Continue your story</a>
                <p style="font-size: 13px; color: #8C847E; margin-top: 12px;">
                  Upgrade from just £3.99 to unlock all questions
                </p>
              </div>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                Every question you answer becomes a page in a book your family can hold forever. Some people finish in a weekend, others take months — there's no rush, just start where it feels right.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                If anything's holding you back, just reply — I read every message.
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

        // Record it so we don't send again
        await supabaseAdmin
          .from('nurture_emails')
          .insert({ user_id: user.id, email_type: 'gate_nudge' })

        console.log('Gate nudge sent to:', user.email)
        sentCount++
      } catch (emailErr) {
        console.error('Gate nudge email error:', user.email, emailErr.message)
      }
    }

    res.json({ sent: sentCount, checked: recentUsers.length })
  } catch (err) {
    console.error('Nurture cron error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── Nurture: Trustpilot review request (cron) ───────────────────────────────
app.get('/cron/trustpilot-ask', async (req, res) => {
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Find users with 10+ answers (engaged, likely paid)
    const { data: engagedUsers, error: queryErr } = await supabaseAdmin
      .rpc('get_engaged_users_for_review', {})

    // Fallback: manual query if RPC doesn't exist
    // Get all users with 10+ story answers
    const { data: answerCounts, error: countErr } = await supabaseAdmin
      .from('story_answers')
      .select('user_id')

    if (countErr) {
      console.error('Trustpilot cron query error:', countErr.message)
      return res.status(500).json({ error: countErr.message })
    }

    // Count answers per user
    const userCounts = {}
    for (const row of answerCounts || []) {
      userCounts[row.user_id] = (userCounts[row.user_id] || 0) + 1
    }

    // Filter to users with 5+ answers
    const qualifiedUserIds = Object.entries(userCounts)
      .filter(([_, count]) => count >= 5)
      .map(([userId]) => userId)

    if (qualifiedUserIds.length === 0) {
      return res.json({ sent: 0, message: 'No qualified users' })
    }

    let sentCount = 0

    for (const userId of qualifiedUserIds) {
      // Check we haven't already sent this email
      const { data: alreadySent } = await supabaseAdmin
        .from('nurture_emails')
        .select('id')
        .eq('user_id', userId)
        .eq('email_type', 'trustpilot_ask')
        .maybeSingle()

      if (alreadySent) continue

      // Get user email
      const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(userId)
      if (!user?.email) continue

      const firstName = user.user_metadata?.full_name?.split(' ')[0]
        || user.user_metadata?.name?.split(' ')[0]
        || ''

      try {
        await resend.emails.send({
          from: 'Mark at Tell Me Your Story <mark-griffiths@tellmeyourstory.uk>',
          to: user.email,
          subject: 'Could I ask a small favour? 💛',
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; color: #1C1917;">Hi${firstName ? ` ${firstName}` : ''} 💛</h1>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                It's Mark from Tell Me Your Story.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                I'm building this on my own — no team, no investors, just me — and honest reviews make a huge difference to a small business like this. They help other families feel confident enough to start capturing their stories too.
              </p>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                If you've had a good experience so far, would you mind leaving a quick review on Trustpilot? Even a sentence or two goes a long way.
              </p>
              <div style="background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
                <a href="https://uk.trustpilot.com/evaluate/tellmeyourstory.uk" style="display: inline-block; background: #7C5C3B; color: white; padding: 12px 32px; border-radius: 100px; font-size: 14px; text-decoration: none; font-weight: 500;">Leave a review on Trustpilot</a>
                <p style="font-size: 12px; color: #8C847E; margin-top: 10px;">Takes about 30 seconds</p>
              </div>
              <p style="font-size: 15px; color: #5C534E; line-height: 1.7;">
                Thank you — and if there's anything I can improve, just reply to this email. I read every message myself.
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

        await supabaseAdmin
          .from('nurture_emails')
          .insert({ user_id: userId, email_type: 'trustpilot_ask' })

        console.log('Trustpilot ask sent to:', user.email)
        sentCount++
      } catch (emailErr) {
        console.error('Trustpilot ask error:', user.email, emailErr.message)
      }
    }

    res.json({ sent: sentCount, checked: qualifiedUserIds.length })
  } catch (err) {
    console.error('Trustpilot cron error:', err.message)
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
app.post('/create-gift-checkout', async (req, res) => {
  try {
    const { productKey, buyerEmail, recipientEmail, recipientName, giftMessage, discountPercent } = req.body

    if (!productKey || !GIFT_PRODUCTS[productKey]) return res.status(400).json({ error: 'Invalid product' })

    const product    = GIFT_PRODUCTS[productKey]
    let unitAmount   = product.amount
    if (discountPercent && discountPercent > 0 && discountPercent <= 100) {
      unitAmount = Math.round(product.amount * (1 - discountPercent / 100))
    }

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
        discountPercent: String(discountPercent || 0),
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
    const { token, userId } = req.body
    if (!token || !userId) return res.status(400).json({ error: 'Missing token or userId' })

    const { data: gift, error: giftError } = await supabaseAdmin
      .from('gift_purchases')
      .select('*')
      .eq('token', token)
      .maybeSingle()

    if (giftError || !gift) return res.status(404).json({ error: 'Gift not found' })
    if (gift.redeemed_at) return res.status(400).json({ error: 'Gift already redeemed' })

    const accessRows = [
  { user_id: userId, access_type: 'story',  story_type: gift.story_type, variant: gift.story_type },
  { user_id: userId, access_type: 'export', story_type: gift.story_type, variant: gift.variant },
]

    const { error: accessError } = await supabaseAdmin
      .from('user_access')
      .upsert(accessRows, { onConflict: 'user_id,access_type,story_type,variant' })

    if (accessError) {
      console.error('Access grant error:', accessError)
      return res.status(500).json({ error: 'Failed to grant access' })
    }

    await supabaseAdmin
      .from('gift_purchases')
      .update({ redeemed_by: userId, redeemed_at: new Date().toISOString() })
      .eq('token', token)

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