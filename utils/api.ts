import { MenuItem } from "../components/layout/Header/Header";
import ENDPOINTS from "../constants/endpoints";
import { CompanyInfo } from "../types/componayInfoTypes";

/**
 * Uploads a file to the backend
 * @param file
 * @returns
 */
export const uploadFile = async (file: File) => {
  const formData = new FormData();

  formData.append("title", file.name);
  formData.append("file", file);

  const res = await fetch(`${ENDPOINTS.BASE}/files`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

/**
 * Add a forumpost
 * @param data
 */
export const postForum = async (data: any) => {
  const res = await fetch(`${ENDPOINTS.COLLECTIONS}/forum_posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      comments: [],
      homepage_id: null,
      likes: 0,
      status: "draft",
    }),
  });
};

/**
 * Add a comment
 * @param type "forum" or "blog"
 * @param data
 */
export const postComment = async (
  type: "forum" | "blog",
  { post_id, ...rest }: any
) => {
  const res = await fetch(`${ENDPOINTS.COLLECTIONS}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...rest,

      [`${type}_post`]: { id: post_id },
      status: "draft",
    }),
  });
};

/**
 * Get all the menu items used for navigation
 * @returns array or null
 */
export const getMenuItems = async () => {
  try {
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/main_nav_items?fields=*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = await res.json();
    return resData.data as MenuItem[];
  } catch (error) {
    console.log("error getting menu items", error);
    return null;
  }
};

/**
 * Get all the menu items used for navigation
 * @returns array
 */
export const getCompanyInfo = async () => {
  try {
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/general_info?fields=*.*.*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = await res.json();
    return resData.data as CompanyInfo;
  } catch (error) {
    console.log("error getting the company", error);
    return null;
  }
};

/**
 * Add a letter subscription
 * @param data
 */
export const postLetterSubscription = async (data: any) => {
  await fetch(`${ENDPOINTS.COLLECTIONS}/letter_submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

/**
 * Gets the blog overview page details
 */
export const getPostOverviewPageData = async () => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/blog_overview_page?fields=*.*.*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * Gets a list of blog posts
 * @param postPerPage the amount of posts to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getPosts = async (
  postPerPage: number,
  page: number = 1,
  query?: string
) => {
  console.log({ query });

  let url = `${ENDPOINTS.COLLECTIONS}/vlogposts?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}`;

  if (query) {
    url = `${url}&search=${query}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets the number of total blog posts
 * @returns
 */
export const getPostsTotal = async () => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/vlogposts?aggregate[count]=*&filter[status][_eq]=published`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
