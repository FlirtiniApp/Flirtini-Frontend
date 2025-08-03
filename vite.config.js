import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Flirtini-Frontend/',
  server: {
    proxy: {
      '/alcoholAPI': {
        target: 'https://192.168.1.105:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/alcoholAPI/, ''),
      },
      '/accountsAPI': {
        target: 'https://192.168.1.88:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/accountsAPI/, ''),
      },
    }
  }
})
