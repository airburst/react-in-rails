import { getEnvironment } from "@utils/env";
import { EnvConfig, TrackingProps } from "./types";
/**
 * This file sets config for SimplyBusiness UK Snowplow tracking
 */

const config: EnvConfig = {
  appId: "us-chopin",
  avalancheCollector: "snowplow-collector-staging.simplybusiness.com",
  eventMethod: "post",
  cookieDomain: {
    business: "simplybusiness.com",
    professional: "simplybusiness.com",
    shop: "simplybusiness.com",
    landlord: "simplybusiness.com",
    commercialLandlord: "simplybusiness.com",
    notForProfit: "simplybusiness.com",
    contractorsCombined: "simplybusiness.com",
    commercialCombined: "simplybusiness.com",
    default: "simplybusiness.com",
  },
  trackPageView: false,
  trackActivity: true,
  includeGAContext: true,
};

export const getEnvConfig = (vertical?: string): TrackingProps => {
  const env = getEnvironment();

  const { cookieDomain: domains, ...baseConfig } = config;
  const cookieDomain: string = domains[vertical || "default"] as string;

  switch (env) {
    case "production":
      return {
        ...baseConfig,
        cookieDomain,
        avalancheCollector: "snowplow-collector.simplybusiness.com",
      };
    case "staging":
      return {
        ...baseConfig,
        cookieDomain,
      };
    case "test":
      return {
        ...baseConfig,
        cookieDomain,
      };
    // development
    default:
      return {
        ...baseConfig,
        cookieDomain,
        avalancheCollector: "localhost:8000", // Fakesp
      };
  }
};
