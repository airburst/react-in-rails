import { Experiments } from "./features";

export interface RFQ {
  success: boolean;
  rfqId: string;
  authenticityToken?: string;
  journeyToken?: string;
  quotes: Quote[];
  coverTogglesData: CoverToggle[];
  productTitle?: string;
  experiments?: Experiments;
}

export interface CoverToggle {
  field_name: string;
  question_text: string;
  value: string;
  info: string;
  starts_from: string;
  options?: Record<string, string>;
  selected?: boolean;
  excess_toggle_cover?: string | null;
}

export type Agencies = "ambest" | "demotech";

export type Ratings = Partial<{
  reinsurerText: string;
  ratingBody: string;
  rating: string;
}> & { ratingType: Agencies };

export interface Quote {
  id: string;
  status: string;
  installmentsAvailable: boolean;
  downpaymentAmount?: string;
  installmentsAmount?: string;
  installmentsCount?: number;
  ariaLabelText: string;
  covers: Cover[];
  insurerLogo: string;
  premium: string;
  additionalCoverage?: boolean;
  ratings?: Ratings;
}

export interface Cover {
  displayName: string;
  coverName: string;
  displayLimit: string;
  covered: boolean;
  excessTitle: string;
  specificExcesses: Record<string, string>;
  indemnityPeriod: string | null;
  displayExcess: string;
  displayAlways: boolean;
  insurerSpecificName?: string;
  quoteDetailsDisplayLimits: string[];
  extraCover: boolean;
  coverInsurer: string;
  additionalLimits: AdditionalLimit[];
  optional: boolean;
  triaPremium: string | null; // Could be number?
  triaRequested: boolean;
}

export interface AdditionalLimit {
  id: string;
  name: string;
  value: number;
  displayValue: string;
  covers: string[];
  quoteComparisonDisplayLimit: string;
  quoteDetailsDisplayLimit: string;
  businessUnit: string;
}

export type OptionProps = {
  value: string;
  text: string;
};

export type CoverToggleBaseProps = {
  name: string;
  label: string;
};

export type CoverToggleChangeProps = {
  fromValue: string;
  toValue: string;
} & CoverToggleBaseProps;
export interface CoverToggleProps extends CoverToggleBaseProps {
  value: string;
  options?: Record<string, string>;
  onChange: ({
    name,
    label,
    fromValue,
    toValue,
  }: CoverToggleChangeProps) => void;
  isLoading?: boolean;
}

export type PaymentPeriod = "monthly" | "annual";
