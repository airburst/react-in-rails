"use client";

import { useFeature } from "@/hooks/useFeature";
import { PaymentPeriod, Quote } from "@/types";
import { Text } from "@simplybusiness/mobius";
import { QuoteActions } from "../QuoteActions";
import { Coverage } from "./Coverage/Coverage";
import { Header } from "./Header/Header";
import { Pricing } from "./Pricing/Pricing";
import { Pricing as PricingVariant } from "./Pricing/PricingVariant";

type Props = {
  quote: Quote;
  paymentPeriod: PaymentPeriod;
};

export const QuoteCard = ({ quote, paymentPeriod }: Props) => {
  const { status } = quote;
  const insurer = quote.covers[0]?.coverInsurer;
  const insurerParametrized = insurer.toLowerCase().replaceAll(" ", "-");
  const chopinTestId = `buy-${insurerParametrized}-block`;
  const showPaymentToggle = useFeature("paymentToggle");

  if (status === "referred") {
    return (
      <li className="quote-card__container">
        <div className="quote-card__no-quote">
          <Header logo={quote.insurerLogo} />
          <Text>
            Based on the details you&apos;ve given us, this provider can&apos;t
            provide a quote
          </Text>
        </div>
      </li>
    );
  }

  return (
    <li className="quote-card__container" id={chopinTestId}>
      <div className="quote-card__body">
        <Header
          logo={quote.insurerLogo}
          insurerFinancialStrengthRatings={quote.ratings}
        />
        {showPaymentToggle ? (
          <PricingVariant quote={quote} paymentPeriod={paymentPeriod} />
        ) : (
          <Pricing quote={quote} paymentPeriod={paymentPeriod} />
        )}
        <Coverage
          covers={quote.covers}
          additionalCoverage={quote.additionalCoverage}
        />
        <QuoteActions quoteId={quote.id} insurer={insurer} />
      </div>
    </li>
  );
};
