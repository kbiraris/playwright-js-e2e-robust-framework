const { defineConfig, devices } = require('@playwright/test');
const { on } = require('events');

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