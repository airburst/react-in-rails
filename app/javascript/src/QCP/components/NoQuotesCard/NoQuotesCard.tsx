import { Text } from "@simplybusiness/mobius";
import React from "react";

export function NoQuotesCard() {
  return (
    <div className="no-quotes-card__container">
      <div className="no-quotes-card__body">
        <Text variant="h2">Let&apos;s try this again</Text>
        <Text>
          Sorry, it doesn&apos;t look like we have anyone who can cover the
          limits you&apos;ve selected. Not to worry. If you change your coverage
          limits above, you may be able to see available quotes.
        </Text>
      </div>
    </div>
  );
}
