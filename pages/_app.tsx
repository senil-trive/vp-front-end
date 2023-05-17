import "../styles/globals.css";

import type { AppProps } from "next/app";
import AppProviders from "../providers/AppProviders";
import { DefaultSeo } from "next-seo";
import MaintenanceModal from "../components/modals/MaintenanceModal/Maintenance";
import { Open_Sans } from "@next/font/google";

const openSans = Open_Sans({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_MAINTENANCE, "ugvghhggh");

  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return <MaintenanceModal />;
  }

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
        <Component {...pageProps} />
      </AppProviders>
    </div>
  );
}
