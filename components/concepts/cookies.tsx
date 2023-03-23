import { Container } from "@mui/system";
import React from "react";
import { Hero } from "../layout";
import BreadCrumbs from "../layout/BreadCrumbs/BreadCrumbs";
import PageWrapper from "../layout/PageWrapper/PageWrapper";
import { H1, P, TitleWithHighlights } from "../typography";
import TextList from "../typography/TextList/TextList";

const CookiesPage = () => {
  return (
    <PageWrapper>
      <BreadCrumbs />

      <main style={{ marginBottom: "80px" }}>
        <Hero>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
            <TitleWithHighlights
              highlightColor="info"
              text="Cookies"
              headerElement="h1"
              color="primary"
            />
            <P>
              Vrijwel elke website maakt gebruik van cookies. Villa Pinedo ook.
              Waarom gebruiken wij cookies?
            </P>
          </div>
        </Hero>

        <section className="py-[80px]">
          <Container>
            <TextList>
              <li>om de site goed te laten functioneren</li>
              <li>om het gebruik van de website bij te kunnen houden</li>
              <li>om het gebruiksgemak te vergroten</li>
              <li>om de site te verrijken met persoonlijke inhoud</li>
              <li>om social media-functies mogelijk te maken</li>
            </TextList>
          </Container>
        </section>
      </main>
    </PageWrapper>
  );
};

export default CookiesPage;
