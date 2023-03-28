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

export type ForumQuestionPageProps = {
  categories: CategoryType[];
};
