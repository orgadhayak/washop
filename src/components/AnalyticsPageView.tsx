"use client";

import { useEffect, useRef } from "react";
import {
  trackSafeEvent,
  type AnalyticsEventName,
  type AnalyticsProperties,
} from "@/lib/analytics";

type AnalyticsPageViewProps = {
  eventName: AnalyticsEventName;
  properties?: AnalyticsProperties;
};

export function AnalyticsPageView({
  eventName,
  properties = {},
}: AnalyticsPageViewProps) {
  const event = useRef({ eventName, properties });
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) {
      return;
    }

    sent.current = true;
    trackSafeEvent(event.current.eventName, event.current.properties);
  }, []);

  return null;
}
