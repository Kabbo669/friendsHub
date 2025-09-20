/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
        'regi2': "url('./assets/regi2.jpg')"
      },
      fontFamily : {
      "open": ["Open Sans", 'sans-serif'],
      "poppins" : ["Poppins", "sans-serif"],
      "dm" : ["DM Sans", "sans-serif"],
      "nunito" : ["Nunito", 'sans-serif']
      },
       colors: {
        'eggBlue': '#00cec9',
        "faded" : "#81ecec",
        "primary": "#11175D",
        "lightBlack": "#808080",
        "darkBlue" : "#03014C"
      },
      keyframes :{
        spinPause: {
        "0%" : {transform : "rotate(0deg)"},
        "80%": {transform: "rotate(360deg)"},
        "100%" : {transform: "rotate(360deg)"}
        },
      },
      animation :{
       "spinPause": "spinPause 2s linear infinite",
      },
    },
  },
  plugins: [],
}