
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  // Ensure we can use the 'use client' directive in files
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig;
