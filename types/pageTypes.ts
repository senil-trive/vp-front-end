import { BlogType } from "./content-types/Blog.type";

export type BlogPageProps = {
  pageData?: {
    page_title: string;
    page_subtitle: string;
    search_bar_quote: string;
  };
  blogsData: BlogType[];
  totalPosts: number;
};

export type BlogDetailPageProps = {
  pageData?: BlogType;
};
