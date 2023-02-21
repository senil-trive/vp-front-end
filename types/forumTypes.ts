export type ForumPostType = {
  id: string;
  date_created: string;
  date_updated: string;
  user_name: string;
  user_email: string;
  user_age: number;
  user_gender: string;
  content: string;
  attachment_image: File[];
  comments: ForumCommentType[];
  homepage_id: string;
  likes: string;
  status: "draft";
};

export type ForumCommentType = {
  id: string;
  date_created: string;
  date_updated: string;
  user_name: string;
  user_email: string;
  user_age: number;
  user_gender: string;
  content: string;
  // attachment_image: File[];
  forum_post?: string;
  blog_post?: string;
  status: "draft";
};
