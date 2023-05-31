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
    <InfoCardWrapper>
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
        <div className="info-card-footer p-[20px] md:p-[32px]">
          <div className="flex item-center">
            <H2 style={{ color: "#fff", margin: "0px" }}>{title}</H2>
            <span className="pl-3">
              <Image
                src={icon}
                width={40}
                height={40}
                alt={"Heading icon"}
                objectFit="contain"
              />
            </span>
          </div>
          <P className="text-[#fff]">{description}</P>
          {children}
        </div>
      </Card>
    </InfoCardWrapper>
  );
};

export default InfoCard;
