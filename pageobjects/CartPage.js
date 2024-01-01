import { expect } from "@playwright/test";
class CartPage {
  constructor(page) {
    this.page = page;
    this.listNameProduct = page.locator(".cart_list .inventory_item_name");
    this.btnCheckout = page.locator('#checkout')
  }

  async verifyProductInCart(item) {
    const listName = await this.listNameProduct.allTextContents();

    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < listName.length; j++) {
        if (item[i] == listName[j]) {
          expect(listName[j]).toContain(item[i]);
        }
      }
    }
  }

  async clickButtonCheckout(){
    await this.btnCheckout.click()
  }
}

module.exports = { CartPage };
