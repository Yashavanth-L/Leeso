/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Deploy to https://yashavanth-l.github.io/Leeso/
  basePath: '/Leeso',
  assetPrefix: '/Leeso',
};

module.exports = nextConfig;
