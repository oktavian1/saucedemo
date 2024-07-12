import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
const dataSet = JSON.parse(JSON.stringify(require("../utils/LoginData.json")));


for (const data of dataSet) {
    test(`${data.title}`, async ({ page }) => {
        const poManager = new POManager(page)
        const loginPage = poManager.getLoginPage()
        await page.goto('/')
        await loginPage.validationMessageError(data.login.username, data.login.password, data.message)
    })
}