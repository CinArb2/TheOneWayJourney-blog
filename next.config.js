/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['wp-one-way.herokuapp.com', '0.gravatar.com', 'localhost']
  }
}

module.exports = nextConfig
