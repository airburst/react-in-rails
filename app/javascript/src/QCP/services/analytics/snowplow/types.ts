import { EventMethod } from "@snowplow/browser-tracker";

type BaseConfig = {
  appId: string;
  avalancheCollector: string;
  eventMethod: EventMethod;
  trackPageView: boolean;
  trackActivity: boolean;
  includeGAContext: boolean;
  uid?: string;
};

export type EnvConfig = BaseConfig & {
  cookieDomain: Record<string, string>;
};

export type TrackingProps = BaseConfig & {
  eventMethod: EventMethod;
  cookieDomain?: string;
};

export type ChannelContext = {
  schema: string;
  data: Record<string, string | number>;
};

export type ChannelContexts = Record<string, ChannelContext>;
