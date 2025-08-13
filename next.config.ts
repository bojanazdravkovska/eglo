// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Point this to your config file at the project root
const withNextIntl = createNextIntlPlugin("./next-intl.config.ts");

const nextConfig: NextConfig = {
  // ...any other Next.js options you use
};

export default withNextIntl(nextConfig);
