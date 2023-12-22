/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/getCfxsList",
        destination: "http://test.conins.io/",
      },
      {
        source: "/del",
        destination: "http://test.conins.io/del",
      },
    ];
  },
  distDir: "dist",
};

module.exports = nextConfig;
