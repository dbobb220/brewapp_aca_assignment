require('dotenv').config();
const assert = require('assert');
const fetch = require('node-fetch');
const readline = require('readline');
const colors = require('colors');

const apiKey = process.env.API_KEY; 

const baseURL = 'https://sandbox-api.brewerydb.com/v2/';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getPrompt() {
  rl.question('Which US zipcode would you like to look up? ', (zipcode) => {
  getBreweries(zipcode);
  });
}

const getBreweries = (fetch, zipcode) => {
  fetch(baseURL + 'locations/?key=' + apiKey + `&postalCode=` + zipcode)
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText);
    } return res.json();
  })
  .then(obj => {
    const data = obj.data;
    if (obj.totalResults === undefined) {
      console.log('No breweries available. Try another zipcode.'.red);
      getPrompt();
    } else {
      console.log(colors.blue('Total Results: ') + obj.totalResults);
      console.log(' ');
      printResults(data);
    }
  })
  .catch(err => console.log(`Error,  ${err}`))
}

const printResults = (brewery) => {
  brewery.forEach(val => {
    console.log(colors.green('Name: ') + val.name);
    console.log(colors.green('Phone: ') + val.phone);
    console.log(colors.green('Website: ') + val.website);
    console.log(colors.green('Address: ') + val.streetAddress);
    console.log(colors.green('Desription: ') + val.brewery.description); 
    console.log(' ');
  });
  getPrompt();
}

getPrompt();

describe('getBrewerie', ()=>{
  it('tests if address is wrong', ()=>{
    const testFetch = url =>{
      assert (
      url = baseURL + 'locations/?key=' + apiKey + `&postalCode=78758`
      )
      return new Promise(function(){})
    }
    getBreweries(testFetch, '78758')
})
 it('test wrong apiKey', ()=>{
   const testFetch = url =>{
     assert (
      apiKey = process.env.API_KEY
     )
     return new Promise(function(){} )
   }
   getBreweries(testFetch, '78758')
 })
})
console.log(getBreweries);
