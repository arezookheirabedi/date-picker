const forms = require('@tailwindcss/forms');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    safelist: {
      standard: [/ltr/, /rtl/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: {
        900: '#041E39',
        500: '#57687A',
      },
      blackberry: {
        900: '#44032e',
      },
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },

    container: {
      padding: '2rem',
      center: true,
    },
    extend: {
      maxWidth: {
        48: '12rem',
        '8/12': '66.666667%',
        '9/12': '75%',
      },
      minWidth: {
        0: '0',
        12: '6rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
    },
  },
  variants: {
    scrollbar: ['dark'],
    extend: {
      margin: ['responsive', 'direction'],
      float: ['responsive', 'direction'],
      padding: ['responsive', 'direction'],
      space: ['responsive', 'direction'],
      textAlign: ['responsive', 'direction'],
      inset: ['responsive', 'direction'],
    },
  },
  plugins: [
    forms({
      strategy: 'class',
    }),
    require('tailwindcss-dir')(),
    require('tailwind-scrollbar'),
  ],
};
