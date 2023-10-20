import { PaymentPeriod } from "@/types";
import { eventDefinitions } from "@services/analytics";
import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  paymentPeriod: PaymentPeriod;
  setPaymentPeriod: Dispatch<SetStateAction<PaymentPeriod>>;
};

export const PaymentToggle = ({ paymentPeriod, setPaymentPeriod }: Props) => {
  const isToggled = paymentPeriod === "annual";
  const { paymentToggleClicked } = eventDefinitions;

  const handleClick = () => {
    setPaymentPeriod(paymentPeriod === "monthly" ? "annual" : "monthly");

    if (isToggled) {
      paymentToggleClicked({ label: "monthly payments" });
      return;
    }

    paymentToggleClicked({ label: "one-time payment" });
  };

  const buttonClasses = clsx("payment-toggle__button", {
    "payment-toggle__button--is-toggled": isToggled,
  });

  return (
    <button className={buttonClasses} onClick={handleClick}>
      <span className="payment-toggle__text monthly">Monthly</span>
      <span className="payment-toggle__text yearly">Yearly</span>
      <div className="payment-toggle__slider"></div>
    </button>
  );
};
