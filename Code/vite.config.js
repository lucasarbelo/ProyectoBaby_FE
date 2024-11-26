import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

base: "/lucasarbelo/Proyecto_FRONTEND/"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
