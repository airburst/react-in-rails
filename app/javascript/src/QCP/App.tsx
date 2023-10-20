import { useContext, useEffect } from "react";
import { ThemeContext } from "@simplybusiness/mobius";
import { Providers } from "@components/Providers";
import { QuoteComparisonPage } from "@components/QuoteComparisonPage";
import { ErrorBoundary } from "@components/ErrorBoundary";
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
