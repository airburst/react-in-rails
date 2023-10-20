import { tryParse } from "@utils/tryParse";
import { STORAGE_FEATURE_OVERRIDE_KEY } from "./constants";

// List of all the available features
export const defaultFeatures = {
  horizontalQuotesLayout: false,
  paymentToggle: false,
};

export type Feature = keyof typeof defaultFeatures;

export type FeatureFlags = typeof defaultFeatures;

export type PartialFeatureFlags = Partial<FeatureFlags>;

// Creates a feature flags object with all of the feature keys included.
// Combines defaults (all feature flags false) with the provided feature
// values.
export function makeFeatureFlags(
  ...providedFeatureFlags: (PartialFeatureFlags | undefined)[]
): FeatureFlags {
  // Merge all the provided feature flags together
  return providedFeatureFlags.reduce(
    (previous, featureFlags) => ({ ...previous, ...featureFlags }),
    defaultFeatures
  ) as FeatureFlags;
}

export interface Experiments extends Record<string, string> {}

export const isVariant = (
  experiments: Experiments,
  experimentName: string,
  variantName: string
) => experiments?.[experimentName] === variantName;

export function deriveFeaturesFromExperiments(
  experiments: Experiments | undefined
): PartialFeatureFlags {
  if (experiments == null) {
    return {};
  }

  // Add feature-experiment mappings here
  return {
    horizontalQuotesLayout: isVariant(
      experiments,
      "us-15-09-qcp-horizontal-ambest-payment-toggle",
      "treatment"
    ),
    paymentToggle: isVariant(
      experiments,
      "us-15-09-qcp-horizontal-ambest-payment-toggle",
      "treatment"
    ),
  };
}

export function loadFeaturesFromStorage(storage: Storage) {
  return function () {
    const serializedData = storage.getItem(STORAGE_FEATURE_OVERRIDE_KEY);

    return tryParse(serializedData, {});
  };
}

export const getFeatureFlags = (
  experiments?: Experiments,
  initialFeatureFlags?: FeatureFlags
): FeatureFlags =>
  makeFeatureFlags(
    deriveFeaturesFromExperiments(experiments),
    initialFeatureFlags,
    loadFeaturesFromStorage(localStorage)(),
    loadFeaturesFromStorage(sessionStorage)()
  );
