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
        xs: { max: '300px' },
        custom: { min: '301px', max: '639px' }, // 301px - 639px
      },
      fontFamily: {
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to bottom, #ff416c, #7a1ea1, #1b2845)',
      }, // Replace with your image path
        colors: {
          primary: "#047857",     // Rich Emerald Green
          secondary: "#facc15",   // Warm Yellow
          accent: "#3b82f6",      // Soft Blue
          dark: "#1f2937",        // Neutral Text
          light: "#fefce8",       // Creamy Background
      },
    },
  },
  plugins: [],
};
