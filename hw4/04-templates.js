/** 
 * Exercise 04 - Templates with express
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 4
 *
 * References:
 * https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
 * https://www.geeksforgeeks.org/how-to-make-http-requests-in-node-js/
 * https://stackabuse.com/making-asynchronous-http-requests-in-javascript-with-axios/
 * https://stackoverflow.com/questions/34392691/how-to-get-values-from-a-promise-with-node-js-without-then-function
 * https://matcha.fyi/sort-not-working-javascript/
**/

const express = require('express');
const https = require('https');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;


// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

// Add your code here
function sortPopulation(a, b) {
  if (a.population > b.population) {
    return 1;
  } else if (b.population > a.population) {
    return -1;
  } else {
    return 0;
  }
}

function sortRegions(a, b) {
  if (a.count > b.count) {
    return 1;
  } else if (b.count > a.count) {
    return -1;
  } else {
    return 0;
  }
}

// Get the names and capitals out of the API response
const getNamesAndCapitals = (jsonResponse) => {
  let returnList = [];

  // Get the common name and capital for every country if they have one (otherwise use 'no data')
  jsonResponse.forEach((country) => {
    let currentRegionString = "";
    // Add the country's common name to the string if it exists
    if (country.name.common !== undefined) {
      currentRegionString += country.name.common;
    }
    else {
      currentRegionString += 'no data';
    }
    currentRegionString += ' - ';

    // Add the country's first-listed capital if it exists
    if (country.capital !== undefined) {
      currentRegionString += country.capital[0];
    }
    else {
      currentRegionString += 'no data';
    }
    
    // Add the constructed string as an element in the returnList
    returnList.push(currentRegionString);
  });
  return returnList;
};

// Get the names and population out of the API response
// Sort in descending order
const getNameAndPopulation = (jsonResponse) => {
  let returnList = [];
  let countryObjList = [];
  
  // Collect all countries with a population at or above 50 million
  jsonResponse.forEach((country) => {
    let currentCountryObj = {};
    if (country.population >= '50000000') {
      currentCountryObj.name = country.name.common;
      currentCountryObj.population = country.population;
      countryObjList.push(currentCountryObj);
    }
  });

  // Sort the list based on population in descending order
  countryObjList = countryObjList.sort(sortPopulation).reverse();

  // Build a proper string for output for each country
  countryObjList.forEach((country) => {
    let currentRegionString = "";
    if (country.name !== undefined) {
      currentRegionString += country.name;
    }
    else {
      currentRegionString += 'no data';
    }
    currentRegionString += ` - ${country.population.toLocaleString("en-US")}`;

    // Add the constructed string as an element in the returnList
    returnList.push(currentRegionString);
  });
  return returnList;
};

// Get the region names and count of countries in those regions
// Sort in descending order
const getRegionCount = (jsonResponse) => {
  let returnList = [];
  let regionObj = {};
  let regionObjList = [];
  
  // Collect a count for all regions
  jsonResponse.forEach((country) => {
    if (regionObj[country.region] === undefined) {
      regionObj[country.region] = 1;
    }
    else {
      regionObj[country.region] += 1;
    }
  });

  // Put those regions into an array and then sort them in descending order
  for (const region in regionObj) {
    let currentRegion = {};
    currentRegion.name = region;
    currentRegion.count = regionObj[region];
    regionObjList.push(currentRegion);
  }
  // Sort the list based on number of regions in descending order
  regionObjList = regionObjList.sort(sortRegions).reverse();

  // Build a proper string for output for each region and add the constructed 
  // string as an element in the returnList
  regionObjList.forEach((region) => {
    returnList.push(`${region.name} - ${region.count}`);
  });
  return returnList;
};


// ROUTES
// Main Route
app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
    
  });
});

// Capitals Route
app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  axios({
    method: "get",
    url: url,
  })
  .then(function (response) {
    let namesAndCapitals = getNamesAndCapitals(response.data).sort();
    res.render('page', {
      heading: 'Countries and Capitals',
      results: namesAndCapitals,
    });
  });
});

// Populous Route
app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  axios({
    method: "get",
    url: url,
  })
  .then(function (response) {
    let populous = getNameAndPopulation(response.data);
    res.render('page', {
      heading: 'Most Populous Countries',
      results: populous,
    });
  });
});

// Regions Route
app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  let regions = [];

  axios({
    method: "get",
    url: url,
  })
  .then(function (response) {
    regions = getRegionCount(response.data);
    res.render('page', {
      heading: 'Regions of the World',
      results: regions,
    });
  });

  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
