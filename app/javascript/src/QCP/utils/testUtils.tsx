import { AppProvider, DataProvider } from "@/contexts";
import {
  FeatureFlags,
  PartialFeatureFlags,
  makeFeatureFlags,
} from "@/features";

import { RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";

const values = {
  tokens: {
    authenticityToken: "12345",
    journeyToken: "87123468076",
  },
  origin: "http://test",
  isStandalone: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTokens: () => {},
};

type HelperProps = {
  children: JSX.Element;
};

const AllTheProviders = ({ children }: HelperProps) => {
  return (
    <AppProvider {...values}>
      <DataProvider>{children}</DataProvider>
    </AppProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, userEvent };

// Factory to include intial experiments
function ProvidersFactory(featureFlags: FeatureFlags) {
  return function ProvidersWithExperiments({ children }: HelperProps) {
    return (
      <AppProvider {...values} initialFeatureFlags={featureFlags}>
        <DataProvider>{children}</DataProvider>
      </AppProvider>
    );
  };
}

export const renderWithFeatures =
  (features: PartialFeatureFlags) =>
  (ui: ReactElement, options?: RenderOptions) =>
    render(ui, {
      wrapper: ProvidersFactory(makeFeatureFlags(features)),
      ...options,
    });
