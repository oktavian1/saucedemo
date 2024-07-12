const { test, expect } = require("@playwright/test");
import { POManager } from '../pageobjects/POManager';
const dataSet = JSON.parse(JSON.stringify(require("../utils/FilterData.json")));

for (const data of dataSet) {
  test(data.title, async ({ page }) => {
    const username = 'standard_user'
    const password = 'secret_sauce'
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const inventoryPage = poManager.getInventoryPage();

    await page.goto('/')
    await loginPage.validLogin(username, password)
    await inventoryPage.verifySortingData(data.value)
  });
}

