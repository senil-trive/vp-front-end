import "../styles/globals.css";

import type { AppProps } from "next/app";
import AppProviders from "../providers/AppProviders";
import { DefaultSeo } from "next-seo";
import MaintenanceModal from "../components/modals/MaintenanceModal/Maintenance";
import { Open_Sans } from "@next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as fbq from "../lib/fpixel";
import Script from "next/script";

const openSans = Open_Sans({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return <MaintenanceModal />;
  }
  // useEffect(() => {
  //   fbq.pageview();

  //   // const handleRouteChange = () => {
  //   //   fbq.pageview();
  //   // };
  //   // router.events.on("routeChangeComplete", () => handleRouteChange());
  //   // return () => {
  //   //   router.events.off("routeChangeComplete", () => handleRouteChange());
  //   // };
  // }, []);

  return (
    <div className={openSans.className}>
      <AppProviders>
        <DefaultSeo
          title="Villa Pinedo"
          description="Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Villa Pinedo op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen."
          openGraph={{
            type: "website",
            locale: "nl_NL",
            url: "https://www.villapinedo.nl",
            siteName: "Villa Pinedo",
          }}
          twitter={{
            handle: "@VillaPinedo",
            site: "@VillaPinedo",
            cardType: "summary_large_image",
          }}
        />
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
          }}
        />
        <Component {...pageProps} />
      </AppProviders>
    </div>
  );
}
