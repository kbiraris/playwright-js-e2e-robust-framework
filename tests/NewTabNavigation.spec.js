const { test } = require('@playwright/test');

test('New tab handle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ])

    console.log(await newPage.title());

    await userName.fill('abc')

    //await page.pause();
})