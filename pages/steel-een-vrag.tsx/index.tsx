import { Container, Grid } from "@mui/material";
import { Hero } from "../../components/layout";
import { H2, P, TitleWithHighlights } from "../../components/typography";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  getContentTags,
  getForumOverviewPageData,
  getForumPosts,
} from "../../utils/api";
import Button from "../../components/buttons/Button";
import { ForumPageProps } from "../../types/pageTypes";
import { ForumRequestType } from "../../types/forumrequestType";
import { postVolunteerApplication } from "../../utils/api";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import parseImageURL from "../../utils/parseImageURL";
import Input from "../../components/form/Input/Input";
import { useForm } from "react-hook-form";
import TextArea from "../../components/form/TextArea/TextArea2";
import Upload from "../../components/form/Upload/Upload";
const forumSortOptions = [
  { name: "Titel (a-z)", value: "content" },
  { name: "Titel (z-a)", value: "-content" },
  { name: "Auteur (a-z)", value: "user_name" },
  { name: "Auteur (z-a)", value: "-user_name" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

export const getServerSideProps = async () => {
  try {
    const pageReq = await getForumOverviewPageData();
    const tagsReq = await getContentTags();
    const forumReq = await getForumPosts({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
    });

    const pageRes = await pageReq.json();
    const forumRes = await forumReq.json();
    const tagsRes = await tagsReq.json();

    return {
      props: {
        pageData: pageRes.data || null,
        forumData: forumRes.data || null,
        totalPosts: forumRes.meta?.filter_count || null,
        tags: tagsRes.data || null,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

export default function Forum({
  pageData,
  forumData,
  totalPosts,
  tags,
}: ForumPageProps) {
  const [posts, setPosts] = useState(forumData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(totalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumRequestType>();

  const submitForm = async (data: ForumRequestType) => {
    setIsLoading(true);
    try {
      await postVolunteerApplication(data);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };
  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };

  const handleSearch = (x: any) => {
    console.log(x);
    setSearch(x.target.value);
    setCurrentPage(1);
  };

  const handleSort = (x: string) => {
    setSort(x);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file || null);
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
              ? `filter[categories][categories_id][id][_eq]=${selectedTag}`
              : ``,
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
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: pageData?.seo_description
          ? pageData?.seo_description
          : pageData?.page_subtitle,
        canonical: "https://www.villapinedo.nl/forum",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : "",
      }}
    >
      <Hero
        center
        imageUrl={"/header_forum.png"}
        style={{
          minHeight: 649,
          position: "relative",
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} md={8} className="w-[100%] mx-auto  mt-[-80px]">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                color="white"
                style={{
                  textAlign: "center",
                  padding: "0 24px",
                  fontSize: "64px",
                  fontWeight: "400",
                }}
              />
              <P
                color="white"
                variant="light"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "300",
                  marginBottom: "6px",
                }}
              >
                {pageData?.page_subtitle}
              </P>

              <div
                style={{ display: "flex", gap: 32, justifyContent: "center" }}
              >
                <Button
                  variant="white"
                  filled={false}
                  href="/ik-wil-een-buddy"
                  style={{
                    width: "auto",
                    padding: "16px 64px",
                    fontSize: "18px",
                    fontWeight: "300",
                    border: "1px solid #fff",
                  }}
                >
                  {pageData?.chat_button_label}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container className="mb-[80px] mt-[-79px] relative md:mb-[120px]">
          <div
            style={{
              backgroundImage: "url(" + "/forum-bg.png" + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              padding: "32px 32px",
              width: "1118px",
              margin: "0 auto",
              borderRadius: "8px",
            }}
          >
            {!isSubmitted ? (
              <form
                className="forum-from-dz"
                onSubmit={handleSubmit(submitForm)}
              >
                <Grid container spacing="33px" style={{ rowGap: "13px" }}>
                  <Grid item xs={12} md={4}>
                    <Input
                      label="Voornaam"
                      required
                      name="Je naam..."
                      placeholder="Je naam..."
                      register={register}
                      hasError={!!errors.first_name}
                      helperText={errors.first_name && "Vul je voornaam in"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Input
                      label="Leeftijd"
                      required
                      name="Jouw leeftijd..."
                      placeholder="Jouw leeftijd..."
                      register={register}
                      hasError={!!errors.last_name}
                      helperText={errors.last_name && "Vul je achternaam in"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Input
                      label="E-mail"
                      required
                      name="Je e-mailadres..."
                      placeholder="Je e-mailadres..."
                      register={register}
                      hasError={!!errors.last_name}
                      helperText={errors.last_name && "Vul je achternaam in"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Input
                      label="Woonplaats"
                      required
                      name="Je e-mailadres..."
                      placeholder="Je woonplaats..."
                      register={register}
                      hasError={!!errors.last_name}
                      helperText={errors.last_name && "Vul je achternaam in"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Input
                      label="Geslacht"
                      type="email"
                      required
                      name="email"
                      placeholder="Jouw geslacht..."
                      register={register}
                      hasError={!!errors.email}
                      helperText={errors.email && "Vul je e-mail adres in"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Input
                      label="Thema"
                      type="text"
                      required
                      name="city"
                      placeholder="Thema..."
                      register={register}
                      hasError={!!errors.city}
                      helperText={errors.city && "Vul je woonplaats in"}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Upload
                      label="Upload bestand"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextArea
                      label="Mijn vraag"
                      name="content"
                      placeholder="Vul hier jouw vraag in..."
                      required
                      register={register}
                      hasError={!!errors.content}
                      helperText={
                        !!errors.content ? "Dit veld is verplicht" : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <Button
                        loading={isLoading}
                        disabled={isSubmitted}
                        className="w-[100] bg-[#fff] text-[#FF971D] text-[18px] font-[400]"
                      >
                        {isLoading && "Bezig..."}
                        {isSubmitted && "Verzonden"}
                        {!isLoading &&
                          !isSubmitted &&
                          "ja, ik wil mijn vraag plaatsen"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16 mx-auto">
                <H2 variant="bold">Bedankt voor je aanmelding!</H2>
                <P>We nemen zo snel mogelijk contact met je op.</P>
              </div>
            )}
          </div>
        </Container>
      </main>
    </PageWrapper>
  );
}
