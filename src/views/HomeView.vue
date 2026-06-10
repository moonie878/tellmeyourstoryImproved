<template>
  <main class="home bg-[#F5F0E8] text-[#1C1917]">

    <!-- Father's Day banner — remove after 15 June 2026 -->
<div class="bg-[#1C1917] px-4 py-3 text-center">
  <p class="text-sm text-[#C4A882]">
    🎁 Father's Day — 50% off all gift tiers ·
    <router-link to="/fathers-day" class="font-semibold text-white underline hover:no-underline">
      Give Dad the gift of his story →
    </router-link>
  </p>
</div>
    <!-- ═══════════════════════════════════════ -->
    <!-- HERO                                    -->
    <!-- ═══════════════════════════════════════ -->
    <section class="hero relative overflow-hidden px-5 pb-0 pt-20 sm:px-8 sm:pt-28 md:pt-32">
      <div class="grain"></div>
      <div class="hero-circle"></div>

      <div class="relative mx-auto max-w-6xl">
        <div class="grid items-center gap-12 md:grid-cols-2 md:gap-16">

          <!-- Left — text -->
          <div class="hero-text pb-12 text-center md:text-left">
            <div class="eyebrow">
              <span class="eyebrow-dot"></span>
              Preserve a loved one's story
            </div>

            <h1 class="mt-5 font-display text-[2.6rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-5xl md:text-[3.6rem]">
              Turn memories into a keepsake
              <em class="italic text-[#7C5C3B]">worth holding forever</em>
            </h1>

            <p class="mx-auto mt-6 max-w-lg text-base leading-[1.8] text-[#5C534E] sm:text-lg md:mx-0">
              Answer guided questions about someone you love — by typing or speaking. Add photos, capture their voice, and create a beautiful keepsake book with QR codes that let family hear their stories aloud.
            </p>

            <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <router-link to="/register" @click="trackStart" class="btn-primary">
                Start your story — it's free
              </router-link>
              <router-link to="/example" @click="trackExampleStory" class="btn-secondary">
                See an example
              </router-link>
            </div>

            <div class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#8C847E] md:justify-start">
              <span class="flex items-center gap-1.5"><span class="check">✓</span> No subscription</span>
              <span class="flex items-center gap-1.5"><span class="check">✓</span> Free to start</span>
              <span class="flex items-center gap-1.5"><span class="check">✓</span> Voice answers supported</span>
            </div>
          </div>

          <!-- Right — hero image -->
          <div class="hero-image-wrap flex justify-center md:justify-end">
            <div class="hero-image-frame">
              <img
                src="/images/example-story-hero-cover.jpg"
                alt="Tell Me Your Story keepsake preview"
                class="hero-img"
                loading="eager"
              />
              <!-- Floating badge — updated to voice -->
              <div class="hero-badge">
  <span class="hero-badge-icon">🎙️</span>
  <div>
    <p class="hero-badge-title">Nan's voice playing</p>
    <p class="hero-badge-sub">Scan the QR in the book</p>
  </div>
