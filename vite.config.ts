import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: ['5173-inge0vsfyihbajvn4c04t.e2b.app', 'localhost', '127.0.0.1']
  },
})