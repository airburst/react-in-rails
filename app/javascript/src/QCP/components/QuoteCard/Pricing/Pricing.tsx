import { Quote } from "@/types";
import { Flex, Text } from "@simplybusiness/mobius";
import React from "react";

type Props = {
  quote: Quote;
  paymentPeriod?: "monthly" | "annual";
};

export const Pricing = ({ quote }: Props) => {
  const {
    installmentsAvailable,
    downpaymentAmount,
    installmentsAmount,
    installmentsCount,
    premium,
  } = quote;

  // TODO: Does this need to be tied into the paymentPeriod prop?
  const hasInstallments = installmentsAvailable && installmentsAmount;

  return (
    <div className="pricing__container">
      <Flex flexDirection="column">
        {hasInstallments ? (
          <>
            <Flex alignItems="baseline" gap="var(--size-10)">
              <Text className="pricing__primary-amount">
                {installmentsAmount}
              </Text>
              <Text elementType="span" variant="caption">
                / month
              </Text>
            </Flex>
            <Text variant="caption" className="pricing__amount-due">
              {downpaymentAmount} due today, then {installmentsCount}{" "}
              installments
            </Text>
          </>
        ) : (
          <Text variant="caption" className="pricing__amount-due">
            Monthly installments not available
          </Text>
        )}

        <Flex gap="var(--size-10)" className="pricing__total">
          <Text
            className="pricing__total-amount"
            elementType="span"
            variant="caption"
          >
            {premium}
          </Text>
          <Text elementType="span" variant="caption">
            / year
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};
