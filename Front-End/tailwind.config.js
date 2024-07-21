/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    import('flowbite/plugin')
  ],
}

