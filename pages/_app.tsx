import "../styles/globals.css";
import type { AppProps } from "next/app";

import MaintenanceModal from "../components/modals/MaintenanceModal/Maintenance";
import AppProviders from "../providers/AppProviders";

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return <MaintenanceModal />;
  }

  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}
