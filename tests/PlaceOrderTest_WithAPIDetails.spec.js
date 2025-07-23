const {test, expect} = require('@playwright/test');
const {POManager} = require ('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../testdata/placeOrderTestData.json')));

test('Place order and verify in order history', async ({page})=> {
  
    // API Request Monitoring Setup
    const requestsData = [];
    const requestTimings = new Map();

    page.on('request', request => {
        requestTimings.set(request.url(), Date.now());
    });

    page.on('requestfinished', async request => {
        const startTime = requestTimings.get(request.url());
        const endTime = Date.now();
        const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2);

        const response = await request.response();

        requestsData.push({
        url: request.url(),
        method: request.method(),
        status: response.status(),
        duration: durationInSeconds
        });
    });

    const poManager = new POManager(page);  
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataset.username, dataset.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(dataset.productName);
    await cartPage.checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    //API Call Summary
    console.log('\n📊 API Call Summary:');
    console.table(requestsData);

    const fs = require('fs');
    const path = require('path');

    // Build CSV content
    const csvHeader = 'URL,Method,Status,Duration (s)\n';
    const csvRows = requestsData.map(req =>
        `"${req.url}","${req.method}",${req.status},${req.duration}`
    ).join('\n');

    const csvContent = csvHeader + csvRows;

    // Write to CSV file
    fs.writeFileSync(path.join(__dirname, 'PlaceOrder_api_calls_report.csv'), csvContent);

    console.log('API call details saved to PlaceOrder_api_calls_report.csv');
})