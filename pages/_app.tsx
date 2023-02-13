import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "@next/font/google";

import MaintenanceModal from "../components/modals/MaintenanceModal/Maintenance";
import AppProviders from "../providers/AppProviders";

const openSans = Open_Sans({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return <MaintenanceModal />;
  }

  return (
    <div className={openSans.className}>
      <AppProviders>
        <Component {...pageProps} />
      </AppProviders>
    </div>
  );
}
