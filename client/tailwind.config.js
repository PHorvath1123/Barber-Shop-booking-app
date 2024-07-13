/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark': '#1E1A17',
        'light': '#D9D9D9',
        'red': '#EF6950'
      }
    },
    fontFamily: {
      'title': ["Libre Bodoni", 'serif'],
      'text': ['Roboto', 'sans-serif'],
    }
  },
  plugins: [],
}

