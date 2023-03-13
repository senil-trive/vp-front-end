import { InstaPost } from "../components/content-types/InstagramPost/InstagramPost";
import { TikTokPostProps } from "../components/content-types/TikTokPost/TikTokPost";
import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";
import { POST_PER_PAGE } from "../constants/app-configs";
import { BlogType } from "../types/content-types/Blog.type";
import { Letter } from "../types/content-types/Letter.type";
import { ForumPostType } from "../types/forumTypes";
import {
  getForumPosts,
  getInstaPosts,
  getLetters,
  getPosts,
  getTikTokPosts,
} from "./api";

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
 * Generates an array of feed items
 * @param feedItems array of all the collection items to be displayed in the feed
 * @returns
 */
export const generateFeed = (
  {
    blogs,
    letters,
    forum,
    instagram,
    tiktok,
  }: {
    blogs: BlogType[];
    letters: Letter[];
    forum: ForumPostType[];
    instagram: InstaPost[];
    tiktok: TikTokPostProps[];
  },
  addFirstVideos: boolean = false
) => {
  let res: FeedItem[] = [];

  blogs?.forEach((item) => {
    res.push({ type: "blog", content: item });
  });
  letters?.forEach((item) => {
    res.push({ type: "letter", content: item });
  });
  forum?.forEach((item) => {
    res.push({ type: "forum", content: item });
  });
  instagram?.forEach((item) => {
    res.push({ type: "instagram", content: item });
  });
  tiktok?.forEach((item) => {
    res.push({ type: "tiktok", content: item });
  });

  // randomize content
  res = shuffle(res);

  if (addFirstVideos) {
    // TODO: replace with real video content
    // Add video item at the very beginning
    res.splice(0, 0, {
      type: "video",
      content: {
        title: "Video 1",
        subtitle: "Hier komt een omschrijvende tekst",
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    });

    // Add a video item to 4th place
    res.splice(5, 0, {
      type: "video",
      content: {
        title: "Video 2",
        subtitle: "Hier komt een omschrijvende tekst",
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    });
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
