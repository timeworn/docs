import type { NextConfig } from "next";
import nextra from "nextra";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.timeworn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.timeworn.net",
      },
    ],
  },
};

const withNextra = nextra({});

export default withNextra(nextConfig);
