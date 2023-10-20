import { IconProps } from "./types";

export const QuestionIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <g clipPath="url(#clip0_1641_88567)">
        <path
          d="M6.25 6.25002C6.25017 5.36011 6.91818 4.61203 7.80241 4.51155C8.68663 4.41107 9.50546 4.99019 9.7053 5.85737C9.90515 6.72456 9.42235 7.60364 8.58333 7.90027C8.23357 8.02393 7.99981 8.35471 8 8.72569V9.31253"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11.0625C7.87919 11.0625 7.78125 11.1604 7.78125 11.2812C7.78125 11.4021 7.87919 11.5 8 11.5C8.12081 11.5 8.21875 11.4021 8.21875 11.2812C8.21875 11.1604 8.12081 11.0625 8 11.0625V11.0625"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8" r="6.5625" stroke="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1641_88567">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
