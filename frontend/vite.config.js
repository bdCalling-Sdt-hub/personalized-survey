import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '46.202.89.63', // Exposes to local network (optional)
    port: 3000, // Change this to your desired port
  },
})
