import { CategoryType } from "./categoryTypes";
import { ContentStatus } from "./content-types/Status.type";

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
  user_image?: { id: string };
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
  user_postcode?: string;
  blog_post?: string;
  status: ContentStatus;
  child_comments: ForumCommentType[];
  parent_comment: ForumCommentType;
  residence: string;
  theme: string;
  doc_: string;
};
export type LetterDownloadType = {
  id: string;
  date_created: string;
  date_updated: string;
  user_name: string;
  user_email: string;
  pdf_language: string;
  post_code: string;
  tips_inspiration_email: boolean;
};

export type MotivationType = {
  id: string;
  date_created: string;
  date_updated: string;
  volunteeratvillapinedo: string;
  yourexperiences: string;
  volunteerforchildren: string;
};
export type AboutVolunteerType = {
  id: string;
  date_created: string;
  date_updated: string;
  your_initials: string;
  first_name: string;
  surname: string;
  gender: string;
  birth_date: string;
  email_address: string;
  address: string;
  phone_number: string;
  know_about_us: string;
  know_from?: string;
};
export type TrainingType = {
  id: string;
  date_created: string;
  date_updated: string;
} & Record<string, boolean | undefined>;
