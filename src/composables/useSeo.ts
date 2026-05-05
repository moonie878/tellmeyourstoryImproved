import { onMounted, onUnmounted, watchEffect } from 'vue'

type SeoOptions = {
  title: string
  description: string
  ogImage?: string
  schema?: object
}

export function useSeo(options: SeoOptions) {
  let schemaTag: HTMLScriptElement | null = null

 const apply = () => {
  document.title = options.title

  // Meta description
  let descriptionTag = document.querySelector('meta[name="description"]')
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }
  descriptionTag.setAttribute('content', options.description)

  // Open Graph tags
  const ogTags: Record<string, string> = {
    'og:title': options.title,
    'og:description': options.description,
    'og:type': 'website',
    'og:site_name': 'Tell Me Your Story',
    'og:image': options.ogImage ?? 'https://tellmeyourstory.uk/logo/tell-me-your-story-logo.png',
    'og:url': window.location.href,
    'twitter:card': 'summary_large_image',
    'twitter:title': options.title,
    'twitter:description': options.description,
    'twitter:image': options.ogImage ?? 'https://tellmeyourstory.uk/logo/tell-me-your-story-logo.png',
  }

  for (const [property, content] of Object.entries(ogTags)) {
    const attr = property.startsWith('twitter:') ? 'name' : 'property'
    let tag = document.querySelector(`meta[${attr}="${property}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(attr, property)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  // Schema
  if (options.schema) {
    if (!schemaTag) {
      schemaTag = document.createElement('script')
      schemaTag.setAttribute('type', 'application/ld+json')
      schemaTag.id = 'seo-schema'
      document.head.appendChild(schemaTag)
    }
    schemaTag.textContent = JSON.stringify(options.schema)
  }
}

  onMounted(apply)
  watchEffect(apply)

  onUnmounted(() => {
    if (schemaTag) {
      schemaTag.remove()
      schemaTag = null
    }
  })
}