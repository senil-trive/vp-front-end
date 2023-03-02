import React from "react";
import BreadCrumbs from "../components/layout/BreadCrumbs/BreadCrumbs";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../components/typography";

const ErrorPage = () => {
  return (
    <PageWrapper>
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <H1 variant="bold">Oeps! Er is een fout opgetreden.</H1>
          <P>
            Er is iets misgegaan bij het opvragen van de pagina. Probeer het
            later opnieuw.
          </P>
        </div>
      </main>
    </PageWrapper>
  );
};

export default ErrorPage;
