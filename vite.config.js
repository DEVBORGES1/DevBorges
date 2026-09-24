import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (path) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    // Multi-página: cada entrada gera seu próprio HTML (com meta tags próprias)
    rollupOptions: {
      input: {
        main: page('./index.html'),
        nexus: page('./cases/nexus/index.html'),
      },
    },
  },
})
