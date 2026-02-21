import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, 
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
  ],
});
