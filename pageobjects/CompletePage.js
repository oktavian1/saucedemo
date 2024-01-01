import { expect } from "@playwright/test";
class CompletePage {
  constructor(page) {
    this.page = page;
    this.locatorTitleComplete = page.locator('.complete-header')
    this.btnBackToProduct = page.locator('[data-test="back-to-products"]')
  }

  async verifyTitle(title){
    expect(await this.locatorTitleComplete.textContent()).toContain(title)
  }

  async clickBtnToProduct(){
    await this.btnBackToProduct.click()
  }

}

module.exports = { CompletePage };
