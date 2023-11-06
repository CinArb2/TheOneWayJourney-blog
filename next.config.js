/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'media.graphassets.com',
      },
    ],
  },
}

module.exports = nextConfig
