import {WEATHER_ICON_BASE_URL} from './../settings'
import {WEATHER_API_KEY, WEATHER_ICON_GUIDE} from "../settings";
import moment from 'moment'
import cn from 'classnames'


export const hPaToMercury = hPa => {

}

export const formatMercury = mercury => {

}

export const getIconSrc = iconId => {
    return `${WEATHER_ICON_BASE_URL}/${iconId}.png`
}

export const getIconClass = iconId => {
    return WEATHER_ICON_GUIDE[iconId]
}

export const fetchWeatherByQuery = query => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${WEATHER_API_KEY}`, {
        headers : {
            "Accept" : "application/json, text/plain, */*"
        },
    })
}

export const fetchWeatherByCoord = (latitude, longtitude) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longtitude}&units=metric&appid=${WEATHER_API_KEY}`, {
        headers : {
            "Accept" : "application/json, text/plain, */*"
        },
    })
}

export const parseTime = timeStr => {
    return moment(timeStr, "YYYY-MM-DD HH:mm:ss")
}

export function throttle (func, ms) {

    let isThrottled = false;
    let savedArgs
    let savedThis

    function wrapper() {

        if (isThrottled) {
            savedArgs = arguments
            savedThis = this
            return
        }

        func.apply(this, arguments)

        isThrottled = true

        setTimeout(function() {
            isThrottled = false
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs)
                savedArgs = savedThis = null
            }
        }, ms)
    }

    return wrapper
}


// TODO
// write function fetchWeatherByCityId
window.___cn = cn