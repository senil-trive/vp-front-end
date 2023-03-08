import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { XMasonry, XBlock } from "react-xmasonry";
import styled from "styled-components";
import { INSTA_EMBED_POST } from "../../../constants/mockData";
import { BlogType } from "../../../types/content-types/Blog.type";
import { Letter } from "../../../types/content-types/Letter.type";
import { ForumPostType } from "../../../types/forumTypes";
import parseImageURL from "../../../utils/parseImageURL";
import BlogItem from "../../content-types/BlogItem/BlogItem";
import BriefItem from "../../content-types/BriefItem/BriefItem";
import ForumPost from "../../content-types/ForumPost/ForumPost";
import InstagramPost from "../../content-types/InstagramPost/InstagramPost";
import VideoItem from "../../content-types/VideoItem/VideoItem";
import { HomeGridWrapper } from "./HomeGrid.styled";

export type FeedItem = {
  type: "letter" | "blog" | "forum" | "video" | "instagram" | "tiktok";
  cols?: number;
  content: Letter | BlogType | ForumPostType | {};
};

type Props = {
  feed: FeedItem[];
};

export function HomeGrid({ feed = [] }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <HomeGridWrapper>
      <Container>
        {loading ? (
          <p>loading...</p>
        ) : (
          <XMasonry maxColumns={3} targetBlockWidth={1200 / 3}>
            {feed.map((item, index) => {
              const { content } = item;

              switch (item.type) {
                case "video":
                  return (
                    <XBlock key={index} width={2}>
                      <div className="grid-item">
                        <VideoItem
                          title="Video titel komt hier"
                          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                          subtitle="Hier komt een omschrijvende tekst"
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
                          // category={blogContent.categories[0].categories_id?.name}

                          title={blogContent.title}
                        />
                      </div>
                    </XBlock>
                  );
                case "instagram":
                  return (
                    <XBlock key={index}>
                      <div className="grid-item">
                        <InstagramPost embedCode={INSTA_EMBED_POST} />
                      </div>
                    </XBlock>
                  );
                case "tiktok":
                  return (
                    <XBlock key={index}>
                      <div className="grid-item">
                        <InstagramPost embedCode={INSTA_EMBED_POST} />
                      </div>
                    </XBlock>
                  );

                default:
                  return null;
              }
            })}
          </XMasonry>
        )}
      </Container>
    </HomeGridWrapper>
  );
}
