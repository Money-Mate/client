/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "MM-primary": "#2C2C2C",
        "MM-secondary": "#313845",
        "MM-third": "#808D97",
        "MM-fourth": "#C05663",
        "MM-fifth": "#9357A3",
        "MM-sixth": "#1C82BF",
        "MM-seventh": "#CEA966",
      },
    },
  },
  plugins: [],
};
