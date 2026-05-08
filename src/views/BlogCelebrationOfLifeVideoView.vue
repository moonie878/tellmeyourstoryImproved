<template>
  <main class="bg-white">

    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow">Tell Me Your Story · Guide</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-4xl md:text-5xl">
          How to Create a Celebration of Life Video
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C534E] sm:text-lg">
          A complete guide to creating a video that celebrates a life fully lived — joyful, personal, and something the family can keep forever.
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-[#8C847E]">
          <span>By Mark, Founder of Tell Me Your Story</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
      </div>
    </section>

    <article class="px-5 py-12 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-2xl">

        <div class="founder-note">
          <p class="founder-text">
            A celebration of life is different from a traditional funeral. The emphasis is on joy — on everything the person brought into the world, rather than the grief of their leaving it. The video you create for a celebration of life should reflect that.
          </p>
          <p class="founder-text mt-4">
            This guide covers everything: how a celebration of life video differs from a standard tribute slideshow, what to include, how to make it feel genuinely celebratory, and how to create one for free.
          </p>
        </div>

        <h2 class="article-h2 mt-12">What is a celebration of life video?</h2>
        <p class="article-p">
          A celebration of life video is a tribute video created for a celebration of life service — an informal, often joyful gathering held in someone's memory, which may or may not include traditional funeral elements.
        </p>
        <p class="article-p mt-4">
          Unlike a traditional funeral slideshow, a celebration of life video tends to be warmer, more personal, and more uplifting. It might include funny photos, music the person genuinely loved rather than something solemn, and moments that make people laugh as well as cry.
        </p>
        <p class="article-p mt-4">
          Celebrations of life are becoming increasingly common in the UK — particularly for people who specified they didn't want a traditional funeral, for younger people whose families want something that reflects their personality, and for families who want to gather after a cremation or private burial for a more personal goodbye.
        </p>

        <h2 class="article-h2 mt-12">How a celebration of life video differs from a funeral slideshow</h2>

        <div class="mt-6 overflow-hidden rounded-2xl border border-[#E8DDD0]">
          <div class="grid grid-cols-2 bg-[#FAF7F4] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8C847E]">
            <span>Funeral Slideshow</span>
            <span>Celebration of Life Video</span>
          </div>
          <div v-for="row in comparisonRows" :key="row.funeral" class="grid grid-cols-2 border-t border-[#F0EBE3] px-5 py-3 text-sm">
            <span class="text-[#5C534E]">{{ row.funeral }}</span>
            <span class="text-[#1C1917] font-medium">{{ row.celebration }}</span>
          </div>
        </div>

        <h2 class="article-h2 mt-12">What to include in a celebration of life video</h2>

        <div class="mt-6 space-y-4">
          <div class="tip-card">
            <p class="tip-title">Photos that show their personality</p>
            <p class="tip-desc">Not just formal portraits — photos of them laughing, doing something ridiculous, on a favourite holiday, with friends, at a party. Anything that captures who they actually were rather than how they looked in their best clothes.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Their favourite music</p>
            <p class="tip-desc">For a celebration of life, you have more latitude with music. If they loved something upbeat, use it. If they had a signature song that everyone who knew them will immediately recognise — that's the one. The goal is to make people smile through their tears, not just cry.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">A tribute that sounds like them</p>
            <p class="tip-desc">Write the tribute in a way that captures their voice — their sense of humour, their turns of phrase, the things they always said. A celebration of life tribute can include funny stories, affectionate teasing, and warmth that a formal funeral tribute wouldn't usually allow.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Photos from across their friendships</p>
            <p class="tip-desc">A celebration of life often brings together people from different circles — work friends, old school friends, neighbours, family. Photos from across those different worlds help everyone in the room feel included and remembered.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">A moment of genuine joy</p>
            <p class="tip-desc">Every celebration of life video should have at least one photo or moment that makes people laugh out loud. The permission to laugh — really laugh — at a memorial is one of the most healing things there is.</p>
          </div>
        </div>

        <!-- Mid CTA -->
        <div class="mt-10 rounded-3xl bg-[#F5F0E8] px-6 py-8 text-center">
          <p class="text-sm font-medium text-[#1C1917]">Create your celebration of life video</p>
          <p class="mt-2 text-sm text-[#5C534E]">Upload photos, add their favourite music, preview free. Download for £9.99 — no account needed.</p>
          <router-link to="/tribute" class="mt-4 inline-block rounded-full bg-[#1C1917] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Start your free video →
          </router-link>
        </div>

        <h2 class="article-h2 mt-12">How to make a celebration of life video — step by step</h2>

        <div class="mt-6 space-y-4">
          <div class="step-item-card">
            <div class="step-num">1</div>
            <div>
              <p class="tip-title">Gather photos from everyone who knew them</p>
              <p class="tip-desc mt-1">Create a shared iCloud or Google Photos album and send the link to family and friends. Ask people to add their favourite photos. You'll get a much richer collection than you'd find on your own — photos from parts of their life you never saw.</p>
            </div>
          </div>
          <div class="step-item-card">
            <div class="step-num">2</div>
            <div>
              <p class="tip-title">Choose 15-25 photos that tell the whole story</p>
              <p class="tip-desc mt-1">Select photos from across their life — childhood to recent. Prioritise photos that show personality and joy over formal portraits. Put them in roughly chronological order.</p>
            </div>
          </div>
          <div class="step-item-card">
            <div class="step-num">3</div>
            <div>
              <p class="tip-title">Choose music that was genuinely theirs</p>
              <p class="tip-desc mt-1">Upload their favourite song as an MP3, or choose a track from our curated selection. For a celebration of life, something with warmth and life tends to work better than something purely melancholic.</p>
            </div>
          </div>
          <div class="step-item-card">
            <div class="step-num">4</div>
            <div>
              <p class="tip-title">Write a tribute that sounds like them</p>
              <p class="tip-desc mt-1">Keep it honest, specific, and warm. Include a detail only people who knew them well would recognise — a habit, a saying, a memory. That specificity is what makes people feel close to the person, rather than just sad about their absence.</p>
            </div>
          </div>
          <div class="step-item-card">
            <div class="step-num">5</div>
            <div>
              <p class="tip-title">Preview free — download for £9.99</p>
              <p class="tip-desc mt-1">Use our free tribute video creator at tellmeyourstory.uk/tribute. Preview the full video for free, then download the HD version for £9.99 when you're happy. No account needed.</p>
            </div>
          </div>
        </div>

        <h2 class="article-h2 mt-12">How to show a celebration of life video</h2>
        <p class="article-p">
          A celebration of life is usually more informal than a funeral service, which gives you more options for how and when to show the video.
        </p>

        <div class="mt-6 space-y-4">
          <div class="tip-card">
            <p class="tip-title">On a loop as people arrive</p>
            <p class="tip-desc">Playing the video on a loop as guests arrive sets a warm, reflective tone and gives people something to gather around and talk about as they reconnect with people they haven't seen for years.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">As a dedicated moment during the gathering</p>
            <p class="tip-desc">Gather everyone together for a few minutes to watch the video as a shared experience. This creates a focal point of collective emotion — one of the most powerful moments you can create at any memorial gathering.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">On a TV or laptop in the corner</p>
            <p class="tip-desc">For a more informal celebration, simply have the video playing quietly on a screen in the corner of the room. People will drift toward it, watch together, and talk about the photos they recognise.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Send it to everyone afterwards</p>
            <p class="tip-desc">Share the MP4 file with everyone who attended — and everyone who couldn't. Upload it to a private YouTube link or a shared Google Drive folder. For many people, watching it again in private, at their own pace, will be one of the most meaningful moments of their grief.</p>
          </div>
        </div>

        <h2 class="article-h2 mt-12">Capture their story — not just their photos</h2>
        <p class="article-p">
          A celebration of life video captures how someone looked. But a life story captures who they were.
        </p>
        <p class="article-p mt-4">
          If you're holding a celebration of life for someone who has passed — and you have other loved ones still with you — this is the moment that tends to make people think: I need to do this while I still can.
        </p>
        <p class="article-p mt-4">
          Tell Me Your Story's life story tool guides a parent or grandparent through 100 questions across 10 chapters of their life — from their earliest memories to what they want to be remembered for. Every answer is saved automatically and turns into a beautifully designed keepsake book.
        </p>
        <p class="article-p mt-4">
          It's free to start. And the conversations it creates are ones families remember long after the keepsake book itself.
        </p>

        <!-- Quote -->
        <div class="mt-12 rounded-3xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-8 text-center">
          <p class="font-display text-xl italic leading-relaxed text-[#5C534E]">
            "She told me about a dress she saved up for three months to buy. I never knew that about her."
          </p>
          <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
        </div>

        <!-- Internal links -->
        <div class="mt-10 rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-5">
          <p class="text-sm font-medium text-[#1C1917]">Related guides</p>
          <div class="mt-3 flex flex-col gap-2 text-sm">
            <router-link to="/tribute" class="text-[#7C5C3B] hover:underline">→ Create a free celebration of life video — our free tool</router-link>
            <router-link to="/blog/how-to-make-a-memorial-tribute-video" class="text-[#7C5C3B] hover:underline">→ How to make a memorial tribute video for a funeral</router-link>
            <router-link to="/blog/funeral-slideshow-ideas" class="text-[#7C5C3B] hover:underline">→ Funeral slideshow ideas — what to include</router-link>
            <router-link to="/blog/free-memorial-slideshow-maker" class="text-[#7C5C3B] hover:underline">→ Free memorial slideshow maker UK</router-link>
            <router-link to="/blog/questions-to-ask-your-parents" class="text-[#7C5C3B] hover:underline">→ 100 questions to ask your parents before it's too late</router-link>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-12 rounded-3xl bg-[#1C1917] px-6 py-10 sm:px-8 sm:py-12 text-center">
          <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tell Me Your Story</p>
          <h3 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Create a celebration of life video today</h3>
          <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
            Upload their photos, add their music, and create something beautiful — free to preview, £9.99 to download. No account needed, ready in minutes.
          </p>
          <div class="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#9C7C5C]">
            <span>✦ Free to preview</span>
            <span>✦ Upload your own music</span>
            <span>✦ No account needed</span>
          </div>
          <router-link to="/tribute" class="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
            Create your free video →
          </router-link>
        </div>

        <div class="mt-10 border-t border-stone-100 pt-8">
          <router-link to="/" class="text-sm text-[#7C5C3B] hover:underline">← Back to Tell Me Your Story</router-link>
        </div>

      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const comparisonRows = [
  { funeral: 'Solemn and formal tone', celebration: 'Warm, joyful, personal' },
  { funeral: 'Traditional music choices', celebration: 'Their actual favourite music' },
  { funeral: 'Formal portrait photos', celebration: 'Photos that show personality' },
  { funeral: 'Structured service setting', celebration: 'Informal gathering' },
  { funeral: 'Focus on loss', celebration: 'Focus on the life lived' },
  { funeral: 'Typically played once', celebration: 'Often played on a loop' },
]

useSeo({
  title: 'How to Create a Celebration of Life Video | Tell Me Your Story',
  description: 'A complete guide to creating a celebration of life video — what to include, how to make it personal and joyful, and how to show it at the service. Free to preview, £9.99 to download.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'How to Create a Celebration of Life Video',
        description: 'A complete guide to creating a celebration of life video — what to include, how to make it personal and joyful, and how to show it at the gathering.',
        author: { '@type': 'Person', name: 'Mark', url: 'https://tellmeyourstory.uk' },
        publisher: {
          '@type': 'Organization',
          name: 'Tell Me Your Story',
          url: 'https://tellmeyourstory.uk',
          logo: { '@type': 'ImageObject', url: 'https://tellmeyourstory.uk/logo/logo-full-new.png' },
        },
        datePublished: '2026-05-08',
        dateModified: '2026-05-08',
        url: 'https://tellmeyourstory.uk/blog/celebration-of-life-video',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://tellmeyourstory.uk/blog/celebration-of-life-video' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a celebration of life video?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A celebration of life video is a tribute video created for a celebration of life service — an informal, often joyful gathering held in someone\'s memory. Unlike a traditional funeral slideshow, it tends to be warmer, more personal, and more uplifting, often using the person\'s favourite music and photos that show their personality rather than formal portraits.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I create a celebration of life video for free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can create and preview a celebration of life video for free at tellmeyourstory.uk/tribute. Upload up to 30 photos, add a tribute message, choose music (or upload your own MP3), and preview the full video at no cost. Download the HD version without watermark for £9.99 — no account needed.',
            },
          },
          {
            '@type': 'Question',
            name: 'What music should I use for a celebration of life?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For a celebration of life, use music that was genuinely meaningful to the person — their favourite song, something from their era, or music associated with happy memories. Unlike a traditional funeral, a celebration of life allows for more uplifting or even joyful music choices that reflect the person\'s personality.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is a celebration of life video different from a funeral slideshow?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A celebration of life video is typically warmer and more personal than a funeral slideshow. It uses the person\'s actual favourite music rather than traditional funeral music, includes photos that show their personality rather than formal portraits, and takes a more joyful tone that focuses on the life lived rather than the grief of losing them.',
            },
          },
        ],
      },
    ],
  },
})
</script>

<style scoped>

main { font-family: 'DM Sans', sans-serif; }
.font-display { font-family: 'Playfair Display', Georgia, serif; }
.eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #8C847E; }
.founder-note { border-left: 3px solid #7C5C3B; padding: 20px 24px; background: #FAF7F4; border-radius: 0 16px 16px 0; }
.founder-text { font-size: 15px; line-height: 1.8; color: #3C3530; }
.article-h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem; font-weight: 700; color: #1C1917; line-height: 1.3; }
.article-p { font-size: 15px; line-height: 1.8; color: #3C3530; }
.tip-card { border: 1px solid #E8DDD0; border-radius: 16px; padding: 16px 20px; background: white; }
.tip-title { font-size: 14px; font-weight: 600; color: #1C1917; }
.tip-desc { font-size: 13px; line-height: 1.6; color: #78716C; margin-top: 4px; }
.step-item-card { display: flex; gap: 16px; align-items: flex-start; border: 1px solid #E8DDD0; border-radius: 16px; padding: 16px 20px; background: white; }
.step-num { width: 28px; height: 28px; border-radius: 50%; background: #1C1917; color: white; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
</style>