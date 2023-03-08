import { BlogType } from "./content-types/Blog.type";
import { ForumPostType } from "./forumTypes";
import { Tag } from "./content-types/Tag.type";

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
};

export type ForumDetailPageProps = {
  pageData?: ForumPostType;
};
