import { defineConfig, devices } from "@playwright/test";
import { on } from "events";

const config =
({
  testDir: './tests',
  timeout: 30*1000,

  expect: { tmeout : 5000 },

  reporter: 'html',
  
  use:
  {
    browserName:'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'
  }
});

  module.exports = config;