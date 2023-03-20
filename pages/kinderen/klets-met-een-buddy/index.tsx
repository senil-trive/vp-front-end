import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { H1, H3, P, TitleWithHighlights } from "../../../components/typography";

import Button from "../../../components/buttons/Button";
import CTAItem from "../../../components/content-types/CTAItem/CTAItem";
import { Container } from "@mui/material";
import ENDPOINTS from "../../../constants/endpoints";
import FAQList from "../../../components/content-types/FAQList/FAQList";
import { Hero } from "../../../components/layout";
import PageWrapper from "../../../components/layout/PageWrapper/PageWrapper";
import TextItem from "../../../components/content-types/TextItem/TextItem";
import VideoItem from "../../../components/content-types/VideoItem/VideoItem";
import parseImageURL from "../../../utils/parseImageURL";
import { useTheme } from "styled-components";

type BuddyPageProps = {
  pageData: any;
  error?: boolean;
};

export const getServerSideProps = async () => {
  // fetch page data from API

  try {
    const pageReq = await fetch(
      `${ENDPOINTS.COLLECTIONS}/buddy_page?fields=*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pageRes = await pageReq.json();

    return {
      props: {
        pageData: pageRes.data,
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

const BuddyPage: React.FC<BuddyPageProps> = ({ pageData }) => {
  const { colors } = useTheme();

  return (
    <div>
      <PageWrapper
        title={pageData?.page_title}
        description={pageData?.page_subtitle}
      >
        <main>
          <Hero>
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                textToHighlight="buddy aanvragen"
              />
              <P>{pageData?.page_subtitle}</P>
              <div className="flex gap-4 mt-14 w-[80%]">
                <Button onClick={() => alert("Pizza: 🍕")}>
                  {pageData?.header_button_1_label}
                </Button>
                <Button variant="info" onClick={() => alert("Pizza: 🍕")}>
                  {pageData?.header_button_2_label}
                </Button>
              </div>
            </div>
          </Hero>

          {pageData?.media_items?.map((item: any, index: number) => (
            <section className="my-[200px]" key={item?.id}>
              <Container>
                <TextItem
                  rtl={index % 2 !== 0}
                  title={item?.title}
                  titleHighlighted={item?.title_highlighted}
                  content={item?.description}
                  imageURL={parseImageURL(item?.image?.id)}
                  imageAlt={item?.image?.title}
                  showAppStoreButtons={true}
                  showButton={item?.show_button}
                  buttonLabel={item?.button_label}
                  buttonURL={item?.button_url}
                  buttonVariant="primary"
                />
              </Container>
            </section>
          ))}

          <section
            className="my-[80px] text-center py-20"
            style={{
              backgroundColor: colors.tertiary.light,
            }}
          >
            <Container>
              <div className="flex flex-col items-center justify-center ">
                <H3 variant="bold" color="primary">
                  {pageData?.cta_section_title}
                </H3>
                <P className="max-w-4xl">{pageData?.cta_section_subtitle}</P>
              </div>
            </Container>

            <Container maxWidth="xl">
              <div className="grid md:grid-cols-4 gap-8 mt-14 mx-auto">
                <CTAItem
                  title={pageData?.cta_block_1_title}
                  description={pageData?.cta_block_1_description}
                />
                <CTAItem
                  title={pageData?.cta_block_2_title}
                  description={pageData?.cta_block_2_description}
                />
                <CTAItem
                  title={pageData?.cta_block_3_title}
                  description={pageData?.cta_block_3_description}
                />
                <CTAItem
                  title={pageData?.cta_block_4_title}
                  description={pageData?.cta_block_4_description}
                />
              </div>
            </Container>

            <Container>
              <div className="flex flex-col items-center justify-center my-20 ">
                <H3 variant="bold" color="primary">
                  {pageData?.cta_section_footer_title}
                </H3>
                <P className="max-w-4xl">
                  {pageData?.cta_section_footer_subtitle}
                </P>

                <div className="flex gap-8 sm:w-[300px] md:w-[600px]">
                  <Button href={pageData?.cta_section_footer_ios_url}>
                    <FaAppStoreIos size={25} />
                    App Store
                  </Button>
                  <Button href={pageData?.cta_section_footer_android_url}>
                    <FaGooglePlay size={25} />
                    Google Play
                  </Button>
                </div>
              </div>
            </Container>
          </section>

          <section className="my-[80px] text-center">
            <Container>
              <div className="flex flex-col items-center justify-center ">
                <H3 variant="bold" color="primary">
                  {pageData?.stories_section_title}
                </H3>
                <P className="max-w-4xl">
                  {pageData?.stories_section_subtitle}
                </P>
              </div>
            </Container>

            <Container>
              <div className="grid md:grid-cols-3 gap-8 mt-14 mx-auto">
                {pageData?.featured_stories?.map((video: any) => (
                  <VideoItem
                    title={video.title}
                    subtitle={video.subtitle}
                    src={video.video_file?.url}
                    key={video.id}
                    poster={parseImageURL(video.video_cover_image?.id)}
                  />
                ))}
              </div>
            </Container>
          </section>

          <FAQList
            title={pageData?.faq_section_title}
            items={pageData?.featured_faqs}
          />
        </main>
      </PageWrapper>
    </div>
  );
};

export default BuddyPage;
