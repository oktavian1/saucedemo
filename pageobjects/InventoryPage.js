import { expect } from "@playwright/test";
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.listItem = page.locator(".inventory_list") 
    this.containerCart = page.locator("#shopping_cart_container")
    this.locatorBtnBurger = page.locator('#react-burger-menu-btn')
    this.locatorBtnLogOut = page.locator('#logout_sidebar_link')
  }

  async verifyCorrectURL() {
    await expect(this.page).toHaveURL("/inventory.html");
  }

  async addItemsToCart(item){
    for(let i = 0; i < await this.listItem.locator('.inventory_item_name').count(); i++){
        const itemName = await this.listItem.locator('.inventory_item_name').nth(i).textContent()
        for(let j = 0; j < item.length; j++){
            if(itemName == item[j]) {
                await this.listItem.locator("[class*='btn']").nth(i).click()
                continue
            }
        }
    }
  }

  async verifyCountCartBadge(item){
    expect(await this.containerCart.locator('.shopping_cart_badge').textContent()).toEqual(item.length.toString())
  }

  async goToCheckout(){
    await this.containerCart.locator('.shopping_cart_link').click()
  }

  async clickSideBarAndLogout(){
    await this.locatorBtnBurger.click()
    await this.locatorBtnLogOut.click()
  }
}

module.exports = { InventoryPage };
