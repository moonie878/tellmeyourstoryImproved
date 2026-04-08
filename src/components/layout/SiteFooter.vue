<template>
  <footer class="mt-16 border-t border-stone-200 bg-white">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <img
              src="/logo/logo-full.png"
              alt="Tell Me Your Story"
              class="h-20 max-w-[180px] object-contain transition hover:opacity-90"
            />
          </div>
          <p class="mt-3 max-w-md text-sm leading-6 text-stone-600">
            Turn life stories into something worth keeping.
          </p>
        </div>

        <nav class="flex flex-wrap gap-4 text-sm text-stone-600">
          <router-link to="/privacy" class="hover:text-stone-900">Privacy</router-link>
          <router-link to="/cookies" class="hover:text-stone-900">Cookies</router-link>
          <router-link to="/terms" class="hover:text-stone-900">Terms</router-link>
        </nav>
      </div>
    </div>
  </footer>
</template>