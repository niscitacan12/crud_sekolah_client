/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, ts, jsx, tsx}",
    "node_modules/flowbite-react/lib/csn/**/*.js"
  ],
  theme: {
    extend: {},
  },

  plugins: [ require("flowbite/plugin") ],
}

