<template>
  <main class="home bg-[#F5F0E8] text-[#1C1917]">

    <!-- ═══════════════════════════════════════ -->
    <!-- 1. HERO                                 -->
    <!-- ═══════════════════════════════════════ -->
    <section class="hero relative overflow-hidden px-5 pb-0 pt-16 sm:px-8 sm:pt-24 md:pt-28">
      <div class="grain"></div>
      <div class="hero-circle"></div>

      <div class="relative mx-auto max-w-6xl">
        <div class="grid items-center gap-12 md:grid-cols-2 md:gap-16">

          <!-- Left — text -->
          <div class="hero-text pb-12 text-center md:text-left">
            <div class="eyebrow">
              <span class="eyebrow-dot"></span>
              No subscription · Printed in the UK
            </div>

            <h1 class="mt-5 font-display text-[2.6rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-5xl md:text-[3.6rem]">
              The memory book that
              <em class="italic text-[#7C5C3B]">plays their voice</em>
            </h1>

            <p class="mx-auto mt-6 max-w-lg text-base leading-[1.8] text-[#5C534E] sm:text-lg md:mx-0">
              Ask them guided questions. They speak or type their answers. We turn it into a printed book with a QR code by every story — scan it, and hear them tell it.
            </p>

            <!-- Whose story? -->
            <p class="mt-8 text-sm font-semibold text-[#1C1917]">Whose story do you want to keep?</p>
            <div class="mt-3 flex flex-wrap justify-center gap-2 md:justify-start" role="group" aria-label="Choose whose story to start">
              <router-link
                v-for="option in storyOptions"
                :key="option.type"
                :to="`/register?type=${option.type}`"
                class="story-chip"
                @click="trackStoryType(option.type)"
              >
                {{ option.label }}
              </router-link>
            </div>

            <div class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#8C847E] md:justify-start">
              <span class="flex items-center gap-1.5"><span class="check">✓</span> 5 questions free</span>
              <span class="flex items-center gap-1.5"><span class="check">✓</span> No card needed</span>
              <router-link to="/example" class="font-medium text-[#7C5C3B] underline-offset-4 hover:underline" @click="trackExampleStory">
                See a real example →
              </router-link>
            </div>
          </div>

          <!-- Right — hero image -->
          <div class="hero-image-wrap flex justify-center md:justify-end">
            <div class="hero-image-frame">
              <picture>
                <source srcset="/images/example-story-hero-cover.webp" type="image/webp" />
                <img
                src="/images/example-story-hero-cover.jpg"
                alt="Printed Tell Me Your Story keepsake book"
                class="hero-img"
                width="1200"
                height="630"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
              </picture>
              <div class="hero-badge">
                <span class="hero-badge-icon" aria-hidden="true">🎙️</span>
                <div>
                  <p class="hero-badge-title">Voice recording saved</p>
                  <p class="hero-badge-sub">QR code in the printed book</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- 2. HOW IT WORKS (one section, not two)  -->
    <!-- ═══════════════════════════════════════ -->
    <section id="how-it-works" class="reveal bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="grid items-center gap-12 md:grid-cols-2">

          <!-- Left — steps -->
          <div class="text-center md:text-left">
            <div class="section-label text-[#9C7C5C]">How it works</div>
            <h2 class="section-title how-title mt-3 text-white">
              Record their voice today. Hear it in the book forever.
            </h2>

            <ol class="mt-8 space-y-6 text-left">
              <li v-for="(step, i) in howSteps" :key="step.title" class="flex items-start gap-4">
                <span class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-sm font-bold text-white">
                  {{ i + 1 }}
                </span>
                <div>
                  <h3 class="text-base font-semibold text-white">{{ step.title }}</h3>
                  <p class="mt-1 text-sm leading-relaxed text-stone-300">{{ step.desc }}</p>
                </div>
              </li>
            </ol>
          </div>

          <!-- Right — book page with QR -->
          <div class="flex justify-center py-4">
            <div class="relative">
              <div class="w-56 rounded-sm bg-white p-5 shadow-lg sm:w-64 sm:p-6" style="aspect-ratio: 6/9;">
                <p class="text-[9px] font-medium uppercase tracking-widest text-[#7C5C3B]/60">Chapter 2 · Childhood</p>
                <p class="mt-2 font-serif text-xs italic text-stone-500 sm:text-sm">"What did your childhood home smell like?"</p>
                <p class="mt-2 font-serif text-[10px] leading-relaxed text-stone-700 sm:text-[11px]">
                  It smelled of cooking, washing drying near the fire, and sometimes something sweet baking in the oven…
                </p>
                <div class="mt-4 flex items-center gap-2 rounded-lg bg-[#F5F0E8] p-2">
                  <div class="flex h-9 w-9 items-center justify-center rounded bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#7C5C3B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M3 11V3h8v8H3zm2-2h4V5H5v4zm8-6h8v8h-8V3zm2 2v4h4V5h-4zM3 21v-8h8v8H3zm2-2h4v-4H5v4z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-[9px] font-medium text-stone-700">Voice recording</p>
                    <p class="text-[8px] text-stone-400">Scan to listen</p>
                  </div>
                </div>
              </div>

              <!-- Phone playing the recording -->
              <div class="absolute -bottom-3 -right-6 w-24 rounded-xl border-2 border-stone-700 bg-stone-900 p-2 shadow-xl sm:-right-10 sm:w-28" aria-hidden="true">
                <div class="rounded-lg bg-white p-2 text-center">
                  <p class="text-[8px] font-medium text-stone-700">▶ Now playing</p>
                  <p class="mt-0.5 text-[7px] text-stone-400">Nan's voice · 1:32</p>
                  <div class="mt-1 h-0.5 w-full rounded-full bg-stone-100">
                    <div class="h-0.5 w-2/3 rounded-full bg-[#7C5C3B]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- 3. SEE IT IN ACTION                     -->
    <!-- ═══════════════════════════════════════ -->
