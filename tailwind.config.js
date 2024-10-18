/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#00A3FF'
        },
        white: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF80'
        },
        grey: {
          800: '#242424',
          dark: '#181818',
          500: '#929292'
        }
      }
    }
  },
  plugins: []
};
