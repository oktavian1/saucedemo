const { InventoryPage } = require("./InventoryPage");
const { LoginPage } = require("./LoginPage");
const { CartPage } = require("./CartPage");
const { CheckoutStepOnePage } = require("./CheckoutStepOnePage")
const { CheckoutStepTwoPage } = require("./CheckoutStepTwoPage")
const { CompletePage } = require("./CompletePage")

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page)
    this.stepOne = new CheckoutStepOnePage(this.page)
    this.stepTwo = new CheckoutStepTwoPage(this.page)
    this.completePage = new CompletePage(this.page)
  }

  getLoginPage() {
    return this.loginPage;
  }

  getInventoryPage() {
    return this.inventoryPage;
  }
  
  getCartPage(){
    return this.cartPage;
  }

  getCheckoutStepOnePage(){
    return this.stepOne
  }

  getCheckoutStepTwoPage(){
    return this.stepTwo
  }

  getCompletePage(){
    return this.completePage
  }
}
module.exports = { POManager };
