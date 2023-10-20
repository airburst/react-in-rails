import { useFeature } from "@/hooks/useFeature";
import {
  CoverToggleChangeProps,
  CoverToggle as CoverToggleType,
  PaymentPeriod,
} from "@/types";
import { PaymentToggle } from "@components/PaymentToggle";
import { Section } from "@components/Section";
import { eventDefinitions } from "@services/analytics";
import { Accordion, useBreakpoint } from "@simplybusiness/mobius";
import React, { Dispatch, FC, SetStateAction } from "react";
import { CoverToggle } from "./CoverToggle";

type Props = {
  coverToggles: CoverToggleType[];
  onChange: ({
    label,
    fromValue,
    toValue,
    name,
  }: CoverToggleChangeProps) => void;
  isLoading?: boolean;
  paymentPeriod?: PaymentPeriod;
  setPaymentPeriod?: Dispatch<SetStateAction<PaymentPeriod>>;
};

export const CoverToggles: FC<Props> = ({
  coverToggles = [],
  onChange,
  isLoading,
  paymentPeriod,
  setPaymentPeriod,
}) => {
  const { breakpoint } = useBreakpoint();
  const { coverToggleOpened } = eventDefinitions;
  // Only display when AB test is true
  const paymentToggleEnabled = useFeature("paymentToggle");
  const hasPeriodSet = paymentPeriod && setPaymentPeriod;

  const isDesktop = breakpoint.size === "xl";

  if (coverToggles.length === 0) {
    return null;
  }

  const toggleText = "Change limits";

  const handleChange = (isOpen: boolean) => {
    if (isOpen) {
      coverToggleOpened();
    }
  };

  return (
    <Section className="cover-toggles__container">
      {paymentToggleEnabled ? (
        <Accordion
          showText={toggleText}
          hideText={toggleText}
          headerChildren={
            hasPeriodSet && (
              <PaymentToggle
                paymentPeriod={paymentPeriod}
                setPaymentPeriod={setPaymentPeriod}
              />
            )
          }
          headerPosition="top"
          startOpen={isDesktop}
          onChange={handleChange}
        >
          <div className="cover-toggles__grid cover-toggles__grid--experimental">
            {coverToggles.map(
              ({ field_name, value, question_text, options }) => (
                <CoverToggle
                  key={field_name}
                  name={field_name}
                  value={value}
                  label={question_text}
                  options={options}
                  onChange={onChange}
                  isLoading={isLoading}
                />
              ),
            )}
          </div>

          {isLoading && <div className="cover-toggle__click-sink"></div>}
        </Accordion>
      ) : (
        <>
          <div className="cover-toggles__grid cover-toggles__grid--default">
            {coverToggles.map(
              ({ field_name, value, question_text, options }) => (
                <CoverToggle
                  key={field_name}
                  name={field_name}
                  value={value}
                  label={question_text}
                  options={options}
                  onChange={onChange}
                  isLoading={isLoading}
                />
              ),
            )}
          </div>
          {isLoading && <div className="cover-toggle__click-sink"></div>}
        </>
      )}
    </Section>
  );
};
