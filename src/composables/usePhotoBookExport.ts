import jsPDF from 'jspdf'
import { supabase } from '../lib/supabase'
import type { StoryImage } from '../types/story'

// A4 portrait dimensions in mm
const PAGE_WIDTH  = 210
const PAGE_HEIGHT = 297
const MARGIN      = 12

// Lulu minimum page count for premium color perfect bound
const MIN_PAGES = 32

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

    const images       = await getAllImagesForExport()
    const sectionOrder = await getSectionOrder(storyType)

    const sorted = [...images].sort((a, b) => {
      const aIdx = a.section_id ? (sectionOrder.get(a.section_id) ?? 9999) : 9999
      const bIdx = b.section_id ? (sectionOrder.get(b.section_id) ?? 9999) : 9999
      return aIdx - bIdx
    })

    const orderedUrls: string[] = []
    if (coverImageUrl) orderedUrls.push(coverImageUrl)
    for (const img of sorted) {
      if (img.image_url) orderedUrls.push(img.image_url)
    }

    let renderedPages = 0
    let isFirstPage   = true

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

        doc.setFillColor(255, 255, 255)
        doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')

        const maxW = PAGE_WIDTH  - MARGIN * 2
        const maxH = PAGE_HEIGHT - MARGIN * 2

        let imgW = el.naturalWidth  || el.width
        let imgH = el.naturalHeight || el.height

        const ratio = Math.min(maxW / imgW, maxH / imgH)
        imgW *= ratio
        imgH *= ratio

        const x = (PAGE_WIDTH  - imgW) / 2
        const y = (PAGE_HEIGHT - imgH) / 2

        doc.addImage(imgData, 'PNG', x, y, imgW, imgH)
        renderedPages++

      } catch (err) {
        console.error('Photo book image render error:', err)
      }
    }

    // Pad to Lulu minimum 32 pages
    if (renderedPages < MIN_PAGES) {
      const pagesToAdd = MIN_PAGES - renderedPages

      for (let i = 0; i < pagesToAdd; i++) {
        if (renderedPages === 0 && i === 0) {
          doc.setFillColor(255, 255, 255)
          doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')
        } else {
          doc.addPage()
          doc.setFillColor(255, 255, 255)
          doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')
        }
      }

      console.log(`Photo book: added ${pagesToAdd} blank pages to reach Lulu minimum of ${MIN_PAGES}`)
    }

    console.log(`Photo book: ${renderedPages} image pages, ${Math.max(renderedPages, MIN_PAGES)} total`)

    return doc.output('blob')
  }

  return { exportPhotoBookAsBlob }
}