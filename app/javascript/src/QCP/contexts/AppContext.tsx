import { HOST_URL } from "@/constants";
import {
  Experiments,
  Feature,
  FeatureFlags,
  getFeatureFlags,
} from "@/features";
import { isHosted, isStandalone } from "@utils/env";
import { AppError } from "@utils/errors/AppError";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface AppContextInterface {
  origin: string;
  isStandalone: boolean;
  isHosted: boolean;
  featureFlags: Record<Feature, boolean>;
  setExperiments: (experiments: Experiments) => void;
}

const AppContext = createContext<AppContextInterface | null>(null);

type ProviderProps = {
  initialFeatureFlags?: FeatureFlags;
  children: ReactNode;
};

// Use Chopin host app as base url in production
const getOrigin = (origin?: string) => {
  const realOrigin = origin || location.origin;

  // Embedded app (local or hosted) uses public chopin url
  return isStandalone(realOrigin) ? HOST_URL : realOrigin;
};

export const AppProvider = ({
  children,
  initialFeatureFlags,
}: ProviderProps) => {
  const [experiments, _setExperiments] = useState<Experiments | undefined>(
    undefined,
  );
  const origin = process.env.NODE_ENV === "production" ? getOrigin() : HOST_URL;

  const setExperiments = useCallback(
    (newExperiments: Experiments) => {
      // Only set the experiments once for the duration of the app
      if (experiments) return;
      _setExperiments(Object.freeze(newExperiments));
    },
    [experiments, _setExperiments],
  );

  const featureFlags = getFeatureFlags(experiments, initialFeatureFlags);

  const value: AppContextInterface = useMemo(
    () => ({
      origin,
      isStandalone: isStandalone(location.origin),
      isHosted: isHosted(location.origin),
      featureFlags,
      setExperiments,
    }),
    [origin, featureFlags, setExperiments],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new AppError("useAppContext must be used inside an `AppProvider`");
  }
  return context;
}
