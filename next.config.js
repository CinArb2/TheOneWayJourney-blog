/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['my-wordpress.theonewayjourney.com', '0.gravatar.com', 'localhost']
  }
}

module.exports = nextConfig
