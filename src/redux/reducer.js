/*
* !!! never mutate state
* */


import {combineReducers} from 'redux'
import currentWeatherReducer, {moduleName as currentWeatherModuleName, SET_CITY_WEATHER} from "../ducks/currentWeather";


const reducer = combineReducers({
    [currentWeatherModuleName] : currentWeatherReducer,
    test : (state = "test", action) => {
        // console.log(action)
        return "test"
    },
    test2 : (state = "test2", action) => {
        // console.log(action)
        return "test2"
    },
    test3 : (state = "test3", action) => {
        if (action.type === SET_CITY_WEATHER) {
            return SET_CITY_WEATHER
        }
        return state
    }
})

console.log("typeof reducer is: ", typeof reducer)

export default reducer