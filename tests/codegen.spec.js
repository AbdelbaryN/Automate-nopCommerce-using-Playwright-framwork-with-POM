import {test, expect} from '@playwright/test';

test('test', async ({page}) => {

    await page.goto('https://demo.nopcommerce.com/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://demo.nopcommerce.com/login?returnUrl=%2F');
    await page.getByText('Email').focus();
    await page.getByText('Email').fill('test2@test.com');
    await page.locator('#Password').focus();
    await page.locator('#Password').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://demo.nopcommerce.com/');
    await page.getByRole('link', { name: 'Computers' }).hover();
    await page.getByRole('link', { name: 'Notebooks' }).click();
    await page.getByRole('link', { name: 'Apple MacBook Pro 13-inch' }).first().click();
})