import { CategoryType } from "../categoryTypes";
import { ImageType, VideoType } from "../fileTypes";
import { ForumCommentType } from "../forumTypes";
import { UserType } from "../userTypes";
import { ContentStatus } from "./Status.type";

export type BlogType = {
  author: string;
  categories: { categories_id: CategoryType }[];
  content?: string;
  date_created: string;
  date_updated: string;
  external_links?: string;
  homepage_id?: string;
  id: string;
  slug: string;
  image: ImageType;
  status: ContentStatus;
  title: string;
  type: "blog" | "vlog";
  user_created: UserType;
  user_updated: UserType;
  video?: VideoType;
  youtube_embed: string;
  comments: ForumCommentType[];
  related: {
    related_vlogposts_id: BlogType;
  }[];
};
