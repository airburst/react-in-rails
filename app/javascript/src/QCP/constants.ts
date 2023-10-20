import { Agencies } from "@/types";
import type { BreakpointsType } from "@simplybusiness/mobius";

export const APP_ID = "sb-qcp";

export const APP_DEFAULT_PROPS = {};

export const ARTIFICIAL_FETCH_DELAY_IN_MS = 1000;

export const HOST_URL = "https://quote.simplybusiness.com";

export const DEFAULT_ANALYTICS_SITE = "simplybusiness_us";

export const DEFAULT_NUMBER_OF_QUOTES = 3;

export const HORIZONTAL_STACK_MINIMUM = 3;

export const STORAGE_FEATURE_OVERRIDE_KEY = "embedded-qcp/feature-overrides";

interface HelpText {
  [key: string]: string;
}

export const HELP_TEXT: HelpText = {
  "Occurrence Limit":
    "This is the maximum amount of money you'll get to cover a single incident that occurs during the policy period, regardless of when it's reported.",
  "Aggregate Limit":
    "This is the highest amount of money the insurance company will pay you for all claims made during your policy period.",
  "Claims Made Limit":
    "This is the amount the insurance company will pay for each individual claim made during the policy period.",
};

export type CreditRatingAgencyDescriptionsProps = {
  [key in Agencies]: {
    label: string;
    description: string;
  };
};

export const creditRatingAgencyDescriptions: CreditRatingAgencyDescriptionsProps =
  {
    ambest: {
      label: "A.M. Best",
      description:
        "The world’s largest credit rating agency specializing in the insurance industry. A.M. Best assesses the creditworthiness of and/or reports on insurance companies.",
    },
    demotech: {
      label: "Demotech Rating",
      description:
        "Demotech is a financial analysis firm specializing in evaluating the financial stability of regional and specialty insurers.",
    },
  };

export const breakpoints = [
  { size: "xs", value: 320 },
  { size: "sm", value: 480 },
  { size: "md", value: 600 },
  { size: "lg", value: 850 },
  { size: "xl", value: 1024 },
] as BreakpointsType;
