/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
  // plugins: [require("daisyui")],
};
