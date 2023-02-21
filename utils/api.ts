import ENDPOINTS from "../constants/endpoints";

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
 * Add a letter subscription
 * @param data
 */
export const postLetterSubscription = async (data: any) => {
  console.log(data);
  await fetch(`${ENDPOINTS.COLLECTIONS}/letter_submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
