/** @type {import('next').NextConfig} */
const nextConfig = {
  // mapbox-gl ships untranspiled modern syntax.
  transpilePackages: ["mapbox-gl"],
};

export default nextConfig;
