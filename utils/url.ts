/**
 * transforms a title to an slug
 * @param title
 * @returns
 */
export function titleToSlug(title: string) {
  const regex = / /gi;
  const res = title.replace(regex, "-");
  return encodeURIComponent(res);
}

/**
 * transform a slug into a title
 * @param slug The slug string
 */
export function slugToTitle(slug: string) {
  const title = decodeURIComponent(slug);
  const regex = /-/gi;
  return title.replace(regex, " ");
}

/**
 * Takes an URL String and removes query params and hash params
 *
 * @param url - The URL string
 * @returns The transformed URL string
 *
 */
export const getPathFromUrl = (url: string): string => {
  return url.split(/[?#]/)[0];
};
