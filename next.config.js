/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // If you're deploying to a repository page like https://username.github.io/repo
  // uncomment and set `basePath` and `assetPrefix` to `/repo`.
  // basePath: '/repo',
  // assetPrefix: '/repo',
};

module.exports = nextConfig;
