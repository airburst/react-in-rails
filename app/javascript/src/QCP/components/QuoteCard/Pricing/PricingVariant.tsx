import { PaymentPeriod, Quote } from "@/types";
import { QuoteCardBadge, QuoteCardBadges } from "@components/QuoteCardBadges";
import {
  calendarClock,
  chartMixedUpCircleDollar,
  circleDollar,
} from "@simplybusiness/icons";
import { Flex, Icon, Text } from "@simplybusiness/mobius";

type Props = {
  quote: Quote;
  paymentPeriod?: PaymentPeriod;
};

type PremiumProps = {
  isMonthly: boolean;
  hasInstallments?: string | boolean;
  installmentsAmount?: string;
  premium: string;
};

const Premium = (props: PremiumProps) => {
  const { isMonthly, hasInstallments, installmentsAmount, premium } = props;

  if (!isMonthly) {
    return (
      <>
        <Text className="pricing__primary-amount">{premium}</Text>
        <Text elementType="span" variant="caption">
          / year
        </Text>
      </>
    );
  }

  return hasInstallments && installmentsAmount ? (
    <>
      <Text className="pricing__primary-amount">{installmentsAmount}</Text>
      <Text elementType="span" variant="caption">
        / month
      </Text>
    </>
  ) : (
    <Text variant="caption" className="pricing__amount-due">
      Monthly installments not available
    </Text>
  );
};

export const Pricing = ({ quote, paymentPeriod = "monthly" }: Props) => {
  const {
    installmentsAvailable,
    downpaymentAmount,
    installmentsAmount,
    installmentsCount,
    premium,
  } = quote;
  const isMonthly = paymentPeriod === "monthly";
  const hasInstallments = installmentsAvailable && installmentsAmount;
  const showZeroInterestBadge = hasInstallments && isMonthly;
  const showTotalCostBadge = hasInstallments && !isMonthly;

  return (
    <div className="pricing__container">
      <Flex flexDirection="column">
        <>
          <Flex alignItems="baseline" gap="var(--size-10)">
            <Premium
              isMonthly={isMonthly}
              hasInstallments={hasInstallments}
              installmentsAmount={installmentsAmount}
              premium={premium}
            />
          </Flex>
          {isMonthly && hasInstallments && (
            <>
              <Text variant="caption" className="pricing__amount-due">
                Due today {downpaymentAmount}
              </Text>
              <Text variant="caption" className="pricing__amount-due">
                Then {installmentsCount} monthly installments of{" "}
                {installmentsAmount}
              </Text>
              <Flex gap="var(--size-10)" className="pricing__total">
                <Text
                  className="pricing__total-amount"
                  elementType="span"
                  variant="caption"
                >
                  Total {premium}
                </Text>
              </Flex>
            </>
          )}
        </>

        <QuoteCardBadges>
          <QuoteCardBadge
            icon={<Icon icon={calendarClock} />}
            data-testid="quote-card-badge-12-month-policy"
          >
            12 month policy
          </QuoteCardBadge>
          {showZeroInterestBadge && (
            <QuoteCardBadge
              icon={<Icon icon={chartMixedUpCircleDollar} />}
              data-testid="quote-card-badge-zero-interest"
            >
              Zero interest
            </QuoteCardBadge>
          )}
          {showTotalCostBadge && (
            <QuoteCardBadge
              icon={<Icon icon={circleDollar} />}
              data-testid="quote-card-badge-annual-cost-same-as-monthly"
            >
              Total annual cost same as monthly
            </QuoteCardBadge>
          )}
        </QuoteCardBadges>
      </Flex>
    </div>
  );
};
