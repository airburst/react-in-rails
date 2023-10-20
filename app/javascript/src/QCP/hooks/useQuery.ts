import { useDataContext } from "@contexts/DataContext";
import { airbrake } from "@services/airbrake";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * This is a generic function to call query functions and
 * cache results in a key within DataContext
 */

export type QueryProps = {
  queryKey?: string;
  queryFn: () => Promise<unknown>;
  initialData?: unknown;
};

export const useQuery = ({ queryKey, queryFn, initialData }: QueryProps) => {
  const { setData, data } = useDataContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const hasSetData = useRef(false);
  const cacheKey = queryKey || "data";

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryData = await queryFn();
      setData(cacheKey, queryData);
    } catch (error) {
      setError(true);
      // Side-effect: emit airbrake notification
      airbrake.notify({
        error,
        params: { query: queryKey },
      });
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, queryFn]);

  useEffect(() => {
    if (!hasSetData.current) {
      if (!initialData) {
        fetchData();
      } else {
        setData(cacheKey, initialData);
        setIsLoading(false);
      }
      hasSetData.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return {
    isLoading,
    error,
    data: data?.[cacheKey],
  };
};
