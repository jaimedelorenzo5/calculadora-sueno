import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuración de build optimizada
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['date-fns']
        }
      }
    },
    // Optimizaciones para Core Web Vitals
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  
  // Configuración de preview
  preview: {
    port: 4173,
    open: true
  },
  
  // Configuración de servidor de desarrollo
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Optimizaciones de CSS
  css: {
    devSourcemap: false
  },
  
  // Configuración de assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.ico'],
  
  // Configuración de PWA
  define: {
    __PWA_ENABLED__: true
  }
})
