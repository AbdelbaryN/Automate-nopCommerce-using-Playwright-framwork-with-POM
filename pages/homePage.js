const { expect } = require("@playwright/test")

exports.HomePage = class HomePage{

    constructor(page){
        this.page = page
        this.logout = page.getByRole('link', { name: 'Log out' })
    }
}