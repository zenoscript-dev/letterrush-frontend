/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        neuropolitical: ['Neuropolitical', 'sans-serif'],
      },
      colors: {
        'bg-color': '#0F0F1D',
        'primary-color': '#8D00FF',
        'secondary-color': '#FF007F',
      },
    },
  },
  plugins: [],
};
