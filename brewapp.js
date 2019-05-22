require('dotenv').config();
const assert = require('assert');
const fetch = require('node-fetch');
const readline = require('readline');
const colors = require('colors');

let apiKey = process.env.API_KEY; 

let baseURL = 'https://sandbox-api.brewerydb.com/v2/locations/?key=';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getPrompt() {
  rl.question('Which US zipcode would you like to look up? ', (zipcode) => {
  getBreweries(fetch, zipcode);
  });
}

const getBreweries = (fetch, zipcode) => {
  return fetch(baseURL + apiKey + '&postalCode=' + zipcode)
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

describe('getBreweries', ()=>{
  it('calls fetch with the correct url', () => {
    const fakeFetch = url => {
      assert(
         baseURL === 'https://sandbox-api.brewerydb.com/v2/locations/?key='
      )
      return new Promise(function(resolve) {
      })
    }
    getBreweries(fakeFetch)
  })
  it('tests if address is wrong', ()=>{
    const testFetch = url =>{
      baseURL === 'https://sand-api.brewerydb.com/v2/locations/?key='
      assert.equal(getBreweries(testFetch), err)
    }
    
})
 it('test wrong apiKey', ()=>{
   const testFetch = url =>{
      apiKey === "magic key"
      assert.equal(getBreweries(testFetch), err)
   }
   
 })
 it('breweries in this postalcode', ()=> {
   const testFetch = () =>{
     return Promise.resolve({
       json(){return{
          data:[
           {postalCode: "28732"}
         ]
       }}
     })
   }
   return getBreweries(testFetch)
    .then(data => assert([data.postalCode === "28732"]))
})
 
})

