import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Use '/' for development, '/Dashco/' for production (GitHub Pages)
  const base = command === 'serve' ? '/' : '/Dashco/'
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      watch: {
        usePolling: false,
      },
      proxy: {
        "/api": {
          target: "http://localhost", // XAMPP server
          changeOrigin: true,
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
    },
    base: base,  // '/' for dev, '/Dashco/' for production
    build: {
      sourcemap: false,
    },
    // Expose environment variables to client (prefixed with VITE_)
    envPrefix: 'VITE_',
  }
})
