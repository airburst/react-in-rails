import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children?: ReactNode;
  color?: "light" | "dark";
  className?: string;
};

export const Section = ({ children, color, className }: Props) => {
  const classes = clsx("section", className, {
    [`section--${color}`]: color,
  });

  return (
    <div className={classes}>
      <div className="section__inner-container">{children}</div>
    </div>
  );
};
