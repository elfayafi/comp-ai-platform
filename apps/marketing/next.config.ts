import type { NextConfig } from 'next';
import path from 'path';
import './src/env.mjs';

const config: NextConfig = {
  transpilePackages: ['@compiel/ui', '@compiel/db'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.trycompiel.com',
      },
    ],
  },
  // PostHog proxy for better tracking
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default config;
