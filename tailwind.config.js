/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
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
          darker: '#080808',
          500: '#929292',
          light: '#1B1B1B'
        }
      },
      boxShadow: {
        dark: '4px 4px 20px 0px #0000004D'
      }
    }
  },
  plugins: []
};
