import { Container, Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import BriefItem from "../../components/content-types/BriefItem/BriefItem";
import SearchResultItem from "../../components/content-types/SearchResultItem/SearchResultItem";
import Input from "../../components/form/Input/Input";
import SearchIcon from "../../components/icons/SearchIcon/SearchIcon";
import { Footer, Header, Hero } from "../../components/layout";
import { H1, P } from "../../components/typography";

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

  const handleSearch = (x: string) => {
    console.log(x);
  };

  return (
    <div>
      <Head>
        <title>
          Zoekresultaten q Villa Pinedo - Voor kinderen met gescheiden ouders
        </title>
        <meta
          name="description"
          content="Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Villa Pinedo op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                11 resultaten gevonden
              </H1>

              <P variant="light" style={{ textAlign: "center" }}>
                U heeft gezocht op zoekterm `{q}`
              </P>

              <div>
                <Input
                  iconLeft={<SearchIcon />}
                  placeholder="Zoeken..."
                  onChange={handleSearch}
                />
              </div>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container>
          <Grid container spacing={"22px"}>
            <Grid item md={4}>
              <SearchResultItem
                amount={3}
                resultTitleSuffix={<span>in ons Forum</span>}
                list={items}
              />
            </Grid>
            <Grid item md={4}>
              <SearchResultItem
                colorVariant={2}
                amount={3}
                resultTitleSuffix={<span>in ons Forum</span>}
                list={items}
              />
            </Grid>
            <Grid item md={4}>
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

      <Footer />
    </div>
  );
}
