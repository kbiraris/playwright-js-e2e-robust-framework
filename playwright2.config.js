const { defineConfig, devices } = require('@playwright/test');

const config = defineConfig({
  // Directory where all test files are located
  testDir: './tests',

  //  Retry mechanism - Number of retries on test failure
  retries: 2,

  // Global timeout per test, if a test runs longer, it will be forcefully stopped
  timeout: 30 * 1000,

  // Timeout for individual expect() assertions
  expect: {
    timeout: 5000,
          },

  // Generate HTML report after test run, Output will be in the playwright-report/ folder
  reporter: 'html',

  // Run tests in parallel across multiple browsers
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'retain-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'retain-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'WebKit',
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