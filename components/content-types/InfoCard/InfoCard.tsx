import Image from "next/image";
import React from "react";
import { InfoCardType } from "../../../types/content-types/InfoCard.type";
import Tag from "../../buttons/Tag/Tag";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader/CardHeader";
import { H2, P } from "../../typography";
import { InfoCardWrapper } from "./InfocardWrapper.styles";
import YoutubePlayer from "../../media/YoutubePlayer";
import VideoItem from "../VideoItem/VideoItem";
import parseImageURL from "../../../utils/parseImageURL";
import parseVideoURL from "../../../utils/parseVideoURL";

const color = {
  blog: "#FE517E",
  primary: "#006ef7",
  brief: "",
  vlog: "",
  story: "",
  info: "",
  ideal: "#FFECF1",
  follow: "#EBFFFC",
};

const InfoCard: React.FC<InfoCardType> = ({
  variant,
  icon,
  title,
  className,
  description,
  children,
  imageUrl,
  category,
  embedSrc,
  poster,
  mediaSrc,
  videoClassName,
}) => {
  return (
    <InfoCardWrapper className={variant}>
      <Card variant={variant} className={`${className}`}>
        {embedSrc && <YoutubePlayer src={embedSrc} />}
        {mediaSrc && (
          <VideoItem
            poster={parseImageURL(poster)}
            src={parseVideoURL(mediaSrc)}
            className={videoClassName}
          />
        )}

        {imageUrl && (
          <CardHeader>
            <Image
              src={imageUrl}
              className="absolute h-full w-full top-0 left-0 z-0 object-cover"
              alt={title}
              fill
            />
            {!!category && (
              <Tag
                variant="dark"
                size="m"
                position="blNew"
                className="left-[14px] md:left-[24px]"
              >
                <>{category}</>
              </Tag>
            )}
          </CardHeader>
        )}
        <div className="info-card-footer p-[20px] md:py-[32px] md:px-[24px]">
          <div className="item-center">
            <H2
              style={{ color: "#fff", margin: "0px" }}
              className="footer-title"
            >
              {title}

              {icon !== "" && (
                <Image
                  src={icon}
                  width={45}
                  height={45}
                  alt={"Heading icon"}
                  objectFit="contain"
                  className="pl-1 inline"
                />
              )}
            </H2>
          </div>
          {/* <P > */}
          {description && (
            <div
              style={{ fontFamily: "Avenir" }}
              className="footer-content text-[#fff] leading-[160%] text-[16px] md:text-[18px]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {/* </P> */}
          {children}
        </div>
      </Card>
    </InfoCardWrapper>
  );
};

export default InfoCard;
