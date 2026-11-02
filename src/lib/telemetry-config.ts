import { seoConfig } from "./seo";

type Environment = {
  SITE_URL?: string;
  SITE_INDEXABLE?: string;
  VERCEL_ENV?: string;
  SITE_ANALYTICS?: string;
  SITE_SPEED_INSIGHTS?: string;
  SERVER_ERROR_LOGGING?: string;
};

export function telemetryConfig(
  env: Environment = {
    SITE_URL: process.env.SITE_URL,
    SITE_INDEXABLE: process.env.SITE_INDEXABLE,
    VERCEL_ENV: process.env.VERCEL_ENV,
    SITE_ANALYTICS: process.env.SITE_ANALYTICS,
    SITE_SPEED_INSIGHTS: process.env.SITE_SPEED_INSIGHTS,
    SERVER_ERROR_LOGGING: process.env.SERVER_ERROR_LOGGING,
  },
) {
  const site = seoConfig(env);
  function enabled(
    name: "SITE_ANALYTICS" | "SITE_SPEED_INSIGHTS" | "SERVER_ERROR_LOGGING",
  ) {
    const value = env[name];
    if (value && value !== "true" && value !== "false")
      throw new Error(`${name} must be true or false.`);
    return (
      site.indexable && env.VERCEL_ENV === "production" && value === "true"
    );
  }
  return {
    origin: site.origin,
    analytics: enabled("SITE_ANALYTICS"),
    speedInsights: enabled("SITE_SPEED_INSIGHTS"),
    serverErrors: enabled("SERVER_ERROR_LOGGING"),
  };
}
