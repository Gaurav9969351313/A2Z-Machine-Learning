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

driver.get('https://www.icicibank.com/nri-banking/faq/nri/tax-queries-faqs.page?');

pause(10, getNessesaryContent);
var req = "";
function getNessesaryContent() {

    for (let i = 0; i < tagsArray.length; i++) {
        driver.findElements(By.tagName(tagsArray[i])).then(function (els) {
            req = req + tagsArray[i] + "$" + els.length + "|";
            console.log(req);
        })
    }

    pause(5, abc);

    // var tags = req.split('|')

    // for (let j = 0; j < tags.length; j++) {
    //     const tag = tags[j].split('$')[0];

    resultsQ = "";
    resultsA = "";

    driver.findElements(By.xpath('//*[@id="main"]/div[3]/div[4]/div/section/div')).then(function (els) {
        for (var i = 0; i < els.length; i++) {
            els[i].getText().then(function (elsText) {
                resultsQ = resultsQ + elsText + "|||";
               // console.log(resultsQ);
            })
        }
    });
    
    console.log("==========================================================================================")
    ////*[@id="main"]/div[3]/div[4]/div/section/div[1]/div/h2/span

    // Questions are fetcehdd sucessfully
}