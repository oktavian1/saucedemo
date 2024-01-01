import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';

test('Auth Valid Test', async ({page}) => {
    const username = 'standard_user'
    const password = 'secret_sauce'
    const item = 'Sauce Labs Onesie'
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage()
    const inventoryPage = poManager.getInventoryPage()
    await page.goto('/')

    await loginPage.verifyComponentIsPresent()

    await loginPage.validLogin(username, password)

    await inventoryPage.verifyCorrectURL()

    //console.log(listItem)
    // console.log(locatorItemName)

    // for(let i = 0; i< listItem.count(); i++){
    //     const rowOrderItem = await page.locator()
    // }

    // await expect(page.locator("[data-test='username']")).toBeEmpty()
    // await page.locator("[data-test='username']").fill('standard_user')
    // await expect(page.locator("[data-test='username']")).toHaveValue('standard_user')

    // await expect(page.locator("[data-test='password']")).toBeEmpty()
    // await page.locator("[data-test='password']").fill('secret_sauce')
    // await expect(page.locator("[data-test='password']")).toHaveValue('secret_sauce')
    
})

test('Test Invalid Login', async ({page}) => {
    await page.goto('/')

    await page.locator("[data-test='username']").fill('standard_user')
    await page.locator("[data-test='password']").fill('')
    await page.locator("#login-button").click()
    let messageError = await page.locator("[data-test='error']").textContent()
    expect(messageError).toContain('Password is required')
    await page.locator("[data-test='error'] button").click()

    await page.locator("[data-test='username']").fill('')
    await page.locator("[data-test='password']").fill('secret_sauce')
    await page.locator("#login-button").click()
    messageError = await page.locator("[data-test='error']").textContent()
    expect(messageError).toContain('Username is required')
})