/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "navbar-bg": "#273238",
        "knapp-bla": "#005B89",
        "knapp-rod": "#E23939",
        "dialogruta-bg": "#F4F1F1",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
