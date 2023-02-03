/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {},
  },
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#232323",
  //         secondary: "#E0E0E0",
  //       },
  //     },
  //   ],
  // },
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the MUI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [],
  // plugins: [require("daisyui")],
};
