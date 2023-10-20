import { Quote } from "@/types";
import { render, screen } from "@utils/testUtils";
import React from "react";
import rfq from "../../../__mocks__/quoteHiscox.json";
import { Coverage } from "./Coverage";

// Split out named quotes from quote data
const quotes = rfq.quotes as unknown as Quote[];
const [hiscox, harborway, american] = quotes.map(({ covers }) => covers);

const COVER_CLASS_NAME = "cover__container";

describe("Coverage", () => {
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

  it("renders", () => {
    render(<Coverage covers={hiscox} />);

    expect(screen.getByText("Coverage information")).toBeInTheDocument();
    expect(screen.getByText("General Liability")).toBeInTheDocument();
  });

  it("includes cover items and amounts", () => {
    const { container } = render(<Coverage covers={hiscox} />);

    const coverItems = container.getElementsByClassName(COVER_CLASS_NAME);

    expect(coverItems.length).toBe(3);
    expect(screen.getByText("Occurrence Limit")).toBeInTheDocument();
    expect(screen.getByText("Aggregate Limit")).toBeInTheDocument();
  });

  it("shows deductibles when there are specific excesses", () => {
    const { container } = render(<Coverage covers={harborway} />);
    const coverItems = container.getElementsByClassName(COVER_CLASS_NAME);

    expect(coverItems.length).toBe(4); // Includes a deductible
    expect(screen.getByText("View Deductibles")).toBeInTheDocument();
    expect(
      screen.getByText("Property Damage Deductible Per Claim"),
    ).toBeInTheDocument();
  });

  it("shows acciditional coverage tag when provided", () => {
    render(<Coverage covers={harborway} additionalCoverage />);

    const TAG_TEXT = "Extra coverage available in the next steps";

    expect(screen.getByText(TAG_TEXT)).toBeInTheDocument();
  });

  it("uses excessTitle to label accordion", () => {
    render(<Coverage covers={american} />);

    expect(screen.getByText("View Self-Insured Retention")).toBeInTheDocument();
  });
});
