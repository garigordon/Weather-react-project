import React from 'react'
import {connect} from 'react-redux'
import {getIconSrc, parseTime} from './../helpers'
import {chosenWeatherItemSelector, cityCountry, citySelector} from "../ducks/currentWeather";

let ChosenWeather = (props) => {
    let {chosenWeatherItem,cityName, cityCountry} = props
    let currentWeather = chosenWeatherItem

    if (typeof currentWeather === 'undefined') return null

    console.log('--- currentWeather', currentWeather)

    let {wind : {speed} = {}, dt_txt, main : {temp, humidity, pressure} = {}, weather = []} = currentWeather
    let _moment = parseTime(dt_txt)
    let momentDate = _moment.format("D MMMM YYYY")
    let momentTime = _moment.format("HH : mm")
    let {description, icon} = weather[0] || {}
    return (
        <div className="row-line">
            <div className="city-name">
                {cityName}, {cityCountry}
            </div>
            <div className="datetime">
                {momentDate} {momentTime}
            </div>
            <div className="wheather-props">
                <div className="main-wheather-prop">
                    <div className="cloudness">
                        <div className="cloudness-icon">
                            <img src={getIconSrc(icon)} alt=""/>
                        </div>
                        <div className="cloudness-text">
                            <p className="cloudness-text">{description}</p>
                        </div>
                    </div>
                    <div className="temprature">
                        <span className="temprature">{Math.floor(temp)}</span>
                        <span className="temprature-unit">°C</span>
                    </div>
                </div>
                <div className="extra-wheather-props">
                    <div className="wheather-prop">
                        <span className="wheather-prop-icon"><i className="icon-wind"></i></span>
                        {speed}<span className="wheather-prop-unit"> m/s</span>
                    </div>
                    <div className="wheather-prop">
                        <span className="wheather-prop-icon"></span>
                        {pressure} <span className="wheather-prop-unit">mm. mercury</span>
                    </div>
                    <div className="wheather-prop">
                        <span className="wheather-prop-icon"></span>
                        {humidity} <span className="wheather-prop-unit">%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state, ownProps) => {
    return {
        chosenWeatherItem : chosenWeatherItemSelector(state),
        cityName : citySelector(state),
        cityCountry : cityCountry(state),
    }
}

let decorator = connect(mapStateToProps)
let connectedChosenWeather = decorator(ChosenWeather)

export default connectedChosenWeather