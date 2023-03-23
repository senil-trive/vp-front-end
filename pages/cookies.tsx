import React from "react";
import BreadCrumbs from "../components/layout/BreadCrumbs/BreadCrumbs";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../components/typography";

const CookiesPage = () => {
  return (
    <PageWrapper>
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <H1 variant="bold">Cookies</H1>
          <P>
            Vrijwel elke website maakt gebruik van cookies. Villa Pinedo ook.
            Waarom gebruiken wij cookies?
          </P>

          <ul>
            <li>om de site goed te laten functioneren</li>
            <li>om het gebruik van de website bij te kunnen houden</li>
            <li>om het gebruiksgemak te vergroten</li>
            <li>om de site te verrijken met persoonlijke inhoud</li>
            <li>om social media-functies mogelijk te maken</li>
          </ul>
        </div>
      </main>
    </PageWrapper>
  );
};

export default CookiesPage;
