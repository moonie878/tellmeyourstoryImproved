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

const BACKEND_URL     = import.meta.env.VITE_API_BASE_URL as string
const POD_PACKAGE_ID  = '0600X0900.FC.STD.PB.060UW444.MXX'

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
  shippingLevel = 'MAIL',
  quantity = 1,
  amountCharged = 0,
  podPackageId = POD_PACKAGE_ID,   // ← add this, defaults to softcover
   photoBookBlob: Blob | null = null   // ← add this
): Promise<PrintOrderResult> {

    isOrdering.value  = true
    orderStatus.value = 'Uploading your book…'
    printJobId.value  = ''

    try {
      const ts = Date.now()

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

      // Upload photo book interior if bundle
let photoBookUrl: string | null = null
if (photoBookBlob) {
  orderStatus.value = 'Uploading photo book…'
  photoBookUrl = await uploadBlob(
    photoBookBlob,
    `print-orders/${userId}/${storyId}-photobook-${ts}.pdf`
  )
}

// Build line items
const lineItems: any[] = [
  {
    title:          storyTitle,
    interior:       { source_url: interiorUrl },
    cover:          { source_url: coverUrl },
    pod_package_id: podPackageId,
    page_count:     pageCount,
    quantity,
  },
]

if (photoBookUrl) {
  lineItems.push({
    title:          `${storyTitle} — Photo Book`,
    interior:       { source_url: photoBookUrl },
    cover:          { source_url: coverUrl },   // reuse same cover
   pod_package_id: '0600X0900.FC.PRE.PB.060UW444.MXX',
    page_count:     pageCount,                  // approximate — Lulu will validate
    quantity,
  })
}

      orderStatus.value = 'Sending to print…'

      const response = await fetch(`${BACKEND_URL}/lulu-print-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_email: shippingAddress.email,
          external_id:   stripePaymentId,
          line_items: lineItems,
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
          shipping_level: shippingLevel,
        }),
      })

      const responseText = await response.text()
      console.log('Lulu print job response:', response.status, responseText.slice(0, 300))

      let data: any
      try {
        data = JSON.parse(responseText)
      } catch {
        throw new Error(`Lulu returned non-JSON: ${responseText.slice(0, 200)}`)
      }

      if (!response.ok) {
        throw new Error(`Print job failed: ${JSON.stringify(data)}`)
      }

      const luluPrintJobId = String(data.id)
      const status         = data.status?.name || 'CREATED'

      printJobId.value  = luluPrintJobId
      orderStatus.value = 'Order placed!'

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
    const response = await fetch(`${BACKEND_URL}/lulu-print-job-status/${luluPrintJobId}`)
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

  return { isOrdering, orderStatus, printJobId, orderPrintedBook, getPrintJobStatus, cancelPrintJob }
}