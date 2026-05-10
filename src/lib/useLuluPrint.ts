/**
 * useLuluPrint.ts
 * Lulu Print API integration for Tell Me Your Story
 *
 * All Lulu API calls are proxied through your Express backend to avoid CORS
 * and to keep LULU_CLIENT_KEY and LULU_CLIENT_SECRET secure on the server.
 *
 * Backend endpoints required (add to your Express server):
 *   POST /lulu-shipping-cost
 *   POST /lulu-print-job
 *   GET  /lulu-print-job-status/:id
 *   POST /lulu-print-job-cancel/:id
 *
 * Backend env vars required:
 *   LULU_CLIENT_KEY=your_production_key
 *   LULU_CLIENT_SECRET=your_production_secret
 *
 * Frontend env var required:
 *   VITE_API_URL=https://your-backend.com
 */

import { ref } from 'vue'
import { supabase } from './supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShippingAddress {
  name: string
  street1: string
  street2?: string
  city: string
  state?: string
  postcode: string
  country_code: string
  phone_number: string
  email: string
}

export interface PrintOrderResult {
  success: boolean
  lulu_print_job_id?: string
  status?: string
  error?: string
}

// ─── Config ───────────────────────────────────────────────────────────────────

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL as string

// 6x9 full colour perfect bind softcover
const LULU_POD_PACKAGE_ID = '0600X0900.FC.STD.PB.060UW444.MXX'

// ─── Upload PDF blob to Supabase storage ──────────────────────────────────────

async function uploadBlob(blob: Blob, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from('story-exports')
    .upload(path, blob, { contentType: 'application/pdf', upsert: true })

  if (error) throw new Error(`Upload failed: ${error.message}`)

  const { data: { publicUrl } } = supabase.storage
    .from('story-exports')
    .getPublicUrl(path)

  return publicUrl
}

// ─── Get shipping cost estimate ────────────────────────────────────────────────

export async function getLuluShippingCost(
  pageCount: number,
  shippingAddress: ShippingAddress,
  quantity = 1
): Promise<{ print_cost: number; shipping_cost: number; total: number }> {

  const response = await fetch(`${BACKEND_URL}/lulu-shipping-cost`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      line_items: [
        {
          pod_package_id: LULU_POD_PACKAGE_ID,
          page_count: pageCount,
          quantity,
        },
      ],
      shipping_address: {
        name:         shippingAddress.name,
        street1:      shippingAddress.street1,
        street2:      shippingAddress.street2 || '',
        city:         shippingAddress.city,
        state_code:   shippingAddress.state || '',
        postcode:     shippingAddress.postcode,
        country_code: shippingAddress.country_code,
        phone_number: shippingAddress.phone_number,
        email:        shippingAddress.email,
      },
      shipping_level: 'MAIL',
    }),
  })

  if (!response.ok) throw new Error(`Shipping cost failed: ${response.status}`)

  const data = await response.json()
  const printCost    = parseFloat(data.line_items?.[0]?.cost_excl_discounts || '0')
  const shippingCost = parseFloat(data.shipping_cost?.cost_excl_tax || '0')

  return {
    print_cost:    printCost,
    shipping_cost: shippingCost,
    total:         printCost + shippingCost,
  }
}

// ─── Main composable ──────────────────────────────────────────────────────────

export function useLuluPrint() {
  const isOrdering  = ref(false)
  const orderStatus = ref('')
  const printJobId  = ref('')

  async function orderPrintedBook(
    interiorBlob: Blob,
    coverBlob: Blob,
    pageCount: number,
    storyTitle: string,
    storyId: string,
    userId: string,
    shippingAddress: ShippingAddress,
    stripePaymentId: string,
    quantity = 1,
    amountCharged = 0
  ): Promise<PrintOrderResult> {

    isOrdering.value  = true
    orderStatus.value = 'Uploading your book…'
    printJobId.value  = ''

    try {
      const ts = Date.now()

      // 1. Upload interior PDF to Supabase storage
      orderStatus.value = 'Uploading interior…'
      const interiorUrl = await uploadBlob(
        interiorBlob,
        `print-orders/${userId}/${storyId}-interior-${ts}.pdf`
      )

      // 2. Upload cover PDF to Supabase storage
      orderStatus.value = 'Uploading cover…'
      const coverUrl = await uploadBlob(
        coverBlob,
        `print-orders/${userId}/${storyId}-cover-${ts}.pdf`
      )

      // 3. Create print job via backend proxy
      orderStatus.value = 'Sending to print…'

      const response = await fetch(`${BACKEND_URL}/lulu-print-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_email: shippingAddress.email,
          external_id:   stripePaymentId,
          line_items: [
            {
              title:          storyTitle,
              interior:       { source_url: interiorUrl },
              cover:          { source_url: coverUrl },
              pod_package_id: LULU_POD_PACKAGE_ID,
              page_count:     pageCount,
              quantity,
            },
          ],
          production_delay: 120,
          shipping_address: {
            name:         shippingAddress.name,
            street1:      shippingAddress.street1,
            street2:      shippingAddress.street2 || '',
            city:         shippingAddress.city,
            state_code:   shippingAddress.state || '',
            postcode:     shippingAddress.postcode,
            country_code: shippingAddress.country_code,
            phone_number: shippingAddress.phone_number,
            email:        shippingAddress.email,
          },
          shipping_level: 'MAIL',
        }),
      })

      const responseText = await response.text()
console.log('Lulu raw response:', response.status, responseText)

let data: any
try {
  data = JSON.parse(responseText)
} catch {
  throw new Error(`Print job failed with non-JSON response: ${responseText}`)
}

if (!response.ok) {
  throw new Error(`Print job failed: ${JSON.stringify(data)}`)
}

      const luluPrintJobId = String(data.id)
      const status         = data.status?.name || 'CREATED'

      printJobId.value  = luluPrintJobId
      orderStatus.value = 'Order placed!'

      // 4. Save order to Supabase
      await supabase.from('print_orders').insert({
        user_id:           userId,
        story_id:          storyId,
        lulu_print_job_id: luluPrintJobId,
        status,
        shipping_name:     shippingAddress.name,
        shipping_street1:  shippingAddress.street1,
        shipping_street2:  shippingAddress.street2 || null,
        shipping_city:     shippingAddress.city,
        shipping_postcode: shippingAddress.postcode,
        shipping_country:  shippingAddress.country_code,
        quantity,
        amount_charged:    amountCharged,
        created_at:        new Date().toISOString(),
      })

      return { success: true, lulu_print_job_id: luluPrintJobId, status }

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      orderStatus.value = 'Failed'
      console.error('Lulu print order error:', err)
      return { success: false, error: message }

    } finally {
      isOrdering.value = false
    }
  }

  async function getPrintJobStatus(luluPrintJobId: string) {
    const response = await fetch(
      `${BACKEND_URL}/lulu-print-job-status/${luluPrintJobId}`
    )
    if (!response.ok) throw new Error(`Status check failed: ${response.status}`)
    return response.json()
  }

  async function cancelPrintJob(luluPrintJobId: string): Promise<boolean> {
    const response = await fetch(
      `${BACKEND_URL}/lulu-print-job-cancel/${luluPrintJobId}`,
      { method: 'POST' }
    )
    return response.ok
  }

  return {
    isOrdering,
    orderStatus,
    printJobId,
    orderPrintedBook,
    getPrintJobStatus,
    cancelPrintJob,
  }
}