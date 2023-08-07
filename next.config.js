/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "admin.villapinedo.nl",
      "randomuser.me",
      "picsum.photos",
      "www.villapinedo.nl",
    ],
  },
  // async redirects() {
  //   return [
  //     /**
  //      * Redirects for blogs and vlog
  //      */
  //     {
  //       source: "/blog",
  //       destination: "/verhalen",
  //       permanent: false,
  //     },
  //     {
  //       source: "/blog/:path*",
  //       destination: "/verhalen/:path*",
  //       permanent: false,
  //     },
  //     {
  //       source: "/filmpjes/:path*",
  //       destination: "/verhalen/:path*",
  //       permanent: false,
  //     },
  //     {
  //       source: "/in-de-media/:path*",
  //       destination: "/verhalen/:path*",
  //       permanent: false,
  //     },

  //     /**
  //      * Redirects for forum
  //      */

  //     /**
  //      * Redirects for open brieven
  //      */
  //     {
  //       source: "/open-brieven",
  //       destination: "/open-brieven",
  //       permanent: false,
  //     },
  //     {
  //       source: "/open-brief-aan-alle-kinderen-van-gescheiden-ouders",
  //       destination: "/open-brieven/aan-alle-kinderen-met-gescheiden-ouders",
  //       permanent: false,
  //     },
  //     {
  //       source: "/open-brief-aan-alle-gescheiden-ouders",
  //       destination: "/open-brieven/voor-je-ouders",
  //       permanent: false,
  //     },
  //     {
  //       source: "/open-brief-aan-alle-nieuwe-partners-van-gescheiden-ouders",
  //       destination: "/open-brieven/voor-de-nieuwe-partner-van-papa-of-mama",
  //       permanent: false,
  //     },
  //     {
  //       source: "/open-brief-aan-alle-nieuwe-partners-van-gescheiden-ouders",
  //       destination: "/open-brieven/voor-de-nieuwe-partner-van-papa-of-mama",
  //       permanent: false,
  //     },
  //     {
  //       source: "/aan-alle-volwassenen",
  //       destination: "/open-brieven/voor-je-familie-en-vrienden",
  //       permanent: false,
  //     },
  //     {
  //       source: "/open-brief-aan-alle-leraren",
  //       destination: "/open-brieven/voor-je-leraar",
  //       permanent: false,
  //     },
  //     {
  //       source:
  //         "/open-brief-gescheiden-ouders-met-wie-wij-het-contact-even-zijn-verloren",
  //       destination: "/open-brieven/voor-als-je-even-geen-contact-hebt",
  //       permanent: false,
  //     },
  //     {
  //       source: "/aan-alle-gescheiden-ouders-met-een-kind-in-groep-8",
  //       destination: "/open-brieven/voor-als-je-in-groep-8-zit",
  //       permanent: false,
  //     },
  //     {
  //       source: "/aan-alle-gescheiden-ouders-met-een-eindexamenkandidaat",
  //       destination: "/open-brieven/voor-als-je-eindexamen-doet",
  //       permanent: false,
  //     },

  //     // Two open-brieven leads directly to a pdf file (Word Online-Buddy!)
  //     // {
  //     //   source:
  //     //     "https://www.villapinedo.nl/wp-content/uploads/2022/07/Open-Brief-Villa-Pinedo-Aan-alle-studenten-met-gescheiden-ouders.pdf",
  //     //   destination: "/open-brieven/??",
  //     //   permanent: false,
  //     // },
  //     // Aan alle kinderen met gescheiden ouders Lieve jij,
  //     // {
  //     //   source:
  //     //     "https://www.villapinedo.nl/wp-content/uploads/2022/07/Open-Brief-Aan-alle-kinderen-met-gescheiden-ouders-met-QR.pdf",
  //     //   destination: "/open-brieven/??",
  //     //   permanent: false,
  //     // },

  //     /**
  //      * Redirects for klets-met-een-buddy
  //      */
  //     {
  //       source: "/informatie-over-buddy",
  //       destination: "/klets-met-een-buddy",
  //       permanent: false,
  //     },

  //     /**
  //      * Redirect for vrijwilligers
  //      */
  //     {
  //       source: "/vrijwilligerswerk/aanmelden-als-vrijwilliger",
  //       destination: "/vrijwilligerswerk/aanmelden",
  //       permanent: false,
  //     },
  //     {
  //       source: "/trainingen-jongeren",
  //       destination: "/vrijwilligerswerk/trainingen",
  //       permanent: false,
  //     },
  //     {
  //       source: "/meest-gestelde-vragen",
  //       destination: "/vrijwilligerswerk/faq",
  //       permanent: false,
  //     },
  //     {
  //       source: "/meest-gestelde-vragen",
  //       destination: "/vrijwilligerswerk/faq",
  //       permanent: false,
  //     },

  //     /**
  //      * Redirect for boek
  //      */
  //     {
  //       source: "/boek-je-hoeft-het-niet-alleen-te-doen",
  //       destination: "/kinderen/boek-je-hoeft-het-niet-alleen-te-doen",
  //       permanent: false,
  //     },
  //   ];
  // },
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
