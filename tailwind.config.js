/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     
        backgroundImage: {
          'custom-gradient': 'linear-gradient(to bottom, #ff416c, #7a1ea1, #1b2845)',
        },// Replace with your image path
        colors:{
          unique: "#ea580c"
        },
    },
  },
  plugins: [],
};