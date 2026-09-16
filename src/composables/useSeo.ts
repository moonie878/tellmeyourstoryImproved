import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, watchEffect } from 'vue'

type SeoOptions = {
  title: string
  description: string
   canonical?: string  // add this
  ogImage?: string
  schema?: object
}

export function useSeo(options: SeoOptions) {
  let schemaTag: HTMLScriptElement | null = null

 const apply = () => {
  document.title = options.title

// Canonical
if (options.canonical) {
  let canonicalTag = document.querySelector('link[rel="canonical"]')
  if (!canonicalTag) {
    canonicalTag = document.createElement('link')
    canonicalTag.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalTag)
  }
  canonicalTag.setAttribute('href', options.canonical)
}

  // Meta description
  let descriptionTag = document.querySelector('meta[name="description"]')
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }
  descriptionTag.setAttribute('content', options.description)
const route = useRoute()
  const SITE_ORIGIN = 'https://tellmeyourstory.uk'
const ogUrl = `${SITE_ORIGIN}${route.path}`

  // Open Graph tags
  const ogTags: Record<string, string> = {
    'og:title': options.title,
    'og:description': options.description,
    'og:type': 'website',
    'og:site_name': 'Tell Me Your Story',
    'og:image': options.ogImage ?? 'https://tellmeyourstory.uk/images/example-story-hero-cover.jpg',
    'og:url': ogUrl,
    'twitter:card': 'summary_large_image',
    'twitter:title': options.title,
    'twitter:description': options.description,
    'twitter:image': options.ogImage ?? 'https://tellmeyourstory.uk/images/example-story-hero-cover.jpg',
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