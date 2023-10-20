import { AppError } from "./AppError";

describe("AppError", () => {
  it("should accept a message argument", () => {
    const error = new AppError("Some message");
    expect(error.message).toBe("Some message");
  });

  it("should accept a cause argument", () => {
    const innerError = new Error("Inner error");
    const error = new AppError("Some message", { cause: innerError });
    expect(error.cause).toBe(innerError);
  });
});
