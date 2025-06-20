import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'images.pexels.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'pixabay.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'chuckmissler.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'ground.news',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'derekprince.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'johnlennox.org',
        protocol: 'https',
        port: '',
      },
    ]
  }
};

export default nextConfig;
