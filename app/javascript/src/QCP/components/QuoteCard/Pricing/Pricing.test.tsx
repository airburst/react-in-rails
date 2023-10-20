import { Quote } from "@/types";
import { fromPartial } from "@total-typescript/shoehorn";
import { renderWithFeatures, screen } from "@utils/testUtils";
import React from "react";
import { Pricing } from "./PricingVariant";

describe("Pricing", () => {
  describe("Tagging", () => {
    it("does display when feature flag is enabled", () => {
      const quote = fromPartial<Quote>({});
      renderWithFeatures({ paymentToggle: true })(<Pricing quote={quote} />);
      expect(screen.queryByTestId("quote-card-badges")).toBeInTheDocument();
    });

    describe("Policy with monthly installments", () => {
      const quote = fromPartial<Quote>({
        installmentsAvailable: true,
        installmentsAmount: "$42.00",
        installmentsCount: 10,
      });

      it.each([
        [
          "shows",
          "12 month policy",
          "annual",
          "quote-card-badge-12-month-policy",
        ] as const,
        [
          "does not show",
          "zero interest",
          "annual",
          "quote-card-badge-zero-interest",
        ] as const,
        [
          "shows",
          "annual cost matches monthly cost",
          "annual",
          "quote-card-badge-annual-cost-same-as-monthly",
        ] as const,

        [
          "shows",
          "12 month policy",
          "monthly",
          "quote-card-badge-12-month-policy",
        ] as const,
        [
          "shows",
          "zero interest",
          "monthly",
          "quote-card-badge-zero-interest",
        ] as const,
        [
          "does not show",
          "annual cost matches monthly cost",
          "monthly",
          "quote-card-badge-annual-cost-same-as-monthly",
        ] as const,
      ])(
        '%s the "%s" tag when payment option is %s',
        (doesOrDoesNotShow, _tagDescription, paymentPeriod, tagTestId) => {
          renderWithFeatures({ paymentToggle: true })(
            <Pricing quote={quote} paymentPeriod={paymentPeriod} />,
          );

          if (doesOrDoesNotShow === "shows") {
            expect(screen.getByTestId(tagTestId)).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId(tagTestId)).not.toBeInTheDocument();
          }
        },
      );
    });

    describe("Policy without monthly installments", () => {
      const quote = fromPartial<Quote>({
        installmentsAvailable: false,
        installmentsAmount: undefined,
        installmentsCount: undefined,
      });

      it.each([
        [
          "shows",
          "12 month policy",
          "annual",
          "quote-card-badge-12-month-policy",
        ] as const,
        [
          "does not show",
          "zero interest",
          "annual",
          "quote-card-badge-zero-interest",
        ] as const,
        [
          "does not show",
          "annual cost matches monthly cost",
          "annual",
          "quote-card-badge-annual-cost-same-as-monthly",
        ] as const,

        [
          "shows",
          "12 month policy",
          "monthly",
          "quote-card-badge-12-month-policy",
        ] as const,
        [
          "does not show",
          "zero interest",
          "monthly",
          "quote-card-badge-zero-interest",
        ] as const,
        [
          "does not show",
          "annual cost matches monthly cost",
          "monthly",
          "quote-card-badge-annual-cost-same-as-monthly",
        ] as const,
      ])(
        '%s the "%s" tag when payment option is %s',
        (doesOrDoesNotShow, _tagDescription, paymentPeriod, tagTestId) => {
          renderWithFeatures({ paymentToggle: true })(
            <Pricing quote={quote} paymentPeriod={paymentPeriod} />,
          );

          if (doesOrDoesNotShow === "shows") {
            expect(screen.getByTestId(tagTestId)).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId(tagTestId)).not.toBeInTheDocument();
          }
        },
      );
    });
  });
});
