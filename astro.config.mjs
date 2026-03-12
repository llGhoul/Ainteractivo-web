import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Configuración de Astro para la landing de Aprendizaje Interactivo
// Para rutas privadas reales (/admin): cambiar output a 'hybrid', añadir adapter Node y descomentar middleware + páginas en src/pages/privadas
export default defineConfig({
  site: 'https://www.aprendizajeinteractivo.com',
  srcDir: 'src',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [
    tailwind({
      applyBaseStyles: true
    })
  ],
  server: { port: 4321 },
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: { drop_console: false, passes: 1 },
        format: { comments: false }
      },
      rollupOptions: {
        output: { compact: true }
      }
    }
  }
});


