import {APP_NAME, DEFAULT_CITY} from '../settings'
import {fetchWeatherByQuery, fetchWeatherByCoord} from "../helpers"
import {addLastCity} from "./app"
import {push} from 'react-router-redux'

/**
 * Constants
 * */

export const moduleName = 'currentWeather'
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

export const currentWeatherEntitySelector = state => {
    let entity = state[moduleName].entity
    return entity
}

export const cursorSelector = state => {
    return state[moduleName].cursor
}

export const chosenWeatherItemSelector = state => {
    let weatherList = weatherListSelector(state)
    let cursor = cursorSelector(state)
    cursor = cursor === null ? 0 : cursor
    let chosen = weatherList[cursor]
    return chosen
}


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
 * Thunk
 * */

export const handleFetchWeatherByQuery = (query) => {
    return function (dispatch, getState) {
        dispatch({
            type : START_LOADING,
        })
        fetchWeatherByQuery(query)
            .then(response => {
                if (response.status >= 400) throw new Error(response.statusText)
                return response.json()
            })
            .then(result => {
                dispatch(addCityWeather(result))
                dispatch(addLastCity(result.city.name))

                // HOMETASK(2)
                // TODO
                // navigate to "/" via redux
                // HINT: you need to dispatch something from react-router-redux
                dispatch(push('/'))

            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                dispatch({
                    type : END_LOADING,
                })
            })
    }
}

export const handelFetchWeatherByCoord = (latitude, longitude) => {
    return function (dispatch, getState) {
        dispatch({
            type : START_LOADING,
        })
        fetchWeatherByCoord(latitude, longitude)
            .then(response => {
                if (response.status >= 400) throw new Error(response.statusText)
                return response.json()
            })
            .then(result => {
                dispatch(addCityWeather(result))
                dispatch(addLastCity(result.city.name))
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                dispatch({
                    type : END_LOADING,
                })
            })
    }
}

// TODO finish lastCity logic
export const checkAndInitFetchWeather = () => {
    return (dispatch, getState) => {
        let state = getState()
        let currentWeatherEntity = currentWeatherEntitySelector(state)
        let lastCity

        if(!currentWeatherEntity){
            if (lastCity) {
               dispatch(handleFetchWeatherByQuery(lastCity))
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => { // success
                        dispatch(handelFetchWeatherByCoord(position.coords.latitude, position.coords.longitude))
                    },
                    () => { // fail
                        dispatch(handleFetchWeatherByQuery(DEFAULT_CITY))
                    }
                )
            }
        }else{
            return null
        }
    }
}

/*
* componentDidMount() {
        const {lastCity} = this.props
        if (lastCity){
            const {handleFetchWeatherByQuery} = this.props
            handleFetchWeatherByQuery(lastCity)
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._successGetPosition, this._failGetPosition);
        }
    }

    _successGetPosition = (position) => {
        this.setState({
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
        }, () => {
            let {latitude, longitude} = this.state
            const {handelFetchWeatherByCoord} = this.props
            handelFetchWeatherByCoord(latitude, longitude)
        })
    }

    _failGetPosition = () => {
        const {handleFetchWeatherByQuery} = this.props
        handleFetchWeatherByQuery(DEFAULT_CITY)
    }
*
* */