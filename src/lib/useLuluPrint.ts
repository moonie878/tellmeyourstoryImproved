/**
 * useLuluPrint.ts
 * Lulu Print API integration for Tell Me Your Story
 *
 * Setup:
 *   1. Create account at https://developers.lulu.com/
 *   2. Sandbox account at https://developers.sandbox.lulu.com/
 *   3. Add to .env:
 *      VITE_LULU_CLIENT_KEY=your_client_key
 *      VITE_LULU_CLIENT_SECRET=your_client_secret
 */

import { ref } from 'vue'
import { supabase } from './supabase'

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

interface LuluToken {
  access_token: string
  expires_at: number
}

const LULU_BASE_URL = import.meta.env.DEV
  ? 'https://api.sandbox.lulu.com'
  : 'https://api.lulu.com'

const LULU_AUTH_URL = import.meta.env.DEV
  ? 'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token'
  : 'https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token'

const LULU_CLIENT_KEY    = import.meta.env.VITE_LULU_CLIENT_KEY    as string
const LULU_CLIENT_SECRET = import.meta.env.VITE_LULU_CLIENT_SECRET as string

// 6x9 full colour perfect bind softcover — your book spec
const LULU_POD_PACKAGE_ID = '0600X0900FCSTDPB060UW444MXX'

let cachedToken: LuluToken | null = null

async function getLuluToken(): Promise<string> {
  if (cachedToken && cachedToken.expires_at > Date.now() + 60_000) {
    return cachedToken.access_token
  }
  const credentials = btoa(`${LULU_CLIENT_KEY}:${LULU_CLIENT_SECRET}`)
  const response = await fetch(LULU_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials',
  })
  if (!response.ok) throw new Error(`Lulu auth failed: ${response.status}`)
  const data = await response.json()
  cachedToken = { access_token: data.access_token, expires_at: Date.now() + data.expires_in * 1000 }
  return cachedToken.access_token
}

// Upload a blob to Supabase storage and return the public URL
async function uploadBlob(blob: Blob, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from('story-exports')
    .upload(path, blob, { contentType: 'application/pdf', upsert: true })
  if (error) throw new Error(`Upload failed: ${error.message}`)
  const { data: { publicUrl } } = supabase.storage.from('story-exports').getPublicUrl(path)
  return publicUrl
}

export async function getLuluShippingCost(
  pageCount: number,
  shippingAddress: ShippingAddress,
  quantity = 1
): Promise<{ print_cost: number; shipping_cost: number; total: number }> {
  const token = await getLuluToken()
  const response = await fetch(`${LULU_BASE_URL}/print-job-cost-calculations/`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      line_items: [{ pod_package_id: LULU_POD_PACKAGE_ID, page_count: pageCount, quantity }],
      shipping_address: {
        name: shippingAddress.name, street1: shippingAddress.street1,
        street2: shippingAddress.street2 || '', city: shippingAddress.city,
        state_code: shippingAddress.state || '', postcode: shippingAddress.postcode,
        country_code: shippingAddress.country_code, phone_number: shippingAddress.phone_number,
        email: shippingAddress.email,
      },
      shipping_option: 'MAIL',
    }),
  })
  if (!response.ok) throw new Error(`Cost calc failed: ${response.status}`)
  const data = await response.json()
  const printCost    = parseFloat(data.line_items?.[0]?.cost_excl_discounts || '0')
  const shippingCost = parseFloat(data.shipping_cost?.cost_excl_tax || '0')
  return { print_cost: printCost, shipping_cost: shippingCost, total: printCost + shippingCost }
}

export function useLuluPrint() {
  const isOrdering  = ref(false)
  const orderStatus = ref('')
  const error       = ref('')
  const printJobId  = ref('')

  async function orderPrintedBook(
    interiorBlob: Blob,        // interior pages PDF
    coverBlob: Blob,           // wrap-around cover PDF
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
    error.value       = ''
    printJobId.value  = ''

    try {
      const ts = Date.now()

      // 1. Upload both PDFs to Supabase storage
      orderStatus.value = 'Uploading interior…'
      const interiorUrl = await uploadBlob(
        interiorBlob,
        `print-orders/${userId}/${storyId}-interior-${ts}.pdf`
      )

      orderStatus.value = 'Uploading cover…'
      const coverUrl = await uploadBlob(
        coverBlob,
        `print-orders/${userId}/${storyId}-cover-${ts}.pdf`
      )

      // 2. Create Lulu print job with separate interior + cover URLs
      orderStatus.value = 'Sending to print…'
      const token = await getLuluToken()

      const response = await fetch(`${LULU_BASE_URL}/print-jobs/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_email: shippingAddress.email,
          external_id: stripePaymentId,
          line_items: [
            {
              title: storyTitle,
              interior: { source_url: interiorUrl },
              cover: { source_url: coverUrl },
              pod_package_id: LULU_POD_PACKAGE_ID,
              page_count: pageCount,
              quantity,
            },
          ],
          production_delay: 120,
          shipping_address: {
            name: shippingAddress.name, street1: shippingAddress.street1,
            street2: shippingAddress.street2 || '', city: shippingAddress.city,
            state_code: shippingAddress.state || '', postcode: shippingAddress.postcode,
            country_code: shippingAddress.country_code, phone_number: shippingAddress.phone_number,
            email: shippingAddress.email,
          },
          shipping_option: 'MAIL',
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(`Print job failed: ${JSON.stringify(data)}`)

      const luluPrintJobId = String(data.id)
      const status = data.status?.name || 'CREATED'
      printJobId.value  = luluPrintJobId
      orderStatus.value = 'Order placed!'

      // 3. Save to Supabase
      await supabase.from('print_orders').insert({
        user_id: userId, story_id: storyId,
        lulu_print_job_id: luluPrintJobId, status,
        shipping_name: shippingAddress.name, shipping_street1: shippingAddress.street1,
        shipping_street2: shippingAddress.street2 || null, shipping_city: shippingAddress.city,
        shipping_postcode: shippingAddress.postcode, shipping_country: shippingAddress.country_code,
        quantity, amount_charged: amountCharged, created_at: new Date().toISOString(),
      })

      return { success: true, lulu_print_job_id: luluPrintJobId, status }

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      error.value       = message
      orderStatus.value = 'Failed'
      console.error('Lulu print order error:', err)
      return { success: false, error: message }
    } finally {
      isOrdering.value = false
    }
  }

  async function getPrintJobStatus(luluPrintJobId: string) {
    const token = await getLuluToken()
    const response = await fetch(`${LULU_BASE_URL}/print-jobs/${luluPrintJobId}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) throw new Error(`Status check failed: ${response.status}`)
    const data = await response.json()
    return {
      status: data.status?.name || 'UNKNOWN',
      tracking_id: data.tracking_id,
      tracking_url: data.tracking_url,
      estimated_shipping_date: data.estimated_shipping_date,
    }
  }

  async function cancelPrintJob(luluPrintJobId: string): Promise<boolean> {
    const token = await getLuluToken()
    const response = await fetch(`${LULU_BASE_URL}/print-jobs/${luluPrintJobId}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    return response.ok
  }

  return { isOrdering, orderStatus, error, printJobId, orderPrintedBook, getPrintJobStatus, cancelPrintJob }
}