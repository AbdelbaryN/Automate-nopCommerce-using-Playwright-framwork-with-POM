import {test, expect} from '@playwright/test';

import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';

test.describe('Login Page', () => {

    let loginPage;
    let home;
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    })

    test('Verify Login successfully', async ({page}) => {
        await loginPage.login('test2@test.com', '123456');
        home = new HomePage(page)
        await expect(home.logout).toBeVisible()
    })
    test('Verify Login with wrong email', async () => {
        await loginPage.login('test2test', '123456');
        await loginPage.VerifyWrongEmailError();    
    })

    test('Verify Login with no customer account', async () => {
        await loginPage.login('test@test.com', '123456');
        await loginPage.VerifyNoCustomerAccount();
    })
})