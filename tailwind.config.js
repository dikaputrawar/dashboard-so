/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#1a2b4a',
        }
      }
    },
  },
  plugins: [],
}
