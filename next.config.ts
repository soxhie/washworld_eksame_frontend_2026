import type { NextConfig } from "next";

const nextConfig: NextConfig = {
allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.150", "192.168.1.7"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "washworld-wordpress-production.storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
