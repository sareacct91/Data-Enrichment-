import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = process.env.PORT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      'externalapi/photos': {
        target: `http://localhost:3001`,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
