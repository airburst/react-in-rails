import { removeDuplicates, transformQuotes } from "./transformQuotes";

const objectWithoutTxKeys = {
  name: "bobba",
  obj: {
    level1: {
      level2: ["deep"],
    },
  },
};

describe("Transform Quotes Functions", () => {
  describe("Cast values in white-listed keys", () => {
    it("has no effect when an object doesn't contain keys to transform", () => {
      expect(transformQuotes(objectWithoutTxKeys)).toEqual(objectWithoutTxKeys);
    });

    it("transforms 'value' key to number", () => {
      expect(
        transformQuotes({
          level1: [
            {
              value: "100",
            },
            {
              notInList: "true",
              alsoNotInList: "false",
              value: "-15",
            },
          ],
        }),
      ).toEqual({
        level1: [
          {
            value: 100,
          },
          {
            notInList: "true",
            alsoNotInList: "false",
            value: -15,
          },
        ],
      });
    });
  });

  describe("Removes duplicate select options from cover toggles", () => {
    const uniqueOptions = [
      { value: "1", text: "One" },
      { value: "2", text: "Two" },
      { value: "3", text: "Three" },
    ];

    it("has no effect when all entries are unique", () => {
      expect(removeDuplicates(uniqueOptions)).toEqual(uniqueOptions);
    });

    it("removes duplicate entries by value", () => {
      const withDupes = [
        ...uniqueOptions,
        { value: "1", text: "Another One" },
        { value: "4", text: "I am new" },
        { value: "2", text: "Another Dupe" },
      ];
      expect(removeDuplicates(withDupes)).toEqual([
        ...uniqueOptions,
        { value: "4", text: "I am new" },
      ]);
    });

    it("sorts options", () => {
      const options = [
        { value: "1", text: "Another One" },
        { value: "4", text: "I am new" },
        { value: "2", text: "Another Dupe" },
        { value: "3", text: "Three" },
        { value: "1", text: "One" },
        { value: "2", text: "Two" },
      ];
      expect(removeDuplicates(options)).toEqual([
        { value: "1", text: "Another One" },
        { value: "2", text: "Another Dupe" },
        { value: "3", text: "Three" },
        { value: "4", text: "I am new" },
      ]);
    });
  });
});
