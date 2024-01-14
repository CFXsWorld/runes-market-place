/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // distDir: 'dist',
  swcMinify: false,
  webpack(config) {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/market',
        permanent: true,
      },
      {
        source: '/my',
        destination: '/my/cfxs',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api3.conins.io/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
