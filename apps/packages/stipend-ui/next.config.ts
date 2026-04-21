import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
};

const withMDX = createMDX({

});

const appConfig = withMDX(nextConfig);

export default appConfig;
