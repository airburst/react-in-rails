import { tryParse } from "./tryParse";

describe("tryParse", () => {
  it("parses the data provided when provided with valid JSON", () => {
    expect(tryParse('{"foo": "bar", "valid": true}')).toStrictEqual({
      foo: "bar",
      valid: true,
    });
  });

  describe.each([null, undefined, "", "{"])('When passed "%s"', (data) => {
    it("returns the fallback", () => {
      const fallback = { fallback: true };
      expect(tryParse(data, fallback)).toBe(fallback);
    });

    it("returns undefined when fallback is omitted", () => {
      expect(tryParse(data)).toBeUndefined();
    });
  });
});
