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
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#171717',
          foreground: '#ffffff',
        },
        cuisinecard: '#ecfdf5',
        background: '#ffffff',
        foreground: '#000000',
        muted: {
          DEFAULT: '#f9fafb',
          foreground: '#4b5563',
        },
        accent: {
          DEFAULT: '#ecfdf5',
          foreground: '#10b981',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: '#10b981',
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
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}