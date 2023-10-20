import { DEFAULT_ANALYTICS_SITE } from "@/constants";
import {
  SelfDescribingJson,
  StructuredEvent,
  TrackerConfiguration,
  newTracker,
  setCookiePath,
  setUserId,
  trackSelfDescribingEvent,
  trackStructEvent,
} from "@snowplow/browser-tracker";
import { isHosted, isTestEnv } from "@utils/env";
import { getEnvConfig } from "./config";
import { TrackingProps } from "./types";

const useTracking = isHosted() || isTestEnv();

export type ArrayOneOrMore<T> = [T, ...T[]];

export type FrontOfficeStructuredEvent = StructuredEvent & {
  serviceChannelIdentifier: string;
};

/**
 * This class is an abstraction which wraps Snowplow
 * and exposes common methods with other services:
 * - trackEvent            : sends a standard payload
 * - trackUnstructEvent    : sends a payload for custom schema TODO:
 */
export default class SnowplowTracker {
  // Namespaces
  avalancheTrackerName = "sb-ava";
  bronzeAvalancheTrackerName = "sb-ava-br";
  pvAvalancheTrackerName = "sb-ava-pv";

  // Vars set in chopin/app/views/shared/tracking/_snowplow.html.erb
  constructor({
    appId,
    cookieDomain,
    avalancheCollector,
    eventMethod,
    uid,
  }: TrackingProps) {
    if (useTracking) {
      // Set options
      const stateStorageStrategy = isHosted()
        ? "cookieAndLocalStorage"
        : "localStorage";
      const baseOptions: TrackerConfiguration = {
        appId,
        cookieDomain,
        eventMethod,
        stateStorageStrategy,
      };
      // Initialize trackers
      newTracker(this.avalancheTrackerName, avalancheCollector, baseOptions);

      newTracker(
        this.bronzeAvalancheTrackerName,
        avalancheCollector,
        baseOptions,
      );

      setCookiePath("/");
      if (uid) {
        setUserId(uid);
      }
    }
  }

  // Send a structured event with contexts
  async trackEvent(event: StructuredEvent) {
    if (useTracking) {
      await trackStructEvent({ ...event, context: getChannelContexts() }, [
        this.bronzeAvalancheTrackerName,
      ]);
    } else {
      // Log event to console
      console.debug("⚡️ STRUCTURED", {
        ...event,
        context: getChannelContexts(),
      });
    }
    return this;
  }

  // Send a custom event with defined schema and optional contexts
  async trackUnstructEvent(
    event: ArrayOneOrMore<SelfDescribingJson<Record<string, unknown>>>,
  ) {
    if (!event || event.length === 0) {
      return this;
    }
    const [payload, ...context] = event;

    if (useTracking) {
      await trackSelfDescribingEvent({ event: payload, context }, [
        this.avalancheTrackerName,
      ]);
    } else {
      // Log event to console
      console.debug("⚡️ SELF_DESCRIBING", { event: payload, context });
    }
    return this;
  }
}

const snowplowConfig = getEnvConfig();
export const snowplow = new SnowplowTracker(snowplowConfig);

// TODO: derive site name from DOM and include in contexts
//   site = $('meta[name="site"]').attr('content')
//     serviceChannelIdentifier : site
export const getChannelContexts = (site = DEFAULT_ANALYTICS_SITE) => [
  {
    schema:
      "iglu:com.simplybusiness/distribution_channel_context/jsonschema/1-0-0",
    data: { service_channel_identifier: site },
  },
  {
    schema: "iglu:com.simplybusiness/service_channel_context/jsonschema/1-0-0",
    data: { service_channel_identifier: site },
  },
];

export * from "./config";
export * from "./contexts";
export * from "./event-definitions";
