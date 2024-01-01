import { expect } from "@playwright/test";
class CheckoutStepOnePage {
  constructor(page) {
    this.page = page;
    this.locatorInputFirstName = page.locator('[data-test="firstName"]')
    this.locatorInputLastName = page.locator('[data-test="lastName"]')
    this.locatorInputPostalCode = page.locator('[data-test="postalCode"]')
    this.btnContinue = page.locator('[data-test="continue"]')
  }

  async inputFirstName(fName){
    await this.locatorInputFirstName.fill(fName)
  }

  async inputLastName(lName){
    await this.locatorInputLastName.fill(lName)
  }

  async inputPostalCode(pCode){
    await this.locatorInputPostalCode.fill(pCode)
  }

  async clickButtonContinue(){
    await this.btnContinue.click()
  }

  async inputStepOne(fName, lName, pCode){
    await this.inputFirstName(fName)
    await this.inputLastName(lName)
    await this.inputPostalCode(pCode)
    await this.clickButtonContinue()
  }

  
}

module.exports = { CheckoutStepOnePage };
