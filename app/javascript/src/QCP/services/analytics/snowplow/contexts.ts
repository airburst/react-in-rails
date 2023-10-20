import { ChannelContexts } from "./types";

type GetContextProps = {
  site: string;
};

// TODO: Accept all args to generate pageViewContext
export const getSnowplowContexts = ({
  site,
}: GetContextProps): ChannelContexts => {
  return {
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
  };
};
