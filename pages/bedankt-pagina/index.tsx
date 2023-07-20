import { Container, Grid } from "@mui/material";
import React from "react";
import { P, TitleWithHighlights } from "../../components/typography";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import { Hero } from "../../components/layout";
import Button from "../../components/buttons/Button";
import { HeroBannerWrapper } from "../../styles/global.styled";
import TextWithHighlights from "../../components/typography/TextWithHighlights";

const Bedankt: React.FC = () => {
  return (
    <PageWrapper
      seo={{
        title: "Bedankt Pagina",
        description:
          "Je motivatie wordt doorgenomen. Je krijgt van ons bericht met de officiële uitnodiging op de basistraining!",
        canonical: "https://www.villapinedo.nl//bedankt-pagina",
      }}
    >
      <Hero
        center
        imageUrl="/bedkant.png"
        style={{
          minHeight: 754,
          position: "relative",
        }}
        mbgn={"/bedkant.png"}
        mobileImageHeight={740}
      >
        <HeroBannerWrapper className="zoeken-page">
          <div className="title-wrap max-w-5xl">
            <TitleWithHighlights
              text="SUPER LEUK DAT JE JE HEBT AANGEMELD ALS VRIJWILLIGER BIJ VILLA PINEDO!"
              style={{
                textAlign: "center",
                margin: "0px",
                fontSize: "64px",
                fontWeight: "400",
              }}
              color="white"
            />
            <P
              color="white"
              variant="light"
              style={{
                textAlign: "center",
                fontSize: "18px",
                width: "568px",
                fontWeight: "300",
                margin: "32px auto 44px",
              }}
            >
              Je motivatie wordt doorgenomen. Je krijgt van ons bericht met de
              officiële uitnodiging op de basistraining!
            </P>

            <TextWithHighlights
              color="white"
              style={{ fontFamily: "Fjalla One !important" }}
              variant="light"
              text={"terug naar de homepagina"}
              textToHighlight={{
                word: "terug naar de homepagina",
                color: "#3FC7B4",
              }}
              className="new-bedankt-btn"
            />
          </div>
        </HeroBannerWrapper>
      </Hero>
    </PageWrapper>
  );
};

export default Bedankt;
