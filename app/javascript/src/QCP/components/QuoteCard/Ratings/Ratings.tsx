import { creditRatingAgencyDescriptions } from "@/constants";
import { useFeature } from "@/hooks/useFeature";
import { Ratings as RatingsType } from "@/types";
import { eventDefinitions } from "@services/analytics";
import { Box, Text } from "@simplybusiness/mobius";
import React, { useCallback } from "react";
import { CardModal } from "../CardModal/CardModal";

type Props = {
  data: RatingsType;
};

export const Ratings = ({ data }: Props) => {
  const { ratingsModalOpened } = eventDefinitions;
  const { reinsurerText, ratingBody, ratingType, rating } = data;
  const ratingAgency = creditRatingAgencyDescriptions[ratingType];
  const blankSpace = <>&nbsp;</>;

  const handleOpen = useCallback(() => {
    if (ratingAgency) {
      ratingsModalOpened({ label: ratingAgency.label });
    }
  }, [ratingAgency, ratingsModalOpened]);

  // TODO: Should this be its own feature flag?
  const showHorizontalLayout = useFeature("horizontalQuotesLayout");

  if (!showHorizontalLayout) {
    return null;
  }

  return (
    <>
      <Text variant="caption" className="ratings__text">
        {reinsurerText || blankSpace}
      </Text>
      {(ratingBody || rating) && (
        <Box className="ratings__container">
          {ratingAgency && (
            <CardModal
              toggleText={ratingBody || ""}
              title={ratingAgency.label}
              body={ratingAgency.description}
              onOpen={handleOpen}
            />
          )}
          {rating && (
            <Text variant="caption" className="ratings__rating">
              {rating}
            </Text>
          )}
        </Box>
      )}
    </>
  );
};
