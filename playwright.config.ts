import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3120",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
        },
      },
    },
    ...(["firefox", "webkit"] as const).map((browserName) => ({
      name: browserName,
      testMatch: ["**/portfolio.spec.ts", "**/cv.spec.ts"],
      use: { browserName },
    })),
  ],
  webServer: {
    command:
      "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3120",
    url: "http://127.0.0.1:3120/en/prototype",
    reuseExistingServer: false,
    timeout: 30000,
  },
});
