import { useFeature } from "@/hooks/useFeature";
import { Section } from "@components/Section";
import { Flex } from "@simplybusiness/mobius";
import clsx from "clsx";
import Skeleton, { SkeletonProps, SkeletonTheme } from "react-loading-skeleton";

const StyledSkeleton = (props: SkeletonProps) => (
  <Skeleton
    borderRadius="var(--radius-2)"
    {...props}
    containerClassName="flex-1"
  />
);

const CardSkeleton = () => {
  return (
    <li className="quote-card__container">
      <div className="quote-card__body">
        {/* <Header /> */}
        <div className="header__container">
          <StyledSkeleton className="header__provider-logo" height="100%" />
        </div>
        {/* <Pricing /> */}
        <div className="pricing__container">
          <StyledSkeleton width="50%" height="30px" />
          <StyledSkeleton width="85%" />
          <StyledSkeleton width="40%" />
        </div>
        {/* <Coverage /> */}
        <Flex
          flexDirection="column"
          gap="var(--size-30)"
          className="coverage__container"
        >
          <StyledSkeleton width="56%" />
          <StyledSkeleton width="45%" />
          <StyledSkeleton />
          <StyledSkeleton />
          <StyledSkeleton width="50%" />
        </Flex>
        {/* <QuoteActions /> */}
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="var(--size-30)"
          className="quote-actions__container"
        >
          <StyledSkeleton width="48%" height="40px" />
        </Flex>
      </div>
    </li>
  );
};

type QuotesSkeletonProps = {
  count?: number;
};

export const QuotesSkeleton = ({ count = 1 }: QuotesSkeletonProps) => {
  const showHorizontalLayout = useFeature("horizontalQuotesLayout");

  const classes = clsx("quote-cards__grid", {
    "quote-cards__vertical": !showHorizontalLayout,
  });

  return (
    <SkeletonTheme
      baseColor="var(--color-background-light)"
      highlightColor="var(--color-background)"
    >
      <Section>
        <ul className={classes}>
          {Array(count)
            .fill(undefined)
            .map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </ul>
      </Section>
    </SkeletonTheme>
  );
};
