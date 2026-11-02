"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";
import {
  analyticsEvent,
  privacySignal,
  speedEvent,
} from "@/lib/telemetry-policy";

const Analytics = lazy(() =>
  import("@vercel/analytics/next").then((module) => ({
    default: module.Analytics,
  })),
);
const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/next").then((module) => ({
    default: module.SpeedInsights,
  })),
);
const subscribe = () => () => {};
function blocked() {
  return privacySignal({
    dnt: navigator.doNotTrack,
    gpc: (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl,
  });
}

export function Telemetry({
  origin,
  analytics,
  speedInsights,
}: {
  origin: string;
  analytics: boolean;
  speedInsights: boolean;
}) {
  const allowed = useSyncExternalStore(
    subscribe,
    () => window.location.origin === origin && !blocked(),
    () => false,
  );
  if (!allowed) return null;
  return (
    <Suspense fallback={null}>
      {analytics && (
        <Analytics
          mode="production"
          debug={false}
          beforeSend={(event) => analyticsEvent(event, origin, blocked())}
        />
      )}
      {speedInsights && (
        <SpeedInsights
          debug={false}
          beforeSend={(event) => speedEvent(event, origin, blocked())}
        />
      )}
    </Suspense>
  );
}
