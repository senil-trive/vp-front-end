import { Grid, Hero } from "../components/layout";
import { H1, P } from "../components/typography";

import { Container } from "@mui/material";
import DisplayDropdown from "../components/form/Dropdown/DisplayDropdown";
import { FEED_TAGS } from "../constants/mockData";
import { HomeGrid } from "../components/layout/HomeGrid/HomeGrid";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import TagList from "../components/buttons/TagList/TagList";
import { getCategories, getHomeData } from "../utils/api";
import { HomePageProps } from "../types/pageTypes";

export const getServerSideProps = async () => {
  try {
    const pageReq = await getHomeData();
    const categoriesReq = await getCategories();

    const pageRes = await pageReq.json();
    const categoriesRes = await categoriesReq.json();

    return {
      props: {
        pageData: pageRes.data,
        categories: categoriesRes.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

export default function Home({ pageData, categories }: HomePageProps) {
  console.log(categories);

  return (
    <PageWrapper
      title="Leeg je hoofd, lucht je hart"
      description="Praten, lachen, klagen of huilen omdat je ouders uit elkaar zijn kan hier bij Villa Pinedo. Stel jouw vragen aan anderen die begrijpen wat jij meemaakt en deel wat er in jouw hoofd en hart omgaat."
    >
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                {pageData?.page_title}
              </H1>

              <P variant="light">{pageData?.page_subtitle}</P>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>
      <main>
        <Container>
          <Grid container style={{ marginBottom: "32px" }}>
            <Grid item xs={12}>
              <TagList tags={categories.map((cat) => cat.name)} />
            </Grid>
          </Grid>
        </Container>

        <HomeGrid />
      </main>
    </PageWrapper>
  );
}
