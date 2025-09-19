/**
 * This config sets up a proxy for Next.js API routes to the backend Express server.
 * You may need to run the backend on port 3001 for this to work.
 */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:3001/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
