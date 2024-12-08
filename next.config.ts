import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false; // Ensure `fs` module is not bundled on the client side
    }

    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      use: "file-loader", // Use file-loader to handle the worker file
    });

    return config;
  },
};

export default nextConfig;
