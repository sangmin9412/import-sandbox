import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().getTime().toString(),
  }, // 환경변수 설정
  turbopack: {
    rules: {
      "*.svg": ["@svgr/webpack"],
    },
  },
};

export default nextConfig;
