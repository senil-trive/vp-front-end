import { v4 as uuidv4 } from "uuid";

import { InstaPost } from "../components/content-types/InstagramPost/InstagramPost";
import { TikTokPostProps } from "../components/content-types/TikTokPost/TikTokPost";
import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";
import { BlogType } from "../types/content-types/Blog.type";
import { Letter } from "../types/content-types/Letter.type";
import { VideoType } from "../types/content-types/Video.type";
import { ForumPostType } from "../types/forumTypes";
import parseImageURL from "./parseImageURL";
import parseVideoURL from "./parseVideoURL";

/**
 * Checks if a number is even or odds
 * @param num number to check
 * @returns true or false
 */
export function isEven(num: number) {
  return num % 2 === 0;
}

/**
 * Randomizes the order of the feed
 * @param array the feed array
 * @returns
 */
export function shuffle(array: FeedItem[]) {
  let max = array.length;
  let currentElement;
  let index;

  while (max) {
    index = Math.floor(Math.random() * max--);
    currentElement = array[max];
    if (currentElement?.type === "video" && isEven(index)) {
      // ensure videos are placed on a even index
      max++;
    } else {
      array[max] = array[index];
      array[index] = currentElement;
    }
  }

  return array;
}

/**
 * Moves an item position in an array
 * @param feed an object array
 * @param item an item (must have an id)
 * @param newIndex the new position in the array where the item should be moved to
 * @returns
 */
export function moveArrayObject(feed: any[], item: any, newIndex: number) {
  const itemIndex = feed.findIndex((feedItem) => feedItem?.id === item?.id);
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
    blogs = [],
    letters = [],
    forum = [],
    instagram = [],
    tiktok = [],
    videos = [],
  }: {
    blogs?: BlogType[];
    letters?: Letter[];
    forum?: ForumPostType[];
    instagram?: InstaPost[];
    tiktok?: TikTokPostProps[];
    videos?: VideoType[];
  },
  fixedFirstItems = false
) => {
  // console.log(
  //   blogs,
  //   "blog-f",
  //   letters,
  //   "ltter-f",
  //   forum,
  //   "forum-f",
  //   instagram,
  //   "instagram-f",
  //   tiktok,
  //   "tiktok-f",
  //   videos,
  //   "videos-f"
  // );
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
      title: item?.title || "",
      subtitle: item?.subtitle || "",
      poster: parseImageURL(item?.video_cover_image?.id) || "",
      src: parseVideoURL(item?.video_file?.id),
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
  // console.log(blogFeedItem, "blog-if");
  // console.log(letterFeedItem, "leter-if");
  // console.log(forumFeedItem, "forum-if");
  // console.log(instagramFeedItem, "instagram-if");
  // console.log(tiktokFeedItem, "tiktok-if");
  // console.log(chatExampleFeedItem, "chat-if");
  // console.log(videosFeedItem, "fideo-if");
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
    if (videosFeedItem !== undefined && videosFeedItem.length > 0) {
      res = moveArrayObject(res, videosFeedItem[0], 0);
      if (videosFeedItem.length > 1) {
        res = moveArrayObject(res, videosFeedItem[1], 6);
      }
    }
    if (chatExampleFeedItem !== undefined && chatExampleFeedItem.length > 0) {
      res = moveArrayObject(res, chatExampleFeedItem[0], 1);
      if (chatExampleFeedItem.length > 1) {
        res = moveArrayObject(res, chatExampleFeedItem[1], 5);
        // res = moveArrayObject(res, videosFeedItem[1], 6);
      }
    }
    if (instagramFeedItem !== undefined && instagramFeedItem.length > 0) {
      const firstInsta = instagramFeedItem[0];
      firstInsta.width = 3;
      res = moveArrayObject(res, firstInsta, 2);
    }
    if (letterFeedItem !== undefined && letterFeedItem.length > 0) {
      const firsLetter = letterFeedItem[0];
      firsLetter.width = 6;
      res = moveArrayObject(res, firsLetter, 3);
    }
    if (forumFeedItem !== undefined && forumFeedItem.length > 0) {
      const firstForum = forumFeedItem[0];
      firstForum.width = 3;
      res = moveArrayObject(res, firstForum, 4);
    }
  }

  return res;
};
