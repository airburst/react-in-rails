import { toggleCover } from "@api/toggleCover";
import { useMutation } from "./useMutation";
import { useDataContext } from "@contexts/DataContext";

export const useToggleCover = () => {
  const { updateTokens, setData } = useDataContext();

  return useMutation({
    // @ts-expect-error cannot infer type of supplied function
    mutationFn: toggleCover,
    onSuccess: (data) => {
      updateTokens(data);
      setData("rfq", data);
    },
  });
};
