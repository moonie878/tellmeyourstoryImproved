import { onMounted, watchEffect } from 'vue'

type SeoOptions = {
  title: string
  description: string
}

export function useSeo(options: SeoOptions) {
  const apply = () => {
    document.title = options.title

    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.setAttribute('name', 'description')
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.setAttribute('content', options.description)
  }

  onMounted(apply)
  watchEffect(apply)
}