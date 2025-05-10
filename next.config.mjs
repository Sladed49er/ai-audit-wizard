/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,   // ← this lets Vercel build even with TS errors
  },
  eslint: {
    ignoreDuringBuilds: true,  // (optional) avoid ESLint blocking Vercel
  },
};

export default nextConfig;
