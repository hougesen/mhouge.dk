/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        black: { primary: '#101010', secondary: '#151515' },
        white: { primary: '#f7f7f7', secondary: '#eeeeee' },
      },
    },
  },
  plugins: [],
};
