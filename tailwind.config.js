/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      keyframes: {
        wiggle: {
          '0%,100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-16deg)' },
          '75%': { transform: 'rotate(8deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.4s cubic-bezier(0.4, 0.05, 0.855, 0.06)',
      },
    },
  },
  plugins: [],
};
