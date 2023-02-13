import { Container, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { INSTA_EMBED_POST } from "../../../constants/mockData";
import Card from "../../card/Card";
import BriefItem from "../../content-types/BriefItem/BriefItem";
import ForumPost from "../../content-types/ForumPost/ForumPost";
import InstagramPost from "../../content-types/InstagramPost/InstagramPost";
import VideoItem from "../../content-types/VideoItem/VideoItem";

const Wrapper = styled.div`
  margin-bottom: 32px;
`;

export function HomeGrid() {
  return (
    <Wrapper>
      <Container>
        <Grid container spacing={"22px"}>
          <Grid item xs={12} md={8}>
            <VideoItem
              title="Video titel komt hier"
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              subtitle="Hier komt een omschrijvende tekst"
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

          <Grid item xs={12} md={3}>
            <InstagramPost embedCode={INSTA_EMBED_POST} />
          </Grid>

          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={3}>
            <ForumPost
              author="Mathijs"
              age={18}
              likes={126}
              authorType="Buddy"
              postDate={new Date()}
              tags={["Tag 1", "Tag 2"]}
              title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
            />
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}
