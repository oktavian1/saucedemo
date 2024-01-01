import { expect } from "@playwright/test";
class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.locatorPrice = page.locator(".cart_list .inventory_item_price");
    this.locatorItemTotal = page.locator(".summary_subtotal_label");
    this.locatorTax = page.locator(".summary_tax_label");
    this.locatorTotal = page.locator(".summary_total_label");
    this.btnFinish = page.locator('[data-test="finish"]');
  }

  async _convertToNumeric() {
    const locatorPrices = await this.locatorPrice.allTextContents();
    return locatorPrices.map((price) => parseFloat(price.replace("$", "")));
  }

  async _sumPriceItem() {
    const itemTotal = await this._convertToNumeric();
    const sumItem = itemTotal.reduce((acc, curr) => acc + curr, 0);
    console.log(sumItem);
    return sumItem;
  }

  async _calculateTax() {
    const taxPercentage = 0.08;
    const taxAmount = (await this._sumPriceItem()) * taxPercentage;
    return taxAmount;
  }

  async _calculateTotal() {
    const itemTotal = await this._sumPriceItem();
    const taxTotal = await this._calculateTax();
    return (itemTotal + taxTotal).toFixed(2);
  }

  //   async verifyTotalAndTax(){
  //     const itemTotal = await this._sumPriceItem()
  //     const totalTax = await this._calculateTax()
  //     const total = await this._calculateTotal()
  //     expect(await this.locatorItemTotal.textContent()).toContain(itemTotal.toString())
  //     expect(await this.locatorTax.textContent()).toContain( totalTax.toFixed(2).toString())
  //     expect(await this.locatorTotal.textContent()).toContain( total.toString())
  //   }

  async verifyTotalAndTax() {
    const locatorPrice = await this.locatorPrice.allTextContents()
    const locatorItemTotal = await this.locatorItemTotal.textContent()
    const locatorTax = await this.locatorTax.textContent()
    const locatorTotal = await this.locatorTotal.textContent()
    let numericPrices = locatorPrice.map(price => parseFloat(price.replace('$', '')));
    let itemTotal = numericPrices.reduce((acc, curr) => acc + curr, 0);
    const taxPercentage = 0.08
    const taxAmount = (itemTotal * taxPercentage)
    const total = (itemTotal + taxAmount).toFixed(2)

    expect(locatorItemTotal).toContain(itemTotal.toString())
    expect(locatorTax).toContain(taxAmount.toFixed(2).toString())
    expect(locatorTotal).toContain(total.toString())
  }

  async clickFinish() {
    await this.btnFinish.click();
  }
}

module.exports = { CheckoutStepTwoPage };
