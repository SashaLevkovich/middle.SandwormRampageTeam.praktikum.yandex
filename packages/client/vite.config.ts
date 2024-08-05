import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'

dotenv.config()

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    SERVER_PORT: process.env.SERVER_PORT,
    EXTERNAL_SERVER_URL: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    INTERNAL_SERVER_URL: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/app'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      features: path.resolve(__dirname, './src/features'),
      shared: path.resolve(__dirname, './src/shared'),
    },
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  ssr: {
    format: 'cjs',
  },
})
