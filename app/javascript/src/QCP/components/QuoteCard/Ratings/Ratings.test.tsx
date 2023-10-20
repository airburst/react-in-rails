import { renderWithFeatures, screen } from "@utils/testUtils";
import { Ratings } from "./Ratings";

describe("Ratings", () => {
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

  describe("given reinsurerText", () => {
    it("the text is rendered in the component", () => {
      const reinsurerText = "The best";

      renderWithFeatures({ horizontalQuotesLayout: true })(
        <Ratings data={{ reinsurerText, ratingType: "ambest" }} />,
      );

      expect(screen.getByText(reinsurerText)).toBeInTheDocument();
    });
  });

  describe("given no reinsurerText", () => {
    it("the blank space is rendered for layout across horizontally placed cards", () => {
      const ratingBody = "Demotech";

      const { container } = renderWithFeatures({
        horizontalQuotesLayout: true,
      })(<Ratings data={{ ratingBody, ratingType: "ambest" }} />);

      const blankSpace = container.getElementsByClassName("ratings__text");

      expect(blankSpace.length).toBe(1);
      expect(blankSpace[0]).toHaveTextContent("");
    });
  });

  describe("given ratingBody and credit rating agency description exists", () => {
    it("renders a modal", () => {
      const ratingBody = "Demotech";

      renderWithFeatures({
        horizontalQuotesLayout: true,
      })(<Ratings data={{ ratingBody, ratingType: "ambest" }} />);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("card-modal__trigger");
    });

    it("matches any ratingBody containing Demotech", () => {
      const ratingBody = "Demotech Ratings";

      renderWithFeatures({
        horizontalQuotesLayout: true,
      })(<Ratings data={{ ratingBody, ratingType: "ambest" }} />);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("card-modal__trigger");
    });
  });
});
