"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import {
  trackSafeEvent,
  type AnalyticsEventName,
  type AnalyticsProperties,
} from "@/lib/analytics";

type TrackedActionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  href: string;
  eventName: AnalyticsEventName;
  eventProperties?: AnalyticsProperties;
  external?: boolean;
  children: ReactNode;
};

export function TrackedActionLink({
  href,
  eventName,
  eventProperties,
  external = false,
  children,
  ...props
}: TrackedActionLinkProps) {
  const handleClick = () => trackSafeEvent(eventName, eventProperties);

  if (external) {
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
