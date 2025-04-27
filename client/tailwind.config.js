// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // You can customize your colors here
        // This uses the existing color scheme from your Colors.ts file
        primary: {
          light: '#0a7ea4',
          dark: '#ffffff'
        },
        text: {
          light: '#11181C',
          dark: '#ECEDEE'
        },
        background: {
          light: '#ffffff',
          dark: '#151718'
        },
        icon: {
          light: '#687076',
          dark: '#9BA1A6'
        }
      },
    },
  },
  plugins: [],
}