import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { FAQ } from "../../../types/content-types/FAQ.type";
import Button from "../../buttons/Button";
import { H3 } from "../../typography";
import FAQItem from "../FAQItem/FAQItem";

type Props = {
  title?: string;
  showLoadMore?: boolean;
  items: FAQ[];
  isLoading?: boolean;
  onLoadMore?: () => void;
};

export default function FAQList({
  title,
  showLoadMore,
  items = [],
  isLoading = false,
  onLoadMore,
}: Props) {
  const [selected, setSelected] = React.useState<string>(items[0]?.id ?? "");

  const handleClick = () => {
    if (onLoadMore) onLoadMore();
  };

  return (
    <div>
      <section
        className="mt-[80px] text-center"
        style={{ marginBottom: showLoadMore ? 56 : 80 }}
      >
        {!!title && (
          <Container maxWidth="xl">
            <div className="flex flex-col items-center justify-center mb-14">
              <H3 variant="bold" color="black">
                {title}
              </H3>
            </div>
          </Container>
        )}

        <Container maxWidth="xl">
          <div className="flex flex-col gap-8">
            {items?.map((faq: FAQ) => (
              <FAQItem
                id={faq.id}
                isSelected={selected === faq.id}
                key={faq.id}
                title={faq.title}
                description={faq.description}
                onSelect={(id) => setSelected(id)}
              />
            ))}
          </div>
        </Container>
        <div className="flex items-center justify-center">
          {isLoading && <CircularProgress size={"30px"} />}
        </div>
      </section>
      {showLoadMore && (
        <Container style={{ marginBottom: 80 }} maxWidth="xl">
          <Button onClick={handleClick}>Meer laden</Button>
        </Container>
      )}
    </div>
  );
}
