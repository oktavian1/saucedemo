import { expect } from "@playwright/test";
class CartPage {
  constructor(page) {
    this.page = page;
    this.listNameProduct = page.locator(".cart_list .inventory_item_name");
    this.btnCheckout = page.locator('#checkout')
  }

  async verifyProductInCart(item) {
    const listName = await this.listNameProduct.allTextContents();
  
    item.forEach(product => {
      expect(listName).toContain(product);
    });
  }

  async clickButtonCheckout(){
    await this.btnCheckout.click()
  }
}

module.exports = { CartPage };
