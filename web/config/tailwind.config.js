/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'bg-custom-yellow-1': 'rgba(75, 31, 31, 0.14)',
      },
    },
  },
  plugins: [],
}
