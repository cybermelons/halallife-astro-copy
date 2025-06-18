/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'Manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#10b981',
          hover: '#059669',
        },
        secondary: '#171717',
        cuisinecard: '#ecfdf5',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}