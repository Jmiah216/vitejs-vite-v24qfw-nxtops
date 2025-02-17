/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'military-dark': '#1A1A1A',
        'military-darker': '#0F1922',
        'military-light': '#D4B873', // Gold color from logo
        'military-lightest': '#F5F7F9',
        'military-accent': '#4D7C0F', // Green color from logo
        'military-accent-dark': '#3D6309',
        'military-gold': '#D4B873',
        'military-gold-dark': '#AA935C',
        'military-green': '#4D7C0F',
        'military-green-dark': '#3D6309',
        'military-text': '#374151',
        'army-dark': '#4B5320',
        'army-light': '#87944C',
        'navy-dark': '#003B4F',
        'navy-light': '#0077A2',
        'airforce-dark': '#00308F',
        'airforce-light': '#0066CC',
        'marines-dark': '#8B0000',
        'marines-light': '#C41E3A',
        'spaceforce-dark': '#1C2841',
        'spaceforce-light': '#2E4172'
      }
    },
  },
  plugins: [],
}