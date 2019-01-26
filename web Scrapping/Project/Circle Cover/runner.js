var webdriver = require('selenium-webdriver');
var fs = require('fs');
var chrome = require('chromedriver');

var driver = null;
const delayFactor = 1;
const travelInsurance = 'circleCover'; //requiring circle cover folder
//abc when we have another new site to scrape

var site = require('./' + travelInsurance);
/**
 * Require data.js file that contains the test cases which need to be run.
 */
var params = require('./' + travelInsurance + '/data.js').data;

const filePath = travelInsurance + '.csv';

console.log('running travel insurance website: ' + travelInsurance);

var currentParams = undefined;

/**
 * This method performs loop on test cases from data.js file
 */

function loopParams(){
  console.log('looping params');

  if(params.length < 1){
    console.log('There is no test case provided in data.js file. All params have been passed');
    return;
  }

  currentParams = params.shift();
  // if(currentParams === undefined){
  //   console.log('All params have been parsed.');
  //   return;
  // }

executeTestCases();
}

/**
 * This method open the chrome browser and send data based on currentParams to index.js file
 */

function executeTestCases(){
   driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

  console.log('running: ' + JSON.stringify(currentParams));


    var _groupType = currentParams.ages.length === 1 ? 'individual'
              : currentParams.ages.length === 2 ? 'couple'
              : 'family';

//This method is defined in circle cover index.js file
//site maens index file by default
  site.run(
    currentParams.tripType,
    currentParams.location,
    _groupType,
    currentParams.tripDays,
    currentParams.ages
    ,delayFactor
    ,
    driver,    //chrome driver defined on line 48
    function(results){ //call back function to save data in csv file
      console.log(JSON.stringify(results));

      for(var i = 0; i < results.length; i++){
        appendResult(results[i]);
      }
      driver.quit();
      loopParams();
  });
}

/**
 * This method saves scrapped data in csv file
 */

function appendResult(result){

  fs.appendFileSync(filePath, ''
  + result.tripType + ','
  + result.location + ','
  + result.groupType +  ','
  + result.tripDays + ','
  + result.ages.join('&') + ','
  + result.quote + ','
  + result.description + ','
  + '"' + result.error + '"\r\n');
}

process.on('uncaughtException', function (err) {
  console.log('error with params: ' + JSON.stringify(currentParams));
  console.log(err);

  currentParams.error = err.toString().replace(new RegExp('\r?\n','g'), ' ');//adding null/error in last column
  appendResult(currentParams);
  driver.quit();
  setTimeout(loopParams, 1000);
});

loopParams();
