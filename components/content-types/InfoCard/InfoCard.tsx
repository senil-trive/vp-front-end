import Image from "next/image";
import React from "react";
import { InfoCardType } from "../../../types/content-types/InfoCard.type";
import Tag from "../../buttons/Tag/Tag";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader/CardHeader";
import { H2, P } from "../../typography";
import { InfoCardWrapper } from "./InfocardWrapper.styles";

const color = {
  blog: "#FE517E",
  primary: "#006ef7",
  brief: "",
  vlog: "",
  story: "",
  info: "",
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
}) => {
  return (
    <InfoCardWrapper className={variant}>
      <Card variant={variant} className={`${className}`}>
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
                style={{
                  backgroundColor:
                    variant !== undefined
                      ? `${color[variant]} !important`
                      : "#FE517E",
                  borderColor:
                    variant !== undefined
                      ? `${color[variant]} !important`
                      : "#FE517E",
                }}
              >
                <>{category}</>
              </Tag>
            )}
          </CardHeader>
        )}
        <div className="info-card-footer p-[20px] md:py-[32px] md:px-[24px]">
          <div className="item-center">
            <H2 style={{ color: "#fff", margin: "0px" }}>
              {title}
              <Image
                src={icon}
                width={45}
                height={45}
                alt={"Heading icon"}
                objectFit="contain"
                className="pl-1 inline"
              />
            </H2>
          </div>
          {/* <P > */}
          <div
            className="footer-content text-[#fff] leading-[160%]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {/* </P> */}
          {children}
        </div>
      </Card>
    </InfoCardWrapper>
  );
};

export default InfoCard;
