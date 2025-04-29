/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // We're using Vite for development, but configuring Next.js for compatibility
  // Use the existing public directory
  images: {
    domains: [],
  },
  webpack(config) {
    return config;
  },
}

module.exports = nextConfig;
