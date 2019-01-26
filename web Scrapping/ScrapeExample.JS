var webdriver = require ('selenium-webdriver') , // including webdriver
 By = webdriver.By; //obj have properties -> id xpath className name
 /* if you are using the chrome driver via npm install chromedriver@2.43
 uncomment below line, otherwise dont have to include it
 /*var chrome = require('chromedriver'); // requiring chrome driver installed via npm command
 */
var driver = new webdriver.Builder() //driver provide interaction with hardware
 .forBrowser('chrome') //mentioning the browser
 .build();// Opening our browser

  driver.get('file://' + __dirname + '/Example.html'); //getting the URL

  /**
   * Calls the method after 2 seconds of delay.
   */
Pause(2,ScrapeExample);
/**
 * Scrapping the page for the demonstration of various selenium elements and methods
 */
function ScrapeExample(){
//statement
console.log("Start Scraping the page...");
             driver.findElement(By.id('name')).sendKeys("Jazeb Akram Instructor");
             driver.findElement(By.xpath('//input[@value="female"]')).click();
             driver.findElement(By.name('vehicle1')).click();

              /**
               * Get the text from multiple elements
               */
             driver.findElements(By.id('fruits')).then(function(elements){
                               for (var i = 0; i < elements.length; i++) {
                                 elements[i].getText().then(function(text){
                                   console.log('List of Fruits \n'+ text)
                                 });
                               }
                             });

            driver.findElement(By.xpath('//select[@id="cars"]/option[@value="BMW"]')).click();
                            /**
                 * Getting the href based on search query parameter using partial link
                 */
            driver.findElement(By.partialLinkText('Jazeb'))
            .getAttribute('href').then(function(value){
              console.log('1st link' + value);
            });
                            /**
                 * Getting the href based on anchor tag value  using  linkText
                 */
            driver.findElement(By.linkText('Jazeb Akram'))
            .getAttribute('href').then(function(value){
              console.log('2nd link'+ value);
            });




Pause(7,QuitDriver);
}
/**
adding seleinum wait
 * Delay in seconds
 * @param int time
 * @param function func
 */
function Pause(Time,FuncName){
  setTimeout(FuncName,Time*1000);
}

/**
* Closing and then quiting the driver after scrapping has been done
*/
function QuitDriver(){
  driver.close();
  driver.quit();
}
