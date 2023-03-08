import { Grid, Hero } from "../components/layout";
import { H1, P } from "../components/typography";

import { Container } from "@mui/material";
import { FeedItem, HomeGrid } from "../components/layout/HomeGrid/HomeGrid";
import PageWrapper from "../components/layout/PageWrapper/PageWrapper";
import TagList from "../components/buttons/TagList/TagList";
import {
  getCategories,
  getForumPosts,
  getHomeData,
  getLetters,
  getPosts,
} from "../utils/api";
import { HomePageProps } from "../types/pageTypes";
import { POST_PER_PAGE } from "../constants/app-configs";
import { shuffle } from "../utils/feed-utils";
import { BlogType } from "../types/content-types/Blog.type";
import { Letter } from "../types/content-types/Letter.type";
import { ForumPostType } from "../types/forumTypes";

const generateFeed = ({
  blogs,
  letters,
  forum,
}: {
  blogs: BlogType[];
  letters: Letter[];
  forum: ForumPostType[];
}) => {
  let res: FeedItem[] = [];

  blogs?.forEach((item) => {
    res.push({ type: "blog", content: item });
  });
  letters?.forEach((item) => {
    res.push({ type: "letter", content: item });
  });
  forum?.forEach((item) => {
    res.push({ type: "forum", content: item });
  });

  // randomize content
  res = shuffle(res);

  // TODO: replace with real video content
  // Add video item at the very beginning
  res.splice(0, 0, { type: "video", content: { title: "video-2" } });

  // Add a video item to 4th place
  res.splice(4, 0, { type: "video", content: { title: "video-2" } });

  return res;
};

export const getServerSideProps = async () => {
  try {
    const pageReq = await getHomeData();
    const blogsReq = await getPosts({ postPerPage: POST_PER_PAGE });
    const forumReq = await getForumPosts({
      postPerPage: POST_PER_PAGE,
    });
    const lettersReq = await getLetters({
      postPerPage: POST_PER_PAGE,
    });
    const categoriesReq = await getCategories();

    const pageRes = await pageReq.json();
    const blogsRes = await blogsReq.json();
    const forumRes = await forumReq.json();
    const lettersRes = await lettersReq.json();
    const categoriesRes = await categoriesReq.json();

    return {
      props: {
        pageData: pageRes.data,
        feed: generateFeed({
          blogs: blogsRes.data,
          forum: forumRes.data,
          letters: lettersRes.data,
        }),
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

export default function Home({ pageData, categories, feed }: HomePageProps) {
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

        <HomeGrid feed={feed} />
      </main>
    </PageWrapper>
  );
}
