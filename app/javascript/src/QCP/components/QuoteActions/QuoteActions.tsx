import { FormTokens } from "@components/FormTokens";
import { useAppContext } from "@contexts/AppContext";
import { eventDefinitions } from "@services/analytics";
import { Button, Flex } from "@simplybusiness/mobius";
import React, { FormEvent, useState } from "react";

type Props = {
  quoteId: string;
  insurer: string;
};

/**
 * When Buy or Details buttons are clicked, send a traditional
 * form POST to the current journey endpoint, with formdata: e.g.
 *
 * journey_token
 * authenticity_token
 * insurer
 * quote_id
 * buy_button_clicked: yes (or omitted)
 */
export const QuoteActions = ({ quoteId, insurer }: Props) => {
  const [buy, setBuy] = useState<boolean>(false);
  const { detailsClicked, selectClicked } = eventDefinitions;
  const { isStandalone } = useAppContext();
  const chopinTestDetailsClassName = "qa-view-details-option";
  const chopinTestSelectClassName = "qa-buy-quote-option";

  const handleBuy = () => setBuy(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // If app is embedded then don't propagate the event to POST
    if (isStandalone) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Send analytics event
    buy ? selectClicked() : detailsClicked();
  };

  // Note: form values are initiliased as a string because undefined
  // will throw a React error about changing from uncotrolled to controlled
  return (
    <form
      role="form"
      method="POST"
      onSubmit={handleSubmit}
      className="quote-actions__container"
    >
      <FormTokens />
      <input id="quote_id" type="hidden" name="quote_id" value={quoteId} />
      <input id="insurer" type="hidden" name="insurer" value={insurer} />
      {buy && (
        <input
          id="buy_button_clicked"
          type="hidden"
          name="buy_button_clicked"
          value="yes"
        />
      )}

      <Flex
        className="quote-actions__button-wrapper"
        justifyContent="space-between"
        gap="var(--size-30)"
      >
        <Button
          id="details"
          variant="secondary"
          className={`quote-actions__button ${chopinTestDetailsClassName}`}
          size="small"
          type="submit"
        >
          Details
        </Button>
        <Button
          id="select"
          className={`quote-actions__button ${chopinTestSelectClassName}`}
          size="small"
          type="submit"
          onClick={handleBuy}
        >
          Select
        </Button>
      </Flex>
    </form>
  );
};
