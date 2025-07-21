/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6e6ff',
          100: '#ccccff',
          200: '#9999ff',
          300: '#6666ff',
          400: '#3333ff',
          500: '#000080', // Your navy blue #000080
          600: '#000066',
          700: '#00004d',
          800: '#000033',
          900: '#00001a',
        },
      },
    },
  },
  plugins: [],
};
