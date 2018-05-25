import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import {WEATHER_API_KEY} from './settings'



ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
//
// let array = [1,2,3,4]
//
// let arrayCopy = [
//     ...array,
// ]
//
// let testid = "706483"
// fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${testid}&units=metric&appid=${WEATHER_API_KEY}`, {
//     headers : {
//         "Accept" : "application/json, text/plain, */*"
//     },
// }).then(response => {
//     console.log(response)
// })