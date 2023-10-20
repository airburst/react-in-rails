import { ARTIFICIAL_FETCH_DELAY_IN_MS } from "@/constants";
import { RFQ } from "@/types";
import { RequestError } from "@utils/errors/RequestError";
import { transformQuotes } from "@utils/transformQuotes";
import { timeout } from "./timeout";

async function getQuoteData(): Promise<RFQ> {
  const response = await fetch(
    `${location.pathname}?step_action=quote_serialized_data`,
    {
      headers: { Accept: "application/json; charset=utf-8" },
    },
  );

  return response.json();
}

async function getMockQuoteData() {
  await timeout(ARTIFICIAL_FETCH_DELAY_IN_MS);
  const data = await import("../__mocks__/quoteHiscox.json");
  return data.default;
}

export async function getQuotes(requiresMockData?: boolean) {
  try {
    const data = requiresMockData
      ? await getMockQuoteData()
      : await getQuoteData();

    return transformQuotes(data);
  } catch (cause) {
    throw new RequestError("getQuotes", { cause });
  }
}
