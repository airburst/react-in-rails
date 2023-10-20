import { airbrake } from "@services/airbrake";
import { useCallback, useState } from "react";

type MutationProps = {
  mutationFn: (variables?: unknown) => Promise<unknown>;
  onSuccess?: (data: unknown) => void;
};

export const useMutation = ({ mutationFn, onSuccess }: MutationProps) => {
  // const hasSetData = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const mutate = useCallback(
    async (variables?: unknown) => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await mutationFn(variables);

        if (onSuccess) {
          onSuccess(data);
        }
      } catch (error) {
        setError(true);
        // Side-effect: emit airbrake notification
        airbrake.notify({
          error,
          params: { mutation: true, variables },
        });
      }
      setIsLoading(false);
    },
    [mutationFn, onSuccess],
  );

  return {
    isLoading,
    error,
    mutate,
  };
};
