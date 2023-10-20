import { type Feature } from "@/features";
import { useAppContext } from "@contexts/AppContext";

export function useFeature(feature: Feature) {
  const { featureFlags } = useAppContext();

  return featureFlags[feature] || false;
}
