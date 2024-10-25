/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // React Strict Mode
  swcMinify: true, // Enable SWC minification
  images: {
    domains: ['images.unsplash.com'], // Add the allowed external domains here
  },
};

export default nextConfig;
