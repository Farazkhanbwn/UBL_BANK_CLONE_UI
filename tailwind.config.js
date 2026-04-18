/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B3A6B',
        accent: '#00B4D8',
        background: '#F4F6FA',
        textPrimary: '#1A1A2E',
        success: '#22C55E',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}
