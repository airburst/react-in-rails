import { ErrorBoundary } from "@components/ErrorBoundary";
import { Providers } from "@components/Providers";
import { QuoteComparisonPage } from "@components/QuoteComparisonPage";
import { ThemeContext } from "@simplybusiness/mobius";
import "@simplybusiness/theme-sb";
import React, { useContext, useEffect } from "react";
import { breakpoints } from "./constants";
import { RFQ } from "./types";

export type AppProps = {
  rfq?: RFQ;
};

const App = ({ rfq }: AppProps) => {
  const { setBreakpoints } = useContext(ThemeContext);

  useEffect(() => {
    setBreakpoints(breakpoints);
  }, [setBreakpoints]);

  return (
    <ErrorBoundary>
      <Providers>
        <QuoteComparisonPage initialRfq={rfq} />
      </Providers>
    </ErrorBoundary>
  );
};

export default App;
