import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { pages } from './scripts/pages.mjs'

const page = (path) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    // Multi-página: cada entrada gera seu próprio HTML (com meta tags próprias)
    rollupOptions: {
      // Lista de páginas em scripts/pages.mjs
      input: Object.fromEntries(pages.map(({ name, html }) => [name, page(`./${html}`)])),
    },
  },
})
