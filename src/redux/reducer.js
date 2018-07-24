/*
* !!! never mutate state
* */
import {combineReducers} from 'redux'
import currentWeatherReducer, {moduleName as currentWeatherModuleName} from "../ducks/currentWeather";
import appReducer, {moduleName as appModuleName} from "../ducks/app";
import authUser, {moduleName as authUserModuleName} from "../ducks/authUser"
import {routerReducer as router} from 'react-router-redux'

const reducer = combineReducers({
    [currentWeatherModuleName] : currentWeatherReducer,
    [appModuleName] : appReducer,
    [authUserModuleName] : authUser,
    router,
})

console.log(typeof reducer)

export default reducer