import { Container } from "@mui/material";
import TagList from "../components/buttons/TagList/TagList";
import DisplayDropdown from "../components/form/Dropdown/DisplayDropdown";
import { Grid, Hero } from "../components/layout";
import { HomeGrid } from "../components/layout/HomeGrid/HomeGrid";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import { H1, P } from "../components/typography";
import { FEED_TAGS } from "../constants/mockData";

export default function Home() {
  return (
    <PageWrapper>
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                Ik zit op de{" "}
                <DisplayDropdown
                  options={[{ name: "Basisschool", value: "basisschool" }]}
                />
                <br />
                daarnaast kan je mij vinden op de{" "}
                <DisplayDropdown
                  options={[{ name: "Manege", value: "manege" }]}
                />
              </H1>

              <P variant="light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </P>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>
      <main>
        <Container>
          <Grid container style={{ marginBottom: "32px" }}>
            <Grid item xs={12}>
              <TagList tags={FEED_TAGS} />
            </Grid>
          </Grid>
        </Container>

        <HomeGrid />
      </main>
    </PageWrapper>
  );
}
