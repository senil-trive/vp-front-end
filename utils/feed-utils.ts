import { v4 as uuidv4 } from "uuid";

import { InstaPost } from "../components/content-types/InstagramPost/InstagramPost";
import { TikTokPostProps } from "../components/content-types/TikTokPost/TikTokPost";
import { VideoPropsType } from "../components/content-types/VideoItem/VideoItem.types";
import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";
import { BlogType } from "../types/content-types/Blog.type";
import { Letter } from "../types/content-types/Letter.type";
import { VideoType } from "../types/content-types/Video.type";
import { ForumPostType } from "../types/forumTypes";
import parseImageURL from "./parseImageURL";

/**
 * Randomizes the order of the feed
 * @param array the feed array
 * @returns
 */
export function shuffle(array: FeedItem[]) {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

/**
 * Moves a item position in an array
 * @param feed an object array
 * @param item an item (must have an id)
 * @param newIndex the new position in the array where the item should be moved to
 * @returns
 */
export function moveArrayObject(feed: any[], item: any, newIndex: number) {
  const itemIndex = feed.findIndex((feedItem) => feedItem.id === item.id);
  const arrayItem = feed.splice(itemIndex, 1)[0];

  feed.splice(newIndex, 0, arrayItem);

  return feed;
}

/**
 * Generates an array of feed items
 * @param feedItems array of all the collection items to be displayed in the feed
 * @param fixedFirstItems Show a fixed layout for the first items
 * @returns
 */
export const generateFeedTiles = (
  {
    blogs,
    letters,
    forum,
    instagram,
    tiktok,
    videos,
  }: {
    blogs: BlogType[];
    letters: Letter[];
    forum: ForumPostType[];
    instagram: InstaPost[];
    tiktok: TikTokPostProps[];
    videos: VideoType[];
  },
  fixedFirstItems: boolean = false
) => {
  const blogFeedItem: FeedItem[] = blogs?.map((item) => ({
    id: `blog-${uuidv4()}`,
    width: 4,
    type: "blog",
    content: item,
  }));
  const letterFeedItem: FeedItem[] = letters?.map((item) => ({
    id: `letter-${uuidv4()}`,
    width: 4,
    type: "letter",
    content: item,
  }));
  const forumFeedItem: FeedItem[] = forum?.map((item) => ({
    id: `forum-${uuidv4()}`,
    width: 4,
    type: "forum",
    content: item,
  }));
  const instagramFeedItem: FeedItem[] = instagram?.map((item) => ({
    id: `instagram-${uuidv4()}`,
    width: 4,
    type: "instagram",
    content: item,
  }));
  const tiktokFeedItem: FeedItem[] = tiktok?.map((item) => ({
    id: `tiktok-${uuidv4()}`,
    width: 4,
    type: "tiktok",
    content: item,
  }));
  const videosFeedItem: FeedItem[] = videos?.map((item) => ({
    id: `video-${uuidv4()}`,
    width: 8,
    type: "video",
    content: {
      title: item.title,
      subtitle: item.subtitle,
      poster: parseImageURL(item.video_cover_image?.id) ?? "",
      src: item.video_file?.url ?? "",
    },
  }));

  // Buddy examples
  const chatExampleFeedItem: FeedItem[] = fixedFirstItems
    ? ["1", "2"].map((item) => ({
        id: `tiktok-${uuidv4()}`,
        width: 4,
        type: "chat",
        content: {
          title: item,
          src: "",
        },
      }))
    : [];

  let res: FeedItem[] = [];
  res = res
    .concat(blogFeedItem)
    .concat(letterFeedItem)
    .concat(forumFeedItem)
    .concat(instagramFeedItem)
    .concat(tiktokFeedItem)
    .concat(chatExampleFeedItem)
    .concat(videosFeedItem);

  // randomize content
  res = shuffle(res);

  if (fixedFirstItems) {
    const firsLetter = letterFeedItem[0];
    firsLetter.width = 6;
    const firstInsta = instagramFeedItem[0];
    firstInsta.width = 3;
    const firstForum = forumFeedItem[0];
    firstForum.width = 3;

    // change the items for the first part of the list
    res = moveArrayObject(res, videosFeedItem[0], 0);
    res = moveArrayObject(res, chatExampleFeedItem[0], 1);
    res = moveArrayObject(res, firstInsta, 2);
    res = moveArrayObject(res, firsLetter, 3);
    res = moveArrayObject(res, firstForum, 4);
    res = moveArrayObject(res, chatExampleFeedItem[1], 5);
    res = moveArrayObject(res, videosFeedItem[1], 6);
  }

  return res;
};

// WIP: If we plan on replacing the Masonry on HomeGrid
// We can take a look at the codes below

// const closest = (needle: number, lastCol: number) => {
//   const cols = [3, 4, 6];
//   if (lastCol === 8) {
//     return 4;
//   }

//   if (needle >= 12) {
//     const newNeedle = needle / 4;

//     return cols.reduce((a, b) => {
//       return Math.abs(b - newNeedle) < Math.abs(a - newNeedle) ? b : a;
//     });
//   }

//   return cols.reduce((a, b) => {
//     return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
//   });
// };

// const getAvailableCol = ({
//   currentRow,
//   total,
//   lastCol,
// }: {
//   currentRow: number;
//   total: number;
//   lastCol?: number;
// }) => {
//   const available = total >= 12 ? 12 * currentRow - total : total;
//   let output = 4;

//   // First row - case of item next to a video
//   if (lastCol === 8) {
//     output = 4;
//   }

//   if (total - 12 === 0 && lastCol === 4) {
//     output = 3;
//   }

//   if (available > 0) {
//     output = closest(available, lastCol || output);
//   }

//   console.log({
//     currentRow,
//     available,
//     output,
//     closest: closest(available, lastCol || output),
//   });

//   return output;
// };

// export function generateFeedItemCols(array: FeedItem[]) {
//   let res = [];
//   let total = 0;
//   let lastItem = null;
//   let nextItem = null;
//   let currentRow = 0;

//   for (let i = 0; i < array.length; i++) {
//     const item = array[i];
//     nextItem = array[i + 1];

//     // if item is a video, it will always be 8cols
//     if (item.type === "video") {
//       item.cols = 8;
//       total = total + 8;
//     } else {
//       const col = getAvailableCol({
//         currentRow,
//         total,
//         lastCol: lastItem?.cols,
//       });
//       total = total + col;
//       item.cols = col;
//     }

//     res.push(item);
//     // keep track of the last item
//     lastItem = item;
//     currentRow = Math.ceil(total / 12);
//   }

//   // first item will dictate the other 2 in a row
//   // max 3 items per row
//   // other items can be either 3, 4 to 6 cols
//   return res;
// }
