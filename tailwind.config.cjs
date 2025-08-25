// tailwind.config.cjs
module.exports = {
  darkMode: 'class', // ✅ Must be 'class', not 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "business"],
  },
}