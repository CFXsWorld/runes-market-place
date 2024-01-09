/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: 'dist',
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
      // mainnet
      {
        source: '/getCfxsList',
        destination: 'https://api.conins.io/main/',
      },
      {
        source: '/getCfxsNewList',
        destination: 'https://api.conins.io/main/newlist',
      },
      {
        source: '/del',
        destination: 'https://api.conins.io/main/del',
      },
      {
        source: '/delPre',
        destination: 'https://api.conins.io/main/del/pre',
      },
      {
        source: '/sync',
        destination: 'https://api.conins.io/main/sync',
      },
      {
        source: '/getMarketspaceCfxs',
        destination: 'https://api.conins.io/shop/goods',
      },
      {
        source: '/getMyListedCfxs',
        destination: 'https://api.conins.io/shop/my/',
      },
      // testnet
      {
        source: '/getCfxsNewListTest',
        destination: 'https://api.conins.io/test/newlist',
      },
      {
        source: '/getCfxsListTest',
        destination: 'https://api.conins.io/test/',
      },
      {
        source: '/getMarketspaceCfxsTest',
        destination: 'https://api.conins.io/test/shop/goods',
      },
      {
        source: '/getMyListedCfxsTest',
        destination: 'https://api.conins.io/test/shop/my/',
      },
    ];
  },
};

module.exports = nextConfig;
