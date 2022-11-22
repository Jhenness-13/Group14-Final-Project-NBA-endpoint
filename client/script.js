/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

function processRequest(data) {
  const heights = [];
  const weights = [];
  const weightsHeights = [];
  data.forEach((element) => heights.push(element.height.meters));
  data.forEach((element) => weights.push(element.weight.kilograms));
  for (let i = 0; i < weights.length; i++) {
    weightsHeights.push([heights[i], weights[i]]);
  }
  return weightsHeights;
}
async function shapeDataForLineChart(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.category]) {
      collection[item.category] = [item];
    } else {
      collection[item.category].push(item);
    }
    return collection;
  }, {});
}

async function getData() {
  const url = 'https://api-nba-v1.p.rapidapi.com/players?team=1&season=2021';
  // const url = 'https://api-nba-v1.p.rapidapi.com/teams/statistics?id=2&season=2020';
  // const request = await fetch(url);
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4f97ce439dmshc2e85d907e86424p17ef73jsna492d20dc9ec',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  });
  const json = await data.json();
  // const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item) => Boolean(item.name));
  return json;
}
async function mainEvent() {
  const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
  const submit = document.querySelector('#get_resto');
  const loadAnimation = document.querySelector('.lds-ellipsis');
  loadAnimation.classList.remove('lds-ellipsis');
  loadAnimation.classList.add('lds-ellipsis-hidden');
  const data = await getData();
  const dataManipulated = processRequest(data.response);
  // const shapedData = shapeDataForLineChart(data.response);
  console.log(dataManipulated);
  // console.log(data);
}
//edit
/*
      This last line actually runs first!
      It's calling the 'mainEvent' function at line 57
      It runs first because the listener is set to when your HTML content has loaded
    */

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
