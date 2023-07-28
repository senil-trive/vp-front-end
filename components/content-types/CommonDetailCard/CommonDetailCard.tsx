import Image from "next/image";
import React from "react";
import Button from "../../buttons/Button";
import Card from "../../card/Card";
import styled from "styled-components";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import { H3, P } from "../../typography";

const DescriptionText = styled.p`
  margin-bottom: 0;
`;

const CommonDetailCard = ({
  title,
  description,
  imageUrl,
  button,
  variant,
  buttonLink,
  leftIcon,
}: any) => {
  const generateMediaItem = () => {
    let Child = null;
    if (imageUrl) {
      Child = (
        <Image
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
          src={imageUrl}
          alt={title}
          fill
        />
      );
    }
    if (!Child) return;
    return <CardHeader>{Child}</CardHeader>;
  };
  return (
    <Card className="card-container" variant={variant}>
      {generateMediaItem()}
      <CardFooter>
        <div className="icon-title-wrapper">
          {!!leftIcon && (
            <Image
              src={
                "https://admin.villapinedo.nl/assets/93587efa-6483-42b7-b78e-d8bee49400bc?width=100"
              }
              alt={title}
              fill
              className="left-icon mr-6"
            />
          )}
          <H3 className="title mt-0">{title}</H3>
        </div>
        {typeof description === "string" ? (
          <DescriptionText className="description">
            {description}
          </DescriptionText>
        ) : (
          <div className="description">{description}</div>
        )}
        {button && (
          <Button href={buttonLink} className="text-[18px] font-[400]">
            {button}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommonDetailCard;
