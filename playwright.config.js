const { defineConfig } = require("@playwright/test");
const { devices } = require("@playwright");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 10000
  },
  use: {
    baseURL: "https://only.digital",
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  reporter: [["html"], ["list"]],
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        browserName: "chromium",
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        browserName: "chromium",
        viewport: { width: 375, height: 667 },
        ...devices["Pixel 5"],
      },
    },
  ],
});
