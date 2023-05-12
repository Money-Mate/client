/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mm-background": "#0c4a6e",
        "mm-foreground": "#0f172a ",
        "mm-text-dark": "#94a3b8",
        "mm-text-white": "#f1f5f9",
        "mm-success": "#2dd4bf",
        "mm-warn": "#CEA966",
        "mm-error": "#C05663",
        "mm-primary": "#075985",
        "mm-secondary": "#67a357",
      },
    },
  },
  plugins: [],
};
