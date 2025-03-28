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
      backgroundImage: {
        'primary-bg': 'linear-gradient(to bottom, #111827, #1f2937, #111827)', // Equivalent to gray-900 → gray-800 → gray-900
      },
    },
  },
  plugins: [],
};
