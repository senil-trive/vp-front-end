import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import { INSTA_EMBED_POST } from "../../../constants/mockData";
import { BlogType } from "../../../types/content-types/Blog.type";
import { Letter } from "../../../types/content-types/Letter.type";
import { ForumPostType } from "../../../types/forumTypes";
import parseImageURL from "../../../utils/parseImageURL";
import BlogItem from "../../content-types/BlogItem/BlogItem";
import BriefItem from "../../content-types/BriefItem/BriefItem";
import ForumPost from "../../content-types/ForumPost/ForumPost";
import InstagramPost, {
  InstaPost,
} from "../../content-types/InstagramPost/InstagramPost";
import VideoItem from "../../content-types/VideoItem/VideoItem";
import { VideoPropsType } from "../../content-types/VideoItem/VideoItem.types";
import { MasonryGridWrapper } from "./MasonryGrid.styled";

export type FeedItem = {
  type: "letter" | "blog" | "forum" | "video" | "instagram" | "tiktok";
  cols?: number;
  content: Letter | BlogType | ForumPostType | VideoPropsType | {};
};

type Props = {
  feed: FeedItem[];
};

export function MasonryGrid({ feed = [] }: Props) {
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
          <p>loading...</p>
        </Container>
      </MasonryGridWrapper>
    );
  }

  return (
    <MasonryGridWrapper>
      <Container style={{ padding: " 0 13px" }}>
        <XMasonry maxColumns={3} targetBlockWidth={1200 / 3}>
          {feed.map((item, index) => {
            const { content } = item;

            switch (item.type) {
              case "video":
                const videoContent = content as VideoPropsType;
                return (
                  <XBlock key={index} width={2}>
                    <div className="grid-item">
                      <VideoItem
                        title={videoContent.title}
                        src={videoContent.src}
                        subtitle={videoContent.subtitle}
                      />
                    </div>
                  </XBlock>
                );

              case "letter":
                const letterContent = content as Letter;
                return (
                  <XBlock key={index}>
                    <div className="grid-item">
                      <BriefItem
                        key={letterContent.id}
                        title={letterContent.title}
                        titleHighlighted={letterContent.title_highlighted}
                        content={letterContent.description}
                        imgSrc={parseImageURL(letterContent?.image?.id)}
                        fileSrc={`/open-brieven/${letterContent.slug}`}
                      />
                    </div>
                  </XBlock>
                );
              case "forum":
                const forumContent = content as ForumPostType;
                return (
                  <XBlock key={index}>
                    <div className="grid-item">
                      <ForumPost
                        author={forumContent.user_name}
                        age={forumContent.user_age}
                        likes={Number(forumContent.likes)}
                        authorType={"Anonamous"}
                        postDate={new Date(forumContent.date_created)}
                        tags={[]}
                        title={forumContent.content}
                      />
                    </div>
                  </XBlock>
                );

              case "blog":
                const blogContent = content as BlogType;

                return (
                  <XBlock key={index}>
                    <div className="grid-item">
                      <BlogItem
                        mediaSrc={
                          blogContent.image?.id
                            ? parseImageURL(blogContent.image.id)
                            : ""
                        }
                        embedSrc={blogContent.youtube_embed}
                        link={`blog/${blogContent.slug}`}
                        type={blogContent.type}
                        author={blogContent.author}
                        content={blogContent.content}
                        postDate={new Date(blogContent.date_created)}
                        category={
                          blogContent.categories[0]?.categories_id?.name
                        }
                        title={blogContent.title}
                      />
                    </div>
                  </XBlock>
                );
              case "instagram":
                const instaContent = content as InstaPost;

                return (
                  <XBlock key={index}>
                    <div className="grid-item">
                      <InstagramPost embed_code={instaContent.embed_code} />
                    </div>
                  </XBlock>
                );
              case "tiktok":
                // TODO: replace with CMS content
                return (
                  <XBlock key={index}>
                    <div className="grid-item">
                      <InstagramPost embed_code={INSTA_EMBED_POST} />
                    </div>
                  </XBlock>
                );

              default:
                return null;
            }
          })}
        </XMasonry>
      </Container>
    </MasonryGridWrapper>
  );
}
