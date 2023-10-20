import { HORIZONTAL_STACK_MINIMUM } from "@/constants";
import { useDataContext } from "@/contexts";
import { useFeature } from "@/hooks/useFeature";
import { PaymentPeriod, Quote, RFQ } from "@/types";
import { NoQuotesCard } from "@components/NoQuotesCard";
import { Section } from "@components/Section";
import { useBreakpoint } from "@simplybusiness/mobius";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { QuoteCard } from "../QuoteCard";

type Props = {
  quoteData?: RFQ | null;
  paymentPeriod?: PaymentPeriod;
};

const convertCurrencyToNumber = (amount: string): number => {
  const cleaned = amount.replace(/[$£,]/g, "");

  return +(cleaned || Infinity);
};

const sortByPrice = (a: Quote, b: Quote) => {
  const left = convertCurrencyToNumber(a.premium);
  const right = convertCurrencyToNumber(b.premium);

  return left - right;
};

export const QuoteCards = ({ quoteData, paymentPeriod = "monthly" }: Props) => {
  const { setTokens } = useDataContext();
  const { up } = useBreakpoint();
  const tokenRef = useRef(false);
  const quotes = quoteData?.quotes;
  const authenticityToken = quoteData?.authenticityToken;
  const journeyToken = quoteData?.journeyToken;

  const showHorizontalLayout = useFeature("horizontalQuotesLayout") && up("xl");

  // Set tokens once; they can change after other interactions
  useEffect(() => {
    if (!tokenRef.current) {
      setTokens({ authenticityToken, journeyToken });
      tokenRef.current = true;
    }
  }, [setTokens, authenticityToken, journeyToken]);

  if (!quoteData) {
    return null;
  }

  const quotedQuotes =
    quotes?.filter((quote) => quote.status === "quoted") ?? [];

  // Sort quotes so that non-provision comes last
  const sortedQuotes = quotes?.sort(sortByPrice);

  const useVerticalQuotesLayout =
    !showHorizontalLayout ||
    (sortedQuotes?.length ?? 0) < HORIZONTAL_STACK_MINIMUM;

  const classes = clsx("quote-cards__grid", {
    "quote-cards__vertical": useVerticalQuotesLayout,
  });

  return (
    <Section>
      <ul className={classes}>
        {quotedQuotes.length > 0 ? (
          sortedQuotes?.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              paymentPeriod={paymentPeriod}
            />
          ))
        ) : (
          <NoQuotesCard />
        )}
      </ul>
    </Section>
  );
};
