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
// /html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/p[1]/table/tbody/tr
// /html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/p[1]/table/tbody/tr[1]/td[2]/p/strong
// /html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr[1]/td[2]/p/strong
// /html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr[1]/td[2]/strong
// https://www.idbi.com/faq-super-savings-account.asp
driver.get('https://www.idbi.com/faq-atm-usage.asp');

pause(10, getNessesaryContent);
var req = "";

var resultsQ = "";
var resultsA = "";

function getNessesaryContent() {

    driver.findElements(By.xpath('/html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/p[1]/table/tbody/tr')).then(function (trCount) {

        console.log();

        for (let i = 0; i < trCount.length; i++) {
            driver.findElements(By.xpath('/html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/p[1]/table/tbody/tr[' + i + ']/td[2]/p/strong'))
                .then(function (els) {
                    // console.log(els.length);
                    for (var i = 0; i < els.length; i++) {
                        els[i].getText().then(function (elsText) {

                           console.log(elsText);
                        })
                    }
                });
        }

        for (let i = 0; i < trCount.length; i++) {
            driver.findElements(By.xpath('/html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td/p[1]/table/tbody/tr[' + i + ']/td[2]/p'))
                .then(function (els) {
                    console.log(els.length);
                    for (var i = 0; i < els.length; i++) {
                        els[i].getText().then(function (elsText) {

                            console.log(elsText);
                        })
                    }
                });
        }
    });

}
