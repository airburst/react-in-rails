import { Cover as CoverType } from "@/types";
import { TickIcon } from "@components/Icon";
import { eventDefinitions } from "@services/analytics";
import { Accordion, Box, Flex, Text } from "@simplybusiness/mobius";
import {
  formatCover,
  formatExcesses,
  transformCoverage,
} from "@utils/transformCoverage";
import React from "react";
import { Cover } from "../Cover/Cover";
import { Tag } from "../Tag/Tag";

type CoverageProps = {
  covers: CoverType[];
  additionalCoverage?: boolean;
};

// Use transformation logic to display a list of covered and
// deductible items for each applicable quote.
export const Coverage = ({ covers, additionalCoverage }: CoverageProps) => {
  const displayCovers = transformCoverage(covers);
  const { deductiblesClicked } = eventDefinitions;

  return (
    <Box className="coverage__container">
      <Text className="coverage__list-title" variant="caption">
        Coverage information
      </Text>
      <Flex
        flexDirection="column"
        flexGrow={1}
        gap="var(--size-30)"
        className="coverage__cover-item"
      >
        {displayCovers.map(
          ({
            displayName,
            coverName,
            quoteDetailsDisplayLimits: details,
            specificExcesses,
            excessTitle,
            displayExcess,
          }) => {
            const excesses = formatExcesses(displayExcess, specificExcesses);
            const hasExcesses = excesses.length > 0;
            const excessAccordionText = `View ${excessTitle}${
              excessTitle === "Deductible" ? "s" : ""
            }`;

            return (
              <Flex
                key={coverName}
                flexGrow={1}
                alignItems="flex-start"
                className="coverage__cover"
              >
                <TickIcon className="coverage__tick-icon" />
                <Flex flexDirection="column" flexGrow={1}>
                  <Text className="coverage__title">{displayName}</Text>
                  {details.map((detail) => (
                    <Cover
                      key={detail}
                      {...formatCover(detail)}
                      product={coverName}
                    />
                  ))}

                  {hasExcesses && (
                    <Accordion
                      showText={excessAccordionText}
                      hideText={excessAccordionText}
                      onClick={() => deductiblesClicked()}
                      headerPosition="top"
                    >
                      {excesses.map((cover) => (
                        <Cover
                          key={cover.title}
                          {...cover}
                          product={coverName}
                        />
                      ))}
                    </Accordion>
                  )}
                </Flex>
              </Flex>
            );
          },
        )}
        {additionalCoverage && (
          <Tag text="Extra coverage available in the next steps" />
        )}
      </Flex>
    </Box>
  );
};
