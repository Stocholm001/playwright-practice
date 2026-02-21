import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(process.env.saucedemo_TEST!);

  await page.fill('#user-name', process.env.BOSS_USERNAME!);
  await page.fill('#password', process.env.BOSS_PASSWORD!);

  await page.click('#login-button');

  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;