var webdriver = require ('selenium-webdriver') , // including webdriver
 By = webdriver.By; //obj have properties -> id xpath className name
 fs = require('fs');
 var chrome = require('chromedriver'); // requiring chrome driver installed via npm command
var driver = new webdriver.Builder() //driver provide interaction with hardware
 .forBrowser('chrome') //mentioning the browser
 .build();// Opening our browser

  driver.get('http://jazebakram.com/coupon'); //getting the URL

  /**
   * Calls the method after 2 seconds of delay.
   */
Pause(2,ScreenShot);
/**
 * Scrapping the page for the demonstration of various selenium elements and methods
 */
function ScreenShot(){
//statement
console.log("Taking a ScreenShot! 3 2 1");
driver.takeScreenshot().then(
  function(image,err){
    fs.writeFile('./Images/JazebCoupon.png',image,'base64',function(err){
      console.log(err);
      if(err == null){
        console.log('ScreenShot has been captured and saved in desired image directory!');
      }
    });
  }
);
Pause(4,QuitDriver);
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
