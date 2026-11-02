import { afterEach, describe, expect, it, vi } from "vitest";
import { telemetryConfig } from "./telemetry-config";
import {
  analyticsEvent,
  errorRecord,
  privacySignal,
  speedEvent,
  telemetryUrl,
} from "./telemetry-policy";
import { onRequestError } from "../instrumentation";

const origin = "https://portfolio.example";
const production = {
  SITE_URL: origin,
  SITE_INDEXABLE: "true",
  VERCEL_ENV: "production",
  SITE_ANALYTICS: "true",
  SITE_SPEED_INSIGHTS: "true",
  SERVER_ERROR_LOGGING: "true",
};

describe("telemetry activation", () => {
  it("requires independent explicit opt-ins on an indexable Vercel production build", () => {
    expect(telemetryConfig({})).toMatchObject({
      analytics: false,
      speedInsights: false,
      serverErrors: false,
    });
    expect(
      telemetryConfig({
        SITE_URL: origin,
        SITE_INDEXABLE: "true",
        VERCEL_ENV: "production",
      }),
    ).toMatchObject({
      analytics: false,
      speedInsights: false,
      serverErrors: false,
    });
    expect(telemetryConfig(production)).toEqual({
      origin,
      analytics: true,
      speedInsights: true,
      serverErrors: true,
    });
    expect(
      telemetryConfig({ ...production, SITE_ANALYTICS: "false" }),
    ).toMatchObject({ analytics: false, speedInsights: true });
  });
  it.each(["preview", "development", undefined])(
    "stays off outside Vercel production: %s",
    (VERCEL_ENV) => {
      expect(telemetryConfig({ ...production, VERCEL_ENV })).toMatchObject({
        analytics: false,
        speedInsights: false,
        serverErrors: false,
      });
    },
  );
  it("stays off before indexing is approved", () => {
    expect(
      telemetryConfig({ ...production, SITE_INDEXABLE: "false" }),
    ).toMatchObject({
      analytics: false,
      speedInsights: false,
      serverErrors: false,
    });
  });
  it.each(["SITE_ANALYTICS", "SITE_SPEED_INSIGHTS", "SERVER_ERROR_LOGGING"])(
    "rejects invalid %s configuration",
    (name) => {
      expect(() => telemetryConfig({ ...production, [name]: "yes" })).toThrow(
        `${name} must be true or false.`,
      );
    },
  );
});

describe("measurement data boundaries", () => {
  it.each([{ dnt: "1" }, { dnt: "yes" }, { gpc: true }])(
    "honors browser privacy signal %j",
    (signal) => expect(privacySignal(signal)).toBe(true),
  );
  it("allows measurement without a blocking browser signal", () =>
    expect(privacySignal({ dnt: "0", gpc: false })).toBe(false));
  it.each(["/en", "/id/contact", "/en/projects/family-care"])(
    "strips queries and fragments for %s",
    (path) => {
      expect(
        telemetryUrl(
          `${origin}${path}?email=private@example.test#private`,
          origin,
        ),
      ).toBe(`${origin}${path}`);
    },
  );
  it.each([
    "/en/design",
    "/id/prototype",
    "/en/private@example.test",
    "/cv/luthfi-musthafa-ats.pdf",
    "/social/en",
    "/fr",
  ])("drops unapproved path %s", (path) =>
    expect(telemetryUrl(`${origin}${path}`, origin)).toBeNull(),
  );
  it.each([
    "https://other.example/en",
    "//portfolio.example/en",
    "not a url",
    "javascript:alert(1)",
  ])("drops invalid or cross-origin URL %s", (url) =>
    expect(telemetryUrl(url, origin)).toBeNull(),
  );
  it("allows only sanitized pageview/vital events, drops custom data and replaces route data", () => {
    const event = {
      type: "pageview",
      url: `${origin}/en?secret=hidden`,
      properties: { secret: "hidden" },
    };
    expect(analyticsEvent(event, origin, false)).toEqual({
      type: "pageview",
      url: `${origin}/en`,
    });
    expect(
      analyticsEvent({ ...event, type: "event" }, origin, false),
    ).toBeNull();
    expect(analyticsEvent(event, origin, true)).toBeNull();
    expect(speedEvent({ ...event, type: "vital" }, origin, false)).toEqual({
      type: "vital",
      url: `${origin}/en`,
      route: "/en",
    });
    expect(speedEvent({ ...event, type: "vital" }, origin, true)).toBeNull();
  });
});

describe("server error logging", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });
  it("keeps only a category and a numeric framework digest", () => {
    expect(
      errorRecord(
        Object.assign(new Error("private"), { digest: "12345678" }),
        "render",
      ),
    ).toEqual({
      event: "portfolio.server_error",
      type: "render",
      digest: "12345678",
    });
    expect(errorRecord({ digest: "private@example.test" }, "private")).toEqual({
      event: "portfolio.server_error",
      type: "other",
      digest: "unavailable",
    });
  });
  it("never logs raw request data, messages or stacks, and stays off without opt-in", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const [name, value] of Object.entries(production))
      vi.stubEnv(name, value);
    const request = {
      path: "/en?email=private@example.test",
      method: "GET",
      headers: { cookie: "private=secret" },
    };
    const context = {
      routerKind: "App Router" as const,
      routePath: "/[locale]",
      routeType: "render" as const,
      renderSource: "server-rendering" as const,
      revalidateReason: undefined,
      renderType: "dynamic" as const,
    };
    await onRequestError(new Error("private request body"), request, context);
    expect(log).toHaveBeenCalledExactlyOnceWith(
      '{"event":"portfolio.server_error","type":"render","digest":"unavailable"}',
    );
    vi.stubEnv("SERVER_ERROR_LOGGING", "false");
    await onRequestError(new Error("private"), request, context);
    expect(log).toHaveBeenCalledTimes(1);
  });
});
