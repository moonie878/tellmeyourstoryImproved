import { computed } from 'vue'

export function usePremium(userAccess: any) {

  const hasStoryAccess = (storyType: string) => {
    return userAccess.value.some(
      (item: any) =>
        item.access_type === 'story' &&
        (item.story_type === storyType || item.story_type === 'all')
    )
  }

  const hasAllStories = computed(() =>
    userAccess.value.some(
      (item: any) =>
        item.access_type === 'story' &&
        item.story_type === 'all'
    )
  )

  const hasImageExport = computed(() =>
    userAccess.value.some(
      (item: any) =>
        item.access_type === 'export' &&
        item.variant === 'with_images'
    )
  )

  const hasTextExport = computed(() =>
    userAccess.value.some(
      (item: any) =>
        item.access_type === 'export' &&
        item.variant === 'text_only'
    )
  )

  const isTier4 = computed(() => hasAllStories.value && hasImageExport.value)

  const currentPlan = computed(() => {
    if (hasAllStories.value && hasImageExport.value) return 'tier4'
    if (hasAllStories.value && hasTextExport.value) return 'tier3'
    if (!hasAllStories.value && hasImageExport.value) return 'tier2'
    if (!hasAllStories.value && hasTextExport.value) return 'tier1'
    return 'free'
  })

  return {
    hasStoryAccess,
    hasAllStories,
    hasImageExport,
    hasTextExport,
    isTier4,
    currentPlan,
  }
}