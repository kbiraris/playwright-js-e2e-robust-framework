import { defineConfig, devices } from "@playwright/test";
import { on } from "events";
import { permission } from "process";

const config =
({
  testDir: './tests',         
  retries: 1,                 

  timeout: 30*1000,

  expect: { tmeout : 5000 },

  reporter: 'html',

  projects : [
    {
      name : 'safari',
      use:
          {
            browserName:'webkit',
            headless: false,
            screenshot: 'on',
            trace: 'retain-on-failure'
          }
    },
    {
      name : 'chrome',
      use:
          {
            browserName:'chromium',
            headless: false,
            screenshot: 'on',
            //video :'retain-on-failure',
            trace: 'retain-on-failure',
            //viewport:{width:720, height:720},
            ...devices['iPhone 11'],
            ignoreHttpsErrors:true,
            permissions:['geolocation'],

          }
    }
  ]
  
});

  module.exports = config;