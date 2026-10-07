import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image2url.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "files.catbox.moe" },
      { protocol: "https", hostname: "kiwanda-os.vercel.app" },
    ],
  },
};

export default nextConfig;
