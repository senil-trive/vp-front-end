import Button, { ButtonVariant } from "../../buttons/Button";
import { H3, TitleWithHighlights } from "../../typography";

import Image from "next/image";
import React from "react";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { useRouter } from "next/router";

interface TextItemProps {
  title: string;
  titleHighlighted: string;
  content: string;
  imageURL?: string;
  imageAlt: string;
  buttonLabel: string;
  buttonURL: string;
  buttonVariant?: ButtonVariant;
  rtl?: boolean;
}

const TextItem: React.FC<TextItemProps> = ({
  title,
  titleHighlighted,
  content,
  imageURL,
  imageAlt,
  buttonLabel,
  buttonURL,
  buttonVariant = "primary",
  rtl = false,
}) => {
  const router = useRouter();

  return (
    <div className={`grid sm:grid-cols-1 md:grid-cols-2 gap-10 md:gap-[118px]`}>
      {rtl ? (
        <>
          <div>
            {titleHighlighted && title ? (
              <TitleWithHighlights
                text={title}
                textToHighlight={titleHighlighted}
                headerElement="h3"
                color="black"
              />
            ) : (
              <H3 variant="bold">{title}</H3>
            )}

            <div className="mb-14">{parseHTMLtoReact(content)}</div>

            {buttonURL && buttonLabel && (
              <div className="w-80 mb-12">
                <Button
                  variant={buttonVariant}
                  onClick={() => router.push(buttonURL)}
                >
                  {buttonLabel}
                </Button>
              </div>
            )}
          </div>
          {imageURL ? (
            <Image
              src={imageURL}
              alt={imageAlt}
              width={472}
              height={388}
              className="rounded-lg w-full object-cover"
            />
          ) : (
            <div className="w-[472px] h-[388px]" />
          )}
        </>
      ) : (
        <>
          {imageURL ? (
            <Image
              src={imageURL}
              alt={imageAlt}
              width={472}
              height={388}
              className="rounded-lg w-full object-cover"
            />
          ) : (
            <div className="w-[472px] h-[388px]" />
          )}
          <div>
            {titleHighlighted && title ? (
              <TitleWithHighlights
                text={title}
                textToHighlight={titleHighlighted}
                headerElement="h3"
                color="black"
              />
            ) : (
              <H3 variant="bold">{title}</H3>
            )}
            <div className="mb-14">{parseHTMLtoReact(content)}</div>

            {buttonURL && buttonLabel && (
              <div className="w-80 mb-12">
                <Button
                  variant={buttonVariant}
                  onClick={() => router.push(buttonURL)}
                >
                  {buttonLabel}
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TextItem;
