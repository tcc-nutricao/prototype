/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'p': {
          50: '#f6f5fd',
          100: '#f0edfa',
          200: '#e3ddf7',
          300: '#cec2f0',
          400: '#b49fe6',
          500: '#9b78da',
          600: '#8a5acd',
          700: '#7a48b9',
          800: '#663c9b',
          900: '#553280',
          950: '#351f56',
        },
        'danger': '#EA3939',
        'success': '#2FC44F',
        'gray-medium': '#b4a9c5',
        'gray-dark': '#877d92',
      },
      fontFamily: {
        newake: ["'Newake'", "sans-serif"],
        sora: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 15px 40px rgba(0, 0, 0, 0.2)',
        'btn-hover': '0 4px 8px rgba(53, 31, 86, 0.2)', // R950 com 0.2 alpha
      },
    },
  },
  plugins: [],
}