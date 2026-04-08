import type { Ref } from 'vue'
import { supabase } from '../lib/supabase'
import type { StoryImage, StoryProject, StorySection } from '../types/story'

type UseStoryImagesArgs = {
  projectId: string
  project: Ref<StoryProject | null>
  currentSection: Ref<StorySection | null>
  currentImageUrl: Ref<string>
  currentImagePreview: Ref<string>
  imageUploadStatus: Ref<string>
  coverImageUrl: Ref<string>
  coverImageStatus: Ref<string>
}

export function useStoryImages({
  projectId,
  project,
  currentSection,
  currentImageUrl,
  currentImagePreview,
  imageUploadStatus,
  coverImageUrl,
  coverImageStatus,
}: UseStoryImagesArgs) {
  function clearCurrentImagePreview() {
    if (currentImagePreview.value.startsWith('blob:')) {
      URL.revokeObjectURL(currentImagePreview.value)
    }

    currentImageUrl.value = ''
    currentImagePreview.value = ''
  }

  function clearCurrentImageState() {
    if (currentImagePreview.value && currentImagePreview.value.startsWith('blob:')) {
      URL.revokeObjectURL(currentImagePreview.value)
    }

    currentImageUrl.value = ''
    currentImagePreview.value = ''
    imageUploadStatus.value = ''
  }

  async function handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file || !currentSection.value) return

    imageUploadStatus.value = 'Uploading...'
    currentImagePreview.value = URL.createObjectURL(file)

    const fileExt = file.name.split('.').pop()
    const fileName = `${projectId}/${currentSection.value.id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('story-images')
      .upload(fileName, file, {
        upsert: true,
      })

    if (uploadError) {
      currentImagePreview.value = currentImageUrl.value || ''
      imageUploadStatus.value = `Upload failed: ${uploadError.message}`
      console.error('Storage upload error:', uploadError)
      return
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('story-images')
      .createSignedUrl(fileName, 60 * 60 * 24 * 7)

    if (signedUrlError) {
      currentImagePreview.value = currentImageUrl.value || ''
      imageUploadStatus.value = `Signed URL failed: ${signedUrlError.message}`
      console.error('Signed URL error:', signedUrlError)
      return
    }

    const imageUrl = signedUrlData?.signedUrl

    if (!imageUrl) {
      currentImagePreview.value = currentImageUrl.value || ''
      imageUploadStatus.value = 'Could not generate image URL.'
      return
    }

    const { error: dbError } = await supabase.from('story_images').upsert(
      [
        {
          project_id: projectId,
          section_id: currentSection.value.id,
          image_url: imageUrl,
        },
      ],
      {
        onConflict: 'project_id,section_id',
      }
    )

    if (dbError) {
      currentImagePreview.value = currentImageUrl.value || ''
      imageUploadStatus.value = `Database save failed: ${dbError.message}`
      console.error('Story image DB error:', dbError)
      return
    }

    currentImageUrl.value = imageUrl
    currentImagePreview.value = imageUrl
    imageUploadStatus.value = 'Uploaded'

    setTimeout(() => {
      if (imageUploadStatus.value === 'Uploaded') {
        imageUploadStatus.value = ''
      }
    }, 1500)
  }

  async function loadCurrentSectionImage() {
    if (!currentSection.value) {
      clearCurrentImageState()
      return
    }

    const { data, error } = await supabase
      .from('story_images')
      .select('*')
      .eq('project_id', projectId)
      .eq('section_id', currentSection.value.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error(error.message)
      clearCurrentImageState()
      return
    }

    if (!data) {
      clearCurrentImageState()
      return
    }

    currentImageUrl.value = data.image_url || ''
    currentImagePreview.value = data.image_url || ''
  }

  async function getAllImagesForExport(): Promise<StoryImage[]> {
    const { data, error } = await supabase
      .from('story_images')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Image load error:', error.message)
      return []
    }

    const latestBySection = new Map<string, StoryImage>()

    for (const row of (data || []) as StoryImage[]) {
      if (!latestBySection.has(row.section_id)) {
        latestBySection.set(row.section_id, row)
      }
    }

    return Array.from(latestBySection.values())
  }

  async function loadImageAsBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth || img.width
        canvas.height = img.naturalHeight || img.height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not create canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL('image/png')
        resolve(dataUrl)
      }

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`))
      }

      img.src = url
    })
  }

  async function removeCurrentImage() {
    if (!currentSection.value) return

    const confirmed = window.confirm('Remove this image from the current question?')
    if (!confirmed) return

    clearCurrentImagePreview()

    const { error } = await supabase
      .from('story_images')
      .delete()
      .eq('project_id', projectId)
      .eq('section_id', currentSection.value.id)
      .select()

    if (error) {
      imageUploadStatus.value = `Remove failed: ${error.message}`
      console.error('Remove image error:', error)
      return
    }

    clearCurrentImageState()
    await loadCurrentSectionImage()
    imageUploadStatus.value = 'Image removed'

    setTimeout(() => {
      if (imageUploadStatus.value === 'Image removed') {
        imageUploadStatus.value = ''
      }
    }, 1500)
  }

  async function handleCoverImageUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file || !project.value) return

    coverImageStatus.value = 'Uploading...'

    const fileExt = file.name.split('.').pop()
    const fileName = `covers/${projectId}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('story-images')
      .upload(fileName, file, {
        upsert: true,
      })

    if (uploadError) {
      coverImageStatus.value = `Upload failed: ${uploadError.message}`
      return
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('story-images')
      .createSignedUrl(fileName, 60 * 60 * 24 * 7)

    if (signedUrlError) {
      coverImageStatus.value = `Signed URL failed: ${signedUrlError.message}`
      return
    }

    const imageUrl = signedUrlData?.signedUrl

    if (!imageUrl) {
      coverImageStatus.value = 'Could not generate cover image URL.'
      return
    }

    const { error: updateError } = await supabase
      .from('story_projects')
      .update({
        cover_image_url: imageUrl,
      })
      .eq('id', projectId)

    if (updateError) {
      coverImageStatus.value = `Save failed: ${updateError.message}`
      return
    }

    coverImageUrl.value = imageUrl
    coverImageStatus.value = 'Uploaded'

    setTimeout(() => {
      if (coverImageStatus.value === 'Uploaded') {
        coverImageStatus.value = ''
      }
    }, 1500)
  }

  return {
    handleImageUpload,
    loadCurrentSectionImage,
    getAllImagesForExport,
    loadImageAsBase64,
    removeCurrentImage,
    handleCoverImageUpload,
    clearCurrentImagePreview,
    clearCurrentImageState,
  }
}