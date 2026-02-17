/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all React files
  ],
  theme: {
    extend: {
      colors: {
        cursorRed: "#FF3C3C",
        cursorGreen: "#3CFF3C",
        cursorBlue: "#3C3CFF",
      },
      zIndex: {
        9999: "9999", // Ensure cursor stays on top
      },
      width: {
        cursorDot: "1rem", // 16px dot
      },
      height: {
        cursorDot: "1rem",
      },
    },
  },
  plugins: [],
};
