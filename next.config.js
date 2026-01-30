/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR mode (no output: export)
  basePath: '/photopick',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
      },
    ],
  },
};

module.exports = nextConfig
