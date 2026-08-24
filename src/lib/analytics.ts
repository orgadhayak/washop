import { track } from "@vercel/analytics";

export const analyticsEventNames = [
  "shop_directory_view",
  "category_view",
  "shop_profile_view",
  "whatsapp_seller_click",
  "add_store_start",
  "add_store_complete",
  "seller_cta_click",
  "directory_search",
  "directory_filter",
  "contact_submit",
  "language_or_global_switch",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
export type AnalyticsPropertyValue = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

const safePropertyKeys = new Set([
  "action",
  "approved_store_count",
  "category_filter",
  "category_slug",
  "city_filter",
  "destination",
  "has_query",
  "locale",
  "method",
  "result_count",
  "route",
  "shop_slug",
  "source",
  "surface",
]);

export function trackSafeEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsProperties = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(([key]) => safePropertyKeys.has(key)),
  );

  track(eventName, safeProperties);
}
