/** @type {import('next').NextConfig} */
const nextConfig = {
  // mapbox-gl ships untranspiled modern syntax.
  transpilePackages: ["mapbox-gl"],
  // Prevent Next.js from adding its own X-Powered-By header (information disclosure).
  poweredByHeader: false,
};

export default nextConfig;
