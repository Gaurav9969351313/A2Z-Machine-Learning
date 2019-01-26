var webdriver = require('selenium-webdriver');
var By = webdriver.By;

var tripTypes = {
  singletrip: 2,
  annualtrip: 3,
  cruisetrip: 4
};

var destinations =
{

  singletrip: {
    europe: 2,
    australia:3,
    worldwideExclude: 4,
    worldwideInclude: 5,
    uk: 6
  },
  annualtrip: {
    europe: 2,
    worldwideInclude: 3
  },
  cruisetrip:{
    europe: 2,
    australia:3,
    worldwideExclude: 4,
    worldwideInclude: 5,
    uk: 6
  }
};

/**
 * This method converts date to day, month, year format
 */

function convertDate(inputFormat) {
  console.log("----inputFormat---"+inputFormat)
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

/**
 * This export method actually performs scrapping on page.
 * @param string tripType
 * @param string location
 * @param string groupType
 * @param int tripDays
 * @param int ages
 * @param int delayFactor
 * @param object driver
 * @param resultsCallback
 */

exports.run = function run(tripType,location,groupType,tripDays,ages,delayFactor,driver,resultsCallback){
  var delayFactor = delayFactor || 1;

  var results = {
    header: [], //stores packages name like silver gold etc
    rows: []// stores packages prices
  };

/**
 * Delays in seconds
 * @param int t
 * @param function func
 */

  function pause(t,func){
    setTimeout(func,t*1000*delayFactor);
  }

  driver.get('https://www.circlecover.com');

  pause(10,setCover);

/**
 * This method sets cover based on tripType
 */

  function setCover(){
    var href = '';
    var id = tripTypes[tripType];
    driver.findElement(By.xpath('// select [@id="ddPolicyType"]/option['+id+']')).click();
    pause(5,setDestination);
  }

/**
 * This method sets destination based on location and tripType
 */

  function setDestination(){
    var id = destinations[tripType][location];
    driver.findElement(By.xpath('//select [@id="ddDestination"]/option['+id+']')).click();
    pause(5,setTripDuration);
  }

/**
 * This method sets start and end date of a trip
 */

  function setTripDuration(){

    console.log('setTripDuration()');
    var tmrw = new Date();


    tmrw.setDate(tmrw.getDate() + 1);
    var dateStr = convertDate(tmrw);
    driver.findElement(By.css('#txtCoverStartDate')).sendKeys(dateStr);

    pause(3,function(){
    if(tripType !== 'annualtrip'){
      var endDate = new Date(tmrw);
      endDate.setDate(endDate.getDate() + tripDays);
      dateStr = convertDate(endDate);
      console.log("------endDate-----" +dateStr);

      driver.findElement(By.css('#txtCoverEndDate')).click();
      driver.findElement(By.css('#txtCoverEndDate')).clear();
      pause(1, function(){
        driver.findElement(By.css('#txtCoverEndDate')).sendKeys(dateStr);
      });
    }

    pause(3,setAges);
    });
  }

/**
 * This method sets age based on the ddlNoOfTravellers
 */

  function setAges(){
    //nth-option means n can contains any value
    driver.findElement(By.css('#ddlNoOfTravellers option:nth-child(' + ages.length + ')')).click();
    pause(2,function(){

      for(var i = 0; i < ages.length; i++){
        driver.findElement(By.id('tb_travellerAge_' + (i+1))).sendKeys(ages[i].toString());
      }
      pause(5,moveToQuotesPage);
    });

  }

/**
 * This method moves to quote page
 */

  function moveToQuotesPage(){
    //sometime seleinum native function wont work thats why use JS
    //executeScript driver method is used to run javascripts codes like below. its another demonstration of how can we excecute js
    //in selenium driver.
    driver.executeScript('document.getElementById("btnNext").click()');
    pause(5,getQuotesText);
  }

/**
 * This method gets quotes text and saves into results object array
 */

  function getQuotesText(){
    var trip = '';
    driver.findElements(By.className('productheadings')).then(function(els){
      for(var i = 0; i < els.length; i++){
        els[i].getText().then(function(elsText){
          console.log(elsText);
          results.header.push(elsText);
        })
      }
    });
    pause(3,getPrices);
  }

/**
 * This method gets prices of quotes text, obtained above
 */

  function getPrices(){
    console.log('getPrices');
    driver.findElements(By.xpath('// span [@class="comparePriceJustPrice"]/span')).then(function(els){
      for(var i = 0 ; i < els.length; i++){
        els[i].getText().then(function(prices){
          console.log(prices)
          results.rows.push(prices);
        })
      }
    })
    pause(3,compileResults);
  }

  /**
   * This method generates final result and callback to save data in excel file
   */

  function compileResults(){
    var toReturn = [];

    console.log('raw results: ' + JSON.stringify(results));


    for(var i = 0; i < results.header.length; i++){
      var policyType = results.header[i];

      toReturn.push({
          tripType: tripType,
          location: location,
          groupType: groupType,
          tripDays: tripDays,
          ages: ages,
          quote: results.rows[i],
          description: policyType,
          error: null
      });
    }

    resultsCallback(toReturn);
  }

}
