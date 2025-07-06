const { expect } = require("@playwright/test");

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkoutButton = page.locator("text=Checkout");
    
    }

    async verifyProductIsDisplayed(productName)
    {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async checkout()
    {
        await this.checkoutButton.click();
    }

    getProductLocator(productName)
    {
        return  this.page.locator("h3:has-text('"+productName+"')");
    }


}
module.exports = {CartPage};