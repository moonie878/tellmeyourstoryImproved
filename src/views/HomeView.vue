<template>
  <main class="home bg-[#F5F0E8] text-[#1C1917]">

    <!-- ═══════════════════════════════════════ -->
    <!-- HERO                                    -->
    <!-- ═══════════════════════════════════════ -->
    <section class="hero relative overflow-hidden px-5 pb-0 pt-20 sm:px-8 sm:pt-28 md:pt-32">

      <!-- Subtle grain texture overlay -->
      <div class="grain"></div>

      <!-- Decorative background circle -->
      <div class="hero-circle"></div>

      <div class="relative mx-auto max-w-6xl">
        <div class="grid items-end gap-12 md:grid-cols-2 md:gap-16">

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
              Answer guided questions about someone you love, add meaningful photos, and create a beautiful story — as a keepsake book or a video — that your family can treasure for generations.
            </p>

            <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <router-link
                to="/register"
                @click="trackStart"
                class="btn-primary"
              >
                Start your story — it's free
              </router-link>

              <router-link
                to="/example"
                @click="trackExampleStory"
                class="btn-secondary"
              >
                See an example
              </router-link>
            </div>

            <div class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#8C847E] md:justify-start">
              <span class="flex items-center gap-1.5"><span class="check">✓</span> No subscription</span>
              <span class="flex items-center gap-1.5"><span class="check">✓</span> Free to start</span>
              <span class="flex items-center gap-1.5"><span class="check">✓</span> Download when ready</span>
            </div>
          </div>

          <!-- Right — hero image floated up -->
          <div class="hero-image-wrap flex justify-center md:justify-end">
            <div class="hero-image-frame">
              <img
                src="/images/example-story-hero-cover.png"
                alt="Tell Me Your Story keepsake preview"
                class="hero-img"
              />
              <!-- Floating badge -->
              <div class="hero-badge">
                <span class="hero-badge-icon">🎬</span>
                <div>
                  <p class="hero-badge-title">Also exports as video</p>
                  <p class="hero-badge-sub">With music & photos</p>
                </div>
              </div>
            </div>
          </div>

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
          Two beautiful ways to keep a story
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-base leading-[1.8] text-[#5C534E] sm:text-lg">
          Every story you capture can be turned into a keepsake book, a shareable video, or both. Something to hold, something to play, something to pass down.
        </p>

        <div class="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">

          <!-- Format 1 — Keepsake Book -->
          <div class="format-card">
            <div class="format-card-inner">
              <div class="format-icon">📖</div>
              <h3 class="format-title">Keepsake Book</h3>
              <p class="format-desc">
                A beautifully typeset PDF with chapters, quote pages, photos, and elegant layouts — ready to print, share digitally, or gift.
              </p>
              <ul class="format-list">
                <li>Chapters, drop caps &amp; quote pages</li>
                <li>Three design themes to choose from</li>
                <li>Print-ready or digital</li>
                <li>Cover image included</li>
              </ul>
            </div>
            <div class="format-preview bg-[#F5F0E8]">
              <img
                src="/images/example-story-memory-page.png"
                alt="Keepsake book preview"
                class="format-preview-img"
              />
            </div>
          </div>

          <!-- Format 2 — Video -->
          <div class="format-card format-card-dark">
            <div class="format-card-inner">
              <div class="format-icon">🎬</div>
              <h3 class="format-title text-white">Story Video</h3>
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
        <h2 class="section-title mt-3">
          Simple to start, beautiful to finish
        </h2>

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
            <h3 class="step-title">Answer at your own pace</h3>
            <p class="step-desc">
  100 guided questions across 10 chapters — from first memories to lasting values. Answer as many or as few as feel right. Add photos alongside each answer. Everything saves automatically.
</p>
          </div>

          <div class="step-card">
            <div class="step-number">03</div>
            <h3 class="step-title">Export as book or video</h3>
            <p class="step-desc">
              Choose your format, theme, and style. Download a beautifully designed PDF book or a shareable video with music — ready in minutes.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- GALLERY — the finished result          -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label">The finished result</div>
        <h2 class="section-title mt-3">
          From answers to something beautiful
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-[1.8] text-[#5C534E] sm:text-lg">
          Chapters, quote pages, elegant typography, and personal images all come together to create a keepsake that feels genuinely finished.
        </p>

        <div class="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          <div class="gallery-item col-span-1">
            <img src="/images/example/example-page-childhood.png" alt="Chapter page" class="gallery-img" />
            <p class="gallery-label">Chapter pages</p>
          </div>
          <div class="gallery-item col-span-1">
            <img src="/images/example/example-page-cooking-quote.png" alt="Quote page" class="gallery-img" />
            <p class="gallery-label">Quote pages</p>
          </div>
          <div class="gallery-item col-span-2 md:col-span-1">
            <img src="/images/example/example-page-cover.png" alt="Cover page" class="gallery-img" />
            <p class="gallery-label">Cover page</p>
          </div>
          <div class="gallery-item col-span-2">
            <img src="/images/example/example-page-world.png" alt="Story page with photo" class="gallery-img" />
            <p class="gallery-label">Story pages with photos</p>
          </div>
          <div class="gallery-item col-span-2 md:col-span-1">
            <img src="/images/example/example-page-dreams.png" alt="Memories page" class="gallery-img" />
            <p class="gallery-label">Memory pages</p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <router-link
            to="/example"
            @click="trackExampleStory"
            class="btn-secondary"
          >
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
    <!-- STORY TYPES                            -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label">Story types</div>
        <h2 class="section-title mt-3">
          Made for the people who matter most
        </h2>

        <div class="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          <div v-for="type in storyTypes" :key="type.id" class="story-type-chip">
            <span class="story-type-emoji">{{ type.emoji }}</span>
            <span class="story-type-label">{{ type.label }}</span>
          </div>
        </div>

        <p class="mt-8 text-sm text-[#8C847E]">
          Each story type has its own set of guided questions — thoughtfully written for that person and their life.
        </p>

      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- PRICING                                -->
    <!-- ═══════════════════════════════════════ -->
    <section id="pricing" class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">

        <div class="section-label text-center">Pricing</div>
        <h2 class="section-title mt-3 text-center">
          Start free, upgrade when you're ready
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-base leading-[1.8] text-[#5C534E]">
          Begin writing for free with no time limit. Unlock the finished keepsake — book, video, or both — when you're ready to export.
        </p>

        <div class="mt-12 grid gap-5 md:grid-cols-4 md:gap-4">

          <!-- Free -->
          <div class="price-card">
            <p class="price-tier">Free</p>
            <p class="price-desc">Start capturing memories</p>
            <p class="price-amount">£0</p>
            <ul class="price-features">
              <li class="yes">Start any story</li>
              <li class="yes">All 100 questions</li>
              <li class="yes">Autosave</li>
              <li class="no">No exports</li>
            </ul>
            <router-link to="/register" @click="trackPricingFree" class="price-btn price-btn-outline">
              Start free
            </router-link>
          </div>

          <!-- Single Story -->
          <div class="price-card price-card-featured">
            <div class="price-popular">Most popular</div>
            <p class="price-tier text-white">Single Story</p>
            <p class="price-desc text-stone-300">One beautiful keepsake</p>
            <p class="price-amount text-white">£3.99</p>
            <ul class="price-features text-stone-300">
              <li class="yes-dark">Everything in Free</li>
              <li class="yes-dark">PDF keepsake export</li>
              <li class="yes-dark">Elegant layouts &amp; themes</li>
              <li class="no-dark">No photos in export</li>
            </ul>
            <router-link to="/register" @click="trackPricingSingle" class="price-btn price-btn-white">
              Get Single Story
            </router-link>
          </div>

          <!-- Single + Images -->
          <div class="price-card">
            <p class="price-tier">Story + Photos</p>
            <p class="price-desc">With images in your keepsake</p>
            <p class="price-amount">£5.99</p>
            <ul class="price-features">
              <li class="yes">Everything in Single</li>
              <li class="yes">Photos in your PDF</li>
              <li class="yes">Cover image</li>
              <li class="no">One story only</li>
            </ul>
            <router-link to="/register" @click="trackPricingSingle" class="price-btn price-btn-outline">
              Get Story + Photos
            </router-link>
          </div>

          <!-- Premium — All Stories + Video -->
          <div class="price-card price-card-premium">
            <div class="price-premium-badge">✦ Premium</div>
            <p class="price-tier">Full Collection</p>
            <p class="price-desc">Every story, every format</p>
            <p class="price-amount">£11.99</p>
            <ul class="price-features">
              <li class="yes">All story types</li>
              <li class="yes">Photos in all exports</li>
              <li class="yes">🎬 Video export</li>             
            </ul>
            <router-link to="/register" @click="trackPricingAll" class="price-btn price-btn-premium">
              Get Full Collection
            </router-link>
          </div>

        </div>

        <p class="mt-6 text-center text-xs text-[#8C847E]">
          One-time payment. No subscription. No renewal.
        </p>

      </div>
    </section>

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
          Start free, answer at your own pace, and turn meaningful memories into something your family can hold onto forever.
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

useSeo({
  title: 'Tell Me Your Story | Turn memories into a keepsake book or video',
  description:
    'Answer guided questions about someone you love, add photos, and create a beautiful keepsake book or video. Capture your parent\'s story before those memories are lost.',
})

const storyTypes = [
  { id: 'mum', emoji: '💛', label: "Mum's Story" },
  { id: 'dad', emoji: '💙', label: "Dad's Story" },
  { id: 'grandma', emoji: '🌸', label: "Grandma's Story" },
  { id: 'grandad', emoji: '⭐', label: "Grandad's Story" },
  { id: 'life', emoji: '📖', label: 'Life Story' },
  { id: 'couple', emoji: '💞', label: 'Couple Story' },
]

function trackStart() {
  track('upgrade_clicked', { source: 'homepage' })
}

function trackExampleStory() {
  track('example_story_clicked', { source: 'homepage' })
}

function trackPricingFree() {
  track('upgrade_clicked', { source: 'home_pricing_free', plan: 'free' })
}

function trackPricingSingle() {
  track('upgrade_clicked', { source: 'home_pricing_single', plan: 'single' })
}

function trackPricingAll() {
  track('upgrade_clicked', { source: 'home_pricing_all', plan: 'all' })
}
</script>

<style scoped>
/* ── Fonts ─────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

.home {
  font-family: 'DM Sans', sans-serif;
}

.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}

/* ── Grain texture ──────────────────────── */
.grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

/* ── Hero ───────────────────────────────── */
.hero {
  background: linear-gradient(160deg, #F5F0E8 0%, #EDE5D8 100%);
  position: relative;
}

.hero-circle {
  position: absolute;
  top: -120px;
  right: -180px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, #E8DDD0 0%, transparent 70%);
  pointer-events: none;
}

.hero-text {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8C847E;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7C5C3B;
  flex-shrink: 0;
}

h1 {
  font-family: 'Playfair Display', Georgia, serif;
}

.check {
  color: #7C5C3B;
  font-weight: 600;
}

/* Hero image */
.hero-image-wrap {
  position: relative;
  z-index: 1;
}

.hero-image-frame {
  position: relative;
  display: inline-block;
}

.hero-img {
  width: 100%;
  max-width: 440px;
  border-radius: 24px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08);
}

.hero-badge {
  position: absolute;
  bottom: 24px;
  left: -20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border-radius: 16px;
  padding: 10px 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  font-size: 13px;
  max-width: 200px;
}

.hero-badge-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.hero-badge-title {
  font-weight: 600;
  color: #1C1917;
  line-height: 1.3;
}

.hero-badge-sub {
  font-size: 11px;
  color: #8C847E;
  margin-top: 1px;
}

/* ── Buttons ────────────────────────────── */
.btn-primary {
  display: inline-block;
  background: #7C5C3B;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 14px 28px;
  border-radius: 100px;
  text-decoration: none;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.btn-primary:hover { opacity: 0.88; }

.btn-primary-light {
  display: inline-block;
  background: white;
  color: #1C1917;
  font-size: 14px;
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 100px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.btn-primary-light:hover { opacity: 0.9; }

.btn-secondary {
  display: inline-block;
  background: white;
  color: #1C1917;
  font-size: 14px;
  font-weight: 500;
  padding: 14px 28px;
  border-radius: 100px;
  border: 1px solid #D6CFC8;
  text-decoration: none;
  transition: background 0.2s;
}

.btn-secondary:hover { background: #F0EBE3; }

.btn-ghost {
  display: inline-block;
  color: #A89880;
  font-size: 14px;
  font-weight: 500;
  padding: 14px 20px;
  border-radius: 100px;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.2);
  transition: color 0.2s;
}

.btn-ghost:hover { color: white; }

/* ── Section labels ─────────────────────── */
.section-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8C847E;
}

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #1C1917;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

/* ── Format cards ───────────────────────── */
.format-card {
  border-radius: 24px;
  border: 1px solid #E8E0D8;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.format-card-dark {
  background: #1C1917;
  border-color: #2C2420;
}

.format-card-inner {
  padding: 32px 32px 24px;
  flex-shrink: 0;
}

.format-icon {
  font-size: 28px;
}

.format-title {
  margin-top: 12px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1C1917;
}

.format-desc {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.7;
  color: #5C534E;
}

.format-list {
  margin-top: 16px;
 
  list-style: none;
  padding: 0;
  font-size: 13px;
  color: #8C847E;
}

.format-list li {
  padding: 4px 0;
  padding-left: 18px;
  position: relative;
}

.format-list li::before {
  content: '✦';
  position: absolute;
  left: 0;
  font-size: 8px;
  color: #7C5C3B;
  top: 7px;
}

.format-preview {
  flex: 1;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.format-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.new-badge {
  margin-top: 14px;
  display: inline-block;
  background: #7C5C3B;
  color: white;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 100px;
}

/* Video preview mockup */
.video-preview-mockup {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
  position: relative;
}

.video-slide-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8C847E;
}

.video-slide-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-align: center;
}

.video-slide-sub {
  font-size: 12px;
  color: #8C847E;
  font-style: italic;
  text-align: center;
}

.video-play-icon {
  margin-top: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid #5C534E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #8C847E;
}

/* ── Step cards ─────────────────────────── */
.step-card {
  background: white;
  border: 1px solid #E8E0D8;
  border-radius: 24px;
  padding: 28px 28px 32px;
}

.step-card-accent {
  background: #F5F0E8;
  border-color: #D6CFC8;
}

.step-number {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  font-weight: 700;
  color: #D6CFC8;
  line-height: 1;
}

.step-title {
  margin-top: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #1C1917;
}

.step-desc {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.7;
  color: #5C534E;
}

/* ── Gallery ────────────────────────────── */
.gallery-item {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #E8E0D8;
  background: #F5F0E8;
}

.gallery-img {
  width: 100%;
  display: block;
}

.gallery-label {
  padding: 8px 14px;
  font-size: 12px;
  color: #8C847E;
}

/* ── Why section ────────────────────────── */
.why-section {
  background: linear-gradient(160deg, #2C2420 0%, #1C1917 100%);
  position: relative;
  overflow: hidden;
}

.why-ornament {
  font-size: 14px;
  letter-spacing: 0.1em;
  color: #5C534E;
}

.why-quote {
  margin-top: 20px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.3rem, 2.5vw, 2rem);
  font-weight: 400;
  line-height: 1.5;
  color: #E8E0D8;
  font-style: normal;
}

.why-quote em {
  font-style: italic;
  color: #C4A882;
}

.why-sub {
  font-size: 16px;
  color: #8C847E;
}

/* ── Story type chips ───────────────────── */
.story-type-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: #F5F0E8;
  border: 1px solid #E8E0D8;
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  transition: border-color 0.2s, background 0.2s;
}

.story-type-chip:hover {
  border-color: #7C5C3B;
  background: #F0E8DC;
}

.story-type-emoji {
  font-size: 24px;
}

.story-type-label {
  font-size: 12px;
  font-weight: 500;
  color: #5C534E;
  line-height: 1.3;
}

/* ── Pricing ────────────────────────────── */
.price-card {
  background: white;
  border: 1px solid #E8E0D8;
  border-radius: 24px;
  padding: 28px 24px 32px;
  display: flex;
  flex-direction: column;
}

.price-card-featured {
  background: #1C1917;
  border-color: #1C1917;
}

.price-card-premium {
  background: #F5F0E8;
  border-color: #D6CFC8;
  position: relative;
}

.price-popular {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #C4A882;
  margin-bottom: 10px;
}

.price-premium-badge {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #7C5C3B;
  margin-bottom: 10px;
}

.price-tier {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1C1917;
}

.price-desc {
  margin-top: 4px;
  font-size: 13px;
  color: #8C847E;
}

.price-amount {
  margin-top: 16px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1C1917;
  line-height: 1;
}

.price-features {
  margin-top: 20px;
  flex: 1;
  list-style: none;
  padding: 0;
  font-size: 13px;
}

.price-features li {
  padding: 5px 0;
  padding-left: 20px;
  position: relative;
  color: #5C534E;
}

.price-features li.yes::before { content: '✓'; position: absolute; left: 0; color: #7C5C3B; font-weight: 600; }
.price-features li.no::before  { content: '✗'; position: absolute; left: 0; color: #D6CFC8; }
.price-features li.yes-dark::before { content: '✓'; position: absolute; left: 0; color: #C4A882; font-weight: 600; }
.price-features li.no-dark::before  { content: '✗'; position: absolute; left: 0; color: #5C534E; }

.price-btn {
  display: block;
  margin-top: 24px;
  padding: 12px 20px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: opacity 0.2s;
}

.price-btn:hover { opacity: 0.85; }

.price-btn-outline {
  border: 1px solid #D6CFC8;
  color: #1C1917;
  background: transparent;
}

.price-btn-white {
  background: white;
  color: #1C1917;
}

.price-btn-premium {
  background: #7C5C3B;
  color: white;
}

/* ── Final CTA ──────────────────────────── */
.final-cta {
  background: linear-gradient(160deg, #2C2420 0%, #1C1917 100%);
  position: relative;
  overflow: hidden;
}
</style>