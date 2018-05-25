import {APP_NAME} from '../settings'
import {getCityWeatherId} from './_helpers'


/**
 * Constants
 * */

export const moduleName = 'currentSuperWeather'
const prefix = `${APP_NAME}/${moduleName}`

export const SET_CITY_WEATHER = `${prefix}/SET_CITY_WEATHER` // test-weather/currentWeather/SET_CITY_WEATHER
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

export const weatherListSelector = state => {
    let entity = state[moduleName].entity
    if(!entity) return []
    return entity.list
}