import InstagramPost, {
  InstaPost,
} from "../../content-types/InstagramPost/InstagramPost";
import React, { useEffect, useState } from "react";
import TikTokPost, {
  TikTokPostProps,
} from "../../content-types/TikTokPost/TikTokPost";
import { motion } from "framer-motion";
import BlogItem from "../../content-types/BlogItem/BlogItem";
import { BlogType } from "../../../types/content-types/Blog.type";
import BriefItem from "../../content-types/BriefItem/BriefItem";
import ChatExampleItem from "../../content-types/ChatExampleItem/ChatExampleItem";
import ChatExampleNew from "../../content-types/ChatExampleItem/ChatExampleNew";
import ChatExampleBlue from "../../content-types/ChatExampleItem/ChatExampleBlue";
import { Container } from "@mui/material";
import ForumPost from "../../content-types/ForumPost/ForumPost";
import ForumPost2 from "../../content-types/ForumPost/ForumPost2";
import { ForumPostType } from "../../../types/forumTypes";
import { Letter } from "../../../types/content-types/Letter.type";
import { MasonryGridWrapper } from "./MasonryGrid.styled";
import VideoItem from "../../content-types/VideoItem/VideoItem";
import { VideoPropsType } from "../../content-types/VideoItem/VideoItem.types";
import parseImageURL from "../../../utils/parseImageURL";
import NewPostItem from "../../content-types/NewPostItem/NewPostItem";

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
  className?: string;
  feed: FeedItem[];
  homepage?: boolean;
};

