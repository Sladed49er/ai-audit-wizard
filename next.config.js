/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,    // ← turn off TS for prod builds
  },
  eslint: {
    ignoreDuringBuilds: true,   // ← optional: don’t block on ESLint either
  },
};
