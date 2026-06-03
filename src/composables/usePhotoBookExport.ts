import jsPDF from 'jspdf'
import { supabase } from '../lib/supabase'
import type { StoryImage } from '../types/story'

// A4 portrait dimensions in mm
const PAGE_WIDTH  = 210
const PAGE_HEIGHT = 297
const MARGIN      = 12

export function usePhotoBookExport() {

  async function loadImageAsBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width  = img.naturalWidth  || img.width
        canvas.height = img.naturalHeight || img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) { reject(new Error('Canvas context failed')); return }
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
      img.src = url
    })
  }

  // Fetch sections ordered by order_index so images appear in story order
  async function getSectionOrder(storyType: string): Promise<Map<string, number>> {
    const { data, error } = await supabase
      .from('story_sections')
      .select('id, order_index')
      .eq('story_type', storyType)
      .order('order_index', { ascending: true })

    if (error || !data) return new Map()
    return new Map(data.map((s: any) => [s.id, s.order_index]))
  }

  async function exportPhotoBookAsBlob(   
    storyType: string,
    coverImageUrl: string,
    getAllImagesForExport: () => Promise<StoryImage[]>
  ): Promise<Blob> {

    const doc = new jsPDF({
      orientation: 'portrait',
      unit:        'mm',
      format:      'a4',
    })

    const images      = await getAllImagesForExport()
    const sectionOrder = await getSectionOrder(storyType)

    // Sort images by section order_index — unsectioned images go last
    const sorted = [...images].sort((a, b) => {
      const aIdx = a.section_id ? (sectionOrder.get(a.section_id) ?? 9999) : 9999
      const bIdx = b.section_id ? (sectionOrder.get(b.section_id) ?? 9999) : 9999
      return aIdx - bIdx
    })

    // Build ordered list — cover image first if present
    const orderedUrls: string[] = []
    if (coverImageUrl) orderedUrls.push(coverImageUrl)
    for (const img of sorted) {
      if (img.image_url) orderedUrls.push(img.image_url)
    }

    if (orderedUrls.length === 0) {
      // Return a minimal valid PDF if no images
      return doc.output('blob')
    }

    let isFirstPage = true

    for (const url of orderedUrls) {
      try {
        const imgData = await loadImageAsBase64(url)

        const el = new Image()
        el.src = imgData

        await new Promise<void>((resolve, reject) => {
          el.onload  = () => resolve()
          el.onerror = () => reject(new Error('Image load failed'))
        })

        if (!isFirstPage) doc.addPage()
        isFirstPage = false

        // Fill page background white
        doc.setFillColor(255, 255, 255)
        doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')

        // Calculate image dimensions to fit within the page with margin
        const maxW = PAGE_WIDTH  - MARGIN * 2
        const maxH = PAGE_HEIGHT - MARGIN * 2

        let imgW = el.naturalWidth  || el.width
        let imgH = el.naturalHeight || el.height

        const ratio = Math.min(maxW / imgW, maxH / imgH)
        imgW *= ratio
        imgH *= ratio

        // Centre on page
        const x = (PAGE_WIDTH  - imgW) / 2
        const y = (PAGE_HEIGHT - imgH) / 2

        doc.addImage(imgData, 'PNG', x, y, imgW, imgH)

      } catch (err) {
        console.error('Photo book image render error:', err)
        // Skip failed images silently
      }
    }

    return doc.output('blob')
  }

  return { exportPhotoBookAsBlob }
}