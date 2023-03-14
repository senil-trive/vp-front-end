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
       * Redirects for blogs and vlog
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

      /**
       * Redirects for forum
       */
      {
        source: "/forum/",
        destination: "/kinderen/forum/",
        permanent: false,
      },
      {
        source: "/forum/:path*",
        destination: "/kinderen/forum/:path*",
        permanent: false,
      },

      /**
       * Redirects for open brieven
       */
      {
        source: "/open-brieven/",
        destination: "/kinderen/open-brieven/",
        permanent: false,
      },
      {
        source: "/open-brief-aan-alle-kinderen-van-gescheiden-ouders/",
        destination:
          "/kinderen/open-brieven/aan-alle-kinderen-met-gescheiden-ouders",
        permanent: false,
      },
      {
        source: "/open-brief-aan-alle-gescheiden-ouders/",
        destination: "/kinderen/open-brieven/voor-je-ouders/",
        permanent: false,
      },
      {
        source: "/open-brief-aan-alle-nieuwe-partners-van-gescheiden-ouders/",
        destination:
          "/kinderen/open-brieven/voor-de-nieuwe-partner-van-papa-of-mama/",
        permanent: false,
      },

      // One open-brieven leads directly to a pdf file
      // {
      //   source:
      //     "https://www.villapinedo.nl/wp-content/uploads/2022/07/Open-Brief-Villa-Pinedo-Aan-alle-studenten-met-gescheiden-ouders.pdf",
      //   destination: "/kinderen/open-brieven/",
      //   permanent: false,
      // },
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
