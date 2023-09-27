import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your actual backend API address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: ['localhost', '192.168.29.174','192.168.1.12','192.168.236.124','192.168.1.18',], // Listen on both localhost and your IP
    port: 5173, // Your desired port number
  },
})
