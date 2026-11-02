import type { Instrumentation } from "next";
import { telemetryConfig } from "./lib/telemetry-config";
import { errorRecord } from "./lib/telemetry-policy";

// First-party server logging only; no error message, stack, URL, headers or body.
export const onRequestError: Instrumentation.onRequestError = (
  error,
  _request,
  context,
) => {
  try {
    if (telemetryConfig().serverErrors)
      console.error(JSON.stringify(errorRecord(error, context.routeType)));
  } catch {
    // Reporting must never prevent the framework's normal error response.
  }
};
