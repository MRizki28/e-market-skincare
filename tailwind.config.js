/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    './resources/js/**/*.jsx',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        basicCommersialRegular: ['basic-commersial-regular'],
      },
      colors: {
        pinkSkincare: '#FF4191',
        greyText: '#6B7280',
      }
    },
  },
  plugins: [],
}

