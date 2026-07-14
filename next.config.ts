import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.washop.co.il" }],
        destination: "https://washop.co.il/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
