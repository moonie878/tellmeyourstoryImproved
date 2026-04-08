<template>
  <main class="bg-stone-50 text-stone-900">
    <section class="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
        Legal
      </p>

      <h1 class="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
        {{ title }}
      </h1>

      <p class="mt-4 text-sm text-stone-500">
        Last updated: {{ lastUpdated }}
      </p>

      <div class="mt-10 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10">
        <div class="prose prose-stone max-w-none">
          <slot />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  lastUpdated: string
}>()
</script>

<style scoped>
.prose :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1c1917;
}

.prose :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1c1917;
}

.prose :deep(p) {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.8;
  color: #57534e;
}

.prose :deep(ul) {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  padding-left: 1.25rem;
  color: #57534e;
}

.prose :deep(li) {
  margin-top: 0.35rem;
  margin-bottom: 0.35rem;
}

.prose :deep(a) {
  color: #7c5c3b;
  text-decoration: underline;
}

.prose :deep(strong) {
  color: #1c1917;
}
</style>