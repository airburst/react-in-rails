import { OptionProps, RFQ } from "@/types";

// This function converts values in listed keys
// from strings to booleans. This should be done
// by an API in future.
export const transformQuotes = (data: object): RFQ => {
  const transformedData = {};

  Object.entries(data).forEach(([key, value]) => {
    // If value is an array or an object, walk through next level
    if (Array.isArray(value) && typeof value[0] === "object") {
      // @ts-expect-error cannot index object with string
      transformedData[key] = value.map((o) => transformQuotes(o));
    } else {
      // @ts-expect-error cannot index object with string
      transformedData[key] = value;

      // Numbers
      if (key === "value") {
        // @ts-expect-error cannot index object with string
        transformedData[key] = +value;
      }
    }
  });

  return transformedData as RFQ;
};

const sortOptions = (a: OptionProps, b: OptionProps) => {
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
};

export const removeDuplicates = (options: OptionProps[]): OptionProps[] => {
  const deDuplicated = options.reduce(
    (acc: OptionProps[], cur: OptionProps) => {
      if (!acc.map((o) => o.value).includes(cur.value)) {
        acc.push(cur);
      }
      return acc;
    },
    [],
  );
  return deDuplicated.sort(sortOptions);
};
