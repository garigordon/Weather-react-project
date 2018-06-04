import {APP_NAME, WEATHER_API_KEY} from '../settings'
import {getCityWeatherId} from './_helpers'


/**
 * Constants
 * */

export const moduleName = 'currentSuperWeather'
const prefix = `${APP_NAME}/${moduleName}`

export const SET_CITY_WEATHER = `${prefix}/SET_CITY_WEATHER` // test-weather/currentWeather/SET_CITY_WEATHER
export const SET_CITY_WEATHER_AJAX = `${prefix}/SET_CITY_WEATHER_AJAX` // just for comparing
export const START_LOADING = `${prefix}/START_LOADING`
export const END_LOADING = `${prefix}/END_LOADING`
export const CHANGE_CURSOR = `${prefix}/CHANGE_CURSOR`


/**
* reducer
* */

const defaultState = {
    entity : null,
    cursor : null,
    loading : false,
}

const reducer = (state = defaultState, action) => {
    const {type, payload} = action

    switch (type) {
        case SET_CITY_WEATHER : {
            const {cityWeather} = payload
            return {
                ...state,
                entity : cityWeather,
            }
            break
        }
        case SET_CITY_WEATHER_AJAX : {
            console.log(action)

            return state
        }
        case START_LOADING : {
            return {
                ...state,
                loading : true,
            }
            break
        }
        case END_LOADING : {
            return {
                ...state,
                loading : false,
            }
            break
        }
        case CHANGE_CURSOR : {
            const {cursor} = payload
            return {
                ...state,
                cursor :  cursor
            }
            break

        }
        default : {
            return state
            break
        }
    }
}

export default reducer


/**
* Action creators
* */

export const addCityWeather = cityWeather => {
    return {
        type : SET_CITY_WEATHER,
        payload : {
            cityWeather : cityWeather,
        }
    }
}

export const addCityWeatherAjax = query => {
    return {
        type : SET_CITY_WEATHER_AJAX,
        payload : {
            ajax : {
                url : `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${WEATHER_API_KEY}`,
            }
        }
    }
}

export const changeCursor = cursor => {
    return {
        type : CHANGE_CURSOR,
        payload : {
            cursor : cursor,
        }
    }
}


/**
* Selectors
* */

export const currentWeatherLoadingStateSelector = state => {
    return state[moduleName].loading
}

export const citySelector = state => {
    let entity = state[moduleName].entity
    if (!entity) return null
    return entity.city.name
}

export const cityCountry = state => {
    let entity = state[moduleName].entity
    if (!entity) return null
    return entity.city.country
}

export const weatherListSelector = state => {
    let entity = state[moduleName].entity
    if(!entity) return []
    return entity.list
}

export const cursorSelector = state => {
    return state[moduleName].cursor
}

export const chosenWeatherItemSelector = state => {
    let weatherList = weatherListSelector(state)
    let cursor = cursorSelector(state)
    // access = age > 14 ? true : false;
    cursor = cursor === null ? 0 : cursor
    let chosen = weatherList[cursor]
    return chosen
}