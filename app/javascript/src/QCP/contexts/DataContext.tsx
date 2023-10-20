import { AppError } from "@utils/errors/AppError";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Tokens = {
  authenticityToken?: string;
  journeyToken?: string;
};

type Data = Record<string, unknown> | undefined;

export interface DataContextInterface {
  tokens?: Tokens;
  setTokens: (tokens: Tokens) => void;
  updateTokens: (data: unknown) => void;
  data: Data;
  setData: (cacheKey: string, data: unknown) => void;
}

const DataContext = createContext<DataContextInterface | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: ProviderProps) => {
  const [tokens, setTokens] = useState<Tokens | undefined>(undefined);
  const [appData, setAppData] = useState<Data>();

  const updateTokens = useCallback(
    (data: unknown) => {
      if (!data || typeof data !== "object") return;

      if (
        "authenticityToken" in data &&
        typeof data.authenticityToken === "string" &&
        "journeyToken" in data &&
        typeof data.journeyToken === "string"
      ) {
        setTokens({
          authenticityToken: data.authenticityToken,
          journeyToken: data.journeyToken,
        });
      }
    },
    [setTokens],
  );

  const setData = useCallback(
    (cacheKey: string, value: unknown) => {
      const newData = { ...appData };
      newData[cacheKey] = value;
      setAppData(newData);
    },
    [appData],
  );

  const value: DataContextInterface = useMemo(
    () => ({
      tokens,
      setTokens,
      updateTokens,
      data: appData,
      setData,
    }),
    [tokens, updateTokens, appData, setData],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new AppError("useDataContext must be used inside an `DataProvider`");
  }
  return context;
}
