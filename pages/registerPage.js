const {expect} = require("@playwright/test")

exports.RegisterPage = class RegisterPage{
    constructor(page){
        this.page = page
        this.gender = page.locator('#gender-male')
        this.firstNameInput = page.locator('#FirstName')
        this.lastNameInput = page.locator('#LastName')
        this.dayOfBirth = page.locator('select[name="DateOfBirthDay"]')
        this.monthOfBirth = page.locator('select[name="DateOfBirthMonth"]')
        this.yearOfBirth = page.locator('select[name="DateOfBirthYear"]')
        this.emailInput = page.locator('#Email')
        this.newSletterCheckbox = page.locator('#Newsletter')
        this.passwordInput = page.locator('#Password')
        this.confirmPasswordInput = page.locator('#ConfirmPassword')
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.firstNameError = page.getByText('First name is required.')
        this.lastNameError = page.getByText('Last name is required.')
        this.emailError = page.getByText('Email is required.')
        this.wrongEmailError = page.getByText('Wrong email')
        this.passwordError = page.locator('#Password-error')
        this.confirmPasswordError = page.locator('#ConfirmPassword-error')
        this.smallerPasswordError = page.getByText('must have at least 6')
        this.differentPasswordError = page.getByText('Password and confirmation password do not match.')
        this.successMsg = page.getByText('Your registration completed')
        this.continueBtn = page.getByRole('link', { name: 'Continue' })
    }

    async navigate(){
        await this.page.goto('https://demo.nopcommerce.com/register')
    }

    async register(firstName, lastName, day, month, year, email, password, confirmPassword){
        await this.gender.check()
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.dayOfBirth.selectOption(day)
        await this.monthOfBirth.selectOption(month)
        await this.yearOfBirth.selectOption(year)
        await this.emailInput.fill(email)
        if (this.newSletterCheckbox.isChecked()) {
            this.newSletterCheckbox.uncheck()
        }
        await this.passwordInput.fill(password)
        await this.confirmPasswordInput.fill(confirmPassword)
        await this.registerButton.click()
    }

    async VerifySuccessMsg(){
        await expect(this.successMsg).toBeVisible()
        await expect(this.continueBtn).toBeVisible()
        await this.continueBtn.click()
    }

    async VerifyBlankFieldsError(){
        await expect(this.firstNameError).toBeVisible()
        await expect(this.lastNameError).toBeVisible()
        await expect(this.emailError).toBeVisible()
        await expect(this.passwordError).toBeVisible()
        await expect(this.confirmPasswordError).toBeVisible()
    }

    async VerifyBlankRrgisteration(){
        await this.registerButton.click()
    }

    async VerifyWrongEmailError(){
        await expect(this.wrongEmailError).toBeVisible()
    }

    async VerifySmallPasswordError(){
        await expect(this.smallerPasswordError).toBeVisible()
    }

    async VerifyDifferentPasswordError(){
        await expect(this.differentPasswordError).toBeVisible()
    }
}