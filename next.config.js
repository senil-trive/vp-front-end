/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["admin.villapinedo.nl", "randomuser.me"],
  },
  async redirects() {
    return [
      /**
       * Redirects to the blogs and vlog
       */
      {
        source: "/blog/:path*",
        destination: "/kinderen/verhalen/:path*",
        permanent: false,
      },
      {
        source: "/filmpjes/:path*",
        destination: "/kinderen/verhalen/:path*",
        permanent: false,
      },
      {
        source: "/in-de-media/:path*",
        destination: "/kinderen/verhalen/:path*",
        permanent: false,
      },
    ];
  },
};

if (!process.env.LOCAL) {
  moduleExports.sentry = {
    hideSourceMaps: true,
  };
}

const sentryWebpackPluginOptions = {
  token: process.env.SENTRY_AUTH_TOKEN,
  // silent: true, // Suppresses all logs
};

module.exports = !process.env.LOCAL
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  : moduleExports;
