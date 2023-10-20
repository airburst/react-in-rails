import { eventDefinitions } from "@services/analytics";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Cover } from "./Cover";

const EXPLAINER_TITLE_CLASS_NAME = "card-modal__explainer-title";

jest.mock("@services/analytics", () => ({
  eventDefinitions: {
    coverageModalOpened: jest.fn(),
  },
}));

describe("Cover", () => {
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

  describe("when no explainer is provided", () => {
    it("displays title and amount", () => {
      const product = "General Liability";
      const title = "Aggregate Limit";
      const amount = "$2M";

      render(<Cover product={product} title={title} amount={amount} />);

      const titleText = screen.getByText(title);

      expect(titleText).toBeInTheDocument();
      expect(screen.getByText(amount)).toBeInTheDocument();
      expect(titleText).not.toHaveClass(EXPLAINER_TITLE_CLASS_NAME);
    });
  });

  describe("when explainer is provided", () => {
    it("displays title, amount and modal toggle", async () => {
      const product = "General Liability";
      const title = "Occurrence Limit";
      const amount = "$1M";
      const explainer =
        "This is the maximum amount of money you'll get to cover a single incident that occurs during the policy period, regardless of when it's reported.";

      render(
        <Cover
          product={product}
          title={title}
          amount={amount}
          explainer={explainer}
        />,
      );

      const modalToggle = screen.getByRole("button");
      const titleText = screen.getByText(title);

      expect(titleText).toBeInTheDocument();
      expect(titleText).toHaveClass(EXPLAINER_TITLE_CLASS_NAME);
      expect(screen.getByText(amount)).toBeInTheDocument();
      expect(modalToggle).toBeInTheDocument();

      expect(screen.queryByText(explainer)).not.toBeInTheDocument();

      await userEvent.click(modalToggle);

      expect(screen.queryByText(explainer)).toBeInTheDocument();
    });

    it("emits an analytics event with the product name", async () => {
      const product = "General Liability";
      const title = "Occurrence Limit";
      const amount = "$1M";
      const explainer =
        "This is the maximum amount of money you'll get to cover a single incident that occurs during the policy period, regardless of when it's reported.";

      render(
        <Cover
          product={product}
          title={title}
          amount={amount}
          explainer={explainer}
        />,
      );

      const modalToggle = screen.getByRole("button");

      await userEvent.click(modalToggle);
      // Analytics
      expect(eventDefinitions.coverageModalOpened).toHaveBeenCalledWith({
        product,
        title,
      });
    });
  });
});
