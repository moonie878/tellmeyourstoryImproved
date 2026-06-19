// useLuluCoverDimensions.ts
//
// Fetches the exact cover width/height Lulu expects for a given
// pod_package_id + page count, via our backend proxy at /lulu-cover-dimensions
// (which calls Lulu's real /cover-dimensions/ endpoint).
//
// This MUST be called before generateCoverPDF() for hardcover/case wrap and
// dust jacket bindings — hardcoded fallback dimensions drift out of sync
// with Lulu's actual requirements (hardcover adds a wrap allowance on top
// of the standard bleed/spine math that softcover uses), and Lulu will
// reject the PDF if the dimensions are outside their accepted tolerance.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export interface LuluCoverDimensions {
  width_mm: number
  height_mm: number
  spine_mm?: number
  unit?: string
}

export async function fetchLuluCoverDimensions(
  podPackageId: string,
  pageCount: number
): Promise<LuluCoverDimensions> {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL — cannot fetch Lulu cover dimensions')
  }

  const response = await fetch(`${API_BASE_URL}/lulu-cover-dimensions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pod_package_id: podPackageId,
      interior_page_count: pageCount,
    }),
  })

  const text = await response.text()

  if (!response.ok) {
    console.error('Lulu cover dimensions request failed:', text)
    throw new Error(`Could not fetch cover dimensions from Lulu (status ${response.status})`)
  }

  let data: any
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(`Lulu cover dimensions returned non-JSON: ${text.slice(0, 200)}`)
  }

  // Lulu's response shape may use slightly different key names depending on
  // API version — normalise to width_mm/height_mm regardless of source format.
  const width = data.width_mm ?? data.width ?? data.cover_width_mm
  const height = data.height_mm ?? data.height ?? data.cover_height_mm
  const spine = data.spine_mm ?? data.spine_width_mm ?? data.spine_width

  if (!width || !height) {
    console.error('Unexpected Lulu cover-dimensions response shape:', data)
    throw new Error('Lulu cover dimensions response did not include width/height')
  }

  return {
    width_mm: Number(width),
    height_mm: Number(height),
    spine_mm: spine ? Number(spine) : undefined,
    unit: data.unit || 'mm',
  }
}