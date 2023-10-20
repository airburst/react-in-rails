import { HELP_TEXT } from "@/constants";
import { Cover } from "@/types";
import {
  formatCover,
  formatExcesses,
  transformCoverage,
} from "./transformCoverage";

const testCovers = [
  {
    displayName: "General Liability",
    coverName: "General liability",
    displayLimit: "$1,000,000",
    covered: true,
    excessTitle: "Deductible",
    specificExcesses: {},
    indemnityPeriod: "",
    displayExcess: "$0",
    displayAlways: false,
    insurerSpecificName: "Each Occurrence Limit",
    quoteDetailsDisplayLimits: [
      "Occurrence Limit: $1,000,000",
      "Aggregate Limit: $2,000,000",
    ],
    extraCover: false,
    coverInsurer: "Hiscox",
    additionalLimits: [
      {
        id: "64ad5db042eb173efa447c30",
        name: "Aggregate gl limit",
        value: "2000000",
        displayValue: "$2,000,000",
        covers: ["General liability"],
        quoteComparisonDisplayLimit: "$2M / Aggregate",
        quoteDetailsDisplayLimit: "Aggregate Limit: $2,000,000",
        businessUnit: "Business unit simplybusiness_us: Simply Business US",
      },
    ],
    optional: false,
    triaPremium: "",
    triaRequested: false,
  },
  {
    displayName: "Business Personal Property",
    coverName: "Supplemental business property and equipment",
    displayLimit: "Not included",
    covered: false,
    excessTitle: "Deductible",
    specificExcesses: {},
    indemnityPeriod: "",
    displayExcess: "$500",
    displayAlways: false,
    insurerSpecificName:
      "Supplemental Business Personal Property Floater Coverage Limit",
    quoteDetailsDisplayLimits: ["Occurrence Limit: $0"],
    extraCover: false,
    coverInsurer: "Hiscox",
    additionalLimits: [],
    optional: false,
    triaPremium: "",
    triaRequested: false,
  },
  {
    displayName: "Premises Rented To You",
    coverName: "Premises rented to you",
    displayLimit: "$100,000",
    covered: true,
    excessTitle: "Deductible",
    specificExcesses: {},
    indemnityPeriod: "",
    displayExcess: "$0",
    displayAlways: false,
    insurerSpecificName: "",
    quoteDetailsDisplayLimits: [],
    extraCover: true,
    coverInsurer: "Hiscox",
    additionalLimits: [],
    optional: false,
    triaPremium: "",
    triaRequested: false,
  },
  {
    displayName: "Medical Expenses",
    coverName: "Medical expenses",
    displayLimit: "$5,000",
    covered: true,
    excessTitle: "Deductible",
    specificExcesses: {},
    indemnityPeriod: "",
    displayExcess: "$0",
    displayAlways: false,
    insurerSpecificName: "",
    quoteDetailsDisplayLimits: [],
    extraCover: true,
    coverInsurer: "Hiscox",
    additionalLimits: [],
    optional: false,
    triaPremium: "",
    triaRequested: false,
  },
  {
    displayName: "Personal & Advertising Injury",
    coverName: "Personal and advertising injury",
    displayLimit: "$1,000,000",
    covered: true,
    excessTitle: "Deductible",
    specificExcesses: {},
    indemnityPeriod: "",
    displayExcess: "$0",
    displayAlways: false,
    insurerSpecificName: "",
    quoteDetailsDisplayLimits: [],
    extraCover: true,
    coverInsurer: "Hiscox",
    additionalLimits: [],
    optional: false,
    triaPremium: "",
    triaRequested: false,
  },
  {
    displayName: "Products/Completed Operations Limit",
    coverName: "Prod ops agg limit",
    displayLimit: "Subject to General Aggregate Limit",
    covered: true,
    excessTitle: "Deductible",
    specificExcesses: {},
    indemnityPeriod: "",
    displayExcess: "$0",
    displayAlways: false,
    insurerSpecificName: "Products/Completed Operations Aggregate Limit",
    quoteDetailsDisplayLimits: [],
    extraCover: true,
    coverInsurer: "Hiscox",
    additionalLimits: [],
    optional: false,
    triaPremium: "",
    triaRequested: false,
  },
] as unknown as Cover[];

describe("Transform coverage functions", () => {
  it("has no effect on an empty list", () => {
    expect(transformCoverage([])).toEqual([]);
  });

  it("filters a set of covers into a short list for display", () => {
    const transformed = transformCoverage(testCovers);

    expect(testCovers.length).toEqual(6);
    expect(transformed.length).toEqual(1);
  });

  it("formats title and amount for a cover item", () => {
    expect(formatCover("Cover Title: $2,000,000")).toEqual({
      title: "Cover Title",
      amount: "$2M",
    });
    expect(formatCover("Another Title: £200,000")).toEqual({
      title: "Another Title",
      amount: "£200K",
    });
  });

  it("adds help explainer text when a title is matched", () => {
    expect(formatCover("Cover Limit: $2,000,000")).toEqual({
      title: "Cover Limit",
      amount: "$2M",
    });
    expect(formatCover("Occurrence Limit: £200,000")).toEqual({
      title: "Occurrence Limit",
      amount: "£200K",
      explainer: HELP_TEXT["Occurrence Limit"],
    });
    expect(formatCover("Claims Made Limit: £500,000")).toEqual({
      title: "Claim Limit",
      amount: "£500K",
      explainer: HELP_TEXT["Claims Made Limit"],
    });
  });

  it("formats titles and amounts for an excess object", () => {
    expect(
      formatExcesses("$0", {
        "property Damage Deductible Per Claim": "$0",
      }),
    ).toEqual([
      {
        title: "Property Damage Deductible Per Claim",
        amount: "$0",
      },
      {
        title: "All Other Claims",
        amount: "$0",
      },
    ]);
  });
});
