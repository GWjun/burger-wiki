import { withSentryConfig } from '@sentry/nextjs';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const domains = [
  // common
  { protocol: 'http', hostname: 'localhost', port: '3000' },
  { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
  { protocol: 'https', hostname: 'isjwiotgzqgcmfbunmzo.supabase.co' },

  // lotteria
  { protocol: 'https', hostname: 'img.lotteeatz.com' },
  // burgerking
  { protocol: 'https', hostname: 'd1cua0vf0mkpiy.cloudfront.net' },
  // nobrand
  { protocol: 'https', hostname: 'www.shinsegaefood.com' },
  // kfc
  { protocol: 'https', hostname: 'kfcapi.inicis.com' },

  // brand image
  { protocol: 'https', hostname: 'upload.wikimedia.org' },
  { protocol: 'https', hostname: 'www.lottegrs.com' },
  { protocol: 'https', hostname: 'www.kfckorea.com' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: domains.map((domain) => ({
      protocol: domain.protocol,
      hostname: domain.hostname,
      pathname: '/**',
      ...(domain.port && { port: domain.port }),
    })),
  },
};

export default withSentryConfig(withVanillaExtract(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'inha-univ-3o',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
