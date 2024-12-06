/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        enterItem: 'enterItem 2s ease forwards',
      },
      keyframes: {
        enterItem: {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-50px) scale(0.1)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}