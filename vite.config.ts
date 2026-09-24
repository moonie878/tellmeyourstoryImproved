import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Images are compressed once, up front, by `node scripts/optimise-images.mjs --originals`
// and committed. Doing it here instead added ~4.5 minutes to every deploy, re-compressing
// the same files each time. Run that script whenever you add new images.
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
})