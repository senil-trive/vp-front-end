import { CategoryType } from "./categoryTypes";

export type ForumPostType = {
  id: string;
  date_created: string;
  date_updated: string;
  user_name: string;
  user_email: string;
  user_age: string;
  user_gender: string;
  title: string;
  content: string;
  attachment_image: File[];
  comments: ForumCommentType[];
  homepage_id: string;
  likes: string;
  status: "draft";
  slug: string;
  categories?: { categories_id: CategoryType }[];
};

export type ForumCommentType = {
  id: string;
  date_created: string;
  date_updated: string;
  user_name: string;
  user_email: string;
  user_age: string;
  user_gender: string;
  content: string;
  // attachment_image: File[];
  forum_post?: string;
  blog_post?: string;
  status: "draft";
  child_comment: ForumCommentType;
  parent_comment: ForumCommentType[];
};
