/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
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
