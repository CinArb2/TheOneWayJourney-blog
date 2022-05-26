/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // 'https://onewayjourney.000webhostapp.com',
      'media.graphassets.com',
      '0.gravatar.com',
      'secure.gravatar.com',
      'localhost']
  }
}

module.exports = nextConfig
