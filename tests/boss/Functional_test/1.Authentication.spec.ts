import { test, expect } from '@playwright/test';
import { injectClickHighlight } from '../../../utils/setting/clickHighlight';



// test('Inventory page should display products', async ({ page }) => {
//   await page.goto('/inventory.html');

//   // เช็คว่า URL ถูกต้อง
//   await expect(page).toHaveURL(/inventory/);

//   // เช็คว่ามี title Swag Labs ด้านบน
//   await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

//   // เช็คว่ามีสินค้าอย่างน้อย 1 ชิ้น
//   const items = page.locator('.inventory_item');
//   await expect(items).toHaveCount(6); // saucedemo มี 6 ชิ้น

//   await page.pause();
// });


test('TC-01 Login สำเร็จด้วย standard_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL('/inventory.html');



});

test('TC-02 Login สำเร็จด้วย user ทุกประเภท (problem / performance_glitch / error / visual)', async ({ page }) => {
  
  const TEST_USERS = [
    {username: 'standard_user',             expectedLogin: true },
    {username: 'locked_out_user',           expectedLogin: false },
    {username: 'problem_user',              expectedLogin: true },
    {username: 'performance_glitch_user',   expectedLogin: true },
    {username: 'visual_user',               expectedLogin: true },
  ];

  const password = 'secret_sauce';

  for(const{username, expectedLogin} of TEST_USERS) {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    if (expectedLogin) {
      await expect(page).toHaveURL('/inventory.html');
    }else{
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }



  }






});

test('TC-03 Login ด้วย username ถูก แต่ password ผิด', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong123');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');



});

test('TC-04 Login ด้วย username ผิด', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');



});

test('TC-05 Login ทิ้ง username และ password ว่างทั้งคู่', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', '');
  await page.fill('#password', '');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');


});

test('TC-06 Login ด้วย locked_out_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');


});

test('TC-07 กด X ปิด error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await injectClickHighlight(page);

  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.click('.error-button');
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();



});

test('TC-08 Logout แล้ว redirect กลับหน้า login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await injectClickHighlight(page);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('/inventory.html');

  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page.getByText('Swag Labs')).toBeVisible();




});