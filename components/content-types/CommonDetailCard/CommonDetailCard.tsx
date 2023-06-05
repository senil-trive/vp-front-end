import Image from "next/image";
import React from "react";
import Button from "../../buttons/Button";
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import { H3, P } from "../../typography";

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

  console.log(leftIcon, "icon");
  return (
    <Card className="card-container" variant={variant}>
      {generateMediaItem()}
      <CardFooter>
        <div className="icon-title-wrapper">
          {!!leftIcon && (
            <Image
              src={leftIcon}
              alt={title}
              // width={80}
              // height={80}
              fill
              className="left-icon"
            />
          )}
          <H3 className="title">{title}</H3>
        </div>
        {typeof description === "string" ? (
          <P className="description">{description}</P>
        ) : (
          <div className="description">{description}</div>
        )}
        {button && <Button href={buttonLink}>{button}</Button>}
      </CardFooter>
    </Card>
  );
};

export default CommonDetailCard;