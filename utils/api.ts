import { CompanyInfo } from "../types/componayInfoTypes";
import ENDPOINTS from "../constants/endpoints";
import { MenuItem } from "../components/layout/Header/Header";

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
 * Get all the comments of a post
 * @param type the type of post
 * @param post_id
 * @returns
 */
export const getComments = async (type: "forum" | "blog", post_id: string) => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/comments?filter[status][_eq]=published&filter[${type}_post][_eq]=${post_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * Get all the menu items used for navigation
 * @returns array or null
 */
export const getMenuItems = async () => {
  try {
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/main_nav_items?fields=*.*.*&filter[status][_eq]=published`,
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
 * Get a list of all published open letters
 * @returns
 */
export const getLetters = async () => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*.*&filter[status][_eq]=published`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const getPosts = async ({
  postPerPage,
  page = 1,
  search,
  sort,
}: {
  postPerPage: number;
  page?: number;
  search?: string;
  sort?: string;
}) => {
  let url = `${ENDPOINTS.COLLECTIONS}/vlogposts?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}`;

  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Get the post detail base on the slug
 * @param slug the post slug
 * @returns
 */
export const getPostDetail = async (slug: string) => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/vlogposts?fields=*.*.*.*&filter[slug][_eq]=${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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

/**
 * Gets the Forum overview page details
 */
export const getForumOverviewPageData = async () => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/forum_overview_page?fields=*.*.*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * Gets a list of forum posts
 * @param postPerPage the amount of posts to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getForums = async ({
  postPerPage,
  page = 1,
  search,
  sort,
}: {
  postPerPage: number;
  page?: number;
  search?: string;
  sort?: string;
}) => {
  let url = `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}`;

  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets the number of total forum posts
 * @returns
 */
export const getForumTotal = async () => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/forum_posts?aggregate[count]=*&filter[status][_eq]=published`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
