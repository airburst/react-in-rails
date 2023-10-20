import { RFQ } from "@/types";
import { getQuotes } from "@api/getQuotes";
import { useQuery } from "./useQuery";
import { useAppContext } from "@contexts/AppContext";

export const useGetQuotes = ({ initialData }: { initialData?: RFQ }) => {
  // Detect whether site is hosted and can access real data
  const { isStandalone } = useAppContext();

  return useQuery({
    queryKey: "rfq",
    queryFn: () => getQuotes(isStandalone),
    initialData,
  });
};
