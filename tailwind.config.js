/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: { min: '0px', max: '380px' },
        custom: { min: '381px', max: '639px' }, // 301px - 639px
      },
      fontFamily: {
        poppins: ['Poppins-Bold', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to bottom, #ff416c, #7a1ea1, #1b2845)',
      }, // Replace with your image path
      colors: {
        primary: '#1a1a1a',
        disabledColor: 'E5E5E5', // Rich Emerald Green
        secondary: '#facc15', // Warm Yellow
        accent: '#3b82f6', // Soft Blue
        dark: '#1f2937', // Neutral Text
        light: '#fefce8', // Creamy Background
      },
    },
  },
  plugins: [],
};
