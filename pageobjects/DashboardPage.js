class DashboardPage
{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName)
    {
        await this.products.last().waitFor();
        // const titles= await this.productText.allTextCon
        // console.log(titles);
        const count = await this.products.count();
        for(let i=0; i<count; ++i)
        {
            if(await this.products.nth(i).locator("b").textContent() == productName)
            {
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }

    async navigateToOrders()
    {
        await this.orders.click();
    }

}
module.exports = {DashboardPage};