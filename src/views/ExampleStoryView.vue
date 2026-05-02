<template>
  <main class="bg-[#F5F0E8] text-[#1C1917]">

    <!-- ═══════════════════════════════════════ -->
    <!-- HERO                                    -->
    <!-- ═══════════════════════════════════════ -->
    <section class="px-5 py-20 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-4xl text-center">
        <p class="eyebrow">Example keepsake</p>
        <h1 class="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.02em] sm:text-5xl md:text-6xl">
          A real story.<br />
          <em class="italic text-[#7C5C3B]">A real keepsake.</em>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5C534E]">
          This is a real keepsake created with Tell Me Your Story — real questions,
          real answers, real memories. This is what your family could have.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/register"
            class="btn-primary"
          >
            Start your own story — it's free
          </router-link>
          <router-link
            to="/"
            class="btn-secondary"
          >
            Back to home
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- QUOTES — the emotional hook             -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-[#2C2420] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <p class="eyebrow text-[#9C7C5C] text-center">From the keepsake</p>
        <h2 class="mt-3 font-display text-center text-2xl font-bold text-[#E8DDD0] sm:text-3xl">
          Her words, in her own voice
        </h2>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <div class="quote-card">
            <div class="ornament">— ◦ —</div>
            <blockquote class="quote-text">
              "It smelled of cooking, washing drying near the fire, and sometimes something sweet baking in the oven."
            </blockquote>
            <p class="quote-label">On her childhood home</p>
          </div>

          <div class="quote-card quote-card-featured">
            <div class="ornament text-[#C4A882]">— ◦ —</div>
            <blockquote class="quote-text text-[#E8DDD0]">
              "I was born into a world that felt much slower than today. People had less, but they seemed to make more of what they did have."
            </blockquote>
            <p class="quote-label text-[#9C7C5C]">On the world she was born into</p>
          </div>

          <div class="quote-card">
            <div class="ornament">— ◦ —</div>
            <blockquote class="quote-text">
              "What I really longed for was warmth, love, and a sense of belonging."
            </blockquote>
            <p class="quote-label">On her childhood dreams</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- VIDEO — see it come to life            -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-5xl">
        <p class="eyebrow text-center">Also exports as video</p>
        <h2 class="section-title mt-3 mx-auto text-center">
          See the story come to life
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-center text-base leading-7 text-[#5C534E]">
          Every story can also be exported as a beautiful video — answers, photos, and music
          all woven together. Perfect for sharing with family or playing at a special moment.
        </p>

        <div class="mt-10 overflow-hidden rounded-3xl border border-[#E8DDD0] shadow-xl bg-[#1C1917]">
          <video
            controls
            playsinline
            preload="metadata"
            poster="/images/example/example-page-cover.png"
            class="w-full block"
          >
            <source
              src="https://jeyybcdnmezivjuvmmcu.supabase.co/storage/v1/object/public/assets/example-story.mp4"
              type="video/mp4"
            />
            Your browser does not support video playback.
          </video>
        </div>

        <div class="mt-5 grid grid-cols-3 gap-4 text-center">
          <div class="rounded-2xl border border-[#E8DDD0] bg-white px-4 py-4">
            <p class="text-lg font-bold text-[#1C1917]">🎬</p>
            <p class="mt-1 text-xs font-medium text-[#1C1917]">Exported as MP4</p>
            <p class="mt-1 text-xs text-[#8C847E]">Downloads to your device</p>
          </div>
          <div class="rounded-2xl border border-[#E8DDD0] bg-white px-4 py-4">
            <p class="text-lg font-bold text-[#1C1917]">🎵</p>
            <p class="mt-1 text-xs font-medium text-[#1C1917]">Add your own music</p>
            <p class="mt-1 text-xs text-[#8C847E]">Any MP3 you choose</p>
          </div>
          <div class="rounded-2xl border border-[#E8DDD0] bg-white px-4 py-4">
            <p class="text-lg font-bold text-[#1C1917]">✦</p>
            <p class="mt-1 text-xs font-medium text-[#1C1917]">Premium feature</p>
            <p class="mt-1 text-xs text-[#8C847E]">Included in Full Collection</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- GALLERY — real page screenshots        -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <p class="eyebrow">Inside the keepsake</p>
        <h2 class="section-title mt-3">
          Pages from the finished book
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-[#5C534E]">
          Every page is designed to feel like a real book — beautiful layouts,
          elegant typography, and personal photos woven throughout.
        </p>

        <!-- Row 1 — cover + dedication -->
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="page-card">
            <img
              src="/images/example/example-page-cover.png"
              alt="Keepsake cover page"
              class="page-img"
            />
            <div class="page-caption">
              <p class="page-caption-title">Cover page</p>
              <p class="page-caption-desc">A polished opening with the cover photo, title, and subtitle.</p>
            </div>
          </div>

          <div class="page-card">
            <img
              src="/images/example/example-page-dedication.png"
              alt="Dedication page"
              class="page-img"
            />
            <div class="page-caption">
              <p class="page-caption-title">Dedication page</p>
              <p class="page-caption-desc">"Every life holds a story worth telling. This is yours."</p>
            </div>
          </div>
        </div>

        <!-- Row 2 — two answer pages -->
        <div class="mt-5 grid gap-5 sm:grid-cols-2">
          <div class="page-card">
            <img
              src="/images/example/example-page-world.png"
              alt="Story answer page with photo"
              class="page-img"
            />
            <div class="page-caption">
              <p class="page-caption-title">Story page with photo</p>
              <p class="page-caption-desc">Answers flow naturally alongside personal photos.</p>
            </div>
          </div>

          <div class="page-card">
            <img
              src="/images/example/example-page-people.png"
              alt="Story page about family"
              class="page-img"
            />
            <div class="page-caption">
              <p class="page-caption-title">Family memories</p>
              <p class="page-caption-desc">Drop caps and thoughtful layout make every page feel considered.</p>
            </div>
          </div>
        </div>

        <!-- Row 3 — quote page + chapter page -->
        <div class="mt-5 grid gap-5 sm:grid-cols-2">
          <div class="page-card">
            <img
              src="/images/example/example-page-cooking-quote.png"
              alt="Quote highlight page"
              class="page-img"
            />
            <div class="page-caption">
              <p class="page-caption-title">Quote highlight page</p>
              <p class="page-caption-desc">Special memories become beautiful standalone pages.</p>
            </div>
          </div>

          <div class="page-card">
            <img
              src="/images/example/example-page-childhood.png"
              alt="Chapter opener page"
              class="page-img"
            />
            <div class="page-caption">
              <p class="page-caption-title">Chapter opener</p>
              <p class="page-caption-desc">Each chapter begins with its own elegant page.</p>
            </div>
          </div>
        </div>

        <!-- Row 4 — full width dreams page -->
        <div class="mt-5">
          <div class="page-card">
            <img
              src="/images/example/example-page-dreams.png"
              alt="Story page about childhood dreams"
              class="page-img"
            />
            <div class="page-caption">
              <p class="page-caption-title">Childhood dreams</p>
              <p class="page-caption-desc">Photos sit alongside answers to bring each memory to life.</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- PDF EMBED — the full keepsake          -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-5xl">
        <p class="eyebrow text-center">Read the full keepsake</p>
        <h2 class="section-title mt-3 mx-auto text-center">
          Browse every page
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-center text-base leading-7 text-[#5C534E]">
          This is the complete keepsake — every question answered, every photo placed,
          every memory preserved. Scroll through it below.
        </p>

        <div class="mt-10 overflow-hidden rounded-3xl border border-[#E8DDD0] shadow-xl">
          <iframe
            src="/example-story.pdf"
            width="100%"
            height="900"
            class="block bg-[#F5F0E8]"
            title="Example keepsake PDF"
          ></iframe>
        </div>

        <p class="mt-4 text-center text-xs text-[#A8A29E]">
          Can't see the PDF?
          <a
            href="/example-story.pdf"
            target="_blank"
            class="text-[#7C5C3B] underline hover:opacity-80"
          >
            Open it in a new tab
          </a>
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- REASSURANCE                            -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="grid gap-8 md:grid-cols-3">
          <div class="reassurance-card">
            <span class="reassurance-icon">💛</span>
            <p class="reassurance-title">Answer at your own pace</p>
            <p class="reassurance-desc">
              You don't need to answer all 100 questions. Start with one memory and build from there.
            </p>
          </div>
          <div class="reassurance-card">
            <span class="reassurance-icon">📸</span>
            <p class="reassurance-title">Add your own photos</p>
            <p class="reassurance-desc">
              Upload personal photos alongside any answer to make the keepsake truly yours.
            </p>
          </div>
          <div class="reassurance-card">
            <span class="reassurance-icon">🎬</span>
            <p class="reassurance-title">Also exports as video</p>
            <p class="reassurance-desc">
              Premium stories can also be exported as a beautiful video with music — perfect for sharing.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- FINAL CTA                              -->
    <!-- ═══════════════════════════════════════ -->
    <section class="bg-[#1C1917] px-5 py-20 sm:px-8 sm:py-28">
      <div class="mx-auto max-w-3xl text-center">
        <div class="ornament-light">— ◦ ○ ◦ —</div>
        <h2 class="mt-5 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Now imagine this for someone you love.
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-base leading-8 text-[#A8A29E] sm:text-lg">
          Free to start. Answer as many questions as you like.
          The keepsake will be there when you're ready.
        </p>
        <div class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <router-link to="/register" class="btn-primary-light">
            Start your story — it's free
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Example Keepsake | Tell Me Your Story',
  description:
    'See a real keepsake created with Tell Me Your Story — real questions, real answers, real memories. This is what your family could have.',
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

main { font-family: 'DM Sans', sans-serif; }
.font-display, h1, h2 { font-family: 'Playfair Display', Georgia, serif; }

.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8C847E;
}

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #1C1917;
  max-width: 560px;
}

/* Buttons */
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

/* Quote cards */
.quote-card {
  background: #2C2420;
  border: 1px solid #3C3430;
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quote-card-featured {
  background: #3C2C20;
  border-color: #5C4030;
}

.ornament {
  font-size: 13px;
  letter-spacing: 0.15em;
  color: #5C534E;
}

.ornament-light {
  font-size: 14px;
  letter-spacing: 0.1em;
  color: #5C534E;
}

.quote-text {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.65;
  color: #C4B8AC;
  flex: 1;
}

.quote-label {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #6C6460;
}

/* Page cards */
.page-card {
  background: white;
  border: 1px solid #E8E0D8;
  border-radius: 20px;
  overflow: hidden;
}

.page-img {
  width: 100%;
  display: block;
}

.page-caption {
  padding: 16px 20px;
  border-top: 1px solid #F0EBE3;
}

.page-caption-title {
  font-size: 13px;
  font-weight: 600;
  color: #1C1917;
}

.page-caption-desc {
  margin-top: 4px;
  font-size: 12px;
  color: #8C847E;
  line-height: 1.5;
}

/* Reassurance cards */
.reassurance-card {
  padding: 24px;
  background: #F5F0E8;
  border: 1px solid #E8DDD0;
  border-radius: 20px;
  text-align: center;
}

.reassurance-icon {
  font-size: 28px;
}

.reassurance-title {
  margin-top: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #1C1917;
}

.reassurance-desc {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: #5C534E;
}
</style>