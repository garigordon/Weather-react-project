import React from 'react'
import WeatherList from './WeatherList'
import ChosenWeather from './ChosenWeather'


let Weather = () => {
    return [
        <ChosenWeather key = {1} />,
        <WeatherList key = {2} />
    ]
}

export default Weather