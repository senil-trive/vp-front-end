import Image from "next/image";
import React from "react";
import { InfoCardType } from "../../../types/content-types/InfoCard.type";
import Card from "../../card/Card";
import { H2, P } from "../../typography";
import { InfoCardWrapper } from "./InfocardWrapper.styles";

const InfoCard: React.FC<InfoCardType> = ({
  variant,
  icon,
  title,
  className,
  description,
  children,
}) => {
  return (
    <InfoCardWrapper>
      <Card variant={variant} className={className}>
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
        <div>{children}</div>
      </Card>
    </InfoCardWrapper>
  );
};

export default InfoCard;
