/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        border: "var(--border-color)",
      },
      fontFamily: {
        sans: ['"Google Sans"', "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

