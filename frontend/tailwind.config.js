/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightpurple: '#9B78DA',
        mediumpurple: '#8A5ACD',
        darkpurple: '#663C9B'
      },
    },
  },
  plugins: [],
}
