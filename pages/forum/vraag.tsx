import { Container } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../components/buttons/Button";
import Dropdown from "../../components/form/Dropdown/Dropdown";
import { Form } from "../../components/form/Form/Form";
import Input from "../../components/form/Input/Input";
import TextArea from "../../components/form/TextArea/TextArea";
import { Grid, Hero } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Section from "../../components/layout/Section/Section";
import { ColorSpan, H1, P } from "../../components/typography";
import ENDPOINTS from "../../constants/endpoints";

type Inputs = {
  user_name: string;
  user_email: string;
  user_age: number;
  user_gender: string;
  content: string;
  attachment_image: string;
};

const genders = [
  { name: "Man", value: "m" },
  { name: "Vrouw", value: "v" },
  { name: "Zeg ik liever niet", value: "o" },
];

export default function Vraag() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch(`${ENDPOINTS.COLLECTIONS}/forum_posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    console.log(res.json());
  };

  return (
    <PageWrapper title="Vraag Insturen">
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1 style={{ textAlign: "center", padding: "0 24px" }}>
                Stuur je
                <ColorSpan variant="info"> vraag</ColorSpan> in
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing="33px">
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Voornaam"
                        name="user_name"
                        register={register}
                        hasError={!!errors.user_name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Leeftijd"
                        type="number"
                        name="user_age"
                        register={register}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        label="Email adres"
                        type="email"
                        name="user_email"
                        register={register}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Dropdown
                        options={genders}
                        label="Geslacht"
                        name="user_gender"
                        register={register}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        label="Upload bestand"
                        type="file"
                        name="attachment_image"
                        register={register}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        label="Bericht *"
                        name="content"
                        required
                        register={register}
                        hasError={!!errors.content}
                        helperText={
                          !!errors.content ? "This field is required" : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <P variant="light">* Verplichte velden</P>
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
