import InstagramPost, {
  InstaPost,
} from "../../content-types/InstagramPost/InstagramPost";
import React, { useEffect, useState } from "react";
import TikTokPost, {
  TikTokPostProps,
} from "../../content-types/TikTokPost/TikTokPost";
import { motion, Variants } from "framer-motion";
import BlogItem from "../../content-types/BlogItem/BlogItem";
import { BlogType } from "../../../types/content-types/Blog.type";
import BriefItem from "../../content-types/BriefItem/BriefItem";
import ChatExampleItem from "../../content-types/ChatExampleItem/ChatExampleItem";
import { Container } from "@mui/material";
import ForumPost from "../../content-types/ForumPost/ForumPost";
import { ForumPostType } from "../../../types/forumTypes";
import { Letter } from "../../../types/content-types/Letter.type";
import { MasonryGridWrapper } from "./MasonryGrid.styled";
import VideoItem from "../../content-types/VideoItem/VideoItem";
import { VideoPropsType } from "../../content-types/VideoItem/VideoItem.types";
import parseImageURL from "../../../utils/parseImageURL";

export type FeedType =
  | "forum"
  | "instagram"
  | "tiktok"
  | "video"
  | "letter"
  | "chat"
  | "blog";

export type FeedItem = {
  id: string;
  width: 1 | 2 | 3 | number;
  type: FeedType;
  cols?: number;
  content: Letter | BlogType | ForumPostType | VideoPropsType | TikTokPostProps;
};

type Props = {
  fullHeightItems?: boolean;
  feed: FeedItem[];
};

export function MasonryGrid({ fullHeightItems = true, feed = [] }: Props) {
  const [loading, setLoading] = useState(true);

  //1. Adust stiffness ,bounce and duration
  // const cardVariants: Variants = {
  //   offscreen: {
  //     y: 300,
  //   },
  //   onscreen: {
  //     y: 0,
  //     // rotate: -10,
  //     transition: {
  //       type: "spring",
  //       stiffness: 43,
  //       bounce: 0.3,
  //       duration: 0.4,
  //     },
  //   },
  // };

  //2. Add a rotation effect
  // const cardVariants: Variants = {
  //   offscreen: {
  //     y: 300,
  //     rotate: -10,
  //   },
  //   onscreen: {
  //     y: 0,
  //     rotate: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 43,
  //       bounce: 0.3,
  //       duration: 0.4,
  //     },
  //   },
  // };

  //3. Adjust the bounce effect
  // const cardVariants: Variants = {
  //   offscreen: {
  //     y: 300,
  //     rotate: -10,
  //   },
  //   onscreen: {
  //     y: 0,
  //     rotate: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 200,
  //       damping: 20,
  //       duration: 0.4,
  //     },
  //   },
  // };

  //4. Add an opacity animation
  const cardVariants: Variants = {
    offscreen: {
      y: 300,
      rotate: -10,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 43,
        bounce: 0.3,
        duration: 0.4,
      },
    },
  };

  useEffect(() => {
    if (feed.length > 0) {
      setLoading(false);
    }
  }, [feed]);

  if (loading) {
    return (
      <MasonryGridWrapper>
        <Container>
          <p>Laden...</p>
        </Container>
      </MasonryGridWrapper>
    );
  }

  return (
    <MasonryGridWrapper>
      <Container maxWidth="xl" style={{ padding: " 0 13px" }}>
        <div id="mason-grid" className="mason-grid">
          {feed.map((item, index) => {
            const { content } = item;

            switch (item.type) {
              case "video":
                const videoContent = content as VideoPropsType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <VideoItem
                      poster={videoContent.poster}
                      title={videoContent.title}
                      src={videoContent.src}
                      subtitle={videoContent.subtitle}
                    />
                  </motion.div>
                );

              case "letter":
                const letterContent = content as Letter;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BriefItem
                      key={letterContent.id}
                      title={letterContent.title}
                      bg={letterContent.bg_color}
                      content={letterContent.description}
                      imgSrc={parseImageURL(letterContent?.image?.id)}
                      fileSrc={`/kinderen/open-brieven/${letterContent.slug}`}
                    />
                  </motion.div>
                );
              case "forum":
                const forumContent = content as ForumPostType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ForumPost
                      showButton
                      fullHeight={fullHeightItems}
                      buttonUrl={`/kinderen/forum/${forumContent.slug}`}
                      truncateContent
                      gender={forumContent.user_gender}
                      image={parseImageURL(forumContent?.user_image?.id)}
                      age={forumContent.user_age}
                      authorType={forumContent.user_name}
                      postDate={new Date(forumContent.date_created)}
                      tags={
                        forumContent.categories?.map(
                          (cat) => cat.categories_id?.name
                        ) ?? []
                      }
                      title={
                        forumContent.title ??
                        "Titel moet in CMS worden ingevoerd"
                      }
                      comments={forumContent.comments.length}
                      content={forumContent.content}
                    />
                  </motion.div>
                );
              case "blog":
                const blogContent = content as BlogType;

                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BlogItem
                      mediaSrc={
                        blogContent.image?.id
                          ? parseImageURL(blogContent.image.id)
                          : ""
                      }
                      embedSrc={blogContent.youtube_embed}
                      link={`/kinderen/verhalen/${blogContent.slug}`}
                      type={blogContent.type}
                      author={blogContent.author}
                      content={blogContent.content}
                      postDate={new Date(blogContent.date_created)}
                      category={blogContent.categories[0]?.categories_id?.name}
                      title={blogContent.title}
                    />
                  </motion.div>
                );
              case "instagram":
                const instaContent = content as InstaPost;

                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <InstagramPost embed_code={instaContent.embed_code} />
                  </motion.div>
                );
              case "tiktok":
                // TODO: replace with CMS content
                const tiktokContent = content as TikTokPostProps;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <TikTokPost embed_code={tiktokContent.embed_code} />
                  </motion.div>
                );
              case "chat":
                // TODO: replace with CMS content
                const chatContent = content as VideoPropsType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ChatExampleItem />
                  </motion.div>
                );

              default:
                return null;
            }
          })}
        </div>
      </Container>
    </MasonryGridWrapper>
  );
}