<!-- PRODUCT — see it in action             -->
<!-- ═══════════════════════════════════════ -->
<section class="reveal bg-white px-5 py-16 sm:px-8 sm:py-20">
  <div class="mx-auto max-w-6xl">

    <div class="section-label text-center">See it in action</div>
    <h2 class="section-title mt-3 text-center">
      From first question to finished book
    </h2>

    <!-- Bento grid -->
    <div class="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">

      <!-- Large tile — Editor -->
      <div class="reveal reveal-delay-1 col-span-2 overflow-hidden rounded-2xl border border-stone-200 bg-[#FAFAF8]">
        <img
          src="/images/Screenshots/editor.webp"
          alt="Story editor showing a question with a typed answer"
          class="w-full"
          loading="lazy"
        />
        <div class="px-5 py-4">
          <p class="text-sm font-semibold text-stone-900">Answer 100+ thoughtful questions</p>
          <p class="mt-1 text-xs text-stone-500">Type your answer or tap the mic to speak — we transcribe it for you</p>
        </div>
      </div>

      <!-- Voice recording -->
      <div class="reveal reveal-delay-2 col-span-1 overflow-hidden rounded-2xl border border-stone-200 bg-[#FAFAF8]">
        <img
          src="/images/Screenshots/voice-recording.webp"
          alt="Voice recording in progress with live transcription"
          class="w-full"
          loading="lazy"
        />
        <div class="px-4 py-3">
          <p class="text-sm font-semibold text-stone-900">Record your voice</p>
          <p class="mt-1 text-xs text-stone-500">Speak naturally — perfect for parents who find typing difficult</p>
        </div>
      </div>

      <!-- Book page preview -->
      <div class="reveal reveal-delay-1 col-span-1 overflow-hidden rounded-2xl border border-stone-200 bg-[#FAFAF8]">
        <img
          src="/images/Screenshots/book-page.webp"
          alt="Formatted book page with question, answer and photo"
          class="w-full"
          loading="lazy"
        />
        <div class="px-4 py-3">
          <p class="text-sm font-semibold text-stone-900">Every answer becomes a page</p>
          <p class="mt-1 text-xs text-stone-500">Beautifully formatted with photos and serif typography</p>
        </div>
      </div>

      <!-- QR code -->
      <div class="reveal reveal-delay-2 col-span-1 overflow-hidden rounded-2xl border border-stone-200 bg-[#FAFAF8]">
        <img
          src="/images/Screenshots/qr-code.webp"
          alt="QR code printed in the book linking to voice recording"
          class="w-full"
          loading="lazy"
        />
        <div class="px-4 py-3">
          <p class="text-sm font-semibold text-stone-900">QR codes in the book</p>
          <p class="mt-1 text-xs text-stone-500">Scan with your phone to hear their voice telling the story</p>
        </div>
      </div>

      <!-- Printed book — large -->
      <div class="reveal reveal-delay-3 col-span-2 lg:col-span-1 overflow-hidden rounded-2xl border border-stone-200 bg-[#FAFAF8]">
        <img
          src="/images/Screenshots/printed-book.webp"
          alt="Physical printed keepsake book"
          class="w-full"
          loading="lazy"
        />
        <div class="px-4 py-3">
          <p class="text-sm font-semibold text-stone-900">A real book you can hold</p>
          <p class="mt-1 text-xs text-stone-500">Professionally printed and shipped to your door</p>
        </div>
      </div>

    </div>

    <div class="mt-8 text-center">
      <router-link to="/example" @click="trackExampleStory" class="btn-secondary">
        Explore a full example story
      </router-link>
    </div>

  </div>
