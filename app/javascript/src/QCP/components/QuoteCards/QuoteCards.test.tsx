import { RFQ } from "@/types";
import { fromPartial } from "@total-typescript/shoehorn";
import { render, renderWithFeatures, screen } from "@utils/testUtils";
import React from "react";
import { QuoteCards } from "./QuoteCards";

const quoteData = fromPartial<RFQ>({
  quotes: [
    {
      id: "quote1",
      status: "quoted",
      covers: [
        {
          displayName: "Public Liability",
          coverInsurer: "dummy insurer",
          quoteDetailsDisplayLimits: [],
        },
      ],
    },
  ],
});

const threeQuotesData = fromPartial<RFQ>({
  quotes: [
    {
      id: "64db813342eb1754f3d835e7",
      status: "quoted",
      premium: "$1,204.00",
      covers: [
        {
          displayName: "Public Liability",
          coverInsurer: "dummy insurer",
          quoteDetailsDisplayLimits: [],
          specificExcesses: {},
        },
      ],
    },
    {
      id: "64db813342eb1754f3d8360c",
      status: "quoted",
      premium: "$904.00",
      covers: [
        {
          displayName: "Public Liability",
          coverInsurer: "another insurer",
          quoteDetailsDisplayLimits: [],
          specificExcesses: {},
        },
      ],
    },
    {
      id: "64db813342eb1754f3d83620",
      status: "quoted",
      premium: "$704.00",
      covers: [
        {
          displayName: "Public Liability",
          coverInsurer: "third insurer",
          quoteDetailsDisplayLimits: [],
          specificExcesses: {},
        },
      ],
    },
  ],
});

describe("QuoteCards", () => {
  beforeAll(() => {
    // Mock window.matchMedia used by Modal from Mobius
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("should show the NoQuotesCard component when no quotes are available", () => {
    const mockQuoteData = fromPartial<RFQ>({
      quotes: [],
    });
    render(<QuoteCards quoteData={mockQuoteData} />);
    expect(screen.getByText("Let's try this again")).toBeInTheDocument();
  });

  it("should show the NoQuotesCard component when no quoted quotes are available", () => {
    const mockQuoteData = fromPartial<RFQ>({
      quotes: [
        {
          status: "referred",
          covers: [
            {
              coverInsurer: "dummy insurer",
            },
          ],
        },
      ],
    });
    render(<QuoteCards quoteData={mockQuoteData} />);
    expect(screen.getByText("Let's try this again")).toBeInTheDocument();
  });

  it("should show Insurer Financial Strength Rating text when available", () => {
    const REINSURER_TEXT = "Backed by Munich Re*";
    const RATING_BODY = "*A.M. Best Rating";
    const RATING = "A+ (Superior)";

    const mockQuoteData = fromPartial<RFQ>({
      quotes: [
        {
          id: "quote1",
          status: "quoted",
          ratings: {
            reinsurerText: REINSURER_TEXT,
            ratingBody: RATING_BODY,
            rating: RATING,
            ratingType: "ambest",
          },
          covers: [
            {
              coverInsurer: "dummy insurer",
              quoteDetailsDisplayLimits: [],
            },
          ],
        },
      ],
    });
    renderWithFeatures({ horizontalQuotesLayout: true })(
      <QuoteCards quoteData={mockQuoteData} />,
    );

    const insurerFinancialStrengthRatingReinsurerText =
      screen.getByText(REINSURER_TEXT);
    const insurerFinancialStrengthRatingRatingBody =
      screen.getByText(RATING_BODY);
    const insurerFinancialStrengthRating = screen.getByText(RATING);

    expect(insurerFinancialStrengthRatingReinsurerText).toBeInTheDocument();
    expect(insurerFinancialStrengthRatingRatingBody).toBeInTheDocument();
    expect(insurerFinancialStrengthRating).toBeInTheDocument();
  });

  it("should not show the NoQuotesCard component when quoted quotes are available", () => {
    const mockQuoteData = fromPartial<RFQ>({
      quotes: [
        {
          id: "quote1",
          status: "quoted",
          covers: [
            {
              coverInsurer: "dummy insurer",
              quoteDetailsDisplayLimits: [],
            },
          ],
        },
      ],
    });
    render(<QuoteCards quoteData={mockQuoteData} />);
    expect(screen.queryByText("Let's try this again")).not.toBeInTheDocument();
  });

  it("should display a vertical stack if horizontal layout experiment is disabled", () => {
    const { container } = renderWithFeatures({
      horizontalQuotesLayout: false,
    })(<QuoteCards quoteData={threeQuotesData} />);

    const quoteGrid = container.getElementsByClassName("quote-cards__vertical");

    expect(quoteGrid.length).toBe(1);
  });

  it("should display a vertical stack if there are fewer than 3 quotes", () => {
    const { container } = render(<QuoteCards quoteData={quoteData} />);

    const quoteGrid = container.getElementsByClassName("quote-cards__vertical");

    expect(quoteGrid.length).toBe(1);
  });

  it("should be able to display a horizontal stack if there are 3 or more quotes and horizontal layout experiment is enabled", () => {
    const { container } = renderWithFeatures({
      horizontalQuotesLayout: true,
    })(<QuoteCards quoteData={threeQuotesData} />);

    const quoteGrid = container.getElementsByClassName("quote-cards__vertical");

    expect(quoteGrid.length).toBe(0);
  });
});
