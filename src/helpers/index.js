import {WEATHER_ICON_BASE_URL} from './../settings'
import {WEATHER_API_KEY} from "../settings";


export const hPaToMercury = hPa => {

}

export const formatMercury = mercury => {

}

export const getIconSrc = iconId => {
    return `${WEATHER_ICON_BASE_URL}/${iconId}.png`
}

export const appFetch = query => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${WEATHER_API_KEY}`, {
        headers : {
            "Accept" : "application/json, text/plain, */*"
        },
    })
}