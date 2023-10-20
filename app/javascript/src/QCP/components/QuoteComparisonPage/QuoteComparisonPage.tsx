import { DEFAULT_NUMBER_OF_QUOTES } from "@/constants";
import { useGetQuotes } from "@/hooks/useGetQuotes";
import { useToggleCover } from "@/hooks/useToggleCover";
import { CoverToggleChangeProps, PaymentPeriod, RFQ } from "@/types";
import { CoverToggles } from "@components/CoverToggles";
import { QuoteCards } from "@components/QuoteCards";
import { QuotesSkeleton } from "@components/QuotesSkeleton";
import { Summary, SummarySkeleton } from "@components/Summary";
import { useAppContext } from "@contexts/AppContext";
import { useDataContext } from "@contexts/DataContext";
import { eventDefinitions } from "@services/analytics";
import { AppError } from "@utils/errors/AppError";
import { useEffect, useState } from "react";

export interface QuoteComparisonPageProps {
  initialRfq?: RFQ;
}

export function QuoteComparisonPage({ initialRfq }: QuoteComparisonPageProps) {
  const { setExperiments } = useAppContext();
  const { tokens } = useDataContext();
  const [paymentPeriod, setPaymentPeriod] = useState<PaymentPeriod>("monthly");

  const {
    isLoading: quotesAreLoading,
    error: quotesError,
    data,
  } = useGetQuotes({ initialData: initialRfq });

  const {
    isLoading: coverIsLoading,
    error: coverError,
    mutate: mutateToggleCover,
  } = useToggleCover();

  const isLoading = quotesAreLoading || coverIsLoading;
  const error = quotesError || coverError;
  const { coverChanged } = eventDefinitions;
  // Cast queried data response type
  const quotesData = data as RFQ;

  useEffect(() => {
    if (quotesData?.experiments) {
      setExperiments(quotesData?.experiments);
    }
  }, [setExperiments, quotesData?.experiments]);

  function handleCoverChange({
    label,
    fromValue,
    toValue,
    name,
  }: CoverToggleChangeProps) {
    const authenticityToken = tokens?.authenticityToken;
    const journeyToken = tokens?.journeyToken;

    if (!authenticityToken || !journeyToken) {
      throw new AppError("Missing tokens");
    }

    // Track analytics
    coverChanged({ name: label, fromValue, toValue });

    mutateToggleCover({
      authenticityToken,
      journeyToken,
      coverName: name,
      coverValue: toValue,
    });
  }

  if (error || coverError) {
    console.error("Problem fetching data");
  }

  if (isLoading) {
    return (
      <div className="sb-embedded-app">
        <SummarySkeleton />
        <CoverToggles
          coverToggles={quotesData?.coverTogglesData || []}
          onChange={handleCoverChange}
          isLoading={coverIsLoading}
          paymentPeriod={paymentPeriod}
          setPaymentPeriod={setPaymentPeriod}
        />
        <QuotesSkeleton count={DEFAULT_NUMBER_OF_QUOTES} />
      </div>
    );
  }

  if (!quotesData) {
    return <div>Problem with quotes...</div>;
  }

  return (
    <div className="sb-embedded-app">
      <Summary
        quotes={quotesData.quotes}
        productTitle={quotesData?.productTitle}
      />

      <CoverToggles
        coverToggles={quotesData.coverTogglesData}
        onChange={handleCoverChange}
        isLoading={coverIsLoading}
        paymentPeriod={paymentPeriod}
        setPaymentPeriod={setPaymentPeriod}
      />
      <QuoteCards quoteData={quotesData} paymentPeriod={paymentPeriod} />
    </div>
  );
}
