import { Agencies } from "@/types";
import { render, renderWithFeatures, screen } from "@utils/testUtils";
import { Header } from "./Header";

const ORIGIN = "https://quote.simplybusiness.com";
const absoluteLogoUrl =
  "https://d1y3eqiqwfdgik.cloudfront.net/assets/logos/insurers/harborway_insurance-1a46ba508f3dfcc89aa2498e7680ed15bd1704ccb01c614eb5335bd7b25e0537.png";
const relativeLogoUrl =
  "/assets/logos/insurers/harborway_insurance-1a46ba508f3dfcc89aa2498e7680ed15bd1704ccb01c614eb5335bd7b25e0537.png";
const ratingInfo = {
  reinsurerText: "Backed by Munich Re*",
  ratingBody: "*A.M. Best Rating",
  rating: "A+ (Superior)",
  ratingType: "ambest" as Agencies,
};

describe("Quote Card Header", () => {
  it("omits a logo when none is provided", () => {
    const { container } = render(<Header />);

    const logo = container.getElementsByClassName("header__provider-logo");

    expect(logo.length).toBe(0);
  });

  it("renders logos with an absolute path", () => {
    render(<Header logo={absoluteLogoUrl} />);

    const logo = screen.getByAltText("Provider logo");

    expect(logo.getAttribute("src")).toBe(absoluteLogoUrl);
  });

  it("renders logos with a relative path", () => {
    render(<Header logo={relativeLogoUrl} />);

    const logo = screen.getByAltText("Provider logo");

    expect(logo.getAttribute("src")).toBe(`${ORIGIN}${relativeLogoUrl}`);
  });

  describe("Ratings information", () => {
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

    it("displays ratings info when present", () => {
      renderWithFeatures({ horizontalQuotesLayout: true })(
        <Header
          logo={relativeLogoUrl}
          insurerFinancialStrengthRatings={ratingInfo}
        />,
      );

      const reinsurerText = screen.getByText("Backed by Munich Re*");
      const ratingBody = screen.getByText("*A.M. Best Rating");
      const rating = screen.getByText("A+ (Superior)");
      expect(reinsurerText).toBeInTheDocument();
      expect(ratingBody).toBeInTheDocument();
      expect(rating).toBeInTheDocument();
    });

    it("does not display ratings info when not present", () => {
      const { container } = render(<Header logo={relativeLogoUrl} />);
      const ratings = container.getElementsByClassName("ratings__container");
      expect(ratings.length).toBe(0);
    });

    it("does not display ratings info when AB experiment is false", () => {
      const { container } = renderWithFeatures({
        horizontalQuotesLayout: false,
      })(
        <Header
          logo={relativeLogoUrl}
          insurerFinancialStrengthRatings={ratingInfo}
        />,
      );

      const ratings = container.getElementsByClassName("ratings__container");
      expect(ratings.length).toBe(0);
    });
  });
});
