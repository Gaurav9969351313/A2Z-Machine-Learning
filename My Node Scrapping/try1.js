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

function pause(t, func) {
    setTimeout(func, t * 1000 * delayFactor);
}

driver.get('https://www.journaldev.com/2366/core-java-interview-questions-and-answers');

pause(10, getNessesaryContent);

function getNessesaryContent() {

    for (let i = 0; i < tagsArray.length; i++) {
        driver.findElements(By.tagName(tagsArray[i])).then(function (els) {
            console.log(tagsArray[i] + " count :-", els.length);
        });
    }

    // driver.findElements(By.xpath('/html/body/div[1]/div/div/main/article/div/ol[3]/li')).then(function (els) {

    //     for (var i = 0; i < els.length; i++) {
    //         els[i].getText().then(function (elsText) {
    //             console.log(elsText);
    //         })
    //     }
    // })
}