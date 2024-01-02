import {test} from '@playwright/test';

import { RegisterPage } from '../pages/registerPage';

const { generateRandomEmail, saveEmailToFile } = require('../config');

test.describe('Register Page', () => {

    let registerPage;
    test.beforeEach(async ({page}) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate();
    })

    test('Verify Registering successfully', async () => {
        const registrationEmail = generateRandomEmail();
        // Save the registration email to a file
        saveEmailToFile(registrationEmail);
        await registerPage.register('Abdo', 'Nasser','29', '4', '2000', registrationEmail, '123456', '123456');
        await registerPage.VerifySuccessMsg();
        console.log(registrationEmail)
    })

    test('Verify leaving fields blank', async () => {
        await registerPage.VerifyBlankRrgisteration();
        await registerPage.VerifyBlankFieldsError();
    })

    test('Verify Register with invalid email', async () => {
        await registerPage.register('Abdo', 'Nasser','29', '4', '2000', 'test2', '123456', '123456');
        await registerPage.VerifyWrongEmailError();
    })

    test('Verify Register with small password', async () => {
        await registerPage.register('Abdo', 'Nasser','29', '4', '2000', 'test2@test.com', '12345', '12345');
        await registerPage.VerifySmallPasswordError();
    })

    test('Verify Register with different password', async () => {
        await registerPage.register('Abdo', 'Nasser','29', '4', '2000', 'test2@test.com', '123456', '1234567');
        await registerPage.VerifyDifferentPasswordError();
    })
})