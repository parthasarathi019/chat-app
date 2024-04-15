/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9D87CF",
          secondary: "#866BFA",
          accent: "#FF6211",
          neutral: "#4E0BA6",
          "base-100": "#090911",
          "base-200": "#31009A"
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}

