const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const app = express()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

app.use(cors())

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
    }

    res.json({ received: true })
  }
)

app.use(express.json())

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, storyType, projectId, purchaseType } = req.body

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/story/${projectId}?payment=success`,
      cancel_url: `http://localhost:5173/story/${projectId}?payment=cancelled`,
      metadata: {
        userId,
        storyType: storyType || '',
        projectId: projectId || '',
        purchaseType: purchaseType || '',
      },
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})