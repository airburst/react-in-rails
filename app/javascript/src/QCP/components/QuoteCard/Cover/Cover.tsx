import { eventDefinitions } from "@services/analytics";
import { Flex } from "@simplybusiness/mobius";
import React, { useCallback } from "react";
import { CardModal } from "../CardModal/CardModal";

export type CoverProps = {
  product?: string;
  title: string;
  amount: string;
  explainer?: string;
};

export const Cover = ({ product, title, amount, explainer }: CoverProps) => {
  const { coverageModalOpened } = eventDefinitions;

  const handleOpen = useCallback(() => {
    if (product) {
      coverageModalOpened({ product, title });
    }
  }, [product, title, coverageModalOpened]);

  const modalTitle = (
    <>
      {title}
      <br />
      {amount}
    </>
  );

  return (
    <Flex
      justifyContent="space-between"
      gap="var(--size-20)"
      className="cover__container"
    >
      {explainer ? (
        <CardModal
          toggleText={title}
          title={modalTitle}
          body={explainer}
          onOpen={handleOpen}
        />
      ) : (
        title
      )}
      <strong>{amount}</strong>
    </Flex>
  );
};
