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

/** transform a slug into a title */
export function slugToTitle(slug: string) {
  const title = decodeURIComponent(slug);
  const regex = /-/gi;
  return title.replace(regex, " ");
}
