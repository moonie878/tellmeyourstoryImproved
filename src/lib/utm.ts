export type UtmData = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

const STORAGE_KEY = 'tmys_utm_data'

export function getUtmParamsFromUrl(): UtmData {
  const params = new URLSearchParams(window.location.search)

  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
  }
}

export function hasAnyUtmParams(data: UtmData): boolean {
  return Object.values(data).some(Boolean)
}

export function saveUtmData(data: UtmData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getSavedUtmData(): UtmData | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getCurrentUtmData(): UtmData | null {
  const fromUrl = getUtmParamsFromUrl()

  if (hasAnyUtmParams(fromUrl)) {
    saveUtmData(fromUrl)
    return fromUrl
  }

  return getSavedUtmData()
}