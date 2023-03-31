import { BlogType } from "./content-types/Blog.type";
import { CategoryType } from "./categoryTypes";
import { FAQ } from "./content-types/FAQ.type";
import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";
import { ForumPostType } from "./forumTypes";
import { ImageFileType } from "./fileTypes";
import { Tag } from "./content-types/Tag.type";

export type HomePageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
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
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
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
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
  };
  forumData: ForumPostType[];
  totalPosts: number;
  tags: Tag[];
};

export type ForumDetailPageProps = {
  pageData?: ForumPostType;
};

export type VolunteersFAQPageProps = {
  pageData: {
    page_title: string;
    page_subtitle?: string;
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
  };
  faqData: FAQ[];
  totalFaqs: number;
  error?: boolean;
};

export type TheBookPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    page_title_highlighted: [{ value: string }];
    seo_title: string;
    seo_description: string;
    seo_image: ImageFileType;
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
