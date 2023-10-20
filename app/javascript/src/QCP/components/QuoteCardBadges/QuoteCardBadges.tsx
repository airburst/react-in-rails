import { ReactNode } from "react";

export function QuoteCardBadges({ children }: { children: ReactNode }) {
  return (
    <div className="quote-card-badges" data-testid="quote-card-badges">
      {children}
    </div>
  );
}