</section>

    <!-- 4. WHY IT MATTERS -->
    <!-- ═══════════════════════════════════════ -->
    <!-- WHY IT MATTERS — emotional             -->
    <!-- ═══════════════════════════════════════ -->
    <section class="reveal why-section px-5 py-20 sm:px-8 sm:py-28">
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

    <!-- 5. TESTIMONIALS + RECOMMENDED BY -->
    <!-- ═══════════════════════════════════════ -->
<!-- TESTIMONIALS                           -->
<!-- ═══════════════════════════════════════ -->
<section class="reveal bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
  <div class="mx-auto max-w-6xl">

    <div class="section-label text-center">What families say</div>
    <h2 class="section-title mt-3 text-center">
      Stories that matter, kept forever
    </h2>

    <div class="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">

      <div class="reveal reveal-delay-1 testimonial-card">
  <div class="testimonial-stars">★★★★★</div>
  <p class="testimonial-quote">
    "I wasn't sure what to expect at first, but I found the app really easy to use. It guides you through everything step by step. I loved being able to add memories and stories in my own way, and seeing it all come together was really special."
  </p>
  <div class="testimonial-author">
    <div class="testimonial-avatar">S</div>
    <div>
      <p class="testimonial-name">Suzanne-May G.</p>
      <p class="testimonial-detail">Verified Trustpilot review</p>
    </div>
  </div>
</div>

<div class="reveal reveal-delay-2 testimonial-card testimonial-card-accent">
  <div class="testimonial-stars" style="color:#C4A882;">★★★★★</div>
  <p class="testimonial-quote" style="color:#E8E0D8;">
    "An amazing app to use to record your memories and make stories for your family to cherish! It's made to what you want and how you want to tell them. We absolutely love the ones we have made!"
  </p>
  <div class="testimonial-author">
    <div class="testimonial-avatar" style="background:#7C5C3B;">H</div>
    <div>
      <p class="testimonial-name" style="color:white;">Hollie</p>
      <p class="testimonial-detail" style="color:#8C847E;">Verified Trustpilot review</p>
    </div>
  </div>
</div>

