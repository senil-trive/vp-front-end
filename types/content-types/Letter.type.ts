import { ContentStatus } from "./Status.type";

export type Letter = {
  id: string;
  slug: string;
  status: ContentStatus;
  title: string;
  title_highlighted: string;
  detail_title: string;
  detail_title_highlighted: string;
  description: string;
  content: string;
  categories: any[];
  downloadable_document: any;
  image: any;
};
