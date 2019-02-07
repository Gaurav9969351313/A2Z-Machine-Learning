var fs = require('fs');
var chrome = require('chromedriver');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;

var driver = null;
const delayFactor = 1;

var tagsArray = ["a", "li", "p", "th", "td", "ul"]

executeTestCases();

function executeTestCases() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
}

function abc() {

}

function pause(t, func) {
    setTimeout(func, t * 1000 * delayFactor);
}

driver.get('https://www.hdfcbank.com/personal/faq/faq-inner/gts8mint-gts8miol');

pause(10, getNessesaryContent);
var req = "";

var resultsQ = "";
var resultsA = "";

function getNessesaryContent() {

    driver.findElement(By.css('#whatisthisproduct')).click();

    //questionheader

    driver.findElements(By.className('questionheader')).then(function (head) {
        for (var i = 0; i < head.length; i++) {
            head[i].getText().then(function (headText) {
                // console.log(headText);
                pause(2,abc)
            });
            pause(2,abc)
        }
    });

    // [3]/p
    driver.findElements(By.xpath('//*[@id="area-promo-right"]/div[3]/div/div[2]/div/div')).then(function (els) {
        console.log(els.length);
        for (var i = 0; i < els.length; i++) {
            els[i].getText().then(function (elsText) {

                console.log(i+ ") "+ elsText);
            })
        }
    });
}
