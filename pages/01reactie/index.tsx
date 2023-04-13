import { Grid, Hero, Pagination } from "../../components/layout";
import { H1, P } from "../../components/typography";
import { useEffect, useState } from "react";

import { CircleSpinner } from "react-spinners-kit";
import CollectionSearchBar from "../../components/form/CollectionSearchBar/CollectionSearchBar";
import { Container } from "@mui/system";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { ForumPostType } from "../../types/forumTypes";
import Link from "next/link";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import SortBar from "../../components/form/SortBar/SortBar";
import { getForumPosts } from "../../utils/api";

const forumSortOptions = [
  { name: "Titel (a-z)", value: "content" },
  { name: "Titel (z-a)", value: "-content" },
  { name: "Auteur (a-z)", value: "user_name" },
  { name: "Auteur (z-a)", value: "-user_name" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

interface ZeroResponsesPageProps {
  forumData: ForumPostType[];
  totalPosts: number;
}

export const getServerSideProps = async () => {
  try {
    const forumReq = await getForumPosts({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
      filter: `filter[count(comments)][_lte]=1`,
    });

    const forumRes = await forumReq.json();

    return {
      props: {
        forumData: forumRes.data,
        totalPosts: forumRes.meta.filter_count,
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

export default function ZeroResponsesPage({
  forumData,
  totalPosts,
}: ZeroResponsesPageProps) {
  const [posts, setPosts] = useState(forumData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(totalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };

  const handleSearch = (x: string) => {
    setSearch(x);
    setCurrentPage(1);
  };

  const handleSort = (x: string) => {
    setSort(x);
  };

  useEffect(() => {
    const getPaginatedPost = async () => {
      setIsLoading(true);
      try {
        const req = await getForumPosts({
          postPerPage: POST_PER_PAGE,
          page: currentPage,
          search,
          sort,
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter[categories][categories_id][id][_eq]=${selectedTag}&filter[count(comments)][_lte]=1`
              : `filter[count(comments)][_lte]=1`,
        });
        const res = await req.json();

        setPosts(res.data ?? []);
        setTotalCount(res?.meta?.filter_count || 0);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    getPaginatedPost();
  }, [currentPage, search, sort, selectedTag]);

  return (
    <PageWrapper
      seo={{
        title: "Vragen met 0 of 1 reactie(s)",
        description:
          "Hier vind je alle vragen met 1 of 0 reacties. Beantwoord ze en help andere kinderen!",
        canonical: "https://www.villapinedo.nl/01reactie",
      }}
    >
      <Hero>
        <Container>
          <Grid container>
            <Grid item xs={0} md={2} lg={3} />
            <Grid item xs={12} md={8} lg={6}>
              <H1
                variant="bold"
                style={{ textAlign: "center", padding: "0 24px" }}
              >
                Vragen met 0 reacties
              </H1>
              <P variant="light" className="text-center">
                Hier vind je alle vragen met 1 of 0 reacties.
              </P>
            </Grid>
            <Grid item xs={0} md={2} lg={3} />
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <CollectionSearchBar onSearch={handleSearch} />

        <Container style={{ margin: "56px auto" }}>
          <Grid container spacing={"34px"}>
            {isLoading ? (
              <CircleSpinner size={34} color="#fff" />
            ) : (
              <>
                <Grid item xs={12} md={9}>
                  <P color="primary">
                    {totalCount} {totalCount === 1 ? "vraag" : "vragen"}
                  </P>
                </Grid>
                <Grid item xs={12} md={3}>
                  <SortBar sortOptions={forumSortOptions} onSort={handleSort} />
                </Grid>
                {posts.map((item, index) => (
                  <Grid key={index} item xs={12} md={4}>
                    <Link href={`/kinderen/forum/${item.slug}`}>
                      <ForumPost
                        truncateContent
                        fullHeight={false}
                        gender={item.user_gender}
                        age={item.user_age}
                        authorType={item.user_name}
                        postDate={new Date(item.date_created)}
                        tags={
                          item.categories?.map(
                            (cat) => cat.categories_id.name
                          ) ?? []
                        }
                        title={
                          item.title ?? "Titel moet in CMS worden ingevoerd"
                        }
                        comments={item.comments.length}
                        content={item.content}
                      />
                    </Link>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Container>

        {totalCount / POST_PER_PAGE > 2 && (
          <Pagination
            total={Math.ceil(totalCount / POST_PER_PAGE)}
            truncated
            onChange={changePage}
          />
        )}
      </main>
    </PageWrapper>
  );
}
