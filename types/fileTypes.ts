export type ImageFileType = {
  charset?: string;
  description?: string;
  duration?: number;
  embed?: any;
  filename_disk: string;
  filename_download: string;
  filesize: number;
  height: number;
  id: string;
  location?: string;
  metadata: {};
  modified_by?: string;
  modified_on?: string;
  storage: string;
  tags: null;
  title: string;
  type: string;
  uploaded_by: { first_name?: string; last_name?: string };
  uploaded_on: string;
  width: number;
};

export type VideoFileType = {
  charset?: string;
  description?: string;
  duration?: number;
  embed?: any;
  filename_disk: string;
  filename_download: string;
  filesize: number;
  height: number;
  id: string;
  location?: string;
  metadata: {};
  modified_by?: string;
  modified_on?: string;
  storage: string;
  tags: null;
  title: string;
  type: string;
  uploaded_by: { first_name?: string; last_name?: string };
  uploaded_on: string;
  width: number;
};
