/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./main-code/*.{html,js}"],
  prefix: "tw-", // makes sure that it doesn't overlap with bootstrap
  theme: {
    extend: {},
  },
  plugins: [],
}