<div class="reveal reveal-delay-3 testimonial-card">
  <div class="testimonial-stars">★★★★★</div>
  <p class="testimonial-quote">
    "This app takes you through every step to create lovely memories and tributes. Such a lovely idea to create something truly special for family and friends to look back on."
  </p>
  <div class="testimonial-author">
    <div class="testimonial-avatar">J</div>
    <div>
      <p class="testimonial-name">Jayne B.</p>
      <p class="testimonial-detail">Verified Trustpilot review</p>
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
<!-- Trustpilot link badge -->
<div class="mt-6 flex justify-center">
  
   <a href="https://uk.trustpilot.com/review/tellmeyourstory.uk"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 rounded-full border border-[#E8DDD0] bg-white px-5 py-2.5 text-sm text-stone-600 transition hover:border-[#00B67A]"
  >
    <span class="text-base" style="color: #00B67A;">★★★★★</span>
    <span>Rated <strong class="text-stone-900">5.0</strong> on</span>
    <span class="font-semibold" style="color: #00B67A;">Trustpilot</span>
    <span class="text-xs text-stone-400">· 10 reviews</span>
  </a>
</div>

    <!-- Recommended by -->
    <div class="mt-12 border-t border-[#E8DDD0] pt-8 text-center">
      <p class="text-xs font-medium uppercase tracking-[0.15em] text-[#A89B8F]">Recommended by</p>
      <a
        href="https://lwdwtraining.uk/video/links/"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-block opacity-70 transition hover:opacity-100"
        aria-label="Visit Living Well Dying Well Training"
      >
        <img
          src="/images/partners/lwdw-logo.webp"
          alt="Living Well Dying Well — End of Life Doula Training"
          class="h-12 w-auto sm:h-14"
          loading="lazy"
        />
      </a>
    </div>
  </div>
</section>

    <!-- ═══════════════════════════════════════ -->
    <!-- 6. FOUNDER                              -->
    <!-- ═══════════════════════════════════════ -->
    <section class="reveal bg-white px-5 py-14 sm:px-8 sm:py-16">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <!-- To use a real photo, replace the "M" circle with:
             <img src="/images/founder/mark.jpg" alt="Mark, founder of Tell Me Your Story"
                  width="80" height="80" class="h-20 w-20 flex-shrink-0 rounded-full object-cover" loading="lazy" /> -->
        <div class="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] font-display text-3xl font-bold text-white" aria-hidden="true">
          M
        </div>
        <div>
          <p class="font-display text-xl leading-snug text-[#1C1917] sm:text-2xl">
            "I built Tell Me Your Story so my own children would always have my voice and my stories."
          </p>
          <p class="mt-3 text-sm text-[#5C534E]">
            Mark, founder — a dad in Southampton who builds and runs it himself.
            <router-link to="/my-story" class="ml-1 font-medium text-[#7C5C3B] hover:underline">Read why →</router-link>
          </p>
        </div>
      </div>
    </section>

    <!-- 7. GIFT -->
<!-- ═══════════════════════════════════════ -->
<!-- GIFT — buy for someone you love        -->
<!-- ═══════════════════════════════════════ -->
<section class="reveal bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
  <div class="mx-auto max-w-6xl">
    <div class="rounded-3xl border border-[#E8DDD0] bg-white px-6 py-10 sm:px-10 md:py-14">
      <div class="grid items-center gap-8 md:grid-cols-2">

        <!-- Left — copy -->
        <div class="text-center md:text-left">
          <div class="section-label">Give a meaningful gift</div>
          <h2 class="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-3xl">
            Gift someone the chance<br/>
            to tell their story
          </h2>
          <p class="mt-4 text-sm leading-relaxed text-[#5C534E]">
            Buy Tell Me Your Story for a parent, grandparent, or anyone whose memories matter. They receive a personal link, create their account, and start capturing their story — with your message included.
          </p>
          <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <router-link
              to="/gift"
              class="rounded-full bg-[#7C5C3B] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              🎁 Buy as a gift — from £3.99
            </router-link>
          </div>
          <p class="mt-4 text-xs text-[#8C847E]">
            Perfect for birthdays, Mother's Day, Father's Day, Christmas, or just because.
          </p>
        </div>

        <!-- Right — visual -->
        <div class="flex justify-center">
          <div class="relative max-w-xs">
            <!-- Gift card mockup -->
            <div class="rounded-2xl bg-[#2C2420] p-6 shadow-lg sm:p-8">
              <p class="text-[10px] font-medium uppercase tracking-widest text-[#9C7C5C]">Tell Me Your Story</p>
              <p class="mt-3 font-serif text-lg font-medium text-white">🎁 A gift for Mum</p>
              <div class="mt-4 rounded-xl bg-[#3C3430] p-4">
                <p class="font-serif text-xs italic leading-relaxed text-[#C4A882]">
                  "I got you this because your stories matter more than you know. I want the kids to hear your voice telling them, long after we're all old and grey."
                </p>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <p class="text-xs text-stone-400">Book + Photos</p>
                <p class="font-serif text-lg font-bold text-white">£7.99</p>
              </div>
            </div>
            <!-- Shadow accent -->
            <div class="mx-6 h-3 rounded-b-xl bg-[#1C1917]/20"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

    <!-- ═══════════════════════════════════════ -->
    <!-- 8. PRICING                             -->
    <!-- ═══════════════════════════════════════ -->
    <PricingTable id="pricing" @track="trackPricing" />

    <!-- ═══════════════════════════════════════ -->
    <!-- 9. FAQ (same text feeds the FAQ schema) -->
    <!-- ═══════════════════════════════════════ -->
    <section class="reveal bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="section-label text-center">Questions</div>
        <h2 class="section-title mt-3 text-center">Before you start</h2>

        <div class="mt-10 divide-y divide-[#E8DDD0] rounded-2xl border border-[#E8DDD0] bg-white">
          <details v-for="item in faqs" :key="item.q" class="faq-item px-5 py-4 sm:px-6">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#1C1917]">
              {{ item.q }}
              <span class="faq-icon flex-shrink-0 text-xl leading-none text-[#7C5C3B]" aria-hidden="true">+</span>
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-[#5C534E]">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- 10. EMAIL CAPTURE — the soft alternative -->
<!-- ═══════════════════════════════════════ -->
<!-- EMAIL CAPTURE                           -->
<!-- ═══════════════════════════════════════ -->
<section class="reveal px-5 py-14 sm:px-8 sm:py-16">
  <div class="mx-auto max-w-5xl">
    <EmailCaptureForm source="homepage" />
  </div>
</section>

    <!-- ═══════════════════════════════════════ -->
    <!-- 11. GUIDES (moved down from mid-page)   -->
    <!-- ═══════════════════════════════════════ -->
    <nav class="bg-[#F5F0E8] px-5 pb-14 sm:px-8" aria-label="Guides">
      <div class="mx-auto max-w-5xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.15em] text-[#A89B8F]">Guides</p>
        <div class="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <router-link v-for="g in guides" :key="g.to" :to="g.to" class="text-sm text-[#7C5C3B] hover:underline">
            {{ g.label }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- ═══════════════════════════════════════ -->
    <!-- 12. FINAL CTA                          -->
    <!-- ═══════════════════════════════════════ -->
    <!-- ═══════════════════════════════════════ -->
    <!-- FINAL CTA                              -->
    <!-- ═══════════════════════════════════════ -->
    <section class="reveal final-cta px-5 py-20 sm:px-8 sm:py-28">
      <div class="grain"></div>
      <div class="relative mx-auto max-w-3xl text-center">
        <div class="why-ornament text-stone-400">— ◦ ○ ◦ —</div>
        <h2 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
          Their story deserves to be kept.
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-base leading-[1.8] text-stone-300 sm:text-lg">
          Try 5 questions free, speak or type your answers, and turn meaningful memories into a book your family can hold — and hear — forever.
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
import EmailCaptureForm from '../components/Marketing/EmailCaptureForm.vue'
import PricingTable from '../components/pricing/PricingTable.vue'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'
import { PRINT_CUTOFF_LABEL } from '../lib/christmas'

import { onMounted, onUnmounted } from 'vue'

// Preload the hero image (the page's largest paint). Runs during setup, so the
// prerender bakes this <link> into the homepage HTML.
const HERO_IMAGE = '/images/example-story-hero-cover.webp'
let heroPreload = document.head.querySelector<HTMLLinkElement>(`link[rel="preload"][href="${HERO_IMAGE}"]`)
if (!heroPreload) {
  heroPreload = document.createElement('link')
  heroPreload.rel = 'preload'
  heroPreload.as = 'image'
  heroPreload.type = 'image/webp'
  heroPreload.href = HERO_IMAGE
  heroPreload.setAttribute('fetchpriority', 'high')
  // On phones the hero image sits below the heading and buttons, so only
  // preload it where it's actually the first thing on screen.
  heroPreload.media = '(min-width: 768px)'
  document.head.appendChild(heroPreload)
}
onUnmounted(() => heroPreload?.remove())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

// Hero "Whose story?" buttons → /register?type=…
// `type` must match an id in src/data/storyTypes.ts (unknown ids are ignored).
const storyOptions = [
  { type: 'mum', label: 'Mum' },
  { type: 'dad', label: 'Dad' },
  { type: 'grandma', label: 'Nan' },
  { type: 'grandad', label: 'Grandad' },
  { type: 'life', label: 'Someone else' },
]

const howSteps = [
  {
    title: 'Choose whose story it is',
    desc: "Mum, Dad, Nan or Grandad, a partner, or your own. Each story type has questions written for that person's life. Sit down together, or invite family to join in by link.",
  },
  {
    title: 'Speak or type — we write it up',
    desc: 'Tap the microphone and talk naturally. Your words are transcribed as you speak and the recording is kept. Start with 5 free questions, then unlock 100+ across 10 chapters, and add photos to any answer.',
  },
  {
    title: 'Get a book that plays their voice',
    desc: `Every answer becomes a page. Voice answers get a QR code in the printed book — scan it and hear them tell it. Download the PDF, or order a printed copy from ${printFrom}.`,
  },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'How do the QR codes work?',
    a: 'Every answer recorded by voice gets its own QR code, printed next to that story in the book. Scan it with any phone camera and the recording plays in the browser — no app needed.',
  },
  {
    q: 'What if they don’t like typing?',
    a: 'They don’t have to. Tap the microphone and speak — the words are transcribed automatically and the recording is saved alongside the answer.',
  },
  {
    q: 'Is it a subscription?',
    a: `No. You pay once for the plan you choose — no renewal, nothing to cancel. Printed books are ordered separately, from ${printFrom} per book plus UK shipping.`,
  },
  {
    q: 'How long does a printed book take?',
    a: `Books are printed to order and usually arrive within 10–14 days in the UK. For Christmas, order your printed book by ${PRINT_CUTOFF_LABEL}.`,
  },
  {
    q: 'Can I try it before paying?',
    a: 'Yes. Start any story and answer 5 questions free, with no card needed. You only pay if you want to unlock all the questions, download your keepsake, or order a printed book.',
  },
]

const guides = [
  { to: '/blog/questions-to-ask-your-parents', label: '100 questions to ask your parents' },
  { to: '/best-memory-book-apps-uk', label: 'Best memory book apps (UK)' },
  { to: '/storyworth-alternative', label: 'Storyworth alternative (UK)' },
  { to: '/life-story-work-in-care-homes', label: 'Life story work in care homes' },
  { to: '/legacy-letter-to-children', label: 'How to write a legacy letter' },
  { to: '/reminiscence-therapy-life-story', label: 'Reminiscence therapy' },
  { to: '/bereavement-gift-ideas', label: 'Bereavement gift ideas' },
]

useSeo({
  title: 'Memory Book That Plays Their Voice | Tell Me Your Story UK',
  description:
    'A memory book with their voice inside. Answer guided questions by speaking or typing, then print a book with QR codes that play each story. No subscription.',
  // canonical omitted on purpose: defaults to https://tellmeyourstory.uk/
  // Organization + WebSite schema live in index.html (sitewide).
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
    '@type': 'SoftwareApplication',
    name: 'Tell Me Your Story',
    url: 'https://tellmeyourstory.uk/',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    publisher: { '@id': 'https://tellmeyourstory.uk/#organization' },
    description:
      "Capture a loved one's life story by typing or speaking. Voice recordings are saved with QR codes in printed keepsake books — family scan to hear their voice years from now.",
    // Keep in sync with PricingTable — ideally import these from one prices file.
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'GBP', description: 'Start any story and answer 5 guided questions free.' },
      { '@type': 'Offer', name: 'Keepsake Book', price: '3.99', priceCurrency: 'GBP' },
      { '@type': 'Offer', name: 'Book + Photos', price: '7.99', priceCurrency: 'GBP' },
      { '@type': 'Offer', name: 'All Stories', price: '11.99', priceCurrency: 'GBP' },
      { '@type': 'Offer', name: 'Premium Keepsake', price: '17.99', priceCurrency: 'GBP' },
      {
        '@type': 'Offer',
        name: 'Printed Book',
        price: PRINTED_BOOK_FROM_PRICE.toFixed(2),
        priceCurrency: 'GBP',
        description: 'Professionally printed 6x9 softcover with QR voice codes. UK shipping extra.',
      },
    ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  },
})

function trackStart() { track('upgrade_clicked', { source: 'homepage' }) }
function trackStoryType(type: string) { track('story_type_selected', { type, source: 'homepage_hero' }) }
function trackExampleStory() { track('example_story_clicked', { source: 'homepage' }) }
function trackPricing(plan: string) { track('upgrade_clicked', { source: 'home_pricing', plan }) }
</script>

<style scoped>
.home { font-family: 'DM Sans', sans-serif; }

/* ── Hero "Whose story?" buttons ─────────── */
.story-chip { display: inline-flex; align-items: center; min-height: 44px; padding: 10px 20px; border-radius: 100px; background: #7C5C3B; color: white; font-size: 14px; font-weight: 500; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
.story-chip:hover { opacity: 0.9; transform: translateY(-1px); }
.story-chip:focus-visible { outline: 2px solid #1C1917; outline-offset: 2px; }

/* ── How it works title sits left on desktop ── */
@media (min-width: 768px) { .how-title { margin-left: 0; } }

/* ── FAQ ──────────────────────────────────── */
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item[open] .faq-icon { transform: rotate(45deg); }
.faq-icon { transition: transform 0.2s; }
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
.hero-img { width: 100%; height: auto; max-width: 560px; border-radius: 24px; box-shadow: 0 32px 80px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08); }
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
.btn-hero-ghost { display: inline-block; color: #5C534E; font-size: 14px; font-weight: 500; padding: 14px 24px; border-radius: 100px; text-decoration: none; border: 1px solid #C4B9AD; transition: border-color 0.2s, color 0.2s; white-space: nowrap; }
.btn-hero-ghost:hover { border-color: #7C5C3B; color: #1C1917; }

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

.video-preview-mockup { width: 100%; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 0 32px; position: relative; }
.video-letterbox { width: 100%; height: 20px; background: #111; flex-shrink: 0; }
.video-letterbox-top { border-radius: 0; }
.video-letterbox-bottom { border-radius: 0; }
.video-slide-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #8C847E; }
.video-slide-name { font-family: 'Playfair Display', Georgia, serif; font-size: 1.8rem; font-weight: 700; color: white; text-align: center; }
.video-slide-sub { font-size: 12px; color: #8C847E; font-style: italic; text-align: center; }
.video-play-btn { margin-top: 16px; width: 52px; height: 52px; border-radius: 50%; border: 1.5px solid #7C5C3B; background: rgba(124,92,59,0.15); display: flex; align-items: center; justify-content: center; transition: background 0.2s, border-color 0.2s; }
.video-play-triangle { font-size: 16px; color: #C4A882; margin-left: 3px; }

/* ── Step cards ─────────────────────────── */
.step-card { background: white; border: 1px solid #E8E0D8; border-radius: 24px; padding: 28px 28px 32px; }
.step-card-accent { background: #F5F0E8; border-color: #D6CFC8; }
.step-number { font-family: 'Playfair Display', Georgia, serif; font-size: 2rem; font-weight: 700; color: #D6CFC8; line-height: 1; }
.step-title { margin-top: 14px; font-size: 1.05rem; font-weight: 600; color: #1C1917; }
.step-desc { margin-top: 8px; font-size: 14px; line-height: 1.7; color: #5C534E; }

/* ── Gallery ────────────────────────────── */
.gallery-item { border-radius: 16px; overflow: hidden; border: 1px solid #E8E0D8; background: #F5F0E8; }
.gallery-img { width: 100%; display: block; }
.gallery-item-wide .gallery-img { height: 380px; object-fit: cover; object-position: top center; }
.gallery-item-about .gallery-img { height: 340px; object-fit: cover; object-position: 50% 22%; }
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

/* ── Scroll reveal ─────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
</style>