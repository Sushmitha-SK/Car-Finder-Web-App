import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Allow HTTP
        hostname: '**', // Allow all hostnames
      },
      {
        protocol: 'https', // Allow HTTPS
        hostname: '**', // Allow all hostnames
      },
    ],
  },
};

export default nextConfig;
