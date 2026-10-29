/**
 * storyImageUrls.ts — keeping signed image URLs alive
 *
 * Images live in the private `story-images` bucket, so every URL is a signed
 * one that expires after 7 days. We store those signed URLs in the database
 * (story_projects.cover_image_url and story_images.image_url), which means a
 * stored URL goes stale a week after it was created.
 *
 * Until now only the story editor refreshed them. The dashboard rendered the
 * stored URL directly, so covers showed as broken images until you opened the
 * story and came back — and a book exported from the dashboard came out with
 * no photos in it at all, because its own copy of getAllImagesForExport
 * skipped the refresh.
 *
 * This module is the single place that handles it. Both the dashboard and the
 * editor should use these rather than keeping their own versions.
 */

import { supabase } from './supabase'

const BUCKET = 'story-images'
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7   // 7 days
const REFRESH_THRESHOLD_SECONDS = 60 * 60 * 24    // refresh when under 1 day left

export function extractStoragePath(signedUrl: string): string | null {
  try {
    const match = signedUrl.match(/\/object\/sign\/story-images\/(.+?)\?/)
    return match ? decodeURIComponent(match[1]) : null
  } catch {
    return null
  }
}

export function isUrlExpiredOrExpiringSoon(signedUrl: string): boolean {
  try {
    const url = new URL(signedUrl)
    const token = url.searchParams.get('token')
    if (!token) return true

    const payload = JSON.parse(atob(token.split('.')[1]))
    const expiresAt: number = payload.exp
    if (!expiresAt) return true

    return expiresAt - Math.floor(Date.now() / 1000) < REFRESH_THRESHOLD_SECONDS
  } catch {
    return true
  }
}

/**
 * Mint fresh signed URLs for several paths in one request.
 * Returns a map of storage path -> signed URL. Paths that fail are left out.
 */
async function signPaths(paths: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  if (!paths.length) return out

  const unique = Array.from(new Set(paths))

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(unique, SIGNED_URL_TTL_SECONDS)

  if (error || !data) {
    console.error('Could not sign image URLs:', error?.message)
    return out
  }

  for (const row of data) {
    // Supabase returns { path, signedUrl, error } per entry
    if (row?.signedUrl && row?.path) out.set(row.path, row.signedUrl)
  }

  return out
}

/**
 * Refresh any expired cover URLs across a list of stories, in one batch.
 *
 * Mutates each story's cover_image_url in place so the dashboard re-renders,
 * and writes the new URL back so the next page load is already correct.
 */
export async function refreshStoryCovers(
  stories: Array<{ id: string; cover_image_url?: string | null }>,
): Promise<void> {
  const stale = stories.filter(
    (s) => s.cover_image_url && isUrlExpiredOrExpiringSoon(s.cover_image_url),
  )
  if (!stale.length) return

  const pathByStory = new Map<string, string>()
  for (const story of stale) {
    const path = extractStoragePath(story.cover_image_url as string)
    if (path) pathByStory.set(story.id, path)
  }

  const signed = await signPaths([...pathByStory.values()])
  if (!signed.size) return

  await Promise.all(
    [...pathByStory.entries()].map(async ([storyId, path]) => {
      const fresh = signed.get(path)
      if (!fresh) return

      const story = stories.find((s) => s.id === storyId)
      if (story) story.cover_image_url = fresh

      const { error } = await supabase
        .from('story_projects')
        .update({ cover_image_url: fresh })
        .eq('id', storyId)

      if (error) console.error('Cover URL save failed:', storyId, error.message)
    }),
  )
}

/**
 * Every image for a project, newest per section, with expired URLs refreshed.
 *
 * This is what the export and print paths must use. The dashboard previously
 * had its own version without the refresh, which is why books printed more
 * than a week after the photos were added came out without them.
 */
export async function getProjectImagesForExport(projectId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('story_images')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Image load error:', error.message)
    return []
  }

  // Newest row wins for each section
  const latestBySection = new Map<string, any>()
  for (const row of data || []) {
    if (!latestBySection.has(row.section_id)) latestBySection.set(row.section_id, row)
  }
  const images = Array.from(latestBySection.values())

  const stale = images.filter((i) => i.image_url && isUrlExpiredOrExpiringSoon(i.image_url))
  if (!stale.length) return images

  const pathByImage = new Map<string, string>()
  for (const img of stale) {
    const path = extractStoragePath(img.image_url)
    if (path) pathByImage.set(img.id, path)
  }

  const signed = await signPaths([...pathByImage.values()])

  await Promise.all(
    [...pathByImage.entries()].map(async ([imageId, path]) => {
      const fresh = signed.get(path)
      if (!fresh) return

      const img = images.find((i) => i.id === imageId)
      if (img) img.image_url = fresh

      const { error } = await supabase
        .from('story_images')
        .update({ image_url: fresh })
        .eq('id', imageId)

      if (error) console.error('Image URL save failed:', imageId, error.message)
    }),
  )

  return images
}
