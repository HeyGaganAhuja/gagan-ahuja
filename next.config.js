
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // We're using the existing tsconfig.json which is read-only
    // This makes Next.js work with it without modification
    ignoreBuildErrors: false,
  },
  webpack(config) {
    return config;
  },
  // Use the existing public directory
  distDir: '.next',
  images: {
    domains: [],
  },
}

module.exports = nextConfig;
