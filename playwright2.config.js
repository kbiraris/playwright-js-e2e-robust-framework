const { defineConfig, devices } = require('@playwright/test');

const config = defineConfig({
  // Directory where all test files are located
  testDir: './tests',

  //  Retry mechanism - Number of retries on test failure
  retries: 1,

  // Global timeout per test, if a test runs longer, it will be forcefully stopped
  timeout: 20 * 1000,

  // Timeout for individual expect() assertions
  expect: {
    timeout: 5000,
          },

  // Generate HTML report after test run, Output will be in the playwright-report/ folder
  reporter: 'html',

  // Run tests in parallel across multiple browsers
  projects: [
    {
      name: 'Chromium-iPhone-14',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'retain-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ...devices['iPhone 14 Pro'], // Emulate iPhone 14 Pro 
      },
    },
    {
      name: 'Firefox-iPad-Viewport',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'retain-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        viewport: { width: 1024, height: 1366 }, //Run the browser with a window size of 1024x1366 pixels
      },
    },
    {
      name: 'WebKit-Headless',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'retain-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },
  ],
});

module.exports = config;