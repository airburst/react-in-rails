import { RFQ } from "@/types";
import { fromPartial } from "@total-typescript/shoehorn";
import { renderWithFeatures, screen } from "@utils/testUtils";
import { Summary } from "./Summary";

const threeQuotes = fromPartial<RFQ>({
  quotes: [
    {
      id: "64db813342eb1754f3d835e7",
      status: "quoted",
      premium: "$1,204.00",
      covers: [
        {
          displayName: "General Liability",
          coverInsurer: "dummy insurer",
          quoteDetailsDisplayLimits: [
            "Occurrence Limit: $0",
            "Aggregate Limit: $50,000",
          ],
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
          quoteDetailsDisplayLimits: [
            "Occurrence Limit: $0",
            "Aggregate Limit: $50,000",
          ],
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
          quoteDetailsDisplayLimits: [
            "Occurrence Limit: $0",
            "Aggregate Limit: $50,000",
          ],
          specificExcesses: {},
        },
      ],
    },
  ],
});

const singleQuote = fromPartial<RFQ>({
  quotes: [
    {
      id: "64db813342eb1754f3d835e7",
      status: "quoted",
      premium: "$1,204.00",
      covers: [
        {
          displayName: "General Liability",
          coverInsurer: "dummy insurer",
          quoteDetailsDisplayLimits: [
            "Occurrence Limit: $0",
            "Aggregate Limit: $50,000",
          ],
          specificExcesses: {},
        },
      ],
    },
  ],
});

describe("Quote Summary", () => {
  describe("Displayed information", () => {
    it("does not appear when the AB test flag is false", () => {
      renderWithFeatures({
        paymentToggle: false,
      })(<Summary quotes={threeQuotes.quotes} />);

      const title = screen.queryByText(/quote/g);

      expect(title).not.toBeInTheDocument();
    });

    describe("when AB test is true", () => {
      it("displays content", () => {
        const { container } = renderWithFeatures({
          paymentToggle: true,
        })(<Summary quotes={threeQuotes.quotes} />);
        const title = container
          .getElementsByClassName("quote-summary__title")
          .item(0);

        expect(title).toBeInTheDocument();
      });

      it("uses default title when productTitle is not supplied", () => {
        const { container } = renderWithFeatures({
          paymentToggle: true,
        })(<Summary quotes={threeQuotes.quotes} />);
        const title = container
          .getElementsByClassName("quote-summary__title")
          .item(0);

        expect(title?.textContent).toBe("Your Business Insurance quotes");
      });

      it("uses productTitle when supplied", () => {
        const { container } = renderWithFeatures({
          paymentToggle: true,
        })(
          <Summary
            quotes={threeQuotes.quotes}
            productTitle="General Liability and Public Liability"
          />,
        );
        const title = container
          .getElementsByClassName("quote-summary__title")
          .item(0);

        expect(title?.textContent).toBe(
          "Your General Liability and Public Liability quotes",
        );
      });

      it("includes a count of quotes", () => {
        const { container } = renderWithFeatures({
          paymentToggle: true,
        })(<Summary quotes={threeQuotes.quotes} />);
        const description = container
          .getElementsByClassName("quote-summary__description")
          .item(0);

        expect(description?.textContent).toBe(
          "We searched through multiple carriers and found 3 quotes for your business",
        );
      });

      it("shows 'quote' for a single result", () => {
        const { container } = renderWithFeatures({
          paymentToggle: true,
        })(<Summary quotes={singleQuote.quotes} />);
        const description = container
          .getElementsByClassName("quote-summary__description")
          .item(0);

        expect(description?.textContent).toBe(
          "We searched through multiple carriers and found 1 quote for your business",
        );
      });

      it("does not render if there are no quotes", () => {
        renderWithFeatures({
          paymentToggle: true,
        })(<Summary quotes={[]} />);

        const title = screen.queryByText(/quote/g);

        expect(title).not.toBeInTheDocument();
      });
    });
  });
});
