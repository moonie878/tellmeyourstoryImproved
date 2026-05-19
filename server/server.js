const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL
const LULU_API_URL  = 'https://api.lulu.com'
const LULU_AUTH_URL = 'https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
}

if (!FRONTEND_URL) {
  throw new Error('Missing FRONTEND_URL')
}

if (!process.env.TURNSTILE_SECRET_KEY) {
  throw new Error('Missing TURNSTILE_SECRET_KEY')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
app.set('trust proxy', 1)
app.use(
  cors({
    origin: [
      'https://tellmeyourstory.uk',
      'https://www.tellmeyourstory.uk',
      'https://improvedtell.vercel.app' // keep this for testing if needed
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
)

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true })
})

// ── ADD THIS to server.js ─────────────────────────────────────────────────────
// Requires: npm install multer
// Add just before the error handler (before app.use((err, req, res, next) => {)
// Also requires GROQ_API_KEY in Render environment variables

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } })

app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' })
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'Transcription not configured' })
    }

    // Build multipart form for Groq Whisper
    const FormData = require('form-data')
    const form = new FormData()

    // Groq expects a filename with the correct extension
    const ext = req.file.mimetype.includes('webm') ? 'webm'
      : req.file.mimetype.includes('ogg') ? 'ogg'
      : req.file.mimetype.includes('mp4') ? 'mp4'
      : 'webm'

    form.append('file', req.file.buffer, {
      filename: `recording.${ext}`,
      contentType: req.file.mimetype,
    })
    form.append('model', 'whisper-large-v3-turbo')
    form.append('language', 'en')
    form.append('response_format', 'json')

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        ...form.getHeaders(),
      },
      body: form,
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Groq transcription error:', err)
      return res.status(500).json({ error: 'Transcription failed' })
    }

    const data = await response.json()
    res.json({ transcript: data.text || '' })

  } catch (err) {
    console.error('Transcribe endpoint error:', err.message)
    res.status(500).json({ error: 'Transcription failed' })
  }
})

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return res.sendStatus(400)
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      const userId = session.metadata?.userId
      const storyType = session.metadata?.storyType || null
      const purchaseType = session.metadata?.purchaseType || 'single_story'

      console.log('Payment successful for user:', userId)

      if (userId) {
        let accessRows = []

        if (purchaseType === 'single_text') {
          accessRows = [
            {
              user_id: userId,
              access_type: 'story',
              story_type: storyType,
            },
            {
              user_id: userId,
              access_type: 'export',
              variant: 'text_only',
            },
          ]
        } else if (purchaseType === 'single_images') {
          accessRows = [
            {
              user_id: userId,
              access_type: 'story',
              story_type: storyType,
            },
            {
              user_id: userId,
              access_type: 'export',
              variant: 'with_images',
            },
          ]
        } else if (purchaseType === 'all_text') {
          accessRows = [
            {
              user_id: userId,
              access_type: 'story',
              story_type: 'all',
            },
            {
              user_id: userId,
              access_type: 'export',
              variant: 'text_only',
            },
          ]
        } else if (purchaseType === 'all_images') {
          accessRows = [
            {
              user_id: userId,
              access_type: 'story',
              story_type: 'all',
            },
            {
              user_id: userId,
              access_type: 'export',
              variant: 'with_images',
            },
            {
      user_id: userId,
      access_type: 'print',
      variant: 'premium',
    },
          ]
        }

        const { error } = await supabaseAdmin.from('user_access').upsert(accessRows, {
          onConflict: 'user_id,access_type,story_type,variant',
        })

        if (error) {
          console.error('Supabase error:', error.message)
        } else {
          console.log('Access granted')
        }
      }
      // Tribute video payment — no user account needed
const product = session.metadata?.product
if (product === 'tribute-video') {
  console.log('Tribute video payment received for:', session.metadata?.subject_name)
  // No database update needed — payment confirmation is handled client-side
  // via the Stripe success URL redirect
}
    }

    res.json({ received: true })
  }
)

app.use(express.json())

