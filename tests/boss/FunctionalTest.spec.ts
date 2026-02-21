import { test, expect } from '@playwright/test';

test('Inventory page should display products', async ({ page }) => {
  await page.goto('/inventory.html');

  // เช็คว่า URL ถูกต้อง
  await expect(page).toHaveURL(/inventory/);

  // เช็คว่ามี title Swag Labs ด้านบน
  await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

  // เช็คว่ามีสินค้าอย่างน้อย 1 ชิ้น
  const items = page.locator('.inventory_item');
  await expect(items).toHaveCount(6); // saucedemo มี 6 ชิ้น

  await page.pause();
});





test('youtube', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');


  await page.pause();
});