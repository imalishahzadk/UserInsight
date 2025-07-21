/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  trailingSlash: true, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.botlync.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
    ],
  },
};

module.exports = nextConfig;
