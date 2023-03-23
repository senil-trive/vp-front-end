import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";
import { CategoryType } from "./categoryTypes";
import { BlogType } from "./content-types/Blog.type";
import { ForumPostType } from "./forumTypes";
import { Tag } from "./content-types/Tag.type";
import { FAQ } from "./content-types/FAQ.type";
import { ImageFileType } from "./fileTypes";

export type HomePageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
  };
  categories: CategoryType[];
  totalPosts: number;
  feed: FeedItem[];
};

export type BlogPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    search_bar_quote: string;
  };
  blogsData: BlogType[];
  totalPosts: number;
  tags: Tag[];
};

export type BlogDetailPageProps = {
  pageData?: BlogType;
};

export type ForumPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    submit_question_button_label: string;
    chat_button_label: string;
  };
  forumData: ForumPostType[];
  totalPosts: number;
  tags: Tag[];
};

export type ForumDetailPageProps = {
  pageData?: ForumPostType;
};

export type VolunteersFAQPageProps = {
  pageData: any;
  faqData: FAQ[];
  totalFaqs: number;
  error?: boolean;
};

export type TheBookPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    page_title_highlighted: [{ value: string }];

    media_section_1_title: string;
    media_section_1_title_highlighted: [{ value: string }];
    media_section_1_description: string;
    media_section_1_image: ImageFileType;
    media_section_1_button_label: string;
    media_section_1_button_url: string;
  };
};

// const pageData = {
//   page_title: "Het boek dat er voor jou is als je ouders uit elkaar gaan/zijn",
//   page_subtitle: "Je hoeft het niet alleen te doen",
//   media_section_1: {
//     title: "Een Buddy in een boek",
//     title_highlighted: "Buddy",
//     description: `<p>In dit boek lees je allemaal echte verhalen van onszelf en andere kinderen met gescheiden ouders. Want er gebeurt tijdens een scheiding superveel in een korte tijd. De een moet verhuizen, bij de ander praten de ouders (even) niet meer met elkaar of maken ze juist veel ruzie.</p>
//     <p>Dit boek gaat over heen en weer gaan tussen ouders. Over schuldgevoel (wij dachten weleens dat het door ons kwam dat ze gescheiden waren). Over de hoop dat ze weer bij elkaar komen (of juist he-le-maal niet!). En al die andere dingen die je door de scheiding van je ouders meemaakt en voelt. We hebben dit boek met veel liefde gemaakt om het leven voor jou iets makkelijker te maken.</p>
//     <p>Want hoe je je ook voelt, weet dat je niet alleen bent. En als je het even niet meer weet: dan weten
//     wij de weg.</p>`,
//     image:
//       "https://www.villapinedo.nl/wp-content/uploads/2021/05/Hartje-ouders.png",
//     button_label: "Bestel het boek",
//     button_url:
//       "https://www.bol.com/nl/nl/p/je-hoeft-het-niet-alleen-te-doen/9300000016554829/?bltgh=vIRmuVSPRfHepjrkXPpE-Q.2_9.10.ProductTitle",
//   },
// };
