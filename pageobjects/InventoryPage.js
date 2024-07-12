import { expect } from "@playwright/test";

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.listItem = page.locator(".inventory_list")
    this.containerCart = page.locator("#shopping_cart_container")
    this.locatorBtnBurger = page.locator('#react-burger-menu-btn')
    this.locatorBtnLogOut = page.locator('#logout_sidebar_link')
    this.locatorSelectSort = page.locator('.product_sort_container')
  }

  async verifyCorrectURL() {
    await expect(this.page).toHaveURL("/inventory.html");
  }

  async addItemsToCart(item) {
    for (let i = 0; i < await this.listItem.locator('.inventory_item_name').count(); i++) {
      const itemName = await this.listItem.locator('.inventory_item_name').nth(i).textContent()
      for (let j = 0; j < item.length; j++) {
        if (itemName == item[j]) {
          await this.listItem.locator("[class*='btn']").nth(i).click()
          continue
        }
      }
    }
  }

  async verifyCountCartBadge(item) {
    expect(await this.containerCart.locator('.shopping_cart_badge').textContent()).toEqual(item.length.toString())
  }

  async goToCheckout() {
    await this.containerCart.locator('.shopping_cart_link').click()
  }

  async clickSideBarAndLogout() {
    await this.locatorBtnBurger.click()
    await this.locatorBtnLogOut.click()
  }

 

  async verifySortingData(filterName, name = '.inventory_item_name', price = '.inventory_item_price') {
    await this.locatorSelectSort.selectOption(filterName)

    let productsNameOriginal = await this.listItem.locator(name).allTextContents()
    let productsPriceOriginal = await this.listItem.locator(price).allTextContents()

    if(filterName == 'az'){
      expect(isArraySorted(productsNameOriginal)).toBe(true)
    }else if (filterName == 'za'){
      expect(isArraySorted(productsNameOriginal)).toBe(false)
    }else if (filterName == 'lohi'){
      expect(isArraySorted(productsPriceOriginal, 'number')).toBe(true)
    }else {
      expect(isArraySorted(productsPriceOriginal, 'number')).toBe(false)
    }
  }
}
function isArraySorted(arr, type = 'string') {
  for (let i = 0; i < arr.length - 1; i++) {
    let current = arr[i];
    let next = arr[i + 1];

    if (type === 'number') {
      current = parseFloat(current.substring(1));
      next = parseFloat(next.substring(1));
    }

    if (current > next) {
      return false;
    }
  }
  return true;
}

module.exports = { InventoryPage };
