import { Container, Grid } from "@mui/material";
import { H1, P } from "../../components/typography";

import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import { Hero } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React from "react";
import SearchBar from "../../components/form/SearchBar/SearchBar";
import SearchResultItem from "../../components/content-types/SearchResultItem/SearchResultItem";
import { useRouter } from "next/router";

// Temp searchresults
const items = [
  {
    name: "test 1",
    link: "test-1",
  },
  {
    name: "test 2",
    link: "test-2",
  },
  {
    name: "test 3",
    link: "test-3",
  },
];

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <PageWrapper title="Zoekresultaten">
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                11 resultaten gevonden
              </H1>

              <P variant="light" style={{ textAlign: "center" }}>
                Je hebt gezocht op `{q}`
              </P>

              <div>
                <SearchBar />
              </div>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container>
          <Grid container spacing={"22px"}>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                amount={3}
                resultTitleSuffix={<span>in ons Forum</span>}
                list={items}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchResultItem
                colorVariant={2}
                amount={3}
                resultTitleSuffix={<span>in ons Forum</span>}
                list={items}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BriefItem
                imgSrc="https://picsum.photos/920/180"
                title="Brief voor alle kinderen"
                category="Thema"
                content="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de
              ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per
              jaar horen dat hun ouders gaan scheiden?"
                fileSrc="https://www.africau.edu/images/default/sample.pdf"
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </PageWrapper>
  );
}
