import { ARTIFICIAL_FETCH_DELAY_IN_MS } from "@/constants";
import { RFQ } from "@/types";
import { isStandalone } from "@utils/env";
import { RequestError } from "@utils/errors/RequestError";
import { timeout } from "./timeout";

export interface ToggleCoverVariables {
  authenticityToken: string;
  journeyToken: string;
  coverName: string;
  coverValue: string;
}

async function mockToggleCover(_variables: ToggleCoverVariables) {
  await timeout(ARTIFICIAL_FETCH_DELAY_IN_MS);

  const { coverValue } = _variables;
  const oneMillion = coverValue === "1000000";
  const data = oneMillion
    ? await import("../__mocks__/quoteHiscox.json")
    : await import("../__mocks__/toggleHiscox.json");
  return data.default;
}

async function realToggleCover({
  authenticityToken,
  journeyToken,
  coverName,
  coverValue,
}: ToggleCoverVariables): Promise<RFQ> {
  const response = await fetch(
    `${location.pathname}?step_action=toggle_cover&cover_name=${coverName}&cover_value=${coverValue}&journey_token=${journeyToken}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json; charset=utf-8",
        "X-CSRF-Token": authenticityToken,
      },
      body: JSON.stringify({
        journey_token: journeyToken,
        cover_name: coverName,
        cover_value: coverValue,
      }),
    },
  );

  return response.json() as unknown as RFQ;
}

export async function toggleCover(
  variables: ToggleCoverVariables,
): Promise<RFQ> {
  try {
    return isStandalone()
      ? ((await mockToggleCover(variables)) as unknown as RFQ)
      : await realToggleCover(variables);
  } catch (cause) {
    throw new RequestError("toggleCover", { cause });
  }
}
