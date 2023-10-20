import { getSnowplowContexts } from "./contexts";

const site = "test-site";

describe("Snowplow Analytics Contexts", () => {
  it("generates contexts for given params", () => {
    expect(getSnowplowContexts({ site })).toEqual({
      distributionChannelContext: {
        schema:
          "iglu:com.simplybusiness/distribution_channel_context/jsonschema/1-0-0",
        data: {
          service_channel_identifier: site,
        },
      },

      serviceChannelContext: {
        schema:
          "iglu:com.simplybusiness/service_channel_context/jsonschema/1-0-0",
        data: {
          service_channel_identifier: site,
        },
      },
    });
  });
});
