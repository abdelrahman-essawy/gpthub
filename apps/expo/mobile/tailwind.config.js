// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './App.{js,jsx,ts,tsx}',
//     './src/app/**/*.{js,jsx,ts,tsx}',
//     './screens/**/*.{js,jsx,ts,tsx}',
//     './components/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//     colors: {
//       darkBackground: '#191820',
//       inputFormBg: '#1e1d25',
//       inputFormBorderColor: '#25242c',
//       iconColor: '#67666e',
//     },
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: '#191820',
        inputFormBg: '#1e1d25',
        inputFormBorderColor: '#25242c',
        iconColor: '#67666e',
        chatBackground: '#212121',
      },
    },
  },
  plugins: [],
};
