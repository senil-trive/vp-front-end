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
import ContentCarousel from "../../../components/carousels/ContentCarousel";
import { Testimonial } from "../../../types/content-types/Testimonial.type";
import { ContentStatus } from "../../../types/content-types/Status.type";

type BuddyPageProps = {
  pageData: any;
  error?: boolean;
};

const TEMP_QUOTES: Testimonial[] = [
  {
    id: "test",
    title: "Jongen (14) over zijn Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Ze zorgt ervoor dat ik rustiger ben en niet met stomme dingen in mijn hoofd zit. Dat ik het meteen kan zeggen en alles kwijt kan wat mij dwars zit over de scheiding, en ook over andere dingen. Ik vind het fijn dat ik mijn Buddy daarvoor heb.",
  },
  {
    id: "test",
    title: "Meisje (19) over haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Het is fijn weer even m'n hart te kunnen luchten. De meeste mensen die ik tot nu toe heb gesproken, begrepen het namelijk niet écht. Dan kunnen ze het nog zo lief bedoelen, maar het geeft niet het gevoel dat je begrepen wordt, en dat voelt zo rot. Dankjewel voor al je lieve berichtjes steeds.",
  },
  {
    id: "test",
    title: "Meisje (12) tegen haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Ik heb eigenlijk niemand om mee te praten nu over hoe ik me echt voel behalve jij.",
  },

  {
    id: "test",
    title: "Meisje (21) over haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Ik ben zo blij dat ik dingen met mijn Buddy kan delen. Ik weet wel dat ze het niet kan oplossen, maar doordat ik het inspreek is het wel weer uit mijn hoofd en ik weet dat zij er niet over zal oordelen, bedankt daarvoor!",
  },

  {
    id: "test",
    title: "Jongen (12) tegen zijn Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Ik heb super goed nieuws, want toen ik net jou als Buddy kreeg voelde ik me echt niet goed en gewoon super slecht maar nu sinds ik al m'n gevoel heb verteld aan m'n vader voel ik me beter!",
  },

  {
    id: "test",
    title: "Jongen (12) over zijn Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Ze zorgt ervoor dat ik rustiger ben en niet met stomme dingen in mijn hoofd zit. Dat ik het meteen kan zeggen en alles kwijt kan wat mij dwars zit over de scheiding, en ook over andere dingen. Ik vind het fijn dat ik mijn Buddy daarvoor heb. Iemand waar ik contact mee heb, maar ook gewoon lekker mee kan kletsen.",
  },

  {
    id: "test",
    title: "Meisje (21) tegen haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Lieve Buddy, ondanks dat we elkaar nog helemaal niet zo lang kennen wil ik je toch laten weten dat je in korte tijd al veel voor me hebt betekend. Het voelt echt alsof ik een zus heb die precies weet wat ik voel. Je geeft me zelfvertrouwen. Dankjewel!",
  },

  {
    id: "test",
    title: "Meisje (10) tegen haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "villa pinedo",
    status: "published" as ContentStatus,
    description:
      "Maar nu ben jij een soort van mijn dagboek en het coole van dit dagboek is dat ze terug praat!",
  },
];

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
          <Hero center>
            <div className="flex flex-col items-center justify-center text-center max-w-2xl my-16">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                textToHighlight="buddy aanvragen"
              />
              <P>{pageData?.page_subtitle}</P>
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

            <Container maxWidth="xl">
              <div className="mt-14">
                <ContentCarousel slides={TEMP_QUOTES} />
              </div>
            </Container>

            {/* TODO: Update the commented code below
              Villa pinedo doens't any video's yet to fill this
            */}
            {/* <Container>
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
            </Container> */}
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
