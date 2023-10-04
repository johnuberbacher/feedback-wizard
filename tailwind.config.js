module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {},
  variants: {},
  plugins: ["prettier-plugin-tailwindcss"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
};
