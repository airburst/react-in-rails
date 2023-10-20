import { DOMProps } from "@react-types/shared";
import { CSSProperties, RefAttributes } from "react";

export interface IconSVGProps extends DOMProps, RefAttributes<SVGSVGElement> {
  style?: CSSProperties;
  className?: string;
}

export type IconProps = IconSVGProps;
