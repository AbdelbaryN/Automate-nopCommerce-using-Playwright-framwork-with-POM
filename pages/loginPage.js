const { expect } = require("@playwright/test")


exports.LoginPage = class LoginPage{
    constructor(page){
        this.page = page
        this.emailInput = page.locator('#Email')
        this.passwordInput = page.locator('#Password')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
        this.noCustomerAccount = page.getByText('No customer account found')
        this.wrongEmailError = page.getByText('Wrong email')
    }

    async navigate(){
        await this.page.goto('https://demo.nopcommerce.com/login?returnUrl=%2F')
    }

    async login(email, password){
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async VerifyWrongEmailError(){
        await expect(this.wrongEmailError).toBeVisible()
    }

    async VerifyNoCustomerAccount(){
        await expect(this.noCustomerAccount).toBeVisible()
    }
    
}