export function MasonryGrid({
  fullHeightItems = true,
  feed = [],
  className,
  homepage = false,
}: Props) {
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
  // const cardVariants: Variants = {
  //   offscreen: {
  //     y: 300,
  //     rotate: -10,
  //     opacity: 0,
  //   },
  //   onscreen: {
  //     y: 0,
  //     rotate: 0,
  //     opacity: 1,
  //     transition: {
  //       type: "spring",
  //       stiffness: 43,
  //       bounce: 0.3,
  //       duration: 0.4,
  //     },
  //   },
  // };

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
      <Container className="max-w-[1384px]" style={{ padding: " 0 13px" }}>
        <div id="mason-grid" className="mason-grid">
          {homepage && (
            <div className="home-cntnt-wrapper">
              <div className="home-cntnt-mn">
                <div className="video-log-div">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <VideoItem
                      poster="Vlog1.png"
                      title="Praat over je gevoelens"
                      src=""
                      subtitle="Onze Buddy’s zaten in dezelfde situatie als jij en hebben dus heel veel wijze raad voor je."
                    />
                  </motion.div>
                </div>

                <div className="chat-orange">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ChatExampleNew />
                  </motion.div>
                </div>

                <div className="inst-post">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    // variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <InstagramPost
                      embed_code={`<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/Cnq-MYmMF2l/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/Cnq-MYmMF2l/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/Cnq-MYmMF2l/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Stichting Villa Pinedo (@villa_pinedo)</a></p></div></blockquote>
                     <script async src="//www.instagram.com/embed.js"></script>'`}
                    />
                  </motion.div>
                </div>

                <div className="blog-post">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BriefItem
                      title="Brief voor alle kinderen"
                      category="Thema"
                      bg="#3FC7B4"
                      content="<p>Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden? Je kunt bij ons terecht voor al je vragen.</p>"
                      imgSrc="/Imagevb.png"
                      fileSrc={`/open-brieven/voor-alle-studenten`}
                    />
                  </motion.div>
                </div>

                <div className="forum-post">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    // variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ForumPost
                      showButton
                      fullHeight={fullHeightItems}
                      buttonUrl="#"
                      truncateContent
                      gender='{"name":"Kirsten","value":"v"}'
                      image={""}
                      age="25"
                      name={"Kirsten"}
                      tags={["TAG NAME", "Tag Name"]}
                      title={"Titel moet in CMS worden ingevoerd"}
                      comments={156}
                      postDate={new Date("2023-04-05T08:45:08.000Z")}
                      content="Ik heb het gevoel dat mijn ouders gaan scheiden. Met wie kan ik praten en wat kan ik het beste doen in dit geval? Ik heb gehoord dat ik bij Villa Pinedo een Buddy kan krijgen waarmee ik kan praten over alles waar ik mee zit. Dat is precies wat ik zoek."
                    />
                  </motion.div>
                </div>

                <div className="chat-orange">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ChatExampleBlue />
                  </motion.div>
                </div>

                <div className="video-log-div">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <VideoItem
                      poster="Vlog1.png"
                      title="Praat over je gevoelens"
                      src=""
                      subtitle="Onze Buddy’s zaten in dezelfde situatie als jij en hebben dus heel veel wijze raad voor je."
                    />
                  </motion.div>
                </div>

                <div className="new-post-item">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <NewPostItem
                      title="‘Lees/luister/kijk tips die regelmatig
       worden geupdate’"
                      description="Geschreven door Bianca"
                      buttonText="quote"
                      bgImg="Content!.png"
                    />
                  </motion.div>
                </div>
                <div className="blog-post">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BriefItem
                      title="Brief voor alle kinderen"
                      category="Thema"
                      bg="#3FC7B4"
                      content="<p>Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden? Je kunt bij ons terecht voor al je vragen.</p>"
                      imgSrc="/Imagevb.png"
                      fileSrc={`/open-brieven/voor-alle-studenten`}
                    />
                  </motion.div>
                </div>
                <div className="new-post-item">
                  <motion.div
                    className={`grid-item grid-item-w-10`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <NewPostItem
                      title="Tegel voor tips en quotes over met foto"
                      description="Geschreven door Astrid"
                      buttonText="Tips"
                      bgImg="Content2.png"
                    />
                  </motion.div>
                </div>
                <div className="three-post">
                  <div className="blog-post">
                    <motion.div
                      // variants={cardVariants}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <ForumPost2
                        showButton
                        fullHeight={false}
                        buttonUrl="#"
                        truncateContent
                        gender='{"name":"Kirsten","value":"v"}'
                        image={""}
                        age="25"
                        authorType={"Met wie kan ik praten? Ik heb een vraag"}
                        tags={["TAG NAME", "Tag Name"]}
                        title={"David"}
                        comments={156}
                        postDate={new Date("2023-04-05T08:45:08.000Z")}
                        content="<p>Ik heb het gevoel dat mijn ouders gaan scheiden. Met wie kan ik praten en wat kan ik het beste doen in dit geval? Ik heb gehoord dat ik bij Villa Pinedo een Buddy kan krijgen waarmee ik kan praten.</p>"
                      />
                    </motion.div>
                  </div>
                  <div className="blog-post">
                    <motion.div
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <BriefItem
                        title="Brief voor alle kinderen"
                        category="Thema"
                        bg="#3FC7B4"
                        content="<p>Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden? Je kunt bij ons terecht voor al je vragen.</p>"
                        imgSrc="/Imagevb.png"
                        fileSrc={`/open-brieven/voor-alle-studenten`}
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="custom_inst_post">
                  <div className="inst-post">
                    <motion.div
                      className={`grid-item grid-item-w-10`}
                      // variants={cardVariants}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <InstagramPost
                        embed_code={`<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/Cnq-MYmMF2l/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/Cnq-MYmMF2l/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/Cnq-MYmMF2l/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Stichting Villa Pinedo (@villa_pinedo)</a></p></div></blockquote>
                     <script async src="//www.instagram.com/embed.js"></script>'`}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {feed.map((item, index) => {
            const { content } = item;

            switch (item.type) {
              case "video":
                const videoContent = content as VideoPropsType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    // variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <VideoItem
                      poster={videoContent.poster}
                      title={videoContent.title}
                      src={videoContent.src}
                      subtitle={videoContent.subtitle}
                      className="rounded-[10px]"
                    />
                  </motion.div>
                );

              case "letter":
                const letterContent = content as Letter;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    // variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BriefItem
                      key={letterContent.id}
                      title={letterContent.title}
                      category="Thema"
                      bg={letterContent.bg_color}
                      content={letterContent.description}
                      imgSrc={
                        letterContent?.image
                          ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${letterContent?.image?.id}`
                          : ""
                      }
                      fileSrc={`/open-brieven/${letterContent.slug}`}
                    />
                  </motion.div>
                );
              case "forum":
                const forumContent = content as ForumPostType;
                return (
                  <motion.div
                    className={`grid-item grid-item-w-${item.width}`}
                    key={index}
                    // variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <ForumPost
                      showButton
                      fullHeight={fullHeightItems}
                      buttonUrl={`/forum/${forumContent.slug}`}
                      truncateContent
                      gender={forumContent.user_gender}
                      image={parseImageURL(forumContent?.user_image?.id)}
                      age={forumContent.user_age}
                      name={forumContent.user_name}
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
                    className={`grid-item grid-item-w-${item.width} ${className}`}
                    key={index}
                    // variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <BlogItem
                      mediaSrc={
                        blogContent.image
                          ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${blogContent.image}?width=700`
                          : ""
                      }
                      embedSrc={blogContent.youtube_embed}
                      link={`/verhalen/${blogContent.slug}`}
                      type={blogContent.type}
                      author={blogContent.author}
                      description={blogContent.content}
                      buttonText={
                        blogContent.type == "vlog"
                          ? "Vlog bekijken"
                          : "Blog lezen"
                      }
                      content={blogContent.content}
                      postDate={new Date(blogContent.date_created)}
                      category={"Thema"}
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
                    // variants={cardVariants}
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
                    // variants={cardVariants}
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
                    // variants={cardVariants}
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
