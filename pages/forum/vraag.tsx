import { Container } from "@mui/system";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../components/buttons/Button";
import Dropdown from "../../components/form/Dropdown/Dropdown";
import Input from "../../components/form/Input/Input";
import TextArea from "../../components/form/TextArea/TextArea";
import { Grid, Hero } from "../../components/layout";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Section from "../../components/layout/Section/Section";
import { ColorSpan, H1, P } from "../../components/typography";
import { GENDERS } from "../../constants/genders";
import { ForumPostType } from "../../types/forumTypes";
import { postForum, uploadFile } from "../../utils/api";

export default function Vraag() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumPostType>();

  const submitForm = async (data: any) => {
    setIsLoading(true);

    try {
      await postForum(data);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<ForumPostType> = async ({
    attachment_image,
    ...rest
  }) => {
    if (attachment_image) {
      const file = await uploadFile(attachment_image[0]);
      submitForm({
        attachment_image: file.data.id,
        ...rest,
      });
    } else {
      submitForm(rest);
    }
  };

  return (
    <PageWrapper title="Vraag Insturen">
      <Hero>
        <Container>
          <Grid container style={{ marginBottom: 65 }}>
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
          <main style={{ paddingBottom: 100 }}>
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
                        options={GENDERS}
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
                      <Button loading={isLoading} disabled={isSubmitted}>
                        {isLoading && "bezig..."}
                        {isSubmitted && "Verzonden"}
                        {!isLoading && !isSubmitted && "Vraag insturen"}
                      </Button>
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
