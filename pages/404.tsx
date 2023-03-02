import React from "react";
import BreadCrumbs from "../components/layout/BreadCrumbs/BreadCrumbs";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../components/typography";

const NotFoundPage = () => {
  return (
    <PageWrapper>
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <H1 variant="bold">Oeps! Deze pagina bestaat niet.</H1>
          <P>Helaas hebben we de opgevraagde pagina niet kunnen vinden.</P>
        </div>
      </main>
    </PageWrapper>
  );
};

export default NotFoundPage;
