/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Outfit', 'Arial', 'sans-serif'], display: ['Space Grotesk', 'Arial', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      colors: { cyan: { 300: '#b2edda', 400: '#99e4cc', 500: '#75bca7', 600: '#518f80', 900: '#173b35', 950: '#102923' }, purple: { 300: '#d1c6e7', 400: '#b5a4cf', 500: '#8b79a8', 600: '#70618e' } }
    },
  },
  plugins: [],
}