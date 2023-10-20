import { TagIcon } from "@components/Icon";
import { Flex, Text } from "@simplybusiness/mobius";
import React from "react";

type TagProps = {
  text: string;
};

export const Tag = ({ text }: TagProps) => {
  return (
    <Flex
      alignItems="flex-start"
      className="tag__container"
      gap="var(--size-10)"
    >
      <TagIcon style={{ width: 16, height: 16 }} />
      <Text variant="caption">{text}</Text>
    </Flex>
  );
};
