import type { Ref } from 'vue'
import type { StoryProject, StorySection } from '../types/story'
import { track } from '../lib/analytics'


type SaveCurrentAnswerFn = () => Promise<void>

type StartCheckoutArgs = {
  priceId: string
  purchaseType: string
}

export function useStoryCheckout(
  checkoutLoading: Ref<boolean>,
  projectId: string,
  project: Ref<StoryProject | null>,
  hasAllStoriesAccess: Ref<boolean>,
  saveCurrentAnswerBeforeCheckout: SaveCurrentAnswerFn
) {
  async function startCheckout({ priceId, purchaseType }: StartCheckoutArgs) {
    if (checkoutLoading.value) return

    checkoutLoading.value = true
    await saveCurrentAnswerBeforeCheckout()

    try {
      const {
        data: { user },
      } = await import('../lib/supabase').then(({ supabase }) => supabase.auth.getUser())

      if (!user) {
        checkoutLoading.value = false
        alert('You must be logged in to upgrade.')
        return
      }

      const response = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          storyType: project.value?.story_type || null,
          projectId,
          purchaseType,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
        return
      }

      checkoutLoading.value = false
      alert('Could not start checkout.')
    } catch (error) {
      console.error('Checkout error:', error)
      checkoutLoading.value = false
      alert('Could not start checkout.')
    }
  }

  async function upgradeSingleText() {
    track('upgrade_clicked', {
    type: 'tier1',
    projectId,
  })
    await startCheckout({
      priceId: 'price_1THQFlJONQh8J4EOYm7qpCPs',
      purchaseType: 'single_text',
    })
  }

  async function upgradeSingleImages() {
    track('upgrade_clicked', {
    type: 'tier2',
    projectId,
  })
    await startCheckout({
      priceId: 'price_1THKudJONQh8J4EO5of6l5Qy',
      purchaseType: 'single_images',
    })
  }

  async function upgradeAllText() {
    track('upgrade_clicked', {
    type: 'tier3',
    projectId,
  })
    await startCheckout({
      priceId: 'price_1THQG7JONQh8J4EOQXdJb2fX',
      purchaseType: 'all_text',
    })
  }

  async function upgradeAllImages() {
    track('upgrade_clicked', {
    type: 'tier4',
    projectId,
  })
    await startCheckout({
      priceId: 'price_1THQGMJONQh8J4EOTS8GyW4B',
      purchaseType: 'all_images',
    })
  }

  async function upgradeWithImages() {
    const purchaseType = hasAllStoriesAccess.value ? 'all_images' : 'single_images'
    const priceId = hasAllStoriesAccess.value
      ? 'price_1THQGMJONQh8J4EOTS8GyW4B'
      : 'price_1THKudJONQh8J4EO5of6l5Qy'

    await startCheckout({
      priceId,
      purchaseType,
    })
  }

  return {
    startCheckout,
    upgradeSingleText,
    upgradeSingleImages,
    upgradeAllText,
    upgradeAllImages,
    upgradeWithImages,
  }
}