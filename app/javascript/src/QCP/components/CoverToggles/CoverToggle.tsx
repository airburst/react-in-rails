import { CoverToggleProps } from "@/types";
import { FormTokens } from "@components/FormTokens";
import { Option, Select } from "@simplybusiness/mobius";
import { formatAmount } from "@utils/transformCoverage";
import { FC } from "react";

export const CoverToggle: FC<CoverToggleProps> = ({
  name,
  label,
  value,
  options = {},
  onChange,
  isLoading,
}) => {
  if (
    !options ||
    typeof options !== "object" ||
    Object.keys(options).length === 0
  ) {
    return null;
  }

  const handleChange = (toValue: string) => {
    !isLoading && onChange({ label, fromValue: value, name, toValue });
  };

  return (
    <form>
      <FormTokens />
      <Select
        label={label}
        defaultValue={value}
        onChange={handleChange}
        isDisabled={isLoading}
      >
        {Object.entries(options).map(([text, value]) => (
          <Option key={value} value={value}>
            {formatAmount(text)}
          </Option>
        ))}
      </Select>
    </form>
  );
};
