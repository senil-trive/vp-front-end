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
    console.log("error getting menuitems", error);
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
    console.log("error getting menuitems", error);
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
