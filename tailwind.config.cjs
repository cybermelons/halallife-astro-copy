/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'Manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: '#10b981', // Emerald 500
        'primary-hover': '#059669', // Emerald 600
        secondary: '#171717', // Neutral 900
      }
    },
  },
  plugins: [],
}