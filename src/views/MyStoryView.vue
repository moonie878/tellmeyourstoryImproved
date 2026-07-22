<template>
  <main class="min-h-screen bg-[#F5F0E8] text-[#1C1917]">

    <!-- Hero -->
    <section class="relative overflow-hidden px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
          The story behind Tell Me Your Story
        </p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl md:text-5xl">
          I built this so my children<br/>
          <em class="italic text-[#7C5C3B]">would know who I was</em>
        </h1>
      </div>
    </section>

    <!-- Story -->
    <section class="px-5 sm:px-8">
      <div class="mx-auto max-w-2xl">
        <article class="rounded-3xl border border-stone-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14">

          <p class="font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            In 2017 I collapsed and started convulsing at the dinner table. I was taken to hospital by ambulance and when I arrived in A&E I was experiencing total heart block. The doctors said I was lucky to be alive.
          </p>

          <p class="mt-6 font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            I had a pacemaker fitted and they also found other issues with my heart, including a bicuspid aortic valve. Over the last eight years my heart has deteriorated. In 2025 I had major open heart surgery — they broke my sternum to replace my valve.
          </p>

          <p class="mt-6 font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            I've had more surgery this year, and I was told my heart is only functioning at 45%. I'm now under the heart failure team. I have many scars and I'll be on medication for the rest of my life.
          </p>

          <p class="mt-6 font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            But those things are easy to deal with.
          </p>

          <!-- Emphasis -->
          <div class="my-10 border-l-[3px] border-[#7C5C3B] pl-6 sm:pl-8">
            <p class="font-serif text-lg font-medium leading-relaxed text-stone-900 sm:text-xl">
              What bothers me most, lying in the hospital bed before my surgeries, is realising how little my children would know and remember about me if I wasn't here anymore.
            </p>
          </div>

          <p class="font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            Not the big facts. The real stuff. My personality and what's important to me. What I was like as a kid, what scared me, what I enjoyed, what made me laugh. The small important details that make a person who they are — the ones nobody thinks to write down until it's too late.
          </p>

          <!-- Second emphasis -->
          <div class="my-10 border-l-[3px] border-[#7C5C3B] pl-6 sm:pl-8">
            <p class="font-serif text-lg font-medium leading-relaxed text-stone-900 sm:text-xl">
              So I built something.
            </p>
          </div>

          <p class="font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            It's called Tell Me Your Story. It's a simple app that asks thoughtful questions about a person's life — childhood, family, work, and the moments that shaped them — and turns the answers into a printed keepsake book.
          </p>

          <p class="mt-6 font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            My favourite feature is that you can record your voice answering each question, and a QR code gets printed in the book so your family can scan it and hear you tell the story in your own words.
          </p>

          <p class="mt-6 font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            I built it from scratch, by myself, around work and family life. Partly to help me deal with the emotional impact of having a lifelong medical condition, but mostly so my children would have something meaningful of me. They can hear for themselves, in my own words, how much I love and adore them — whenever they need it.
          </p>

          <!-- Third emphasis -->
          <div class="my-10 border-l-[3px] border-[#7C5C3B] pl-6 sm:pl-8">
            <p class="font-serif text-lg font-medium leading-relaxed text-stone-900 sm:text-xl">
              But I think it's bigger than just me.
            </p>
          </div>

          <p class="font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            Every family has someone whose story deserves to be kept — partners, parents, grandparents, friends. Someone who sadly won't be here forever.
          </p>

          <p class="mt-6 font-serif text-base leading-[2] text-stone-700 sm:text-lg">
            If that's someone in your life, I'd love for you to take a look. Don't let these memories and their precious voice disappear forever.
          </p>

          <!-- Sign-off -->
          <div class="mt-12 border-t border-stone-100 pt-8">
            <p class="font-serif text-base text-stone-700">
              — Mark
            </p>
            <p class="mt-1 text-sm text-stone-400">
              Founder, Tell Me Your Story · Southampton, UK
            </p>
          </div>

        </article>

        <!-- CTA -->
        <div class="mt-10 rounded-3xl bg-[#2C2420] px-6 py-10 text-center sm:px-10">
          <h2 class="font-display text-xl font-semibold text-white sm:text-2xl">
            Their story deserves to be kept
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-stone-400">
            Start with 5 questions free. Record their voice. Turn their answers into a book your family keeps forever.
          </p>
          <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <router-link
              to="/register"
              class="rounded-full bg-[#7C5C3B] px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start their story free
            </router-link>
            <router-link
              to="/pricing"
              class="rounded-full border border-stone-600 px-8 py-3.5 text-sm font-medium text-stone-300 transition hover:border-stone-400 hover:text-white"
            >
              View plans — from £3.99
            </router-link>
          </div>
          <div class="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-stone-500">
            <span>✦ No subscription</span>
            <span>✦ One-time payment</span>
            <span>✦ Printed books from £{{ PRINTED_BOOK_FROM_PRICE }}</span>
          </div>
        </div>

        <!-- Trustpilot -->
        <div class="mt-6 flex justify-center pb-16">
          <a
            href="https://uk.trustpilot.com/review/tellmeyourstory.uk"
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

      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'
</script>