</div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- NEW FEATURES — voice, QR, print        -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label text-center text-[#9C7C5C]">What makes us different</div>
        <h2 class="section-title mt-3 text-center text-white" style="margin-left:auto;margin-right:auto;">
  The memory book that speaks
</h2>

        <div class="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">

          <!-- Feature 1 — Voice to text -->
          <div class="feature-card">
            <div class="feature-icon-wrap feature-icon-voice">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
              </svg>
            </div>
            <h3 class="feature-title">Speak your answers</h3>
            <p class="feature-desc">
              Tap the microphone on any question and speak naturally. Your words appear as you talk — no typing needed. Perfect for elderly parents who find typing difficult.
            </p>
            <div class="feature-tag">Live transcription • Works in Chrome & Safari</div>
          </div>

          <!-- Feature 2 — QR code in book -->
          <div class="feature-card feature-card-accent">
            <div class="feature-icon-wrap feature-icon-qr">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 11V3h8v8H3zm2-2h4V5H5v4zm8-6h8v8h-8V3zm2 2v4h4V5h-4zM3 21v-8h8v8H3zm2-2h4v-4H5v4zm13 2h-2v-2h2v2zm-4-4h2v2h-2v-2zm4-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm2 4h-2v-2h2v2zm-4 0v2h-2v-2h2zm-2-4h2v2h-2v-2z"/>
              </svg>
            </div>
            <h3 class="feature-title">Hear their voice in the book</h3>
            <p class="feature-desc">
              Voice recordings are saved alongside written answers. A QR code is printed in your keepsake book next to each memory — family scan it to hear their loved one's voice, years from now.
            </p>
            <div class="feature-tag feature-tag-accent">The only memory book that speaks</div>
          </div>

          <!-- Feature 3 — Printed book -->
          <div class="feature-card">
            <div class="feature-icon-wrap feature-icon-print">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 3H6a1 1 0 0 0-1 1v4H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2h1a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-1V4a1 1 0 0 0-1-1zm-1 16H7v-4h10v4zm0-11H7V5h10v3zm3 6h-1v-2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2H4v-6h16v6z"/>
              </svg>
            </div>
            <h3 class="feature-title">Order a printed hardback</h3>
            <p class="feature-desc">
              Turn any completed story into a beautifully printed 6×9 softcover book — professionally printed and shipped directly to your door. From £29.98 including UK delivery.
            </p>
            <div class="feature-tag">Printed by Lulu Press • Ships in 10–14 days</div>
          </div>

        </div>

        <!-- Listen demo link -->
        <div class="mt-10 rounded-2xl border border-[#2C2420] bg-[#2C2420] px-6 py-5 text-center">
          <p class="text-sm text-stone-400">
            🎙️ <span class="text-white font-medium">Imagine scanning a QR code at Christmas</span> and hearing your grandmother's voice describing the home she grew up in.
            That's what Tell Me Your Story makes possible.
          </p>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- FORMATS — what you get                 -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label text-center">What you create</div>
        <h2 class="section-title mt-3 text-center">
          Three beautiful ways to keep a story
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-base leading-[1.8] text-[#5C534E] sm:text-lg">
          Every story you capture can become a digital keepsake book, a shareable video, or a professionally printed hardback — with QR codes that bring their voice to life.
        </p>

        <div class="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">

          <!-- Format 1 — Keepsake Book -->
          <div class="format-card">
            <div class="format-card-inner">
              <div class="format-icon">📖</div>
              <h3 class="format-title">Digital Keepsake Book</h3>
              <p class="format-desc">
                A beautifully typeset PDF with chapters, quote pages, photos, QR voice codes, and elegant layouts — ready to download, share, or print at home.
              </p>
              <ul class="format-list">
                <li>Chapters, drop caps &amp; quote pages</li>
                <li>Voice recording QR codes</li>
                <li>Three design themes</li>
                <li>Instant PDF download</li>
              </ul>
            </div>
            <div class="format-preview bg-[#F5F0E8]">
              <img
                src="/images/example-story-memory-page.jpg"
                alt="Keepsake book preview"
                class="format-preview-img"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Format 2 — Printed Book -->
          <div class="format-card format-card-print">
            <div class="format-card-inner">
              <div class="format-icon">📚</div>
              <h3 class="format-title" style="color:#1C1917;">Printed Keepsake Book</h3>
              <p class="format-desc">
                A professionally printed 6×9 softcover book — the same beautiful design as the digital version, physically printed and shipped to your door.
              </p>
              <ul class="format-list">
                <li>Professional print quality</li>
                <li>QR codes printed in the book</li>
                <li>Shipped UK-wide</li>
                <li>From £29.98 inc. delivery</li>
              </ul>
              <div class="new-badge">Now available</div>
            </div>
            <div class="format-preview bg-[#F0E8DC] flex items-center justify-center p-8">
              <div class="text-center">
                <div class="mx-auto flex h-20 w-16 items-center justify-center rounded-lg bg-[#1C1917] shadow-lg">
                  <div class="text-center px-2">
                    <p class="text-[7px] text-[#9C7C5C] uppercase tracking-widest">Tell Me Your Story</p>
                    <p class="mt-1 text-[9px] font-bold text-white leading-tight">Mum's Story</p>
                  </div>
                </div>
                <p class="mt-3 text-xs text-[#7C5C3B] font-medium">Printed & shipped</p>
                <p class="text-xs text-[#9C7C5C]">10–14 days</p>
              </div>
            </div>
          </div>

          <!-- Format 3 — Video -->
          <div class="format-card format-card-dark">
            <div class="format-card-inner">
              <div class="format-icon">🎬</div>
              <h3 class="format-title format-card-dark">Story Video</h3>
              <p class="format-desc text-stone-300">
                A cinematic video of their story — title slide, chapters, answers, and photos — with music of your choice. Play it at birthdays, Christmas, or any moment that matters.
              </p>
              <ul class="format-list text-stone-400">
                <li>Title, chapters &amp; answer slides</li>
                <li>Add your own music</li>
                <li>Choose your theme &amp; pace</li>
                <li>Downloads as MP4</li>
              </ul>
              <div class="new-badge">New feature</div>
            </div>
            <div class="format-preview bg-[#2C2420]">
              <div class="video-preview-mockup">
                <div class="video-slide-title">
                  <p class="video-slide-label">Tell Me Your Story</p>
                  <p class="video-slide-name">Mum's Story</p>
                  <p class="video-slide-sub">A life told through memories, moments, and love</p>
                </div>
                <div class="video-play-icon">▶</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- HOW IT WORKS                           -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label">How it works</div>
        <h2 class="section-title mt-3">Simple to start, beautiful to finish</h2>

        <div class="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          <div class="step-card">
            <div class="step-number">01</div>
            <h3 class="step-title">Choose a story type</h3>
            <p class="step-desc">
              Start with Mum, Dad, Grandparents, a Life Story, a Couple Story, or more. Each type has questions tailored to that person's experience.
            </p>
          </div>

          <div class="step-card step-card-accent">
            <div class="step-number text-[#7C5C3B]">02</div>
            <h3 class="step-title">Answer by typing or speaking</h3>
            <p class="step-desc">
              100 guided questions across 10 chapters. Type your answers or tap the microphone and speak — your voice is recorded and saved alongside the text. Add photos to bring each memory to life.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">03</div>
            <h3 class="step-title">Export, print, or share</h3>
            <p class="step-desc">
              Download a beautifully designed PDF, order a professionally printed book, or export a video with music — ready in minutes, kept forever.
            </p>
          </div>
        </div>

        <router-link
          to="/blog/questions-to-ask-your-parents"
          class="mt-8 inline-block text-sm text-[#7C5C3B] hover:underline"
        >
          Read: 100 questions to ask your parents before it's too late →
        </router-link>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- GALLERY — the finished result          -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label">The finished result</div>
        <h2 class="section-title mt-3">From answers to something beautiful</h2>
        <p class="mt-4 max-w-2xl text-base leading-[1.8] text-[#5C534E] sm:text-lg">
          Chapters, quote pages, elegant typography, and personal images all come together to create a keepsake that feels genuinely finished.
        </p>

        <div class="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          <div class="gallery-item col-span-1">
            <img src="/images/example/example-page-childhood.png" alt="Chapter page" class="gallery-img" loading="lazy" />
            <p class="gallery-label">Chapter pages</p>
          </div>
          <div class="gallery-item col-span-1">
            <img src="/images/example/example-page-cooking-quote.png" alt="Quote page" class="gallery-img" loading="lazy" />
            <p class="gallery-label">Quote pages</p>
          </div>
          <div class="gallery-item col-span-2 md:col-span-1">
            <img src="/images/example/example-page-cover.png" alt="Cover page" class="gallery-img" loading="lazy"/>
            <p class="gallery-label">Cover page</p>
          </div>
          <div class="gallery-item col-span-2">
            <img src="/images/example/example-page-world.png" alt="Story page with photo" class="gallery-img" loading="lazy" />
            <p class="gallery-label">Story pages with photos</p>
          </div>
          <div class="gallery-item col-span-2 md:col-span-1">
            <img src="/images/example/example-page-dreams.png" alt="Memories page" class="gallery-img" loading="lazy" />
            <p class="gallery-label">Memory pages</p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <router-link to="/example" @click="trackExampleStory" class="btn-secondary">
            Explore a full example story
          </router-link>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- WHY IT MATTERS — emotional             -->
    <!-- ═══════════════════════════════════════ -->
    <section class="why-section px-5 py-20 sm:px-8 sm:py-28">
      <div class="grain"></div>
      <div class="relative mx-auto max-w-3xl text-center">
        <div class="why-ornament">— ◦ ○ ◦ —</div>
        <blockquote class="why-quote">
          "It smelled of cooking, washing drying near the fire, and sometimes something sweet baking in the oven."
          <em class="block mt-4 text-lg not-italic text-[#C4A882]">
            — From a real Tell Me Your Story keepsake
          </em>
        </blockquote>
        <p class="why-sub mt-6">
          This is what it feels like to capture a memory properly. Start preserving the ones that matter most.
        </p>
        <div class="mt-10">
          <router-link to="/register" @click="trackStart" class="btn-primary">
            Start capturing a story today
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
<!-- TESTIMONIALS                           -->
<!-- ═══════════════════════════════════════ -->
<section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
  <div class="mx-auto max-w-6xl">

    <div class="section-label text-center">What families say</div>
    <h2 class="section-title mt-3 text-center">
      Stories that matter, kept forever
    </h2>

    <div class="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">

      <div class="testimonial-card">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-quote">
          "I did this with my mum last Christmas. She spoke her answers out loud and hearing her voice come back through the book is something I'll treasure forever."
        </p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">S</div>
          <div>
            <p class="testimonial-name">Sarah</p>
            <p class="testimonial-detail">Created Mum's Story</p>
          </div>
        </div>
      </div>

      <div class="testimonial-card testimonial-card-accent">
        <div class="testimonial-stars" style="color:#C4A882;">★★★★★</div>
        <p class="testimonial-quote" style="color:#E8E0D8;">
          "My dad passed six months after we did this. I scan the QR codes in the book whenever I miss him. I can hear him laugh. Nothing could replace that."
        </p>
        <div class="testimonial-author">
          <div class="testimonial-avatar" style="background:#7C5C3B;">J</div>
          <div>
            <p class="testimonial-name" style="color:white;">James</p>
            <p class="testimonial-detail" style="color:#8C847E;">Created Dad's Story</p>
          </div>
        </div>
      </div>

      <div class="testimonial-card">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-quote">
          "My nan is 87 and doesn't use technology. She just spoke her answers and I typed along. The finished book made her cry. It made all of us cry."
        </p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">R</div>
          <div>
            <p class="testimonial-name">Rachel</p>
            <p class="testimonial-detail">Created Grandma's Story</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Trust bar -->
    <div class="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#8C847E]">
      <span class="flex items-center gap-2"><span class="text-[#7C5C3B]">✓</span> Free to start</span>
      <span class="flex items-center gap-2"><span class="text-[#7C5C3B]">✓</span> No subscription</span>
      <span class="flex items-center gap-2"><span class="text-[#7C5C3B]">✓</span> Voice recording included</span>
      <span class="flex items-center gap-2"><span class="text-[#7C5C3B]">✓</span> Printed book available</span>
      <span class="flex items-center gap-2"><span class="text-[#7C5C3B]">✓</span> QR codes in every book</span>
    </div>

  </div>
</section>

    <!-- ═══════════════════════════════════════ -->
    <!-- STORY TYPES                            -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label">Story types</div>
        <h2 class="section-title mt-3">Made for the people who matter most</h2>

        <div class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
  <router-link
    v-for="type in storyTypes"
    :key="type.id"
    to="/register"
    @click="trackStart"
    class="story-type-chip"
  >
    <span class="story-type-emoji">{{ type.emoji }}</span>
    <span class="story-type-label">{{ type.label }}</span>
    <span class="story-type-sub">{{ type.sub }}</span>
  </router-link>
</div>

<p class="mt-8 text-sm text-[#8C847E]">
  Each story type has its own set of guided questions — thoughtfully written for that person and their life.
</p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- PRICING                                -->
    <!-- ═══════════════════════════════════════ -->
    <PricingTable id="pricing" @track="trackPricing" />

    <!-- ═══════════════════════════════════════ -->
    <!-- FINAL CTA                              -->
    <!-- ═══════════════════════════════════════ -->
    <section class="final-cta px-5 py-20 sm:px-8 sm:py-28">
      <div class="grain"></div>
      <div class="relative mx-auto max-w-3xl text-center">
        <div class="why-ornament text-stone-400">— ◦ ○ ◦ —</div>
        <h2 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
          Their story deserves to be kept.
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-base leading-[1.8] text-stone-300 sm:text-lg">
          Start free, speak or type your answers, and turn meaningful memories into a book your family can hold — and hear — forever.
        </p>
        <div class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <router-link to="/register" @click="trackStart" class="btn-primary-light">
            Start your story — it's free
          </router-link>
          <router-link to="/example" @click="trackExampleStory" class="btn-ghost">
            See an example first
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { track } from '../lib/analytics'
import { useSeo } from '../composables/useSeo'
import PricingTable from '../components/pricing/PricingTable.vue'

useSeo({
  title: 'Tell Me Your Story | Voice-recorded life story keepsake books',
  description:
    'Answer guided questions about someone you love — by typing or speaking. Voice recordings are saved with QR codes in your printed keepsake book, so family can hear their stories forever.',
  canonical: 'https://tellmeyourstory.uk', 
    schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Tell Me Your Story',
        url: 'https://tellmeyourstory.uk',
        description: 'A guided app to capture a loved one\'s life story — by voice or text — and turn it into a beautiful keepsake book with QR codes that play their voice recordings.',
        publisher: {
          '@type': 'Organization',
          name: 'Tell Me Your Story',
          url: 'https://tellmeyourstory.uk',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tellmeyourstory.uk/logo/logo-full-new.png',
          },
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Tell Me Your Story',
        url: 'https://tellmeyourstory.uk',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        description: 'Capture a loved one\'s life story by typing or speaking. Voice recordings are saved with QR codes in printed keepsake books — family scan to hear their voice years from now.',
        offers: [
          { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'GBP', description: 'Start any story, answer all 100 questions, voice recording included.' },
          { '@type': 'Offer', name: 'Single Story', price: '3.99', priceCurrency: 'GBP' },
          { '@type': 'Offer', name: 'Story + Photos', price: '5.99', priceCurrency: 'GBP' },
          { '@type': 'Offer', name: 'Full Collection', price: '11.99', priceCurrency: 'GBP' },
          { '@type': 'Offer', name: 'Printed Book', price: '34.98', priceCurrency: 'GBP', description: 'Professionally printed 6x9 softcover with QR voice codes, shipped UK-wide.' },
        ],
      },
    ],
  },
})

