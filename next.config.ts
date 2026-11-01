import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const config: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
};

export default createMDX()(config);
