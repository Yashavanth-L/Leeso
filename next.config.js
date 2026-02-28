/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Deploy to https://yashavanth-l.github.io/Leeso/
  basePath: isProd ? '/Leeso' : '',
  assetPrefix: isProd ? '/Leeso' : '',
};

module.exports = nextConfig;
