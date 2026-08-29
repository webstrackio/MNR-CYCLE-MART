/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          raw: 'rgb(var(--color-bg))',
        },
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          raw: 'rgb(var(--color-surface))',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          raw: 'rgb(var(--color-accent))',
        },
        txt: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          raw: 'rgb(var(--color-text))',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
          raw: 'rgb(var(--color-muted))',
        },
        borderc: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          raw: 'rgb(var(--color-border))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
