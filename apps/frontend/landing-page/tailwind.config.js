const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   join(
  //     __dirname,
  //     '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
  //   ),
  //   ...createGlobPatternsForDependencies(__dirname),
  // ],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(.stories|.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],

  theme: {
    extend: {
      fontFamily:{
        Comfortaa:["Comfortaa","sans-serif"],
        Dela_Gothic_One:["Dela Gothic One","sans-serif"]
      }
    },
  },
  plugins: [],
};
