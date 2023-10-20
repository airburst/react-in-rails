import { RequestError } from "./RequestError";

describe("RequestError", () => {
  it("should accept a message argument", () => {
    const error = new RequestError("someRequest");
    expect(error.message).toBe("Request failed: someRequest");
  });

  it("should accept a cause argument", () => {
    const innerError = new Error("Inner error");
    const error = new RequestError("Some message", { cause: innerError });
    expect(error.cause).toBe(innerError);
  });
});
