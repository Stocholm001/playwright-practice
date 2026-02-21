import { test, expect } from "@playwright/test"
import users from '../fixtures/users.json';



test('Login to saucedemo', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    // await page.pause();
    await page.fill('#user-name', users.laphatrada_user.username)
    await page.fill('#password', users.aloggorn_user.password)
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory.html/);

    await page.pause();


})