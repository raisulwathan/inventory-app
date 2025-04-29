/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        salmon: {
          50: "#ffe4e1",
          200: "#ffb3b3",
          300: "#ff9999",
        },
      },
    },
  },
  plugins: [],
};
