import { HELP_TEXT } from "@/constants";
import { Cover } from "@/types";
import { titleCase } from "@utils/text";
import { CoverProps } from "../components/QuoteCard/Cover/Cover";

export const formatAmount = (amount: string) =>
  amount.replace(",000,000", "M").replace(",000", "K");

// {property Damage Deductible Per Claim: '$0'}
export const formatCover = (cover: string): CoverProps => {
  const [title, amount] = cover.split(": ");
  const explainer = HELP_TEXT[title];
  // Adjust title for Claim Limit
  let displayTitle = titleCase(title);
  if (displayTitle === "Claims Made Limit") {
    displayTitle = "Claim Limit";
  }

  return {
    title: displayTitle,
    amount: formatAmount(amount),
    explainer,
  };
};

export const formatExcesses = (
  displayExcess: string,
  specificExcesses: Record<string, string>,
): CoverProps[] => {
  const excesses = {
    ...specificExcesses,
    "All Other Claims": displayExcess,
  };
  return Object.entries(excesses).map(([title, amount]) => {
    return {
      title: titleCase(title),
      amount: formatAmount(amount),
      explainer: HELP_TEXT[title],
    };
  });
};

export const transformCoverage = (covers: Cover[]) => {
  return covers.filter(
    (c) =>
      c.displayLimit !== "Not included" &&
      c.quoteDetailsDisplayLimits.length > 0,
  );
};
