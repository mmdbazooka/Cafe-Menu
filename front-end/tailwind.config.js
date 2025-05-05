/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens : {
      "mini" : "400px" ,
      "sl" : "500px" ,
      "sx" : "560px" ,
      "sf" : "650px" ,
      "sm" : "700px" ,
      "md" : "800px" ,
      "lm" : "900px" ,
      "lg" : "1024px" ,
      "lx" : "1200px" ,
      "xl" : "1280px" ,
      "2xl" : "1547px" ,
    },
  },
  plugins: [],
}