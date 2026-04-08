import { computed, type Ref } from 'vue'


type CurrentPlan = 'free' | 'tier1' | 'tier2' | 'tier3' | 'tier4'

export function useStoryAccess(
  hasCurrentStoryAccess: Ref<boolean>,
  hasAllStoriesAccess: Ref<boolean>,
  hasImageExportAccess: Ref<boolean>,
  isPaidUser: Ref<boolean>
) {
  const hasTextExportAccess = computed(() => {
    return isPaidUser.value && !hasImageExportAccess.value
  })

  const currentPlan = computed<CurrentPlan>(() => {
    if (hasAllStoriesAccess.value && hasImageExportAccess.value) return 'tier4'
    if (hasAllStoriesAccess.value && hasTextExportAccess.value) return 'tier3'
    if (hasCurrentStoryAccess.value && hasImageExportAccess.value) return 'tier2'
    if (hasCurrentStoryAccess.value && hasTextExportAccess.value) return 'tier1'
    return 'free'
  })

  const hasTier4Access = computed(() => {
    return hasAllStoriesAccess.value && hasImageExportAccess.value
  })

  const showTier1 = computed(() => currentPlan.value === 'free')

  const showTier2 = computed(() => {
    return currentPlan.value === 'free' || currentPlan.value === 'tier1'
  })

  const showTier3 = computed(() => {
    return (
      currentPlan.value === 'free' ||
      currentPlan.value === 'tier1' ||
      currentPlan.value === 'tier2'
    )
  })

  const showTier4 = computed(() => {
    return currentPlan.value !== 'tier4'
  })

  const recommendedUpgrade = computed<'tier2' | 'tier4' | null>(() => {
    if (currentPlan.value === 'free') return 'tier2'
    if (currentPlan.value === 'tier1') return 'tier2'
    if (currentPlan.value === 'tier2') return 'tier4'
    if (currentPlan.value === 'tier3') return 'tier4'
    return null
  })

  const recommendedUpgradeText = computed(() => {
    return recommendedUpgrade.value === 'tier2'
      ? 'Upgrade to include photos in your finished keepsake.'
      : recommendedUpgrade.value === 'tier4'
        ? 'Upgrade to unlock the full premium keepsake experience, with design options, images, and all story types.'
        : ''
  })

  const upgradeMessage = computed(() => {
    if (currentPlan.value === 'free') {
      return 'Start one story for free, or unlock the full keepsake experience with premium export options.'
    }

    if (currentPlan.value === 'tier1') {
      return 'Add images and premium design options to turn this story into a more personal keepsake.'
    }

    if (currentPlan.value === 'tier2') {
      return 'You already have images for this story. Upgrade to unlock all story types and your full premium keepsake experience.'
    }

    if (currentPlan.value === 'tier3') {
      return 'You already have all stories unlocked. Add premium layouts, images, and design options to create your finished keepsake books.'
    }

    return ''
  })

  const currentPlanLabel = computed(() => {
    if (currentPlan.value === 'tier1') return 'Tier 1 — Single Story'
    if (currentPlan.value === 'tier2') return 'Tier 2 — Single Story + Images'
    if (currentPlan.value === 'tier3') return 'Tier 3 — All Stories'
    if (currentPlan.value === 'tier4') return 'Tier 4 — Premium Keepsake'
    return 'Free'
  })

  return {
    hasTextExportAccess,
    currentPlan,
    hasTier4Access,
    showTier1,
    showTier2,
    showTier3,
    showTier4,
    recommendedUpgrade,
    recommendedUpgradeText,
    upgradeMessage,
    currentPlanLabel,
  }
}