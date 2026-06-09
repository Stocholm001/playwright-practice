import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  globalSetup: require.resolve('./global/login'),
  use: {
    
    baseURL: process.env.saucedemo_TEST,
    storageState: 'storageState.json',
    headless: false, 
    screenshot: 'on',
    video: 'on',
    launchOptions: {
      slowMo: 1000, 
    },
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    
  {
    name: 'boss',
    testDir: './tests/boss',
  },
  {
    name: 'girlfriend',
    testDir: './tests/girlfriend',
  }

  ],

  reporter: [
    ['list'],
    ['./utils/excel/excelReporter.ts']
  ],

  
});

