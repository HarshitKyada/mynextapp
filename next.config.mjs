/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true, // Enable SWC minification (optional)
  compiler: {
    react: {
      throwIfNamespace: false, // Disable namespace checking in React
    },
  },
  images: {
    domains: ['images.unsplash.com'], // Add the allowed external domains here
  },
};

export default nextConfig;
