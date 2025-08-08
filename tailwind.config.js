const { adapter } = require('./tailwind.adapter');
const plugin = require('tailwindcss/plugin')
const unit = '--tpx';
const convert = (value) => `calc(${16 * value} * var(${unit}))`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      ...adapter(),
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.prose': {
          fontSize: theme('fontSize.base')[0],
          lineHeight: theme('fontSize.base')[1].lineHeight,
        }
      })
    })
    // ...
  ],
}

