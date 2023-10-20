import * as envUtils from "./env";

describe("Environment utilties", () => {
  describe("isHosted", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("sets NODE_ENV = test when running tests", () => {
      expect(process.env.NODE_ENV).toBeTruthy();
    });

    it("is true when Rails env is production", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("production");
      expect(envUtils.isHosted("https://localhost:3000")).toBeTruthy();
      expect(
        envUtils.isHosted("https://quote.simplybusiness.com"),
      ).toBeTruthy();
    });

    it("is true when Rails env is staging", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("staging");
      expect(envUtils.hasRailsEnv()).toBeTruthy();
      expect(
        envUtils.isHosted("https://quote-staging.simplybusiness.com"),
      ).toBeTruthy();
    });

    it("is true when Rails env is integration", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("integration");
      expect(
        envUtils.isHosted(
          "https://rli-integration-instance-q3-2023.simplybusiness.com/",
        ),
      ).toBeTruthy();
    });

    it("is true when Rails env is test", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("test");
      expect(envUtils.isHosted()).toBeTruthy();
    });

    it("is true when Rails env is development", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("development");
      expect(envUtils.isHosted("https://localhost:3000")).toBeTruthy();
    });

    it("is false when Rails env is local", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("local");
      expect(envUtils.hasRailsEnv()).toBeFalsy();
      expect(envUtils.isHosted("https://localhost:3001")).toBeFalsy();
    });

    it("is false when no Rails env can be found in metadata", () => {
      expect(
        envUtils.isHosted("https://quote-staging.simplybusiness.com"),
      ).toBeFalsy();
    });

    it("is false for the qcp-embed subdomain", () => {
      expect(envUtils.isHosted("https://qcp-embed/any/app/route")).toBeFalsy();
    });

    it("is false when no argument is passed", () => {
      expect(envUtils.isHosted()).toBeFalsy();
    });

    it("is false for any domain that has no Rails env", () => {
      expect(envUtils.isHosted("https://localhost:3003")).toBeFalsy();
      expect(envUtils.isHosted("https://localhost:8008")).toBeFalsy();
      expect(envUtils.isHosted("https://localhost")).toBeFalsy();
      expect(envUtils.isHosted("https://garbage/url")).toBeFalsy();
      expect(envUtils.isHosted("")).toBeFalsy();
    });
  });

  describe("isStandalone", () => {
    it("uses https://localhost when no argument is passed", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("local");
      expect(envUtils.isStandalone()).toBeTruthy();
    });

    it("is true for any localhost port except 3000", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("local");
      expect(envUtils.isStandalone("https://localhost:3003")).toBeTruthy();
      expect(envUtils.isStandalone("https://localhost:8008")).toBeTruthy();
      expect(envUtils.isStandalone("https://localhost")).toBeTruthy();
    });

    it("is true for the qcp-embed subdomain", () => {
      expect(
        envUtils.isStandalone("https://qcp-embed/any/app/route"),
      ).toBeTruthy();
    });

    it("is true for any other domain", () => {
      expect(envUtils.isStandalone("https://garbage/url")).toBeTruthy();
    });

    it("is false when url is local Chopin", () => {
      jest.spyOn(envUtils, "getEnvironment").mockReturnValue("development");
      expect(envUtils.isStandalone("https://localhost:3000")).toBeFalsy();
    });
  });
});