app.post('/verify-turnstile', express.json(), async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ success: false, error: 'Missing token' })
    }

    const result = await verifyTurnstileToken(token, req.ip)
    console.log('Turnstile siteverify result:', result)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Turnstile verification failed',
        details: result['error-codes'] || [],
      })
    }

    return res.json({ success: true })
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return res.status(500).json({ success: false, error: 'Verification failed' })
  }
})

app.post('/create-print-checkout', async (req, res) => {
  try {
    const { userId, storyId, storyTitle, quantity = 1 } = req.body

    if (!userId || !storyId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Keepsake Printed Book — ${storyTitle}`,
              description: '6×9 softcover, printed and shipped by Lulu Press. Delivered in 10-14 days.',
            },
            unit_amount: 2499,
          },
          quantity,
        },
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'UK Shipping — Royal Mail 2nd Class',
            },
            unit_amount: 499,
          },
          quantity: 1,
        },
      ],
      success_url: `${FRONTEND_URL}/dashboard?print=success&story=${storyId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${FRONTEND_URL}/dashboard?print=cancelled`,
      metadata: {
        userId,
        storyId,
        purchaseType: 'printed_book',
        quantity:     String(quantity),
      },
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Print checkout error:', err)
    res.status(500).json({ error: 'Failed to create checkout' })
  }
})

app.get('/list-models', async (req, res) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
  )
  const data = await response.json()
  res.json(data)
})
// ─── ADD THIS BLOCK to server.js ──────────────────────────────────────────────
// Place it just before the error handler at the bottom (before app.use((err...))
// Also add GEMINI_API_KEY to your Render environment variables

app.post('/writing-assist', async (req, res) => {
  try {
    const { question, answer, mode } = req.body

    if (!question || !answer || answer.trim().length < 5) {
      return res.status(400).json({ error: 'Question and answer are required' })
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'Writing assist not configured' })
    }

   const prompt = mode === 'start'
  ? `You are a gentle, warm writing coach helping someone write their life story.

They are answering this question in their keepsake book:
"${question}"

They haven't written anything yet. Give them 3 short, specific prompts to help them get started — but NOT to write it for them.

Rules:
- Each prompt is a gentle question or memory jogger, 1 sentence max
- Keep the tone warm and personal, like a caring friend helping them think
- Do NOT write their answer for them
- Return ONLY a JSON array of 3 strings, no other text`

  : `You are a gentle, warm writing coach helping someone write their life story.

The person is answering this question in their keepsake book:
"${question}"

Their answer so far:
"${answer}"

Give them 3 short, specific prompts to help them add more in their own words. Reference something specific from their answer. Do NOT rewrite it for them.

Rules:
- Each prompt is a gentle question or suggestion, 1 sentence max
- Warm and personal tone
- Return ONLY a JSON array of 3 strings, no other text`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 300,
  }),
})

if (!response.ok) {
  const err = await response.text()
  console.error('Groq error:', err)
  return res.status(500).json({ error: 'Writing assist failed' })
}

const data = await response.json()
const raw = data.choices?.[0]?.message?.content || '[]'
const cleaned = raw.replace(/```json|```/g, '').trim()
const suggestions = JSON.parse(cleaned)

if (!Array.isArray(suggestions)) {
  return res.status(500).json({ error: 'Unexpected response format' })
}

res.json({ suggestions })

 } catch (err) {
  console.error('Writing assist error:', err.message, err.stack)
  res.status(500).json({ error: err.message }) // return real error temporarily
}
})

app.post('/create-tribute-checkout', async (req, res) => {
  try {
    const { name, successUrl, cancelUrl } = req.body

    if (!name || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1TUCM6R13CJL70CC423pQvkK',
          quantity: 1,
        },
      ],
      success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        product: 'tribute-video',
        subject_name: name,
      },
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Tribute checkout error:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

app.post('/verify-tribute-payment', async (req, res) => {
  try {
    const { sessionId } = req.body

    if (!sessionId) {
      return res.status(400).json({ verified: false, error: 'Missing session ID' })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Check payment is complete and it's a tribute video
    if (
      session.payment_status === 'paid' &&
      session.metadata?.product === 'tribute-video'
    ) {
      return res.json({ verified: true })
    }

    return res.json({ verified: false })

  } catch (error) {
    console.error('Payment verification error:', error)
    return res.status(500).json({ verified: false, error: 'Verification failed' })
  }
})

app.post('/lulu-shipping-cost', async (req, res) => {
  try {
    const token = await getLuluAccessToken()

    const response = await fetch(`${LULU_API_URL}/print-job-cost-calculations/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(req.body),
    })

    const text = await response.text()
    console.log('Lulu shipping cost response:', response.status, text.slice(0, 300))

    let data
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error(`Lulu shipping cost non-JSON: ${text.slice(0, 200)}`)
    }

    res.status(response.status).json(data)

  } catch (err) {
    console.error('Lulu shipping cost error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-shipping-options', async (req, res) => {
  try {
    const token = await getLuluAccessToken()

    const response = await fetch(`${LULU_API_URL}/shipping-options/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })

    const text = await response.text()
    console.log('Shipping options response:', response.status, text.slice(0, 500))

    let data
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error(`Shipping options non-JSON: ${text.slice(0, 200)}`)
    }

    res.status(response.status).json(data)

  } catch (err) {
    console.error('Shipping options error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-print-job', async (req, res) => {
  try {
    const token = await getLuluAccessToken()

    // Transform to Lulu's expected format
    const body = req.body
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
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(transformedBody),
    })

    const text = await response.text()
    console.log('Lulu print job raw response:', response.status, text.slice(0, 500))

    let data
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error(`Lulu returned non-JSON: ${text.slice(0, 200)}`)
    }

    if (!response.ok) {
      console.error('Lulu print job rejected:', JSON.stringify(data))
    } else {
      console.log('Lulu print job created:', data.id)
    }

    res.status(response.status).json(data)

  } catch (err) {
    console.error('Lulu print job error:', err.message)
    res.status(500).json({ error: err.message })
  }
})
 
// ─── Get print job status ─────────────────────────────────────────────────────
 
app.get('/lulu-print-job-status/:id', async (req, res) => {
  try {
    const token = await getLuluAccessToken()
 
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
 
// ─── Cancel print job ─────────────────────────────────────────────────────────
 
app.post('/lulu-test-job', async (req, res) => {
  try {
    const token = await getLuluAccessToken()

    // Test with Lulu's own sample PDF
    const testPayload = {
      contact_email: 'mark@tellmeyourstory.uk',
      external_id: 'test-001',
      line_items: [
        {
          title: 'Test Book',
          interior: {
            source_url: 'https://jeyybcdnmezivjuvmmcu.supabase.co/storage/v1/object/public/story-exports/print-orders/1b595e55-7fe9-429c-ab0e-0e761e3d718c/0411757e-8df2-40d0-904d-f8432f148237-interior-1778379201693.pdf'
          },
          cover: {
            source_url: 'https://jeyybcdnmezivjuvmmcu.supabase.co/storage/v1/object/public/story-exports/print-orders/1b595e55-7fe9-429c-ab0e-0e761e3d718c/0411757e-8df2-40d0-904d-f8432f148237-interior-1778379201693.pdf'
          },
          pod_package_id: '0600X0900.FC.STD.PB.060UW444.MXX',
          page_count: 28,
          quantity: 1,
        },
      ],
      production_delay: 120,
      shipping_address: {
        name: 'Mark Griffiths',
        street1: '38 Botley Gardens',
        street2: '',
        city: 'Southampton',
        state_code: '',
        postcode: 'SO19 0SW',
        country_code: 'GB',
        phone_number: '07720617444',
        email: 'mark@tellmeyourstory.uk',
      },
      shipping_level: 'GROUND',
    }

    const response = await fetch(`${LULU_API_URL}/print-jobs/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    })

    const text = await response.text()
    console.log('Test job response:', response.status, text.slice(0, 1000))
    res.status(response.status).send(text)

  } catch (err) {
    console.error('Test job error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-validate-interior', async (req, res) => {
  try {
    const token = await getLuluAccessToken()

    // Step 1 — submit for validation
    const submitResponse = await fetch(`${LULU_API_URL}/validate-interior/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url: 'https://jeyybcdnmezivjuvmmcu.supabase.co/storage/v1/object/public/story-exports/print-orders/1b595e55-7fe9-429c-ab0e-0e761e3d718c/0411757e-8df2-40d0-904d-f8432f148237-interior-1778379201693.pdf',
      }),
    })

    const submitText = await submitResponse.text()
    console.log('Validation submit:', submitResponse.status, submitText)

    if (!submitResponse.ok) {
      return res.status(submitResponse.status).send(submitText)
    }

    const submitData = JSON.parse(submitText)
    const validationId = submitData.id

    // Step 2 — wait 8 seconds then poll result
    await new Promise(resolve => setTimeout(resolve, 8000))

    const resultResponse = await fetch(
      `${LULU_API_URL}/validate-interior/${validationId}/`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )

    const resultText = await resultResponse.text()
    console.log('Validation result:', resultResponse.status, resultText)
    res.status(resultResponse.status).send(resultText)

  } catch (err) {
    console.error('Validation error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-cover-dimensions', async (req, res) => {
  try {
    const token = await getLuluAccessToken()
    const { interior_page_count = 28, pod_package_id = '0600X0900.FC.STD.PB.060UW444.MXX' } = req.body

    const response = await fetch(`${LULU_API_URL}/cover-dimensions/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pod_package_id: '0600X0900.FC.STD.PB.060UW444.MXX',
        interior_page_count: 28,
        unit: 'mm',
      }),
    })

    const text = await response.text()
    console.log('Cover dimensions:', response.status, text)
    res.status(response.status).send(text)

  } catch (err) {
    console.error('Cover dimensions error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-validate-cover', async (req, res) => {
  try {
    const token = await getLuluAccessToken()

    const { source_url, interior_page_count = 36 } = req.body

    const submitResponse = await fetch(`${LULU_API_URL}/validate-cover/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url,
        pod_package_id: '0600X0900.FC.STD.PB.060UW444.MXX',
        interior_page_count,
      }),
    })

    const submitText = await submitResponse.text()
    console.log('Cover validation submit:', submitResponse.status, submitText)
    if (!submitResponse.ok) return res.status(submitResponse.status).send(submitText)

    const { id } = JSON.parse(submitText)

    await new Promise(resolve => setTimeout(resolve, 15000))

    const resultResponse = await fetch(`${LULU_API_URL}/validate-cover/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })

    const resultText = await resultResponse.text()
    console.log('Cover validation result:', resultText)
    res.status(resultResponse.status).send(resultText)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/lulu-print-job-cancel/:id', async (req, res) => {
  try {
    const token = await getLuluAccessToken()
 
    const response = await fetch(`${LULU_API_URL}/print-jobs/${req.params.id}/`, {
      method:  'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
 
    res.status(response.status).json({ cancelled: response.ok })
 
  } catch (err) {
    console.error('Lulu cancel error:', err.message)
    res.status(500).json({ error: 'Failed to cancel print job' })
  }
})

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, storyType, projectId, purchaseType } = req.body

    if (!priceId || !userId || !projectId) {
      return res.status(400).json({ error: 'Missing required checkout data' })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${FRONTEND_URL}/story/${projectId}?payment=success`,
      cancel_url: `${FRONTEND_URL}/story/${projectId}?payment=cancelled`,
      metadata: {
        userId,
        storyType: storyType || '',
        projectId: projectId || '',
        purchaseType: purchaseType || '',
      },
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Checkout session error:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

app.use((err, req, res, next) => {
  console.error('Express error:', err.message)
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function verifyTurnstileToken(token, remoteIp) {
  const formData = new URLSearchParams()
  formData.append('secret', process.env.TURNSTILE_SECRET_KEY)
  formData.append('response', token)

  if (remoteIp) {
    formData.append('remoteip', remoteIp)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  return response.json()
}

async function getLuluAccessToken() {
  const response = await fetch(
    'https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.LULU_CLIENT_KEY,
        client_secret: process.env.LULU_CLIENT_SECRET,
      }).toString(),
    }
  )

  const text = await response.text()
  console.log('Lulu auth response:', response.status, text.slice(0, 200))

  if (!response.ok) {
    throw new Error(`Lulu auth failed: ${response.status} ${text.slice(0, 200)}`)
  }

  const data = JSON.parse(text)
  return data.access_token
}