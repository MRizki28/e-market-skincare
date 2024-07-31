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
        brownSkincare: '#e18c44',
        greyText: '#4c4848',
        semiBlack: '#333333',
        priceColor: '#d43232'
      }
    },
  },
  plugins: [],
}

