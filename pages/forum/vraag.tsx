import { Container } from "@mui/system";
import Button from "../../components/buttons/Button";
import Dropdown from "../../components/form/Dropdown/Dropdown";
import Input from "../../components/form/Input/Input";
import TextArea from "../../components/form/TextArea/TextArea";
import { Grid, Hero } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Section from "../../components/layout/Section/Section";
import { ColorSpan, H1, P } from "../../components/typography";

const genders = [
  { name: "Man", value: "m" },
  { name: "Vrouw", value: "v" },
  { name: "Zeg ik liever niet", value: "o" },
];

export default function Vraag() {
  return (
    <PageWrapper title="Vraag Insturen">
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                Stuur je
                <ColorSpan variant="info">vraag</ColorSpan> in
              </H1>
              <P variant="light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </P>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
          <main>
            <Container>
              <Section>
                <form>
                  <Grid container spacing="33px">
                    <Grid item xs={12} md={6}>
                      <Input label="Voornaam" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input label="Leeftijd" type="number" />
                    </Grid>
                    <Grid item xs={12}>
                      <Input label="Email adres" type="email" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Dropdown options={genders} label="Geslacht" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input label="Leeftijd" type="number" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea label="Bericht" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Button>Vraag insturen</Button>
                    </Grid>
                  </Grid>
                </form>
              </Section>
            </Container>
          </main>
        </Container>
      </Hero>
    </PageWrapper>
  );
}
