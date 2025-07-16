const {test, expect} = require('@playwright/test');

test('First Playwright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('input#username').fill("abc@abc.com");

})

test('Client App login', async ({page})=> {
    
    const userEmail = "birariskunal1@gmail.com";
    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator("[value='Login']");
    const productCard = page.locator(".card-body");
    const productName = "ADIDAS ORIGINAL";
    const cartLink = page.locator("[routerlink*='cart']");
    const checkout = page.locator("text='Checkout'");
    const selectCountry = page.locator("[placeholder*='Country']");
    const dropdown = page.locator('section.ta-results');

    await page.goto('https://rahulshettyacademy.com/client');
    await email.fill(userEmail);
    await password.fill('P@ssw0rd@1');
    await login.click();

    await page.locator('.card-body').first().waitFor();
    
    //const count = await productCard.count();
    // for(let i=0; i<count; ++i)
    // {
    //     if(await productCard.nth(i).locator("b").textContent() == productName)
    //     {
    //         await productCard.nth(i).locator('text= Add To Cart').click();
    //         break;
    //     }
    // }

    await page.locator(".card-body").filter({hasText: productName}).getByRole('button',{name: "Add to Cart"}).click();

    await cartLink.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();

    await checkout.click();

    await selectCountry.pressSequentially("ind");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator('button').count();

    for(let i=0; i<optionCount; ++i)
    {
        const countryName = await dropdown.locator('button').nth(i).textContent();
        if(countryName ==" India")
        {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
})