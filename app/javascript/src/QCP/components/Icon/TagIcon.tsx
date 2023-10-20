import React from "react";
import { IconProps } from "./types";

export const TagIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7207 2.53052H9.5922C9.19448 2.53047 8.81302 2.68838 8.5317 2.96952L2.7507 8.75002C2.45792 9.04289 2.45792 9.51764 2.7507 9.81052L6.1907 13.25C6.48358 13.5428 6.95833 13.5428 7.2512 13.25L13.0317 7.46952C13.3128 7.1882 13.4708 6.80674 13.4707 6.40902V3.28052C13.4707 2.8663 13.1349 2.53052 12.7207 2.53052Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10.8457"
        cy="5.15552"
        r="0.75"
        transform="rotate(90 10.8457 5.15552)"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
