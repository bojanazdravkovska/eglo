// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Point this to your config file at the project root
const withNextIntl = createNextIntlPlugin("./next-intl.config.ts");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net/api/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
