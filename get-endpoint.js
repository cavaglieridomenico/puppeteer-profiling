const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ devtools: true });
    console.log(browser.wsEndpoint());
    browser.disconnect();
})();