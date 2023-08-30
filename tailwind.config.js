/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes : {
        open: {
          '0%' : {opacity: '0', visibility: 'hidden'},
          '100%' : {opacity: '1', visibility: 'visible'}
        },
      },
      animation: {
        open: 'open 250ms ease-in',
        openfast: 'open 150ms ease-in',
      }
    },
  },
  plugins: [],
}

