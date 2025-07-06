const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }
    
    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }
    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }

}
module.exports = {POManager};