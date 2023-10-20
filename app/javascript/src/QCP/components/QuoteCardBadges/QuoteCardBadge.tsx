import { ReactNode } from "react";

export function QuoteCardBadge({
  icon,
  children,
  "data-testid": dataTestId,
}: {
  icon?: ReactNode;
  children: ReactNode;
  "data-testid"?: string;
}) {
  return (
    <div className="quote-card-badge" data-testid={dataTestId}>
      {icon && <span className="quote-card-badge__icon">{icon}</span>}
      {children}
    </div>
  );
}
