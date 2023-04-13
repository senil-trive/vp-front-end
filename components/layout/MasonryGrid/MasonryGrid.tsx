import InstagramPost, {
  InstaPost,
} from "../../content-types/InstagramPost/InstagramPost";
import React, { useEffect, useState } from "react";
import TikTokPost, {
  TikTokPostProps,
} from "../../content-types/TikTokPost/TikTokPost";

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
                  <div
                    className={`grid-item grid-item-w-${item.width} `}
                    key={index}
                  >
                    <VideoItem
                      poster={videoContent.poster}
                      title={videoContent.title}
                      src={videoContent.src}
                      subtitle={videoContent.subtitle}
                    />
                  </div>
                );

              case "letter":
                const letterContent = content as Letter;
                return (
                  <div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                  >
                    <BriefItem
                      key={letterContent.id}
                      title={letterContent.title}
                      titleHighlighted={letterContent.title_highlighted}
                      content={letterContent.description}
                      imgSrc={parseImageURL(letterContent?.image?.id)}
                      fileSrc={`/kinderen/open-brieven/${letterContent.slug}`}
                    />
                  </div>
                );
              case "forum":
                const forumContent = content as ForumPostType;
                return (
                  <div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                  >
                    <ForumPost
                      showButton
                      fullHeight={fullHeightItems}
                      buttonUrl={`/kinderen/forum/${forumContent.slug}`}
                      truncateContent
                      gender={forumContent.user_gender}
                      age={forumContent.user_age}
                      authorType={forumContent.user_name}
                      postDate={new Date(forumContent.date_created)}
                      tags={
                        forumContent.categories?.map(
                          (cat) => cat.categories_id.name
                        ) ?? []
                      }
                      title={
                        forumContent.title ??
                        "Titel moet in CMS worden ingevoerd"
                      }
                      comments={forumContent.comments.length}
                      content={forumContent.content}
                    />
                  </div>
                );

              case "blog":
                const blogContent = content as BlogType;

                return (
                  <div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
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
                      content={
                        blogContent.type === "blog" ? blogContent.content : ""
                      }
                      postDate={new Date(blogContent.date_created)}
                      category={blogContent.categories[0]?.categories_id?.name}
                      title={blogContent.title}
                    />
                  </div>
                );
              case "instagram":
                const instaContent = content as InstaPost;

                return (
                  <div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                  >
                    <InstagramPost embed_code={instaContent.embed_code} />
                  </div>
                );
              case "tiktok":
                // TODO: replace with CMS content
                const tiktokContent = content as TikTokPostProps;
                return (
                  <div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                  >
                    <TikTokPost embed_code={tiktokContent.embed_code} />
                  </div>
                );
              case "chat":
                // TODO: replace with CMS content
                const chatContent = content as VideoPropsType;
                return (
                  <div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                  >
                    <ChatExampleItem />
                  </div>
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
