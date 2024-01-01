import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
const dataSet = JSON.parse(JSON.stringify(require("../utils/TransactionData.json")));

for(const data of dataSet ){
    test(`@WEB Test ${data.title}`, async ({page}) => {
        const poManager = new POManager(page)
        const loginPage = poManager.getLoginPage()
        const inventoryPage = poManager.getInventoryPage()
        const cartPage = poManager.getCartPage()
        const stepOne = poManager.getCheckoutStepOnePage()
        const stepTwo = poManager.getCheckoutStepTwoPage()
        const completePage = poManager.getCompletePage()
        await page.goto('/')

        await loginPage.validLogin(data.login.username, data.login.password)
    
        await inventoryPage.verifyCorrectURL()
       
        await inventoryPage.addItemsToCart(data.products)
        await inventoryPage.verifyCountCartBadge(data.products)
        await inventoryPage.goToCheckout()
    
        await cartPage.verifyProductInCart(data.products)
        await cartPage.clickButtonCheckout()
        
        await stepOne.inputStepOne(data.detailData.firstName, data.detailData.lastName, data.detailData.postCode)
    
        await stepTwo.verifyTotalAndTax()
        await stepTwo.clickFinish()
    
        await completePage.verifyTitle(data.messageSuccess)
        await completePage.clickBtnToProduct()
    
        await inventoryPage.verifyCorrectURL()
        await inventoryPage.clickSideBarAndLogout()
    
        await expect(page).toHaveURL("/");
            
    })
    
}
