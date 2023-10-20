import { snakeCase } from "@utils/text";
import { getChannelContexts, snowplow } from ".";

type CoverChangeEvent = {
  name?: string;
  fromValue?: string;
  toValue?: string;
};
type InfoModalEvent = {
  product: string;
  title: string;
};
type PopupTriggeredEvent = {
  label: string;
};
type PaymentToggleClickedEvent = {
  label: "one-time payment" | "monthly payments";
};
type EventDefinition = Record<
  string,
  (
    params?:
      | CoverChangeEvent
      | InfoModalEvent
      | PopupTriggeredEvent
      | PaymentToggleClickedEvent,
  ) => void
>;

export const eventDefinitions: EventDefinition = {
  // QDP details button
  detailsClicked: () =>
    snowplow.trackEvent({
      category: "comparison_cta",
      action: "link_click",
      label: "Details",
    }),
  // Buy button
  selectClicked: () =>
    snowplow.trackEvent({
      category: "comparison_cta",
      action: "link_click",
      label: "Select",
    }),
  // Toggle deductibles accordion
  deductiblesClicked: () =>
    snowplow.trackEvent({
      category: "us-qcp-stacking-format",
      action: "view_deductables_clicked",
      label: "view_deductables_clicked",
      property: location.href,
    }),
  // Coverage modal opened
  coverageModalOpened: (params) => {
    const { product, title } = params as InfoModalEvent;
    const productLabel = snakeCase(product);

    snowplow.trackEvent({
      category: "coverage_selection",
      action: `${productLabel}_${snakeCase(title)}_popup_opened`,
      label: productLabel,
      property: location.href,
    });
  },
  // Toggle cover select
  coverChanged: (params) => {
    const {
      name = "",
      fromValue = "",
      toValue = "",
    } = params as CoverChangeEvent;
    // Derive data
    let action = "change";

    // This logic is taken directly from Chopin without documentation:
    // If a cover has zero value, then change the action to add or remove
    if (fromValue === "0") {
      action = "add";
    }
    if (toValue === "0") {
      action = "remove";
    }

    snowplow.trackUnstructEvent([
      {
        schema:
          "iglu:com.simplybusiness/comparison_page_cover_changed/jsonschema/1-0-0",
        data: {
          name,
          action,
          from_value: fromValue,
          to_value: toValue,
        },
      },
      ...getChannelContexts(),
    ]);
  },
  ratingsModalOpened: (params) => {
    const { label } = params as PopupTriggeredEvent;
    snowplow.trackEvent({
      category: "qcp_insurer_rating_help",
      action: "qcp_insurer_rating_help_popup_triggered",
      label,
      property: location.href,
    });
  },
  coverToggleOpened: () => {
    snowplow.trackEvent({
      category: "qcp_limit_interaction",
      label: "limit_interaction",
      action: "limit_interaction_clicked",
      property: location.href,
    });
  },
  paymentToggleClicked: (params) => {
    const { label } = params as PaymentToggleClickedEvent;
    snowplow.trackEvent({
      category: "payment_buttons",
      action: "button_click",
      label,
      property: location.href,
    });
  },
};
