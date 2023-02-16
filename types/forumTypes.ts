export type ForumPostType = {
  user_name: string;
  user_email: string;
  user_age: number;
  user_gender: string;
  content: string;
  attachment_image: File[];
  comments: [];
  homepage_id: string;
  likes: string;
  status: "draft";
};
