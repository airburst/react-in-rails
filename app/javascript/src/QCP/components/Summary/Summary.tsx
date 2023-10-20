import { useFeature } from "@/hooks/useFeature";
import { Quote } from "@/types";
import { Section } from "@components/Section";
import { Text } from "@simplybusiness/mobius";
import Skeleton from "react-loading-skeleton";

type Props = {
  productTitle?: string;
  quotes: Quote[];
};

export const Summary = ({
  productTitle = "Business Insurance",
  quotes = [],
}: Props) => {
  const showPaymentToggle = useFeature("paymentToggle");
  const isSingleQuote = quotes.length === 1;

  if (!showPaymentToggle || quotes.length === 0) {
    return null;
  }

  return (
    <Section>
      <Text className="quote-summary__title">
        Your <strong>{productTitle}</strong> quotes
      </Text>
      <Text className="quote-summary__description">
        We searched through multiple carriers and found{" "}
        <strong>
          {quotes.length} quote{isSingleQuote ? "" : "s"}{" "}
        </strong>
        for your business
      </Text>
    </Section>
  );
};

export const SummarySkeleton = () => (
  <Section>
    <Text className="quote-summary__title">
      <Skeleton width="50%" />
    </Text>
    <Text className="quote-summary__description">
      <Skeleton width="65%" />
    </Text>
  </Section>
);
