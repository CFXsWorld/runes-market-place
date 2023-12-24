/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/getCfxsListTest",
        destination: "http://test.conins.io/test",
      },
      {
        source: "/getCfxsList",
        destination: "http://test.conins.io/",
      },
      {
        source: "/getCfxsNewList",
        destination: "http://test.conins.io/newlist",
      },
      {
        source: "/del",
        destination: "http://test.conins.io/del",
      },
      {
        source: "/delPre",
        destination: "http://test.conins.io/del/pre",
      },
      {
        source: "/sync",
        destination: "http://test.conins.io/sync",
      },
    ];
  },
  distDir: "dist",
  swcMinify: false,
};

module.exports = nextConfig;
