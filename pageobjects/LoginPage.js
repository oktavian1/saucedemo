import { expect } from "@playwright/test";
class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("[data-test='username']");
    this.password = page.locator("[data-test='password']");
    this.btnLogin = page.locator("#login-button");
    this.message = page.locator(".error-message-container [data-test='error']");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.btnLogin.click();
  }

  async validationMessageError(username, password, message) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.btnLogin.click();
    if (username == "" && password == "") {
      expect(await this.message.textContent()).toContain(message);
    } else if (password == "") {
      expect(await this.message.textContent()).toContain(message);
    } else if (username == "locked_out_user") {
      expect(await this.message.textContent()).toContain(message);
    } else {
      true;
    }
  }

  async verifyComponentIsPresent() {
    await expect(this.userName).toBeAttached();
    await expect(this.userName).toBeEditable();
    await expect(this.password).toBeAttached();
    await expect(this.password).toBeEditable();
    await expect(this.btnLogin).toBeVisible();
  }

  async getErrorMessage() {
    return await this.message.textContent();
  }
}

module.exports = { LoginPage };
