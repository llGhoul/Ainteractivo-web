/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#f8c16d',
          primaryDark: '#EE7601',
          accent: '#10b981'
        }
      }
    }
  },
  plugins: []
};

