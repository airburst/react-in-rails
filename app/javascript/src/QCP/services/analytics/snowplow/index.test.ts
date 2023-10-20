import * as SnowplowLib from "@snowplow/browser-tracker";
import { getEnvConfig } from "./config";
import {
  ArrayOneOrMore,
  getChannelContexts,
  snowplow as secondInstance,
  snowplow,
} from "./index";

let testSnowplow = snowplow;
const defaultContexts = getChannelContexts();

describe("Snowplow Analytics Class", () => {
  beforeEach(() => {
    testSnowplow = snowplow;
  });

  it("sets constructor object based upon environment", () => {
    expect(getEnvConfig()).toEqual({
      appId: "us-chopin",
      avalancheCollector: "snowplow-collector-staging.simplybusiness.com",
      eventMethod: "post",
      cookieDomain: "simplybusiness.com",
      trackPageView: false,
      trackActivity: true,
      includeGAContext: true,
    });
  });

  it("exports a Singleton instance with static properties", () => {
    expect(testSnowplow).toEqual(secondInstance);
    expect(testSnowplow.bronzeAvalancheTrackerName).toEqual("sb-ava-br");
  });

  it("tracks structured events", async () => {
    const trackStructEventSpy = jest.spyOn(testSnowplow, "trackEvent");
    const innerSpy = jest.spyOn(SnowplowLib, "trackStructEvent");

    const payload = {
      category: "mobile-link",
      action: "clicked",
      label: "test-label",
    };

    await testSnowplow.trackEvent(payload);
    expect(trackStructEventSpy).toHaveBeenCalledTimes(1);
    expect(trackStructEventSpy).toHaveBeenCalledWith(payload);
    expect(innerSpy).toHaveBeenCalledTimes(1);
    expect(innerSpy).toHaveBeenCalledWith(
      { ...payload, context: defaultContexts },
      ["sb-ava-br"],
    );
  });

  it("tracks self-describing events", async () => {
    const trackUnstructEventSpy = jest.spyOn(
      testSnowplow,
      "trackUnstructEvent",
    );
    const innerSpy = jest
      .spyOn(SnowplowLib, "trackSelfDescribingEvent")
      .mockImplementation(() => {});

    const testEvent = {
      schema:
        "iglu:com.simplybusiness/comparison_page_cover_changed/jsonschema/1-0-0",
      data: {
        name: "Public liability",
        action: "change",
        from_value: "1000000",
        to_value: "2000000",
      },
    };
    const payload = [testEvent] as ArrayOneOrMore<
      SnowplowLib.SelfDescribingJson<Record<string, unknown>>
    >;

    await testSnowplow.trackUnstructEvent(payload);
    expect(trackUnstructEventSpy).toHaveBeenCalledTimes(1);
    expect(trackUnstructEventSpy).toHaveBeenCalledWith(payload);
    expect(innerSpy).toHaveBeenCalledTimes(1);
    expect(innerSpy).toHaveBeenCalledWith(
      {
        event: testEvent,
        context: [],
      },
      ["sb-ava"],
    );
  });
});
