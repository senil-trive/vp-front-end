import { ContentStatus } from "./Status.type";

export type Letter = {
  id: string;
  status: ContentStatus;
  title: string;
  title_highlighted: string;
  description: string;
  categories: any[];
  downloadable_document: any;
  image: any;
};
