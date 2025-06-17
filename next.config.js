// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  experimental: {
   turbo: false,
    serverActions: {},
  },
}

module.exports = withPWA(nextConfig)