const storyTypes = [
  { id: 'mum',     emoji: '💛', label: "Mum's Story",     sub: 'Her life in her words' },
  { id: 'dad',     emoji: '💙', label: "Dad's Story",     sub: 'His story, preserved' },
  { id: 'grandma', emoji: '🌸', label: "Grandma's Story", sub: 'Memories worth keeping' },
  { id: 'grandad', emoji: '⭐', label: "Grandad's Story", sub: 'Stories to pass down' },
  { id: 'life',    emoji: '📖', label: 'Life Story',      sub: 'Your own journey' },
  { id: 'couple',  emoji: '💞', label: 'Couple Story',    sub: 'A love story told together' },
]

function trackStart() { track('upgrade_clicked', { source: 'homepage' }) }
function trackExampleStory() { track('example_story_clicked', { source: 'homepage' }) }
function trackPricing(plan: string) { track('upgrade_clicked', { source: 'home_pricing', plan }) }
</script>

<style scoped>
.home { font-family: 'DM Sans', sans-serif; }
.font-display { font-family: 'Playfair Display', Georgia, serif; }

.grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 0;
}

.hero { background: linear-gradient(160deg, #F5F0E8 0%, #EDE5D8 100%); position: relative; }
.hero-circle { position: absolute; top: -120px; right: -180px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, #E8DDD0 0%, transparent 70%); pointer-events: none; }
.hero-text { position: relative; z-index: 1; }

.eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #8C847E; }
.eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #7C5C3B; flex-shrink: 0; }
h1 { font-family: 'Playfair Display', Georgia, serif; }
.check { color: #7C5C3B; font-weight: 600; }

.hero-image-wrap { position: relative; z-index: 1; width: 100%; }
.hero-image-frame { position: relative; display: inline-block; }
.hero-img { width: 100%; max-width: 560px; border-radius: 24px; box-shadow: 0 32px 80px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08); }
.hero-badge { position: absolute; bottom: 24px; left: -20px; display: flex; align-items: center; gap: 10px; background: white; border-radius: 16px; padding: 10px 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); font-size: 13px; max-width: 200px; }
.hero-badge-icon { font-size: 22px; flex-shrink: 0; }
.hero-badge-title { font-weight: 600; color: #1C1917; line-height: 1.3; }
.hero-badge-sub { font-size: 11px; color: #8C847E; margin-top: 1px; }

.btn-primary { display: inline-block; background: #7C5C3B; color: white; font-size: 14px; font-weight: 500; padding: 14px 28px; border-radius: 100px; text-decoration: none; transition: opacity 0.2s; white-space: nowrap; }
.btn-primary:hover { opacity: 0.88; }
.btn-primary-light { display: inline-block; background: white; color: #1C1917; font-size: 14px; font-weight: 600; padding: 14px 28px; border-radius: 100px; text-decoration: none; transition: opacity 0.2s; }
.btn-primary-light:hover { opacity: 0.9; }
.btn-secondary { display: inline-block; background: white; color: #1C1917; font-size: 14px; font-weight: 500; padding: 14px 28px; border-radius: 100px; border: 1px solid #D6CFC8; text-decoration: none; transition: background 0.2s; }
.btn-secondary:hover { background: #F0EBE3; }
.btn-ghost { display: inline-block; color: #A89880; font-size: 14px; font-weight: 500; padding: 14px 20px; border-radius: 100px; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); transition: color 0.2s; }
.btn-ghost:hover { color: white; }

.section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #8C847E; }
.section-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; color: #1C1917; max-width: 640px; margin-left: auto; margin-right: auto; }

/* ── New feature cards ───────────────────── */
.feature-card { background: #2C2420; border: 1px solid #3C3430; border-radius: 24px; padding: 28px 28px 32px; }
.feature-card-accent { background: #1C1917; border-color: #7C5C3B; }
.feature-icon-wrap { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
.feature-icon-voice { background: #7C5C3B; }
.feature-icon-qr { background: #9C7C5C; }
.feature-icon-print { background: #5C4030; }
.feature-title { margin-top: 16px; font-family: 'Playfair Display', Georgia, serif; font-size: 1.2rem; font-weight: 700; color: white; }
.feature-desc { margin-top: 10px; font-size: 14px; line-height: 1.75; color: #A8A29E; }
.feature-tag { margin-top: 16px; display: inline-block; font-size: 11px; color: #7C5C3B; border: 1px solid #3C3430; border-radius: 100px; padding: 4px 12px; }
.feature-tag-accent { color: #C4A882; border-color: #7C5C3B; background: rgba(124,92,59,0.1); }

/* ── Format cards ───────────────────────── */
.format-card { border-radius: 24px; border: 1px solid #E8E0D8; background: white; overflow: hidden; display: flex; flex-direction: column; }
.format-card-dark { background: #1C1917; border-color: #2C2420; }
.format-card-print { background: #FAF7F4; border-color: #D6CFC8; }
.format-card-inner { padding: 32px 32px 24px; flex-shrink: 0; }
.format-icon { font-size: 28px; }
.format-title { margin-top: 12px; font-family: 'Playfair Display', Georgia, serif; font-size: 1.4rem; font-weight: 700; color: #1C1917; }
.format-desc { margin-top: 10px; font-size: 14px; line-height: 1.7; color: #5C534E; }
.format-list { margin-top: 16px; list-style: none; padding: 0; font-size: 13px; color: #8C847E; }
.format-list li { padding: 4px 0; padding-left: 18px; position: relative; }
.format-list li::before { content: '✦'; position: absolute; left: 0; font-size: 8px; color: #7C5C3B; top: 7px; }
.format-preview { flex: 1; min-height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.format-preview-img { width: 100%; height: 100%; object-fit: cover; object-position: top; }

.new-badge { margin-top: 14px; display: inline-block; background: #7C5C3B; color: white; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; padding: 4px 12px; border-radius: 100px; }

.video-preview-mockup { width: 100%; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 32px; position: relative; }
.video-slide-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #8C847E; }
.video-slide-name { font-family: 'Playfair Display', Georgia, serif; font-size: 1.8rem; font-weight: 700; color: white; text-align: center; }
.video-slide-sub { font-size: 12px; color: #8C847E; font-style: italic; text-align: center; }
.video-play-icon { margin-top: 16px; width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid #5C534E; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #8C847E; }

/* ── Step cards ─────────────────────────── */
.step-card { background: white; border: 1px solid #E8E0D8; border-radius: 24px; padding: 28px 28px 32px; }
.step-card-accent { background: #F5F0E8; border-color: #D6CFC8; }
.step-number { font-family: 'Playfair Display', Georgia, serif; font-size: 2rem; font-weight: 700; color: #D6CFC8; line-height: 1; }
.step-title { margin-top: 14px; font-size: 1.05rem; font-weight: 600; color: #1C1917; }
.step-desc { margin-top: 8px; font-size: 14px; line-height: 1.7; color: #5C534E; }

/* ── Gallery ────────────────────────────── */
.gallery-item { border-radius: 16px; overflow: hidden; border: 1px solid #E8E0D8; background: #F5F0E8; }
.gallery-img { width: 100%; display: block; }
.gallery-label { padding: 8px 14px; font-size: 12px; color: #8C847E; }

/* ── Why section ────────────────────────── */
.why-section { background: linear-gradient(160deg, #2C2420 0%, #1C1917 100%); position: relative; overflow: hidden; }
.why-ornament { font-size: 14px; letter-spacing: 0.1em; color: #5C534E; }
.why-quote { margin-top: 20px; font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.3rem, 2.5vw, 2rem); font-weight: 400; line-height: 1.5; color: #E8E0D8; font-style: normal; }
.why-quote em { font-style: italic; color: #C4A882; }
.why-sub { font-size: 16px; color: #8C847E; }

/* ── Story type chips ───────────────────── */
.story-type-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: #F5F0E8;
  border: 1px solid #E8E0D8;
  border-radius: 20px;
  padding: 24px 16px;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
  cursor: pointer;
}
.story-type-chip:hover {
  border-color: #7C5C3B;
  background: #F0E8DC;
  transform: translateY(-2px);
}
.story-type-emoji { font-size: 28px; }
.story-type-label { font-size: 13px; font-weight: 600; color: #1C1917; line-height: 1.3; }
.story-type-sub   { font-size: 11px; color: #9C7C5C; line-height: 1.4; margin-top: 2px; }

/* ── Pricing ────────────────────────────── */
.price-card { background: white; border: 1px solid #E8E0D8; border-radius: 24px; padding: 28px 24px 32px; display: flex; flex-direction: column; }
.price-card-featured { background: #1C1917; border-color: #1C1917; }
.price-card-premium { background: #F5F0E8; border-color: #D6CFC8; position: relative; }
.price-popular { font-size: 10px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #C4A882; margin-bottom: 10px; }
.price-premium-badge { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; color: #7C5C3B; margin-bottom: 10px; }
.price-tier { font-family: 'Playfair Display', Georgia, serif; font-size: 1.2rem; font-weight: 700; color: #1C1917; }
.price-desc { margin-top: 4px; font-size: 13px; color: #8C847E; }
.price-amount { margin-top: 16px; font-family: 'Playfair Display', Georgia, serif; font-size: 2.2rem; font-weight: 700; color: #1C1917; line-height: 1; }
.price-features { margin-top: 20px; flex: 1; list-style: none; padding: 0; font-size: 13px; }
.price-features li { padding: 5px 0; padding-left: 20px; position: relative; color: #5C534E; }
.price-features li.yes::before { content: '✓'; position: absolute; left: 0; color: #7C5C3B; font-weight: 600; }
.price-features li.no::before  { content: '✗'; position: absolute; left: 0; color: #D6CFC8; }
.price-features li.yes-dark::before { content: '✓'; position: absolute; left: 0; color: #C4A882; font-weight: 600; }
.price-features li.no-dark::before  { content: '✗'; position: absolute; left: 0; color: #5C534E; }
.price-btn { display: block; margin-top: 24px; padding: 12px 20px; border-radius: 100px; font-size: 13px; font-weight: 500; text-align: center; text-decoration: none; transition: opacity 0.2s; }
.price-btn:hover { opacity: 0.85; }
.price-btn-outline { border: 1px solid #D6CFC8; color: #1C1917; background: transparent; }
.price-btn-white { background: white; color: #1C1917; }
.price-btn-premium { background: #7C5C3B; color: white; }

/* ── Final CTA ──────────────────────────── */
.final-cta { background: linear-gradient(160deg, #2C2420 0%, #1C1917 100%); position: relative; overflow: hidden; }
.format-card-dark .format-title { color: white; }

/* ── Testimonials ───────────────────────── */
.testimonial-card { background: white; border: 1px solid #E8E0D8; border-radius: 24px; padding: 28px 28px 32px; display: flex; flex-direction: column; gap: 16px; }
.testimonial-card-accent { background: #1C1917; border-color: #2C2420; }
.testimonial-stars { font-size: 14px; color: #7C5C3B; letter-spacing: 2px; }
.testimonial-quote { font-size: 14px; line-height: 1.8; color: #5C534E; font-style: italic; flex: 1; }
.testimonial-author { display: flex; align-items: center; gap: 12px; margin-top: auto; }
.testimonial-avatar { width: 36px; height: 36px; border-radius: 50%; background: #E8E0D8; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: #5C534E; flex-shrink: 0; }
.testimonial-name { font-size: 13px; font-weight: 600; color: #1C1917; }
.testimonial-detail { font-size: 11px; color: #9C7C5C; margin-top: 1px; }
</style>