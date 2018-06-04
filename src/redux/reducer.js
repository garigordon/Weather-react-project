/*
* !!! never mutate state
* */


import {combineReducers} from 'redux'
import currentWeatherReducer, {moduleName as currentWeatherModuleName} from "../ducks/currentWeather";
import appReducer, {moduleName as appModuleName} from "../ducks/app";

const reducer = combineReducers({
    [currentWeatherModuleName] : currentWeatherReducer,
    [appModuleName] : appReducer
})

console.log("typeof reducer is: ", typeof reducer)

export default reducer